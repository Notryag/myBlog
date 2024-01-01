# ni - 包自动选择工 源码实现 antfu的小工具

## ni是用来做什么的

ni是用来判断你的项目用的npm，yarn还是pnpm等，正确使用package managers

### How
ni会假定你项目中有lockfiles(也应该有)，在它执行前它会检查你的lock文件，就知道了你的package manager

```bash
ni

# npm install
# yarn install
# pnpm install
# bun install

```
它有的命令如下
+ ni - install
+ nr - run
+ nlx - download & execute
+ nu - upgrade
+ nun - uninstall
+ nci - clean install
+ na - agent alias

## 调试

### 准备

```bash
git clone https://github.com/antfu/ni.git
cd ni
pnpm install
```

#### 先查看package.json

package.json
```json
{
  "name": "@antfu/ni",
  "type": "module",
  "version": "0.21.12",
  "packageManager": "pnpm@8.11.0",
  "description": "Use the right package manager",
  "author": "Anthony Fu <anthonyfu117@hotmail.com>",
  "license": "MIT",
  "homepage": "https://github.com/antfu/ni#readme",
  "repository": {
    "type": "git",
    "url": "git+https://github.com/antfu/ni.git"
  },
  "bugs": {
    "url": "https://github.com/antfu/ni/issues"
  },
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.mjs",
      "require": "./dist/index.cjs"
    }
  },
  "main": "./dist/index.cjs",
  "module": "./dist/index.mjs",
  "types": "./dist/index.d.ts",
  "bin": {
    "ni": "bin/ni.mjs",
    "nci": "bin/nci.mjs",
    "nr": "bin/nr.mjs",
    "nu": "bin/nu.mjs",
    "nlx": "bin/nlx.mjs",
    "na": "bin/na.mjs",
    "nun": "bin/nun.mjs"
  },
  "files": [
    "bin",
    "dist"
  ],
  "scripts": {
    ...
  },
  "devDependencies": {
    ...
  }
}

```

这和我们平常看见的package.json有一些不同，我们通过了解package.json这个窗口可以了解整个项目的运行方式，可以逐步解析


我们不长接触的属性有
+ respository
    - 这个很明显是指定存储库的位置
+ bugs
    - 指定项目报告BUG的地址或者方式
+ exports
    - 是node12引入的特性，执行模块的入口点以及在不同环境下的导出方式
    - 本项目指定了默认的导出方式，types类型定义文件的位置，es modules环境下加载的文件位置，require commonjs环境下加载的文件路径
+ bin
    - bin属性用来指定项目中可执行文件的入口点，通常是命令行工具。
    如果有bin属性，这些可执行文件会放在系统的PATH路径中，可以直接在命令行中执行
+ files
    - 这个是执行发布包的时候包含的文件或者目录
    - 保证在发布包的时候不会发布多余的文件，保证npm包的简洁

### debug

在package.json中我们看到了ni的入口文件` "ni": "bin/ni.mjs",`, 我们从bin/ni.mjs文件开始

在vscode中script中有默认的调试工具，在scripts上有Debug按钮，按下Debug就可以调试nodejs程序就像在浏览器中一样

ni.ts
```ts 
import { parseNi } from '../parse'
import { runCli } from '../runner'

runCli(parseNi)
```

ni
1. 解析命令行
2. 执行解析出来的命令


一步一步来看他是怎么做到的
### 1. 解析命令行

主要代码都在runner.ts文件中

```ts
export async function runCli(fn: Runner, options: DetectOptions & { args?: string[] } = {}) {
  const {
    args = process.argv.slice(2).filter(Boolean),
  } = options
  try {
    await run(fn, args, options)
  }
  catch (error) {
    if (error instanceof UnsupportedCommand && !options.programmatic)
      console.log(c.red(`\u2717 ${error.message}`))

    if (!options.programmatic)
      process.exit(1)

    throw error
  }
}
```
runCli 截取有效参数，处理错误，执行run函数

```ts
export async function run(fn: Runner, args: string[], options: DetectOptions = {}) {
  const debug = args.includes(DEBUG_SIGN)
  if (debug)
    remove(args, DEBUG_SIGN)

  let cwd = options.cwd ?? process.cwd()
  if (args[0] === '-C') {
    cwd = resolve(cwd, args[1])
    args.splice(0, 2)
  }

  if (args.length === 1 && (args[0]?.toLowerCase() === '-v' || args[0] === '--version')) {
    ...
    return
  }

  if (args.length === 1 && (args[0] === '--version' || args[0] === '-v')) {
    console.log(`@antfu/ni v${version}`)
    return
  }

  if (args.length === 1 && ['-h', '--help'].includes(args[0])) {
    ...
    return
  }

  let command = await getCliCommand(fn, args, options, cwd)

  if (!command)
    return

  const voltaPrefix = getVoltaPrefix()
  if (voltaPrefix)
    command = voltaPrefix.concat(' ').concat(command)

  if (debug) {
    console.log(command)
    return
  }

  await execaCommand(command, { stdio: 'inherit', cwd })
}

```
1. 处理参数-v -C等
脉络出来了，通过if判断参数处理一些边缘情况，在加参数的时候返回不同的值，重要的是下面

2. 解析参数得到命令
```ts
let command = await getCliCommand(fn, args, options, cwd)

...


export async function getCliCommand(
  fn: Runner,
  args: string[],
  options: DetectOptions = {},
  cwd: string = options.cwd ?? process.cwd(),
) {
  const isGlobal = args.includes('-g')
  if (isGlobal)
    return await fn(await getGlobalAgent(), args)

  let agent = (await detect({ ...options, cwd })) || (await getDefaultAgent(options.programmatic))
  if (agent === 'prompt') {
    agent = (
      await prompts({
        name: 'agent',
        type: 'select',
        message: 'Choose the agent',
        choices: agents.filter(i => !i.includes('@')).map(value => ({ title: value, value })),
      })
    ).agent
    if (!agent)
      return
  }

  return await fn(agent as Agent, args, {
    programmatic: options.programmatic,
    hasLock: Boolean(agent),
    cwd,
  })
}

```
就是组装参数，并且执行fn，fn是我们之前找到的`parseNi`


```ts
export function getCommand(
  agent: Agent,
  command: Command,
  args: string[] = [],
) {
  ...
  const c = AGENTS[agent][command]
  ...
  return c.replace('{0}', args.map(quote).join(' ')).trim()
}

export const parseNi = <Runner>((agent, args, ctx) => {
  // bun use `-d` instead of `-D`, #90
    ...
  return getCommand(agent, 'add', args)
})
```
删除了一些边界情况的判断逻辑，可以看的更清晰
getCommand调用getCommand，getCommand组装参数通过`AGENTS`对象

```ts

export const AGENTS = {
  'npm': {
    'agent': 'npm {0}',
    'run': npmRun('npm'),
    'install': 'npm i {0}',
    'frozen': 'npm ci',
    'global': 'npm i -g {0}',
    'add': 'npm i {0}',
    'upgrade': 'npm update {0}',
    'upgrade-interactive': null,
    'execute': 'npx {0}',
    'uninstall': 'npm uninstall {0}',
    'global_uninstall': 'npm uninstall -g {0}',
  }
  ...
}
```
AGENTS对象就是这个结构，我们在判断的时候可以用对象来代替if判断，当做map来用，这样顺序就很清晰了，前面一系列的处理参数，最终通过一个对象来完成最后的组装

如果是自己写一个只有自己用的install方法的工具，甚至可以直接用

```ts
export const AGENTS = {
    npm: {
        install: 'npm i'
    }
}

```

然后直接返回命令行，最后执行，但是发布工具的话，需要考虑的问题就多了起来，有很多判断加边界情况


### 2. 执行

得到命令行参数之后，执行就简单了

`import { execaCommand } from 'execa'`
借用的是execa包的方法

## 总结

我们这次只梳理的最主干的脉络，也依稀看出一个小工具中包含的繁杂细节

还有很多可以讲，里面的函数的包装，
+ 如何分割函数
+ 如果处理错误
+ 如果处理debug
+ 测试
+ 文件处理
...

如果有机会可以下次讲

# ni - 包自动选择工 源码实现 antfu的小工具2


### 错误处理


```ts
export class UnsupportedCommand extends Error {
  constructor({ agent, command }: { agent: Agent, command: Command }) {
    super(`Command "${command}" is not support by agent "${agent}"`)
  }
}

if (error instanceof UnsupportedCommand && !options.programmatic)
      console.log(c.red(`\u2717 ${error.message}`))
```
自定义错误的类，可以在cache冲通过instanceof判断哪种类型的错误，对不同类型错误进行处理