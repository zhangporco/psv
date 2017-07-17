# Porco Schema Validate (psv)
**psv** 是一款轻量级 **js** 数据格式验证工具，相比于其他功能齐备的验证工具，**psv** 的优势在于体积非常小（之所以要写它，就是因为对其他 **validate** 框架不满意，我只是想要一个 **json** 验证，却给我一个 1M 的项目），最开始的核心代码只有 130 行。因此 **psv** 非常适合做个人 **demo** 以及教学。

## 下载、安装
```
npm install psv --save
```

## 使用
首先你需要定义出自己的 schema，比如我：

```
var schema = {
    key1: {
        type: String,
        required: true
    },
    key2: {
        type: String,
        required: true
    },
};
```
这个 **schema** 的意思是，两个字段（key1，key2），都是必填，**string** 类型。那么我传入待验证的 **data** 结构是：

```
var data = {
    key1: 'psv',
    key2: 'psv',
}
```
接着我们导入并创建 **Psv** 对象进行验证

```
import Psv from 'psv';
function pestPsv(schema, data) {
    const psv = new Psv(schema, data);
    const validate = psv.validate();
    if (!validate) {
        psv.printErrors();
    }
}
```
上面的代码首先创建 **Psv** 对象，并通过构造函数传入 **schema** 和 **data**。接着调用 **validate** 函数，该函数返回值为 **true or false**，
如果为 **true** 代表 **data** 符合 **schema** 定义，为 **false** 的话，可以通过 **psv.printErrors()** 或者 **psv.getErrors()** 来获取错误信息。

## api
目前支持四种数据类型的定义：**String, Number, Array, Object**。

### String

```
str: {
    type: String,
    max: 5,
    min: 3,
    pattern: '^[0-9]*$',
    required: true
},
```
max ： 最大长度 （数字）

min ： 最小长度 （数字）

pattern ： 自定义正则表达式 （正则表达式）

required ： 是否必须 （布尔）

### Number

```
num: {
    type: Number,
    max: 5,
    min: 3,
    required: true
},
```

max ： 最大值 （数字）

min ： 最小值 （数字）

required ： 是否必须 （布尔）

### Array

```
array: {
    type: Array,
    max: 5,
    min: 3,
    required: true
},
```

max ： 最大长度 （数字）

min ： 最小长度 （数字）

required ： 是否必须 （布尔）

### Object

```
object: {
    type: Object,
    required: true
},
```

required ： 是否必须 （布尔）

#### 注意：当 type = Object 时，说明该字段可以是任何 js 基本类型或对象，甚至可以是 一个 函数（慎用）。

同样，**psv** 支持嵌套定义

```
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
支持上述全部格式的嵌套，这样就为我们的使用带来了无穷的设计乐趣。即便这样，我们在这还是要衷心的提醒：嵌套虽然没有错，但是过深的嵌套会带来很多深层次的性能问题，目前火遍前端的 **React** 和 **nosql** 型数据库 **mongodb** 都对深层嵌套的数据结构很不友好。这其实很好理解，对嵌套结构的遍历能使用的也就是 递归 或者 递归的变种算法。如果你能处理好函数的入栈出栈，那么递归带给你的会是 出入栈带来的时间消耗。如果处理不好，带来的可就是堆栈溢出。而且递归对调试极不友好，反正我平时写递归，大部分时候都是凭经验。
同样，在这里我们，我们也建议大家在对业务模型进行抽象的时候、设计数据结构时，尽量进行扁平化的设计。

（如果对使用有疑问，可以参考 **test** 目录下代码。或者加我）

**微信 ： porco5555**

**QQ ： 627135316**

**email：zhangporco@gmail.com**
