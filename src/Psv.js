/**
 * Index
 * js 数据校验工具
 * @author Porco
 * @Created 14/07/2017
 */

import { Check } from './Check';

export default class Psv {
	constructor(schema, data) {
		this.schema = schema;
		this.data = data;
		this.errors = [];
	}
	
	/**
	 * 验证入口
	 */
	validate() {
		const errors = new Check().validate(this.schema, this.data);
		this.errors = errors;
		return errors && errors.length === 0;
	}
	
	/**
	 * 获取错误信息，
	 * 常用与生产阶段，需先调用 validate 接口
	 */
	getErrors() {
		return this.errors;
	}
	
	/**
	 * 打印错误信息，
	 * 常用与调试阶段，需先调用 validate 接口
	 */
	printErrors() {
		if (!this.errors || this.errors.length === 0) return;
		for (const err of this.errors) {
			console.log('\x1b[31m', err);
		}
	}
}