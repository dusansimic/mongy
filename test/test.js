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

test.serial('Constructor test', t => {
	t.notThrows(() => new Mongy(dbUrl, dbName, collectionName));
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

test.serial('Insert one test', async t => {
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

test.serial('Insert many test', async t => {
	const mongy = new Mongy();
	await t.notThrows(mongy.connect(dbUrl));
	await t.notThrows(mongy.selectDatabase(dbName));
	await t.notThrows(mongy.selectCollection(collectionName));
	await t.notThrows(mongy.insert([{foo: 'bar', no: 1}, {fizz: 'buzz', no: 1}]));
	await t.notThrows(mongy.disconnect());
});

test.serial('Delete many test', async t => {
	const mongy = new Mongy();
	await t.notThrows(mongy.connect(dbUrl));
	await t.notThrows(mongy.selectDatabase(dbName));
	await t.notThrows(mongy.selectCollection(collectionName));
	await t.notThrows(mongy.delete({no: 1}, {many: true}));
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

test.serial('Update one test', async t => {
	const mongy = new Mongy();
	await t.notThrows(mongy.connect(dbUrl));
	await t.notThrows(mongy.selectDatabase(dbName));
	await t.notThrows(mongy.selectCollection(collectionName));
	await t.notThrows(mongy.insert({fizz: 'buzz'}));
	await t.notThrows(mongy.update({fizz: 'buzz'}, {fizz: 'zap'}));
	await t.notThrows(mongy.delete({fizz: 'zap'}));
	await t.notThrows(mongy.disconnect());
});

test.serial('Update many test', async t => {
	const mongy = new Mongy();
	await t.notThrows(mongy.connect(dbUrl));
	await t.notThrows(mongy.selectDatabase(dbName));
	await t.notThrows(mongy.selectCollection(collectionName));
	await t.notThrows(mongy.insert([{fizz: 'bazz', no: 1}, {fizz: 'buzz', no: 1}]));
	await t.notThrows(mongy.update({no: 1}, {fizz: 'zap'}, {many: true}));
	await t.notThrows(mongy.find({}).then(docs => {
		t.is(docs.length, 2);
		t.is(docs[0].fizz, 'zap');
		t.is(docs[1].fizz, 'zap');
	}));
	await t.notThrows(mongy.delete({fizz: 'zap'}, {many: true}));
	await t.notThrows(mongy.disconnect());
});
