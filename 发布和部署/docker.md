# docker

## 启动服务
```bash
docker run -dp --name my_image  3000:80 nginx
# -d 后台运行
# -name 给容器命名
# -p 主机端口：容器内部端口

# 进入docker
docker exec -it <the-container-id> /bin/bash
# print logs
docker logs -f -n 100 CONTAINER
```



## 镜像常用命令
```bash
docker search nginx 搜索基础镜像
docker pull [镜像名称:版本] 拉取镜像
docker images  镜像列表
docker rmi [镜像名称:版本] 删除镜像
docker history [镜像名称] 镜像操作记录
docker tag [镜像名称:版本][新镜像名称:新版本]
docker inspect [镜像名称:版本] 查看镜像详细
docker search [关键字] 搜索镜像
docker login 镜像登陆

docker image prune 删除所有dangling images
docker image prune -a  移除全部 unused images 
```

## 容器常用命令
```bash
docker ps -a 容器列表(所有容器)
docker ps  查看所有(运行的)容器
docker exec -ti <id> bash  以 bash 命令进入容器内
docker run -ti --name [容器名称][镜像名称:版本] bash 启动容器并进入
docker logs 查看容器日志
docker top <container_id> 查看容器最近的一个进程
docker run -ti --name [容器名称] -p 8080:80 [镜像名称:版本] bash  端口映射
docker rm <container_id> 删除容器
docker stop <container_id> 停止容器
docker start <container_id> 开启容器
docker restart <container_id> 重启容器
docker inspect <container_id> 查看容器详情
docker c

docker container prune 移除全部停止的 containers
docker rm -f $(docker ps -aq) 强制删除所有 Docker 容器
```

## volume
```bash
docker run -dp 3009:80 --name demo-nginx -v /root/nginxhtml:/usr/share/nginx/html:ro  nginx

# 查看所有的volume
docker volume ls
docker volume create demo
docker volume rm demo
docker volume inspect demo
docker volume prune
```

## 多容器通信
如web应用访问redis，只需要把他们放在同一个网络中就可以了
```bash
docker network create test-net
docker run -d --name redis --network test-net --network-alias redis redis:latest
docker run -p 8080:8080 --name test -v D:/test:/app --network test-net -d test:v1
```

# docker compose

```bash
docker compose up -d
docker compose ps
# name 指在compose文件中的命名，ps中service中的名称
docker compose exec name basd
```

简易步骤部署

## 1. 编写Dockerfile
```bash
# 选择基础版镜像
FROM node:6.10.3-slim
# 安装nginx
RUN apt-get update \    && apt-get install -y nginx
# 指定工作目录
WORKDIR /app
# 拷贝当前所有文件到工作目录下
COPY . /app/
# 暴露端口
EXPOSE 80
# 安装依赖
RUN  npm install \     && npm run build \     && cp -r dist/* /var/www/html \     && rm -rf /app
CMD ["nginx","-g","daemon off;"]
```


## 多阶段构建
通过多阶段构建可以,指定node作为build目录,然后用nginx镜像启动
镜像体积就会减小
```bash
FROM node
WORKDIR /app
ADDCOPY package.json /app
RUN npm install --production --registry=https://registry.npm.taobao.org

COPY . .
RUN npm run build

FROM nginx
COPY --from=0 /app/dist /usr/share/nginx/html

COPY default.conf /etc/nginx/conf.d/

EXPOSE 80

CMD ["nginx","-g","daemon off;"]

WORKDIR /usr/share/nginx/html

RUN chmod -R a+rx *
```


在有dockerfile的文件下创建镜像
```bash
# 创建镜像
docker build -t getting-started .
# 跑镜像 [主机端口]:[容器端口] 容器端口由nginx决定
docker run -dp 3000:80 getting-started
# 获取docker列表
docker ps
# 停止docker
docker stop <the-container-id>
# 当docker停止之后可以移除此镜像
docker rm <the-container-id>
# 强制移除 -> 相当于上面2条命令 -> 移除之后可以运行 docker run 启动镜像
docker rm -f <the-container-id>
```

ommit [容器名称] my_image:v1.0  容器提交为新的镜像	

添加mysql
```bash
docker run --name mysql-test -e MYSQL_ROOT_PASSWORD=password -p 3306:3306 -d mysql:5.7
# 然后就可以连接mysql  root password
grant all privileges on *.* to root@"%" identified by "root";
```

修改docker的存储位置
```bash
wsl --export docker-desktop D:\docker\docker-desktop.tar
wsl --export docker-desktop-data D:\docker\docker-desktop-data.tar 

wsl --shutdown

wsl --unregister docker-desktop
wsl --unregister docker-desktop-data

wsl --import docker-desktop-data D:\docker\docker-desktop-data D:\docker\docker-desktop-data.tar --version 2
wsl --import docker-desktop D:\docker\docker-desktop D:\docker\docker-desktop.tar --version 2

```


运行nginx


## 安装docker
```bash
# install docker
curl -fsSL https://get.docker.com | bash -s docker --mirror Aliyun

# 或者
yum install -y yum-utils   device-mapper-persistent-data   lvm2
yum-config-manager     --add-repo     http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
# yum-config-manager --enable docker-ce-nightly #要每日构建版本的 Docker CE
# yum-config-manager --enable docker-ce-test  
yum install docker-ce docker-ce-cli containerd.io

# 查看是否安装成功
docker --version
# 启动docker并设置开机启动
systemctl start docker
systemctl enable docker
```

## 卸载docker
```bash
docker info
yum remove docker
rm -rf /var/lib/docker
```