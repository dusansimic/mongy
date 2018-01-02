import test from 'ava';
import Mongy from '..';

const dbUrl = 'mongodb://localhost:27017';
const dbName = 'test';
const collectionName = 'test';

test.serial('Mongy is a class', t => {
	const mongy = new Mongy();
	t.is(mongy instanceof constructor, true);
	t.notThrows(() => new Mongy());
});

test.serial('Connect/Disconnect test', async t => {
	const mongy = new Mongy();
	await t.notThrows(mongy.connect(dbUrl));
	await t.notThrows(mongy.disconnect());
});

test.serial('Database test', async t => {
	const mongy = new Mongy();
	await t.notThrows(mongy.connect(dbUrl));
	await t.notThrows(mongy.selectDatabase(dbName));
	await t.notThrows(mongy.disconnect());
});

test.serial('Collection test', async t => {
	const mongy = new Mongy();
	await t.notThrows(mongy.connect(dbUrl));
	await t.notThrows(mongy.selectDatabase(dbName));
	await t.notThrows(mongy.selectCollection(collectionName));
	await t.notThrows(mongy.disconnect());
});

test.serial('Find test', async t => {
	const mongy = new Mongy();
	await t.notThrows(mongy.connect(dbUrl));
	await t.notThrows(mongy.selectDatabase(dbName));
	await t.notThrows(mongy.selectCollection(collectionName));
	await t.notThrows(mongy.find({}).then(docs => {
		t.deepEqual(docs, []);
	}));
	await t.notThrows(mongy.disconnect());
});

test.serial('Insert test', async t => {
	const mongy = new Mongy();
	await t.notThrows(mongy.connect(dbUrl));
	await t.notThrows(mongy.selectDatabase(dbName));
	await t.notThrows(mongy.selectCollection(collectionName));
	await t.notThrows(mongy.insert({foo: 'bar'}));
	await t.notThrows(mongy.disconnect());
});

test.serial('Delete test', async t => {
	const mongy = new Mongy();
	await t.notThrows(mongy.connect(dbUrl));
	await t.notThrows(mongy.selectDatabase(dbName));
	await t.notThrows(mongy.selectCollection(collectionName));
	await t.notThrows(mongy.delete({foo: 'bar'}));
	await t.notThrows(mongy.disconnect());
});

test.serial('Update test', async t => {
	const mongy = new Mongy();
	await t.notThrows(mongy.connect(dbUrl));
	await t.notThrows(mongy.selectDatabase(dbName));
	await t.notThrows(mongy.selectCollection(collectionName));
	await t.notThrows(mongy.insert({fizz: 'buzz'}));
	await t.notThrows(mongy.update({fizz: 'buzz'}, {fizz: 'zap'}));
	await t.notThrows(mongy.delete({fizz: 'zap'}));
	await t.notThrows(mongy.disconnect());
});
