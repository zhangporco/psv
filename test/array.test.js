'use strict';

var test = require('ava');
var Psv = require('../index.js');

test('array 正确验证', function(t) {
    const schema = {
        key1: {
            type: Array,
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

test('array 错误验证', function(t) {
    const schema = {
        key1: {
            type: Array,
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
    t.false(validate);
});

test('array 正确验证.嵌套', function(t) {
    const schema2 = {
        key3: {
            type: Array,
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
            type: Array,
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
