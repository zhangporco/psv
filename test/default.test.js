import test from 'ava';
import Psv from '../src/Psv';

test('default string 正确验证', function (t) {
	const schema = {
		key1: {
			type: String,
			default: '123',
		}
	};
	const data = {
		key1: undefined,
	};
	const psv = new Psv(schema, data);
	const res = psv.validate();
	t.is(data.key1, '123');
});

test('default string 正确 嵌套 验证', function (t) {
	const schema2 = {
		str2: {
			type: String,
			default: '1111',
		}
	};
	const schema = {
		str: {
			type: schema2,
			max: 5,
			min: 3,
			required: true,
		}
	};
	const data = {
		str: {
		
		},
	};
	const psv = new Psv(schema, data);
	const res = psv.validate();
	t.is(data.str.str2, '1111');
});
