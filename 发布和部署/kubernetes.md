# kubernetes 学习记录

叫k8s 因为 kubernetes 的 ks 中间 8 个字母...

# 基本概念

1. Pod（容器组）：
  + 最小的可部署单元，一个Pod可以包含一个或多个容器。
  + 共享相同的网络命名空间和存储卷，它们可以相互通信和共享数据。

2. ReplicaSet：
+ 用于确保指定数量的Pod副本在集群中运行。
+ 当Pod意外失败或需要扩展时，ReplicaSet会自动启动或终止Pod。

3. Deployment：
+ 提供了对ReplicaSet和Pod的声明式定义，支持应用的部署和更新。
+ 允许你指定应用的副本数、版本、更新策略等。

4. Service：
+ 提供了一种稳定的网络端点，允许Pod组成一个服务，其他组件可以通过服务名访问该服务。
+ 可以定义ClusterIP、NodePort、或LoadBalancer类型的服务。

5. Namespace：
+ 用于将集群划分为多个虚拟集群，每个Namespace提供一个隔离的工作环境。
+ 可以用于组织和管理集群中的资源。

6. ConfigMap和Secret：
+ 用于将配置信息和敏感信息（如密码、API密钥）从应用程序中分离出来，以便更灵活地管理。
+ ConfigMap用于非敏感信息，Secret用于敏感信息。

7. Volume：
+ 用于在Pod中持久化存储数据，可以是空目录、主机文件系统、网络存储等。
+ 允许容器之间共享和访问数据。

8. Node：
+ 是集群中的一个工作节点，负责运行Pod中的容器。
+ 每个Node上都有一个Kubelet代理，用于与Master节点通信并管理本地容器。

9. Master节点：
+ 控制整个集群的状态，包括调度、扩展、滚动更新等。
+ 包括API Server、Controller Manager、Scheduler和etcd。

11. Kubelet：
+ 运行在每个Node上的代理服务，负责管理Node上的Pod和容器。
+ 与Master节点通信，接收调度指令并确保Pod的运行状态。


## Service
node中创建pod，其中pod会自动分配ip地址，但是pod可能销毁或者更新，所以ip是不固定的，需要通过service来管理访问

服务分为内部服务和外部服务，内部服务类似数据库等，有些服务需要暴露给外部
service的type分为
+ ClusterIP
通过集群的内部 IP 公开 Service
+ NodePort
通过每个节点上的 IP 和静态端口（NodePort）公开 Service

+ LoadBalancer
使用云平台的负载均衡器向外部公开 Service

## Ingress
通过ip：port访问 nodePort没有问题，但是在生产中通常使用的是域名，这时候就用到了Ingress

Ingress 提供从集群外部到集群内服务的 HTTP 和 HTTPS 路由。


## deployment
一个 Deployment 为 Pod 和 ReplicaSet 提供声明式的更新能力

比如可以定义副本数量

# Kubernetes架构

分为master和worker

## worker-node 
包含kubelet kube-proxy container-runtime

kubelet是在每个节点上运行的主要 “节点代理”,监控工作节点的运行情况

kube-proxy提供网络代理和负载均衡服务

container-runtime就是运行时

# master-node
包含kube-apiserver etcd ControllerManager和Schduler

kube-apiserver 负责提供Kubernetes集群的API接口服务，所有的组件都通过这个接口进行通信。用户可以直接和 Kubernetes API 交互，也可以通过 kubectl 这样的工具进行交互。

scheduler 负责监控集群中所有节点的资源使用情况，然后根据一些调度策略将pod调度到合适的节点上运行

ControllerManager用来保持集群的期望状态，比如如果有pod出现了问题，它根据这些状态做出相应的相应。

etcd是一个键值存储系统，比如网络配置、节点配置、服务配置等

## 实际操作
kubectl 命令行工具，常用的都可以用以下概括

`kubectl [command] [TYPE] [NAME] [flags]`
+ `command`：指定要对一个或多个资源执行的操作，例如 `create`、`get`、`describe`、`delete`
+ `TYPE`：指定资源类型。资源类型不区分大小写， 可以指定单数、复数或缩写形式
+ `NAME`：指定资源的名称。名称区分大小写。 如果省略名称，则显示所有资源的详细信息。例如：kubectl get pods
  + 资源名包括pods nodes services等

如
```bash
kubectl create deployment nginx-deployment --image=nginx --replicas=3
kubectl get deploy nginx-deployment
kubectl describe deploy
kubectl delete deployment nginx-deployment
```
### pod

一般通过deploy而不是直接创建pod，此处是用来了解
```bash
# 创建一个nginx的pod
kubectl run mynginx --image=nginx:1.23.4
# 可以通过 create 来创建deployment
kubectl create deployment nginx-deployment --image=nginx:1.23.4

#
kuebctl get po

NAME                                READY   STATUS    RESTARTS   AGE
mynginx                             1/1     Running   0          14m
nginx-deployment-645684ff6c-2lf9f   1/1     Running   0          8m35s
#
kubectl get rs

NAME                          DESIRED   CURRENT   READY   AGE
nginx-deployment-645684ff6c   1         1         1       8m49s
```

通过deploy创建的后面会有自动添加的标识符，中间是rs的id，最后面是pod自己的id

`kubectl edit deployment nginx-deployment`可以编辑创建的deployment


```bash
# 查看pod的详细信息
kubectl get po -owide
# 查看日志
kubectl logs -f mynginx
# 进入容器
kubectl exec -it mynginx -- /bin/bash
kubectl descript po mynginx
# 创建临时镜像
kubectl run my-busybox --image=busybox -it --rm
```

在通过`-o wide`后可以查看到pod的ip，可以通过curl ip访问到资源

### deployment

```bash
kubectl create deploy my-nginx --image=nginx:1.23.4 --replicas=2
kubectl get deploy
# 副本集 replicaSet/rs
kubectl get replicaSet
# 扩容
kubectl scale deploy my-nginx --replicas=5
# 自动缩放
kubectl autoscale deploy/nginx-auto --min=3 --max=10 --cpu-percent=75

# 修改镜像
 kubectl set image deploy/nginx-deployment nginx=nginx:1.24
# 查看版本history
kubectl rollout history deploy/my-nginx
# 查看某个版本详情
kubectl rollout histoy deploy/my-nginx --revision=1
# 回滚到指定版本
kubectl rollout undo deploy/my-nginx --to-reversion=1
```

### service


Service为一组 Pod 提供相同的 DNS 名，并且在它们之间进行负载均衡。
Kubernetes 为 Pod 提供分配了IP 地址，但IP地址可能会发生变化。
> 集群内的容器可以通过service名称访问服务，而不需要担心Pod的IP发生变化。

```bash
kubectl expose deploy/my-nginx --name=nginx-service --port=8080 --target-port=80

kubectl get svc
# 创建的service在 集群内部主机 可以通过CLUSTER-IP:PORT访问
# 集群内部的服务可以通过service名称访问服务
kubectl run test --image=nginx:1.24 -it --rm -- bash
# 在 集群内部容器 可以通过service的name:port访问服务
curl nginx-service:8080

kubecel describe svc nginx-service
```

## 配置文件
上面写的是命令行，在实际中我们一般是使用yml文件用来管理，例如

```yml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
  labels:
    app: nginx
spec:
  replicas: 3
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
      - name: nginx
        image: nginx:1.23.4
        ports:
        - containerPort: 80
```
定义好之后就可以使用`kubectl create -f nginx-deployment.yml`或者`kubectl apply -f nginx-deployment.yml`就启动了一个deploy

这个是deployment资源，其他的资源对象配置文件的结构也是类似的，可以参考官网，以后有机会写一篇实践


## 安装方式

1. minikube
2. 云平台的 kubernetes
3. 裸机安装

minikube

```bash
minikube start
kubectl get node
# 清空集群
minikube delete --all
# 可视化工作台
minikube dashboard
```

安装 k3s

```bash
 curl –sfL \
     https://rancher-mirror.oss-cn-beijing.aliyuncs.com/k3s/k3s-install.sh | \
     INSTALL_K3S_MIRROR=cn sh -s - \
     --system-default-registry "registry.cn-hangzhou.aliyuncs.com" \
     --write-kubeconfig ~/.kube/config \
     --write-kubeconfig-mode 666 \
     --disable traefik
cat > /etc/rancher/k3s/registries.yaml <<EOF
mirrors:
  docker.io:
    endpoint:
      - "http://hub-mirror.c.163.com"
      - "https://docker.mirrors.ustc.edu.cn"
      - "https://registry.docker-cn.com"
EOF

systemctl restart k3s
# 清理测试环境
kubectl delete all --all
# 一键卸载 server
k3s-uninstall.sh
# 一键卸载 agent
k3s-agent-uninstall.sh
```

```bash
kubectl get pod
kubectl get deployment
kubectl get pod -o wide

kubectl run testapp --image=k8s/test:v1
kubectl apply -f ./pod.yaml
```