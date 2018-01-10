# mongy [![Build Status](https://travis-ci.org/dusansimic/mongy.svg?branch=master)](https://travis-ci.org/dusansimic/mongy)
> A small MongoDB driver wrapper

Mongy is a small wrapper that uses promises instead of callbacks. It's a much neater way to write code. The goal of mongy is to make use of MongoDB driver as simple as possible. Mongy is not using all functionalities of MongoDB driver but if you have an idea you are free to contribute or open an issue regarding your idea.

## Install
``` bash
$ npm install --save mongy
$ # or with yarn
$ yarn add mongy
```

## Usage
Here are some examples of code that can be used.

### Require exmaple
```js
const Mongy = require('mongy');
const mongy = new Mongy();
```

### Connect example
```js
mongy.connect('mongodb://localhost:27017');
```

### Disconnect example
```js
mongy.disconnect();
```

### Select database example
```js
mongy.selectDatabase('testdb');
```

### Select collection example
```js
mongy.selectCollection('testcollection');
```

### Find example
```js
mongy.find({}).then(docs => {
	console.log(docs);
});

// And with projection

mongy.find({}, {_id: 0, name: 1}).then(docs => {
	console.log(docs);
});
```

### Insert example
```js
mongy.insert({name: 'Elliot'});

// Or many

mongy.insert([name: 'Darlene', name: 'Angela']);
```

### Delete example
```js
mongy.delete({name: 'Elliot'});

// Or many

mongy.delete({name: 'Mr. Robot'}, {many: true});
```

### Update example
```js
mongy.update({name: 'Elliot'}, {name: 'Mr. Robot'});

// Or many

mongy.update({name: 'Mr. Robot'}, {name: 'Elliot'}, {many: true});
```

## License
MIT © [Dušan Simić](http://dusansimic.cf)