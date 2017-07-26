'use strict';

var test = require('ava');
var Psv = require('../index.js');

test('object 正确验证', function(t) {
    const schema = {
        key1: {
            type: Object,
            required: true
        }
    };
    const data = {
        key1: null
    };
    const psv = new Psv(schema, data);
    const validate = psv.validate();
    t.true(validate)
});

test('object 正确验证', function(t) {
    const schema = {
        key1: {
            type: Object,
            required: true
        }
    };
    const data = {
        key1: 1213
    };
    const psv = new Psv(schema, data);
    const validate = psv.validate();
    t.true(validate)
});

test('object 正确验证.嵌套', function(t) {
    const schema2 = {
        key3: {
            type: Object,
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
            key3: 'psv'
        }
    };
    const psv = new Psv(schema, data);
    const validate = psv.validate();
    t.true(validate)
});
