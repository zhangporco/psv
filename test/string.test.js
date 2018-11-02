import test from 'ava';
import Psv from '../src/Psv';

test('string 正确验证', function (t) {
	const schema = {
		key1: {
			type: String,
			max: 5,
			min: 3,
			required: true
		}
	};
	const data = {
		key1: 'psv'
	};
	const psv = new Psv(schema, data);
	const validate = psv.validate();
	t.true(validate)
});

test('string 错误验证', function (t) {
	const schema = {
		key1: {
			type: String,
			required: true
		}
	};
	const data = {
		key1: 1
	};
	const psv = new Psv(schema, data);
	const validate = psv.validate();
	// psv.printErrors();
	t.false(validate)
});

test('string 错误验证--大于最大长度', function (t) {
	const schema = {
		key1: {
			type: String,
			max: 5,
			min: 3,
			required: true
		}
	};
	const data = {
		key1: '123456'
	};
	const psv = new Psv(schema, data);
	const validate = psv.validate();
	t.false(validate)
});

test('string 错误验证--小于最小长度', function (t) {
	const schema = {
		key1: {
			type: String,
			max: 5,
			min: 3,
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

test('string pattern 正确验证', function (t) {
	const schema = {
		key1: {
			type: String,
			max: 5,
			min: 3,
			pattern: '^[0-9]*$',
			required: true
		}
	};
	const data = {
		key1: '1234'
	};
	const psv = new Psv(schema, data);
	const validate = psv.validate();
	t.true(validate)
});

test('string pattern 错误验证', function (t) {
	const schema = {
		key1: {
			type: String,
			max: 5,
			min: 3,
			pattern: '^[0-9]*$',
			required: true
		}
	};
	const data = {
		key1: 'psv'
	};
	const psv = new Psv(schema, data);
	const validate = psv.validate();
	t.false(validate)
});

test('string 正确验证.非必填', function (t) {
	const schema = {
		key1: {
			type: String
		},
		key2: {
			type: String
		}
	};
	const data = {};
	const psv = new Psv(schema, data);
	const validate = psv.validate();
	t.true(validate)
});

test('string 正确验证.嵌套', function (t) {
	const schema2 = {
		key3: {
			type: String,
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
			key3: 'psv'
		}
	};
	const psv = new Psv(schema, data);
	const validate = psv.validate();
	t.true(validate)
});

test('string 错误验证.嵌套', function (t) {
	const schema2 = {
		key3: {
			type: String,
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
			key3: 2
		}
	};
	const psv = new Psv(schema, data);
	const validate = psv.validate();
	t.false(validate)
});

test('string 正确验证.枚举', function (t) {
	const schema = {
		enum: {
			type: String,
			enum: [ '1', '2', '3' ],
			required: true
		}
	};
	const data = {
		enum: '1'
	};
	const psv = new Psv(schema, data);
	const validate = psv.validate();
	t.true(validate)
});

test('string 错误验证.枚举', function (t) {
	const schema = {
		enum: {
			type: String,
			enum: [ '1', '2', '3' ],
			required: true
		}
	};
	const data = {
		enum: 'w'
	};
	const psv = new Psv(schema, data);
	const validate = psv.validate();
	t.false(validate)
});
