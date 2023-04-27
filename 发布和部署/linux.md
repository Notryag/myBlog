## 命令学习

用户

```bash
useradd name 
useradd name sudo
# 修改默认的shell
sudo usermod -s /bin/bash name
# 切换用户
su root
# 查看用户
cat /etc/passwd
```


cp 
-r 是递归复制:英文`Recursive`的缩写
```sh
cp -r dist/* /var/www/html
```


查看myslq进程
```shell
ps -ef | grep mysql
kill ${id} // 关闭mysql进程

service mysqld start // 启动mysql
```

```bash
# copy命令
COPY <源路径> <目标路径>
```
