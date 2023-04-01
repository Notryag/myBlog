本地有仓库，设置远程仓库地址后再push

```shell
git init 
git remote add origin https://gitee.com/用户个性地址/HelloGitee.git

git pull origin master

git add .
git commit -m "第一次提交"
git push origin master
```

### …or create a new repository on the command line
```shell
echo "# next-template" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M master
git remote add origin git@github.com:Notryag/next-template.git
git push -u origin master
```
### or push an existing repository from the command line
```shell
git remote add origin git@github.com:Notryag/next-template.git
git branch -M master
git push -u origin master
```

### or import code from another repository
You can initialize this repository with code from a Subversion, Mercurial, or TFS project.


```dash
git submodule add <git-repo-url> <submodule-local-path>
git submodule update --init --recursive

```

