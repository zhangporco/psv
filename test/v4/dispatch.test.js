import test from 'ava';
import Psv from '../../src/Psv';

test('dispatch 验证', function (t) {
	const schema1 = {
		str: {
			type: String,
			required: true,
			max: 3,
			min: 2,
			enum: ['12', '13', '14'],
			regex: '^[8-9]*$',
			pattern: '^[5-9]*$',
			error: {
				max: '不能超过 max',
				enum: 'enum 必须正确',
			}
		},
	};
	const schema = {
		key1: {
			type: schema1,
			required: true
		},
	};
	const data = {
		key1: {
			str: '5667'
		},
	};
	const psv = new Psv(schema, data);
	const validate = psv.validate();
	psv.printErrors();
	t.pass(validate)
});