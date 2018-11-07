import test from 'ava';
import Psv from '../src/Psv';

test('boolean 正确测试', function (t) {
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

test('boolean 错误测试', function (t) {
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

test('boolean default 正确', function (t) {
	const schema = {
		key1: {
			type: Boolean,
			default: true,
		}
	};
	const data = {
	
	};
	const psv = new Psv(schema, data);
	const validate = psv.validate();
	t.is(data.key1, true)
});

test('boolean default 嵌套 正确', function (t) {
	const schema2 = {
		boo: {
			type: Boolean,
			default: true,
		}
	};
	const schema = {
		key1: {
			type: schema2,
			default: {
				boo: false
			}
		}
	};
	const data = {

	};
	const psv = new Psv(schema, data);
	const validate = psv.validate();
	t.pass(data.key1.boo, false);
});
