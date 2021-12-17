## babel

- 语法转换
- 通过 polyfill 添加缺失的特性（例如 promise）

```shell
npm install --save-dev @babel/core @babel/cli @babel/preset-env
```

babel 是插件化的，所谓插件就是一个一个函数

通过 babel.config.js 设置 babel 的 config

之前是通过.babelrc, 只能通过静态 的方式配置
也可以通过 pacage.json 配置 babel

```javascript
useBuiltIns: 'usage'
```

```
npm i @babel/core @babel/core @babel/present-env
```

### 插件

预设 presets,就是相当于组装好的插件
常用的就是 present-env
可以以自己添加一个预设，

> @babel/preset-env 只会转换语法，也就是我们看到的箭头函数、const 一类。如果进一步需要转换内置对象、实例方法，那就得用 polyfil

### polyfill

@babel/polyfill 模块包含 core-js 和一个自定义的 regenerator runtime 来模拟完整的 ES2015+ 环境。
"usage"、 "entry"
"useBuiltIns": "usage"
当为`usage` 的时候，就是会只包含你所需要的 polyfill
当为`entry` 的时候:

需要在文件前面添加
```javascript
import 'core-js/stable'
import 'regenerator-runtime/runtime'
```
然后这代码会被打散成为
```javascript
require("core-js/modules/es.symbol.js");

require("core-js/modules/es.symbol.description.js");

require("core-js/modules/es.symbol.async-iterator.js");
// ...等
```




1. @babel/preset-env 拥有根据 useBuiltIns 参数的多种 polyfill 实现，优点是覆盖面比较全（entry）， 缺点是会污染全局， 推荐在业务项目中使用
2. @babel/runtime 依靠 @babel/plugin-transform-runtime 的能力，沙箱垫片和代码复用,该方式的优点是不会污染全局， 适合在类库开发中使用 

`缺点`:
```javascript
'fooBar'.includes('foo')
```

这个 `@babel/runtime` 是不支持的
