'use strict';

var test = require('ava');
var Psv = require('../index.js');

test('array 正确验证', function(t) {
    const schema = {
        key1: {
            type: [Number],
            max: 5,
            min: 3,
            required: true
        }
    };
    const data = {
        key1: [1,2,3]
    };
    const psv = new Psv(schema, data);
    const validate = psv.validate();
    t.true(validate);
});

test('array 正确验证2', function(t) {
    const schema = {
        array: {
            type: Array,
            max: 5,
            min: 3,
            required: true
        }
    };
    const data = {
        array: [1, '1', true, {}]
    };
    const psv = new Psv(schema, data);
    const validate = psv.validate();
    t.true(validate);
});

test('array 错误验证', function(t) {
    const schema = {
        key1: {
            type: [Number],
            max: 5,
            min: 3,
            required: true
        }
    };
    const data = {
        key1: [1]
    };
    const psv = new Psv(schema, data);
    const validate = psv.validate();
    // psv.printErrors();
    t.false(validate);
});

test('array 错误验证2', function(t) {
    const schema = {
        key1: {
            type: [Number],
            max: 5,
            min: 3,
            required: true
        }
    };
    const data = {
        key1: [1, 2, 3, 4, 5, 6]
    };
    const psv = new Psv(schema, data);
    const validate = psv.validate();
    t.false(validate);
});

test('array 正确验证.嵌套', function(t) {
    const schema2 = {
        key3: {
            type: [],
            required: true
        }
    };
    const schema = {
        key1: {
            type: schema2,
            required: true
        }
    };
    const data = {
        key1: {
            key3: []
        }
    };
    const psv = new Psv(schema, data);
    const validate = psv.validate();
    t.true(validate);
});

test('array 错误验证.嵌套', function(t) {
    const schema2 = {
        key3: {
            type: [Number],
            required: true
        }
    };
    const schema = {
        key1: {
            type: schema2,
            required: true
        }
    };
    const data = {
        key1: {
            key3: 1
        }
    };
    const psv = new Psv(schema, data);
    const validate = psv.validate();
    // psv.printErrors();
    t.false(validate);
});

test('array 对象.嵌套', function(t) {
    const schema2 = {
        str: {
            type: String,
            required: true
        },
        num: {
            type: Number,
            required: true
        }
    };
    const schema = {
        key: {
            type: [schema2],
            required: true
        }
    };
    const data = {
        key: [
            {str: '1', num: 0},
            {str: '1', num: 0}
        ]
    };
    const psv = new Psv(schema, data);
    const validate = psv.validate();
    t.true(validate);
});

test('array 对象.嵌套.错误', function(t) {
    const schema = {
        key: {
            type: [Number],
            required: true
        }
    };
    const data = {
        key: [
            {str: '1', num: 0},
            {str: '1', num: 0}
        ]
    };
    const psv = new Psv(schema, data);
    const validate = psv.validate();
    // psv.printErrors();
    t.false(validate);
});
