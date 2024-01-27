# 通过github actions + vitepress + git submodule创建自己的博客网站

我是习惯github管理自己的文档的，不管是技术文档还是其他，而且都是markdown格式的

我想通过一个`markdown`文档自动生成页面，因为我的文档是放在github上面的，所以我想在github上面的文档更新的时候，网站也能更新

### 目标

1. 把markdown的文档目录转为网站
2. 在文档更新的时候，网站也能自动更新
3. 保持文档目录的纯净，不希望添加额外的代码

现在已经确定了目标，需要确定怎么实现

### 想法

1. 通过调查`vitepress`是能实现把markdown转为站点，但是页头不能自动生成
2. 如果是托管到github上面的项目，可以利用github上面的ci/cd实现自动化
3. 如果通过另外的项目管理这个文档项目就可以保持项目的纯净

### 结论 

想在目标和解决方案都已经有了，剩下的就是丰富细节和实现了


## 实现 

### 首先我们先创建vitepress项目，用来管理文档

通过`git`的`submodule`管理的 blog

目标:

- 如果子项目更新,此项目自动更新并且生成站点 ✔️

## 步骤一

### 1. 新建一个 vitepress 项目

```bash
npm install -D vitepress
npx vitepress init
```

### 2. 添加子项目submodule

平常放的记录都放在这个 git 项目中, 当然也可以不是另外一个项目, 直接放markdown文件, 但是这样做可以把文档和`vitepress`项目分开管理

```bash
# 添加子项目
git submodule add <git-repo-url> <submodule-local-path>
# 直接放在根目录就好
git submodule add <git-repo-url>
# 拉取到本地
git submodule update --init --recursive
```

###  3. 根据文件目录生成`nav`和`sidebar`

因为现在`vitepress`没有通过文件目录生成导航的功能，我就写了一个插件，通过读取目录生成头部和侧边栏导航

```bash
npm install vitepress-auto-navigation
```

然后在 `.vitepress/config.js` 中的 config 文件中添加配置

```typescript
import genNav from "vitepress-auto-navigation"

const { nav, sidebar } = genNav({
  baseurl: "./myBlog",
})
...

themeConfig: {
    nav,
    sidebar,
},
```


## 步骤二 CI/CD submodule项目（文档项目）更新, 父项目（github 站点）也更新

需要配置github actions, 基本原理是

1. 通过子项目的actions克隆父项目,并且更新


提供我的github actions 的配置文件，仅供参考
```yml
name: Send submodule updates to parent repo

on:
  workflow_dispatch:
  push:
    branches: 
      - master

jobs:
  update:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3
        with: 
          repository: Notryag/blog-vitepress
          token: ${{ secrets.PRIVATE_TOKEN_GITHUB }}
          submodules: true

      - name: Pull & update submodules recursively
        run: |
          git submodule update --init --recursive
          git submodule update --recursive --remote

      - name: Commit
        run: |
          git config user.email "actions@github.com"
          git config user.name "GitHub Actions - update submodules"
          git add --all
          git commit -m "Update submodules" || echo "No changes to commit"
          git push

```

2. 父项目的actions通过push触发, 立即更新`vitepress`站点


```yml
name: Deploy
on:
  workflow_dispatch: {}
  push:
    branches:
      - master
jobs:
  deploy:
    runs-on: ubuntu-latest
    permissions:
      pages: write
      id-token: write
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - uses: actions/checkout@v3
        with:
          fetch-depth: 0
          submodules: true

      - uses: pnpm/action-setup@v2
        with:
          version: 7.26.3
      - uses: actions/setup-node@v3
        with:
          node-version: 16
          cache: pnpm
      - run: pnpm install
      - name: Build
        run: pnpm run docs:build
      - uses: actions/configure-pages@v2
      - uses: actions/upload-pages-artifact@v1
        with:
          path: .vitepress/dist
      - name: Deploy
        id: deployment
        uses: actions/deploy-pages@v1
```


# 总结

至此我们实现了通过`github`管理我们的文档，并且能够动态的更新`github pages`网站

如果有什么问题欢迎交流

附上`github`地址，可以参考上面的`github actions`

[markdown文档github](https://github.com/Notryag/myBlog)


[vitepress 站点地址](https://github.com/Notryag/blog-vitepress)

关于github actions的使用可以再写一篇文章，有机会的话