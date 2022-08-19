# Typescript 版本的淫语翻译器！

修改自 https://github.com/RimoChan/yinglish

## Usage

首先安装一下。

```bash
# for npm
> npm install node-yinglish
# for pnpm
> pnpm add node-yinglish
```

只暴露了一个接口！这次加上了`export default`，于是你可以随便取名。

```ts
import chs2yin from 'node-yinglish'

console.log(chs2yin('吃葡萄不吐葡萄皮。'))
// ……吃〇〇……不……吐葡……葡萄〇……
```

因为默认的模块导出方式是`ES6`，需要在**Node.js**项目中使用**import**，而这必须要求改动`package.json`，故我们把它换成了`CommonJS`。

```js
// 默认导出
const chs2yin = require('node-yinglish').default
// 解构导出
const { chs2yin } = require('node-yinglish')
```
