# npm

npm发布包

1. 检查npm源如果不是官方源需要修改
```bash
// 查看npm镜像源地址
npm config get registry

// 切换npm镜像源

// 设置npm默认源
npm config set registry https://registry.npmjs.org/
// 设置npm镜像源为淘宝镜像
npm config set registry https://registry.npm.taobao.org/
```

2. 在终端中切换到项目目录下，运行登陆命令，之后按照终端提示输入用户名、密码等信息即可
`npm login`

3. 发布
`npm publish`

```bash
// patch：补丁号，修复bug，小变动，如 v1.0.0->v1.0.1
npm version patch

// minor：次版本号，增加新功能，如 v1.0.0->v1.1.0
npm version minor

// major：主版本号，不兼容的修改，如 v1.0.0->v2.0.0
npm version major
```

```bash
# 管理npm的代理
npm i -g nrm  
nrm current 
nrm use npm 
nrm use taobao
# 升级node 本身
npm i n -g  
n lastest
n statble
## 安装nvm
git clone git://github.com/creationix/nvm.git ~/nvm
cd /root/nvm
. nvm.sh
## 安装nodejs 稳定版
nvm install stable
```

## pnpm

使用pnpm的workspace管理项目

在你的项目根目录下初始化 PNPM workspace，使用以下命令：

`pnpm init -w`
该命令会在当前目录下创建一个 package.json 文件，并在其中添加 PNPM workspace 相关的配置信息。

在 PNPM workspace 根目录下创建子项目，例如：

```bash
mkdir packages
cd packages
mkdir project-a
mkdir project-b
这里创建了两个子项目：project-a 和 project-b。
```

可以指定目录执行相应的命令
```bash
pnpm run -C packages/project-a command-name
```

在子项目之间添加依赖关系：

```bash
cd project-a
pnpm add project-b
```
可以在一个子项目中添加对另一个子项目的依赖。
