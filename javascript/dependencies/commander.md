## commander

commander 是一个命令行工具
简单来说就是在cmd 中执行命令,通过`commander`可以生成获取到用户的一些参数
like
```js
npm i commander -g
```
通过commander可以实现类似的功能

### 1. option
```js
program
  .option('-d, --debug', 'output extra debugging')
  .option('-s, --small', 'small pizza size')
  .option('-p, --pizza-type <type>', 'flavour of pizza');

program.parse(process.argv);

const options = program.opts();
if (options.debug) console.log(options);
console.log('pizza details:');
if (options.small) console.log('- small pizza size');
if (options.pizzaType) console.log(`- ${options.pizzaType}`);
console.log(program.opts());
```
```cmd
$ pizza-options -p
error: option '-p, --pizza-type <type>' argument missing
$ pizza-options -d -s -p vegetarian
{ debug: true, small: true, pizzaType: 'vegetarian' }
pizza details:
- small pizza size
- vegetarian
$ pizza-options --pizza-type=cheese
pizza details:
- cheese
```

通过注册对应的option，可以通过`program.opts()`得到对应的参数


### 2.command 命令
```js
program
  .command('clone <source> [destination]')
  .description('clone a repository into a newly created directory')
  .action((source, destination) => {
    console.log(source, destination);
  });
  
  program.parse(process.argv)
```
就是能直接获取到用户的在clone这个command之后的参数，可以在action中处理
```cmd
$ clone d b
d b
```
