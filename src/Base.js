/**
 * 提供基础功能
 */
export default class Base {
	constructor(v) {
		this.defaultError = v;
	}

	/**
	 * 必填 校验
	 * @param schema
	 * @param data
	 * @param key
	 * @returns {boolean}
	 */
	 required(schema, data, key) {
		if (schema[key].required) {
			if (data[key] === undefined || data[key] === null) {
				this.error.push(this.getError(schema, key, 'required'));
				return false;
			}
		}
		return true;
	}
	
	
	/**
	 * 获取错误提示信息，若不传会使用默认值
	 * @param schema
	 * @param key
	 * @param type
	 * @returns {object}
	 */
	getError(schema, key, type) {
		return schema[ key ].error ?
			schema[ key ].error[ type ] ?
				schema[ key ].error[ type ] :
				`${key}: ${this.defaultError[ type ]}` :
			`${key}: ${this.defaultError[ type ]}`;
	}
}