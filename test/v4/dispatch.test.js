import test from 'ava';
import Psv from '../../src/Psv';

test('dispatch 验证', function (t) {
	const array2 = {
		phone: {
			type: String,
			required: true,
			regex: '^[1][3,4,5,7,8][0-9]{9}$',
		},
		roles: {
			type: Array,
			required: true,
		},
	};
	const schema = {
		array: {
			type: [array2],
			required: true
		},
	};
	const data = {
		array: [
			{
				phone: 'x111',
				roles: []
			},
		],
	};
	const psv = new Psv(schema, data);
	const validate = psv.validate();
	psv.printErrors();
	t.pass(validate)
});