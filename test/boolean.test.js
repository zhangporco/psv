'use strict';

var test = require('ava');
var Psv = require('../index.js');

test('boolean 正确测试', function(t) {
    const schema = {
        key1: {
            type: Boolean,
            required: true
        }
    };
    const data = {
        key1: true
    };
    const psv = new Psv(schema, data);
    const validate = psv.validate();
    t.true(validate)
});

test('boolean 错误测试', function(t) {
    const schema = {
        key1: {
            type: Boolean,
            required: true
        }
    };
    const data = {
        key1: 1
    };
    const psv = new Psv(schema, data);
    const validate = psv.validate();
    t.false(validate)
});
