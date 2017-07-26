var assert = require('assert');
var Psv = require('../index.js');

describe('psv required 验证', function() {
    it('正确验证', function() {
        var schema = {
            key1: {
                type: String,
                required: true
            },
            key2: {
                type: String,
                required: true
            },
        };
        var data = {
            key1: 'psv',
            key2: 'psv',
        }
        var psv = new Psv(schema, data);
        var validate = psv.validate();
        assert.ok(validate);
    });

    it('错误验证', function() {
        var schema = {
            key1: {
                type: String,
                required: true
            },
            key2: {
                type: String,
                required: true
            },
        };
        var data = {}
        var psv = new Psv(schema, data);
        var validate = psv.validate();
        // psv.printErrors();
        assert.ok(!validate);
    });

    it('正确验证.非必填', function() {
        var schema = {
            key1: {
                type: String,
            },
            key2: {
                type: String,
            },
        };
        var data = {}
        var psv = new Psv(schema, data);
        var validate = psv.validate();
        assert.ok(validate);
    });

    it('正确验证.嵌套', function() {
        var schema2 = {
            key3: {
                type: String,
                required: true
            }
        }
        var schema = {
            key1: {
                type: schema2,
                required: true
            },
        };
        var data = {
            key1: {
                key3: 'psv'
            },
        }
        var psv = new Psv(schema, data);
        var validate = psv.validate();
        assert.ok(validate);
    });

    it('错误验证.嵌套', function() {
        var schema2 = {
            key3: {
                type: String,
                required: true
            }
        }
        var schema = {
            key1: {
                type: schema2,
                required: true
            },
        };
        var data = {
            key1: {},
        }
        var psv = new Psv(schema, data);
        var validate = psv.validate();
        assert.ok(!validate);
    });
});
