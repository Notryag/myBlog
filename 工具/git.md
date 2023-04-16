本地有仓库，设置远程仓库地址后再push


SSH 密钥文件通常位于用户主目录的 .ssh 文件夹中

生成本地的sshkey
```bash
ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
```

查看本地的sshkey
```bash
cat ~/.ssh/id_rsa.pub
```

在拿到sshkey之后就可以去`github`上面的setting中添加key了, 之后pull,push等就不需要输入密码了

```bash
git init 
git remote add origin https://gitee.com/用户个性地址/HelloGitee.git

git pull origin master

git add .
git commit -m "第一次提交"
git push origin master
```

### …or create a new repository on the command line
```bash
echo "# next-template" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M master
git remote add origin git@github.com:Notryag/next-template.git
git push -u origin master
```
### or push an existing repository from the command line
```bash
git remote add origin git@github.com:Notryag/next-template.git
git branch -M master
git push -u origin master
```

### or import code from another repository
You can initialize this repository with code from a Subversion, Mercurial, or TFS project.

git remote rm origin
```shell
git remote rm origin

git remote add origin git@github.com:gatieme/AderSCloud.git

git remote -v
# 回退到上个版本
git reset --soft HEAD
git reset –hard HEAD~3  # 回退上上上一个版本  
git reset –hard bae128  # 回退到某个版本回退点之前的所有信息。 
git reset --hard origin/master    # 将本地的状态回退到和远程的一样 
```


```bash
# 添加子项目
git submodule add <git-repo-url> <submodule-local-path>
# 拉取到本地
git submodule update --init --recursive
# 更新子项目
git submodule update --remote
```


### 推送tag
```js
git tag 1.00
git push origin --tags
```