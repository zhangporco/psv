import test from 'ava';
import Index from '../src/index';

test('required 正确验证', function (t) {
	var schema = {
		key1: {
			type: String,
			required: true
		},
		key2: {
			type: String,
			required: true
		}
	};
	var data = {
		key1: '1',
		key2: '1'
	};
	var psv = new Index(schema, data);
	var validate = psv.validate();
	t.true(validate)
});

test('required 错误验证', function (t) {
	var schema = {
		key1: {
			type: String,
			required: true,
			errorText: 'key1 必填'
		},
		key2: {
			type: String,
			required: true
		}
	};
	var data = {};
	var psv = new Index(schema, data);
	var validate = psv.validate();
	// psv.printErrors();
	t.false(validate)
});

test('required 错误验证 null', function (t) {
	var schema = {
		key1: {
			type: String,
			required: true
		}
	};
	var data = {
		key1: null
	};
	var psv = new Index(schema, data);
	var validate = psv.validate();
	// psv.printErrors();
	t.false(validate)
});

test('required 错误验证 空字符', function (t) {
	var schema = {
		key1: {
			type: String,
			required: true
		}
	};
	var data = {
		key1: ''
	};
	var psv = new Index(schema, data);
	var validate = psv.validate();
	t.true(validate)
});

test('required 正确验证.非必填', function (t) {
	var schema = {
		key1: {
			type: String
		},
		key2: {
			type: String
		}
	};
	var data = {
		key1: ''
	};
	var psv = new Index(schema, data);
	var validate = psv.validate();
	psv.printErrors();
	t.true(validate)
});

test('required 正确验证.嵌套', function (t) {
	var schema2 = {
		key3: {
			type: String,
			required: true
		}
	};
	var schema = {
		key1: {
			type: schema2,
			required: true
		}
	};
	var data = {
		key1: {
			key3: 'psv'
		}
	};
	var psv = new Index(schema, data);
	var validate = psv.validate();
	t.true(validate)
});

test('required 错误验证.嵌套', function (t) {
	var schema2 = {
		key3: {
			type: String,
			required: true
		}
	};
	var schema = {
		key1: {
			type: schema2,
			required: true
		}
	};
	var data = {
		key1: {}
	};
	var psv = new Index(schema, data);
	var validate = psv.validate();
	t.false(validate)
});
