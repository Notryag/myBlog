# docker

## 安装docker
```sh
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
```sh
docker info
yum remove docker
rm -rf /var/lib/docker
```


简易步骤部署

## 1. 编写Dockerfile
```sh
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
# 
RUN  npm install \     && npm run build \     && cp -r dist/* /var/www/html \     && rm -rf /app
CMD ["nginx","-g","daemon off;"]
```


多阶段构建
通过多阶段构建可以,指定node作为build目录,然后用nginx镜像启动
镜像体积就会减小
```sh
FROM node:lts-alpine AS builder
WORKDIR /app

ADD package.json /app
RUN npm install --production --registry=https://registry.npm.taobao.org

COPY . /app

RUN npm run build

FROM nginx:stable-alpine
COPY --from=builder /app/dist /usr/share/nginx/html

ADD default.conf /etc/nginx/conf.d/

EXPOSE 80

WORKDIR /usr/share/nginx/html

RUN chmod -R a+rx *
```

`-t getting-started` 是起的镜像名称为`getting-started`
`-d` detached的缩写,表示独立的
`-p` port的缩写, 表示 3000对3000的端口

/bin/bash：放在镜像名后的是命令，这里我们希望有个交互式 Shell，因此用的是 /bin/bash。
```sh
# 安装docker
yum install docker
# 启动docker
systemctl start docker
```

在有dockerfile的文件下创建镜像
```sh
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


# 进入docker
docker exec -it <the-container-id> /bin/bash
```

镜像常用命令
```sh
docker pull [镜像名称:版本] 拉取镜像
docker images  镜像列表
docker rmi [镜像名称:版本] 删除镜像
docker history [镜像名称] 镜像操作记录
docker tag [镜像名称:版本][新镜像名称:新版本]
docker inspect [镜像名称:版本] 查看镜像详细
docker search [关键字] 搜索镜像
docker login 镜像登陆
```

容器常用命令
```sh
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
docker commit [容器名称] my_image:v1.0  容器提交为新的镜像	
```