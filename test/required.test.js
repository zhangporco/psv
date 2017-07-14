var expect = require('chai').expect;
var Psv = require('../index.js');

describe('psv required 验证', function() {
    it('正确验证', function() {
        const schema = {
            key1: {
                type: String,
                required: true
            },
            key2: {
                type: String,
                required: true
            },
        };
        const data = {
            key1: 'psv',
            key2: 'psv',
        }
        const psv = new Psv(schema, data);
        const validate = psv.validate();
        expect(validate).to.be.ok;
    });

    it('错误验证', function() {
        const schema = {
            key1: {
                type: String,
                required: true
            },
            key2: {
                type: String,
                required: true
            },
        };
        const data = {}
        const psv = new Psv(schema, data);
        const validate = psv.validate();
        // psv.printErrors();
        expect(validate).to.not.be.ok;
    });

    it('正确验证.非必填', function() {
        const schema = {
            key1: {
                type: String,
            },
            key2: {
                type: String,
            },
        };
        const data = {}
        const psv = new Psv(schema, data);
        const validate = psv.validate();
        expect(validate).to.be.ok;
    });

    it('正确验证.嵌套', function() {
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
                key3: 'psv'
            },
        }
        const psv = new Psv(schema, data);
        const validate = psv.validate();
        expect(validate).to.be.ok;
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
            key1: {},
        }
        const psv = new Psv(schema, data);
        const validate = psv.validate();
        expect(validate).to.not.be.ok;
    });
});
