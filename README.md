# Porco Schema Validate (psv)
（自**2.1.7**版本之后，数组的定义改变，支持数组嵌套）

**psv** 是一款轻量级 **js** 数据格式验证工具，相比于其他功能齐备的验证工具，**psv** 的优势在于体积非常小（之所以要写它，就是因为对其他 **validate** 框架不满意，我只是想要一个格式化验证工具，却给我一个 1M 的项目），最开始的核心代码只有 130 行。 

## 下载、安装

```javascript
npm install psv --save
```

```javascript
yarn add psv
```

## 使用
首先你需要定义出自己的 schema，比如：

```javascript
var schema = {
    str: {
        type: String,             // string 类型
        required: true,           // 是否必填，默认为 false
        max: 3,                   // 最大长度
        min: 2,                   // 最小长度
        enum: ['12', '13', '14'], // 枚举
        regex: '^[8-9]*$',        // 正则
        // 正则（兼容老版本，不推荐使用，优先级低，当它与 regex 同时出现时会被忽略）
        pattern: '^[5-9]*$',
        error: {                  // 自定义错误提示
            type: '类型错误',
            required: '必填错误',
            max: '不能超过最大长度',
            min: '不能低于最小长度',
            enum: 'enum 必须正确',
            regex: '正则验证错误',
            pattern: '正则验证错误',
        }      
    },
    num: {
        type: Number,
        required: true,
        max: 3,           // 最大长度
        min: 1,           // 最小长度
        enum: [1, 2, 3],  // 枚举
        error: {          // 自定义错误提示
            type: '类型错误',
            required: '必填错误',
            max: '不能超过最大值',
            min: '不能低于最小值',
            enum: 'enum 必须正确',
        },
    },
    boo: {
        type: Boolean, 
        required: true,
        error: {          // 自定义错误提示
            type: '类型错误',
            required: '必填错误',
        },
    },
    arr: {
    	type: Array, 
        required: true,
        max: 3,          // 最大长度
        min: 2,          // 最大长度
        error: {          // 自定义错误提示
            type: '类型错误',
            required: '必填错误',
            max: '不能超过最大长度',
            min: '不能低于最小长度',
        },
    },
    obj: {
    	type: Array, 
        required: true,
        error: {          // 自定义错误提示
            type: '类型错误',
            required: '必填错误',
        },
    }
};
```
**schema** 是预先定义的数据格式，接下来将会拿 data 与 schema 进行比对，
对于一个 **schema** 来说只有 type 字段是必填的，其他都可以缺省。

```javascript
var data = {
    str: '12',
    num: 2,
    boo: true,
    array: [1, 2],
    obj: {},
}
```
接着我们导入并创建 **Psv** 对象进行验证

```javascript
import Psv from 'psv';
function testPsv(schema, data) {
	const psv = new Psv(schema, data);
	const validate = psv.validate();
	if (!validate) {
		psv.printErrors();
	}
}
```

## api
- 数据类型
    - String
        - type
        - required
        - max
        - min
        - enum
        - regex
        - pattern
        - error （自定义错误提示，可使用默认值）
            - type （type 错误提示信息）   
            - required （required 错误提示信息）
            - max （max 错误提示信息）
            - min （min 错误提示信息）
            - enum （enum 错误提示信息）
            - regex （regex 错误提示信息）
            - pattern （pattern 错误提示信息）
    - Number
        - type
        - required
        - max
        - min
        - enum
        - error
            - type
            - required
            - max
            - min
            - enum
    - Array
        - type
        - required
        - max
        - min
        - error
            - type
            - required
            - max
            - min
    - Boolean
        - type
        - required
        - error
            - type
            - required
    - Object
        - type
        - required
        - error
            - type
            - required

- 函数
    - validate    // 验证入口
    - printErrors // 打印错误信息
    - getErrors   // 获取错误信息

#### 注意：当 type = Object 时，说明该字段可以是任何 js 基本类型或对象，甚至可以是 一个 函数（慎用）。

同样，**psv** 支持嵌套定义

```javascript
const schema2 = {
    str2: {
        type: String,
        required: true
    }
}
const schema = {
    str1: {
        type: schema2,
        required: true
    },
};
```

（如果对使用有疑问，可以参考 **test** 目录下代码）
