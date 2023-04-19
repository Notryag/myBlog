# kubernetes 学习记录

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

k8s 因为 kubernetes 的 ks 中间 8 个字母...

# 架构

- 控制平面

kube-scheduler

## pod

```bash
kubectl run mynginx --image=nginx:1.23.4
kubectl get po -owide
kubectl logs -f mynginx
kubectl descript po mynginx
kubectl exec -it mynginx -- /bin/bash
# 创建临时镜像
kubectl run my-busybox --image=busybox -it --rm
```

## deployment

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

## service

```bash
kubectl expose deploy/my-nginx --name=nginx-service --port=8080 --target-port=80

kubectl get svc
# 创建的service在 集群内部可以通过CLUSTER-IP:PORT访问
# 集群内部的服务可以通过service名称访问服务
kubectl run test --image=nginx:1.24 -it --rm -- bash
# 在容器内部可以通过service的name:port访问服务
curl nginx-service:8080


kubecel describe svc nginx-service
```