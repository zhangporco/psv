'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Base2 = require('./Base');

var _Base3 = _interopRequireDefault(_Base2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * String 校验
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var PString = function (_Base) {
	_inherits(PString, _Base);

	function PString() {
		_classCallCheck(this, PString);

		var _this = _possibleConstructorReturn(this, (PString.__proto__ || Object.getPrototypeOf(PString)).call(this, {
			type: '不是 String',
			required: '必填，不能为空',
			max: '超过最大长度',
			min: '低于最小长度',
			enum: '不在枚举中',
			regex: '违背正则表达式',
			pattern: '违背正则表达式'
		}));

		_this.error = [];
		return _this;
	}

	/**
  * String 校验入口
  * @param schema
  * @param data
  * @param key
  * @returns {Array}
  */


	_createClass(PString, [{
		key: 'validate',
		value: function validate(schema, data, key) {
			if (data[key] === undefined || data[key] === null) {
				data[key] = schema[key].default ? schema[key].default : data[key];
			} else if (schema[key].trim) {
				data[key] = data[key].replace(/^\s+|\s+$/g, '');
			}

			if (!schema[key].required && (data[key] === undefined || data[key] === null)) return this.error;

			if (!this.required(schema, data, key)) return this.error;
			if (!this.isString(schema, data, key)) return this.error;

			this.max(schema, data, key);
			this.min(schema, data, key);
			this.enum(schema, data, key);
			this.regex(schema, data, key);
			return this.error;
		}

		/**
   * 必填 校验
   * @param schema
   * @param data
   * @param key
   * @returns {boolean}
   */

	}, {
		key: 'required',
		value: function required(schema, data, key) {
			if (schema[key].required) {
				if (data[key] === undefined || data[key] === null) {
					this.error.push(this.getError(schema, key, 'required'));
					return false;
				}
			}
			return true;
		}

		/**
   * 是否为 String 校验
   * @param schema
   * @param data
   * @param key
   * @returns {boolean}
   */

	}, {
		key: 'isString',
		value: function isString(schema, data, key) {
			if (typeof data[key] !== 'string') {
				this.error.push(this.getError(schema, key, 'type'));
				return false;
			}
			return true;
		}

		/**
   * 最大长度 校验
   * @param schema
   * @param data
   * @param key
   * @returns {boolean}
   */

	}, {
		key: 'max',
		value: function max(schema, data, key) {
			if (Number.isFinite(schema[key].max)) {
				if (data[key].length > schema[key].max) {
					this.error.push(this.getError(schema, key, 'max'));
					return false;
				}
			}
			return true;
		}

		/**
   * 最小长度校验
   * @param schema
   * @param data
   * @param key
   * @returns {boolean}
   */

	}, {
		key: 'min',
		value: function min(schema, data, key) {
			if (Number.isFinite(schema[key].min)) {
				if (data[key].length < schema[key].min) {
					this.error.push(this.getError(schema, key, 'min'));
					return false;
				}
			}
			return true;
		}

		/**
   * 枚举校验
   * @param schema
   * @param data
   * @param key
   * @returns {boolean}
   */

	}, {
		key: 'enum',
		value: function _enum(schema, data, key) {
			if (Array.isArray(schema[key].enum)) {
				if (schema[key].enum.indexOf(data[key]) < 0) {
					this.error.push(this.getError(schema, key, 'enum'));
					return false;
				}
			}
			return true;
		}

		/**
   * 正则表达式 校验
   * regex 拥有最高优先级
   * pattern - 不推荐使用
   * @param schema
   * @param data
   * @param key
   * @returns {boolean}
   */

	}, {
		key: 'regex',
		value: function regex(schema, data, key) {
			if (typeof schema[key].regex === 'string') {
				if (!new RegExp(schema[key].regex).test(data[key])) {
					this.error.push(this.getError(schema, key, 'regex'));
					return false;
				}
			} else if (typeof schema[key].pattern === 'string') {
				if (!new RegExp(schema[key].pattern).test(data[key])) {
					this.error.push(this.getError(schema, key, 'regex'));
					return false;
				}
			}
			return true;
		}
	}]);

	return PString;
}(_Base3.default);

exports.default = PString;