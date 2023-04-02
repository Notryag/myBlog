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

```shell
// patch：补丁号，修复bug，小变动，如 v1.0.0->v1.0.1
npm version patch

// minor：次版本号，增加新功能，如 v1.0.0->v1.1.0
npm version minor

// major：主版本号，不兼容的修改，如 v1.0.0->v2.0.0
npm version major
```