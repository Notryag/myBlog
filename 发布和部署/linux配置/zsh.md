# zsh配置

使用zsh而不是默认的bash

```bash
apt-get update
# 查看所有的shell
cat /etc/shells
# 查看当前使用的shell
echo $SHELL
# 切换到zsh
chsh -s /bin/zsh
# 安装zimfw
curl -fsSL https://raw.githubusercontent.com/zimfw/install/master/install.zsh | zsh
```