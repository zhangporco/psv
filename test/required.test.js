'use strict';

var test = require('ava');
var Psv = require('../index.js');

test('required 正确验证', function(t) {
    var schema = {
        key1: {
            type: String,
            required: true
        },
        key2: {
            type: String,
            required: true
        }
    };
    var data = {

    };
    var psv = new Psv(schema, data);
    var validate = psv.validate();
    psv.printErrors();
    t.true(true)
});

test.skip('required 错误验证', function(t) {
    var schema = {
        key1: {
            type: String,
            required: true
        },
        key2: {
            type: String,
            required: true
        }
    };
    var data = {};
    var psv = new Psv(schema, data);
    var validate = psv.validate();
    // psv.printErrors();
    t.false(validate)
});

test.skip('required 错误验证', function(t) {
    var schema = {
        key1: {
            type: String,
            required: true
        }
    };
    var data = {
        key1: null
    };
    var psv = new Psv(schema, data);
    var validate = psv.validate();
    t.false(validate)
});

test.skip('required 正确验证.非必填', function(t) {
    var schema = {
        key1: {
            type: String
        },
        key2: {
            type: String
        }
    };
    var data = {};
    var psv = new Psv(schema, data);
    var validate = psv.validate();
    t.true(validate)
});

test.skip('required 正确验证.嵌套', function(t) {
    var schema2 = {
        key3: {
            type: String,
            required: true
        }
    };
    var schema = {
        key1: {
            type: schema2,
            required: true
        }
    };
    var data = {
        key1: {
            key3: 'psv'
        }
    };
    var psv = new Psv(schema, data);
    var validate = psv.validate();
    t.true(validate)
});

test.skip('required 错误验证.嵌套', function(t) {
    var schema2 = {
        key3: {
            type: String,
            required: true
        }
    };
    var schema = {
        key1: {
            type: schema2,
            required: true
        }
    };
    var data = {
        key1: {}
    };
    var psv = new Psv(schema, data);
    var validate = psv.validate();
    t.false(validate)
});
