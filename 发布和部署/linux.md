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



### linux 目录

+ bin
存放二进制文件的目录
+ boot
包含内核文件
+ dev
device缩写，设备或者装置
sda 接入的第一块硬盘  a是abcd的第一个
+ home
家目录，输入账号和密码，进入的就是home
`user add -m zhangsan`就会添加一个zhangsan的目录
`su lisi`就没有权限查看zhangsan的目录
+ etc
etcetera 等等，setting，系统的设置放在的etc目录下
`etc/passwd` 用户信息设置 
`etc/shadow` 用户密码管理
`etc/host` ip映射，本地解析
`etc/crontab` 定时计划任务
+ lib
library 图书馆， 库，框架
保存着系统，程序，甚至硬件运行所依赖的库文件
