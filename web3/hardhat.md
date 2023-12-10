# hardhat

## hardhat 用来模拟本地环境，编译合约等

**必须先初始化项目**

```bash
npm init -y
npm install hardhat -S
```
只有运行`npx hardhat init`
能够正常添加依赖等信息

```bash
# 初始化
npx hardhat init
# 常用命令
npx hardhat help
# 测试
npx hardhat test
REPORT_GAS=true npx hardhat test
# 启动node服务
npx hardhat node
# 部署
npx hardhat run scripts/deploy.ts
# 部署到指定网络
npx hardhat run --network localhost scripts/deploy.ts
```