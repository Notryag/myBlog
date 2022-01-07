### git安装、配置ssh-key
yum install git

```ssh
ssh-keygen
cat /root/.ssh//id_rsa.pub

# 管理npm的代理
npm i -g nrm  
nrm current 
nrm use npm 
nrm use taobao
# 升级node 本身
npm i n -g  
n lastest
n statble
## 安装nvm
git clone git://github.com/creationix/nvm.git ~/nvm
cd /root/nvm
. nvm.sh
## 安装nodejs 稳定版
nvm install stable
```

### 推送tag
```js
git tag 1.00
git push origin --tags
```


```js

```