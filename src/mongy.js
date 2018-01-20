'use strict';

const MongoClient = require('mongodb').MongoClient;

const Mongy = function (url, databaseName, collectionName) {
	(async () => {
		if (url) {
			await this.connect(url);
			if (databaseName) {
				await this.selectDatabase(databaseName);
				if (collectionName) {
					await this.selectDatabase(collectionName);
				}
			}
		}
		this.client = undefined;
		this.db = undefined;
		this.collection = undefined;
		return this;
	})();
};

Mongy.prototype.connect = function (url) {
	return new Promise(async (resolve, reject) => {
		await MongoClient.connect(url, (err, client) => {
			if (err) {
				return reject(err);
			}

			this.client = client;
			resolve();
		});
	});
};

Mongy.prototype.selectDatabase = function (databaseName) {
	return new Promise(async (resolve, reject) => {
		if (!this.client) {
			return reject(new Error('Not connected to any server!'));
		}

		this.db = await this.client.db(databaseName);
		resolve();
	});
};

Mongy.prototype.selectCollection = function (collectionName) {
	return new Promise(async (resolve, reject) => {
		if (!this.client) {
			return reject(new Error('Not connected to any server!'));
		}
		if (!this.db) {
			return reject(new Error('No database was selected!'));
		}
		await this.db.collection(collectionName, async (err, collection) => {
			if (err) {
				return reject(err);
			}

			this.collection = collection;
			resolve();
		});
	});
};

Mongy.prototype.disconnect = function () {
	return new Promise(async (resolve, reject) => {
		if (!this.client) {
			return reject(new Error('Not connected to any server!'));
		}

		await this.client.close();
		this.client = undefined;
		this.db = undefined;
		this.collection = undefined;
		resolve();
	});
};

Mongy.prototype.find = function (query, projection) {
	return new Promise(async (resolve, reject) => {
		if (!this.client) {
			return reject(new Error('Not connected to any server!'));
		}
		if (!this.db) {
			return reject(new Error('Not connected to any database!'));
		}
		if (!this.collection) {
			return reject(new Error('No collection was selected!'));
		}

		await this.collection.find(query, projection).toArray((err, docs) => {
			if (err) {
				return reject(err);
			}

			resolve(docs);
		});
	});
};

Mongy.prototype.insert = function (data) {
	return new Promise(async (resolve, reject) => {
		if (!this.client) {
			return reject(new Error('Not connected to any server!'));
		}
		if (!this.db) {
			return reject(new Error('Not connected to any database!'));
		}
		if (!this.collection) {
			return reject(new Error('No collection was selected!'));
		}

		if (Array.isArray(data)) {
			await this.collection.insertMany(data, (err, res) => {
				if (err) {
					return reject(err);
				}

				resolve(res);
			});
		} else {
			await this.collection.insertOne(data, (err, res) => {
				if (err) {
					return reject(err);
				}

				resolve(res);
			});
		}
	});
};

Mongy.prototype.delete = function (query, options) {
	return new Promise(async (resolve, reject) => {
		if (!this.client) {
			return reject(new Error('Not connected to any server!'));
		}
		if (!this.db) {
			return reject(new Error('Not connected to any database!'));
		}
		if (!this.collection) {
			return reject(new Error('No collection was selected!'));
		}

		if (options && options.many) {
			this.collection.deleteMany(query, (err, obj) => {
				if (err) {
					return reject(err);
				}

				resolve(obj);
			});
		} else {
			this.collection.deleteOne(query, (err, obj) => {
				if (err) {
					return reject(err);
				}

				resolve(obj);
			});
		}
	});
};

Mongy.prototype.update = function (query, data, options) {
	return new Promise(async (resolve, reject) => {
		if (!this.client) {
			return reject(new Error('Not connected to any server!'));
		}
		if (!this.db) {
			return reject(new Error('Not connected to any database!'));
		}
		if (!this.collection) {
			return reject(new Error('No collection was selected!'));
		}

		if (options && options.many) {
			this.collection.updateMany(query, {$set: data}, (err, res) => {
				if (err) {
					return reject(err);
				}

				resolve(res);
			});
		} else {
			this.collection.updateOne(query, {$set: data}, (err, res) => {
				if (err) {
					return reject(err);
				}

				resolve(res);
			});
		}
	});
};

module.exports = Mongy;
