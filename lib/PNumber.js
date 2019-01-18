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
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Number 校验
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var PNumber = function (_Base) {
	_inherits(PNumber, _Base);

	function PNumber() {
		_classCallCheck(this, PNumber);

		var _this = _possibleConstructorReturn(this, (PNumber.__proto__ || Object.getPrototypeOf(PNumber)).call(this, {
			type: '不是 Number',
			required: '必填，不能为空',
			max: '超过最大值',
			min: '低于最小值',
			enum: '不在枚举中'
		}));

		_this.error = [];
		return _this;
	}

	/**
  * Number 类型校验入口
  * @param schema
  * @param data
  * @param key
  * @returns {Array}
  */


	_createClass(PNumber, [{
		key: 'validate',
		value: function validate(schema, data, key) {
			if (data[key] === undefined || data[key] === null) {
				data[key] = schema[key].default ? schema[key].default : data[key];
			}

			if (!schema[key].required && (data[key] === undefined || data[key] === null)) return this.error;

			if (!this.required(schema, data, key)) return this.error;
			if (!this.isNumber(schema, data, key)) return this.error;

			this.max(schema, data, key);
			this.min(schema, data, key);
			this.enum(schema, data, key);

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
   * 是否为 Number
   * @param schema
   * @param data
   * @param key
   * @returns {boolean}
   */

	}, {
		key: 'isNumber',
		value: function isNumber(schema, data, key) {
			if (!Number.isFinite(data[key])) {
				this.error.push(this.getError(schema, key, 'type'));
				return false;
			}
			return true;
		}

		/**
   * 最大值 校验
   * @param schema
   * @param data
   * @param key
   * @returns {boolean}
   */

	}, {
		key: 'max',
		value: function max(schema, data, key) {
			if (Number.isFinite(schema[key].max)) {
				if (data[key] > schema[key].max) {
					this.error.push(this.getError(schema, key, 'max'));
					return false;
				}
			}
			return true;
		}

		/**
   * 最小值 校验
   * @param schema
   * @param data
   * @param key
   * @returns {boolean}
   */

	}, {
		key: 'min',
		value: function min(schema, data, key) {
			if (Number.isFinite(schema[key].min)) {
				if (data[key] < schema[key].min) {
					this.error.push(this.getError(schema, key, 'min'));
					return false;
				}
			}
			return true;
		}

		/**
   *  枚举 校验
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
	}]);

	return PNumber;
}(_Base3.default);

exports.default = PNumber;