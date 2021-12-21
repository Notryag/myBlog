替换成ssh方式(不需要每次登录)

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

