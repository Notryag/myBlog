创建项目
```js
yarn create @umijs/umi-app
// 创建页面
umi g page index --typescript --less
```


加速项目启动:
```js
mfsu:{}
```

发布项目需要修改`.umric.ts`
```javascript
  history:{
    type:'hash'
  },
  base: './', // 打包路径，默认是/
  publicPath: './', // 资源访问路径，默认/
```