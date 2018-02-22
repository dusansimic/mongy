const MongoClient = require('mongodb').MongoClient;

/**
 * MongoDB wrapper
 * @param {String} [url] Url of the database
 * @param {String} [databaseName] Database name
 * @param {String} [collectionName] Collection name
 */
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

/**
 * Connect to database
 * @param {String} url Url of the database
 */
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

/**
 * Select a database
 * @param {String} databaseName Database name
 */
Mongy.prototype.selectDatabase = function (databaseName) {
	return new Promise(async (resolve, reject) => {
		if (!this.client) {
			return reject(new Error('Not connected to any server!'));
		}

		this.db = await this.client.db(databaseName);
		resolve();
	});
};

/**
 * Select a collection
 * @param {String} collectionName Collection name
 */
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

/**
 * Disconnect / close connection
 */
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

/**
 * Find document in collection
 * @param {Object} query Query object
 * @param {Object} [projection] Projection object
 */
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

/**
 * Insert data into collection
 * @param {Object} data Data object
 */
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

/**
 * Remove document from collection
 * @param {Object} query Query object
 * @param {Object} [options] Options object
 * @param {Boolean} [options.many] Apply query on multiple documents
 */
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

/**
 * Update document in collection
 * @param {Object} query Query object
 * @param {Object} data Data object
 * @param {Object} [options] Options object
 * @param {String} [options.many] Apply query on multiple documents
 */
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
