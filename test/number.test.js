var assert = require('assert');
var Psv = require('../index.js');

describe('psv number 验证', function() {
    it('正确验证', function() {
        const schema = {
            key1: {
                type: Number,
                max: 5,
                min: 3,
                required: true
            }
        };
        const data = {
            key1: 3,
        }
        const psv = new Psv(schema, data);
        const validate = psv.validate();
        assert.ok(validate);
    });

    it('错误验证', function() {
        const schema = {
            key1: {
                type: Number,
                max: 5,
                min: 3,
                required: true
            },
        };
        const data = {
            key1: 1,
        }
        const psv = new Psv(schema, data);
        const validate = psv.validate();
        assert.ok(!validate);
    });

    it('正确验证.嵌套', function() {
        const schema2 = {
            key3: {
                type: Number,
                required: true
            }
        }
        const schema = {
            key1: {
                type: schema2,
                required: true
            },
        };
        const data = {
            key1: {
                key3: 1
            },
        }
        const psv = new Psv(schema, data);
        const validate = psv.validate();
        assert.ok(validate);
    });

    it('错误验证.嵌套', function() {
        const schema2 = {
            key3: {
                type: String,
                required: true
            }
        }
        const schema = {
            key1: {
                type: schema2,
                required: true
            },
        };
        const data = {
            key1: {
                key3: 1
            },
        }
        const psv = new Psv(schema, data);
        const validate = psv.validate();
        assert.ok(!validate);
    });
});
