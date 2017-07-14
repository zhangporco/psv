var expect = require('chai').expect;
var Psv = require('../index.js');

describe('psv object 验证', function() {
    it('正确验证', function() {
        const schema = {
            key1: {
                type: Object,
                required: true
            }
        };
        const data = {
            key1: null,
        }
        const psv = new Psv(schema, data);
        const validate = psv.validate();
        expect(validate).to.be.ok;
    });

    it('正确验证', function() {
        const schema = {
            key1: {
                type: Object,
                required: true
            }
        };
        const data = {
            key1: 1213,
        }
        const psv = new Psv(schema, data);
        const validate = psv.validate();
        expect(validate).to.be.ok;
    });



    it('正确验证.嵌套', function() {
        const schema2 = {
            key3: {
                type: Object,
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
});
