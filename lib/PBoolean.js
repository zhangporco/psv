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
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Boolean 校验
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var PBoolean = function (_Base) {
	_inherits(PBoolean, _Base);

	function PBoolean() {
		_classCallCheck(this, PBoolean);

		var _this = _possibleConstructorReturn(this, (PBoolean.__proto__ || Object.getPrototypeOf(PBoolean)).call(this, {
			type: '不是 Boolean',
			required: '必填，不能为空'
		}));

		_this.error = [];
		return _this;
	}

	_createClass(PBoolean, [{
		key: 'validate',
		value: function validate(schema, data, key) {
			if (data[key] === undefined || data[key] === null) {
				data[key] = schema[key].default ? schema[key].default : data[key];
			}
			if (!schema[key].required && (data[key] === undefined || data[key] === null)) return this.error;

			if (!this.required(schema, data, key)) return this.error;
			if (!this.isBoolean(schema, data, key)) return this.error;

			return this.error;
		}
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
	}, {
		key: 'isBoolean',
		value: function isBoolean(schema, data, key) {
			if (typeof data[key] !== 'boolean') {
				this.error.push(this.getError(schema, key, 'type'));
				return false;
			}
			return true;
		}
	}]);

	return PBoolean;
}(_Base3.default);

exports.default = PBoolean;