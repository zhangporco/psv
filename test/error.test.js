'use strict';

var test = require('ava');
var Psv = require('../index.js');

test('error 对象验证', function(t) {
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
        key1: 'psv'
    };
    var psv = new Psv(schema, data);
    var validate = psv.validate();
    if (!validate) {
        const errors = psv.getErrors();
        // psv.printErrors();
        t.true(errors.length > 0);
    }
});
