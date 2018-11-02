import test from 'ava';
import Psv from '../src/Psv';

test('number 正确验证', function (t) {
	const schema = {
		key1: {
			type: Number,
			max: 5,
			min: 3,
			required: true
		}
	};
	const data = {
		key1: 3
	};
	const psv = new Psv(schema, data);
	const validate = psv.validate();
	t.true(validate)
});

test('number 错误验证.非 number', function (t) {
	const schema = {
		key1: {
			type: Number,
			required: true
		}
	};
	const data = {
		key1: '1'
	};
	const psv = new Psv(schema, data);
	const validate = psv.validate();
	t.false(validate)
});

test('number 错误验证.小于最小值', function (t) {
	const schema = {
		key1: {
			type: Number,
			max: 5,
			min: 3,
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

test('number 错误验证.大于最大值', function (t) {
	const schema = {
		key1: {
			type: Number,
			max: 5,
			min: 3,
			required: true
		}
	};
	const data = {
		key1: 6
	};
	const psv = new Psv(schema, data);
	const validate = psv.validate();
	t.false(validate)
});

test('number 正确验证.嵌套', function (t) {
	const schema2 = {
		key3: {
			type: Number,
			required: true
		}
	};
	const schema = {
		key1: {
			type: schema2,
			required: true
		}
	};
	const data = {
		key1: {
			key3: 1
		}
	};
	const psv = new Psv(schema, data);
	const validate = psv.validate();
	t.true(validate)
});

test('number 错误验证.嵌套', function (t) {
	const schema2 = {
		key3: {
			type: Number,
			required: true
		}
	};
	const schema = {
		key1: {
			type: schema2,
			required: true
		}
	};
	const data = {
		key1: {
			key3: '1'
		}
	};
	const psv = new Psv(schema, data);
	const validate = psv.validate();
	t.false(validate)
});

test('number 正确验证.枚举', function (t) {
	const schema = {
		enum: {
			type: Number,
			enum: [ 1, 2, 3 ],
			required: true
		}
	};
	const data = {
		enum: 3
	};
	const psv = new Psv(schema, data);
	const validate = psv.validate();
	t.true(validate)
});

test('number 错误验证.枚举', function (t) {
	const schema = {
		enum: {
			type: Number,
			enum: [ 1, 2, 3 ],
			required: true
		}
	};
	const data = {
		enum: 4
	};
	const psv = new Psv(schema, data);
	const validate = psv.validate();
	t.false(validate)
});
