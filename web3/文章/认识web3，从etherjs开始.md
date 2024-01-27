# 以认识 Web3，从 ethers.js 开始

## 引言

在区块链技术的发展中，Web3 成为连接用户与区块链的桥梁，而 ethers.js 则是构建这座桥梁的主要工具之一。本文将带您深入探索 ethers.js，理解其在以太坊开发中的重要性，以及如何通过它开始您的 Web3 之旅。

在我的理解中，链可以大概理解为一种云数据库，我们通过合约部署相当于云函数，可以存储数据和方法。然后通过接口请求调用合约上面的方法实现交互。

ethers就是我们和合约交互的封装的库，可以方便的利用ethers实现各种交互。如果不用ethers我们直接curl也是可以交互的，只是它封装了一些常用的方法。

从ethers开始了解web3是最直接的方法，如果一开始直接看合约可能会摸不着头脑。

## 基础信息

在以太坊交易中，Gas 费用通常以 Gwei 表示，而 Ether 则是用于表示账户余额、转账数量等。因此，在进行交易时，你可能会看到 Gas 费用以 Gwei 表示，而账户余额和转账数量以 Ether 表示。

| 单位    | Wei 值           | 等价值                      |
|---------|------------------|-----------------------------|
| Wei     | 1                | 1 Wei                       |
| Gwei    | 10^9             | 1 Gwei = 10^9 Wei           |
| Ether   | 10^18            | 1 Ether = 10^18 Wei         |


## 什么是 Web3？

Web3 是指下一代互联网，它将区块链技术与传统的 Web 应用程序连接起来，使用户能够直接与去中心化应用（DApps）、智能合约以及区块链网络进行交互。

## 认识 ethers.js

> etherjs 为什么能够和区块链进行交互，这主要是因为它基于以太坊网络提供的 JSON-RPC 接口进行交互的。以太坊节点通过 JSON-RPC 接口暴露了一系列方法，用于查询区块链状态、发送交易、部署智能合约等操作。利用这些 JSON-RPC 方法与以太坊节点进行通信，从而与以太坊网络进行交互。因此，ethers.js 可以通过与以太坊节点进行通信，与以太坊网络进行交互

ethers可以做到

- **以太坊钱包管理：** ethers.js 提供了创建、导入和管理以太坊钱包的功能。您可以轻松生成公钥、私钥、地址，并处理助记词（mnemonic）等操作。

- **智能合约交互：** 通过 ethers.js，您可以部署、调用和与智能合约进行交互。它提供了简单易用的 API，使开发人员能够直接与智能合约进行通信。

- **交易处理：** ethers.js 简化了交易管理的过程，包括交易的签名、发送以及 Gas 费用的管理。它还提供了非常方便的接口来处理以太坊网络上的交易。

- **区块链数据访问：** 您可以使用 ethers.js 轻松地查询以太坊区块链上的数据，包括查询区块、交易、余额以及事件等。

### 基本使用方法
先新建一个项目，添加etherjs依赖

```bash
pnpm init
pnpm add ethers
touch index.js

node index.js
```

通过ethers 获取链上的相关信息
```js
import { ethers, formatEther } from "ethers";

const network = 'mainnet'

const provider = new ethers.AlchemyProvider(network, key)

let blockNumber = await provider.getBlockNumber();
console.log(blockNumber);

const balance = await provider.getBalance('vitalik.eth');
console.log(formatEther(balance))

const networkCurrency = await provider.getNetwork();
console.log(networkCurrency)

const txCount = await provider.getTransactionCount('vitalik.eth');
console.log(txCount)

const feeData = await provider.getFeeData();
console.log(feeData)

const zeroBlock = await provider.getBlock(0);
console.log(zeroBlock)

```

### 智能合约交互
可以通过ethers创建合约实例，创建的合约实例，可以读取合约上面的属性和调用合约上面的各种方法，从而实现链上交互
```js
const contract = new ethers.Contract(addressDAI, abiERC20, provider)
```
其中addressDAI，abiERC20都是创建个合约的时候生成的
```js
async function getContractInfo() {
    const abiERC20 = [
        "function name() view returns (string)",
        "function symbol() view returns (string)",
        "function totalSupply() view returns (uint256)",
        "function balanceOf(address) view returns (uint)",
        "event Transfer(address indexed from, address indexed to, uint value)"
    ];
    const addressDAI = '0x6B175474E89094C44Da98b954EedeAC495271d0F' // DAI Contract
    const contractDAI = new ethers.Contract(addressDAI, abiERC20, provider)
    // 1. 读取DAI合约的链上信息（IERC20接口合约）
    const nameDAI = await contractDAI.name()
    const symbolDAI = await contractDAI.symbol()
    const totalSupplDAI = await contractDAI.totalSupply()
    console.log("\n1. 读取DAI合约信息")
    console.log(`合约地址: ${addressDAI}`)
    console.log(`名称: ${nameDAI}`)
    console.log(`代号: ${symbolDAI}`)
    console.log(`总供给: ${formatEther(totalSupplDAI)}`)
    const balanceDAI = await contractDAI.balanceOf('vitalik.eth')
    console.log(`Vitalik持仓: ${formatEther(balanceDAI)}\n`)
}

```

### 监听链上事件

```js
contractDAI.once('Transfer', (from, to, amount, event) => {
    // The to will always be "address"
    console.log(`I got ${formatEther(amount)} from ${from}.`);
});

```


## 深入研究和进阶话题

除了基本功能外，ethers.js 还提供了许多高级功能和进阶话题，如事件过滤、Gas 费用估算、钱包恢复等。您可以深入研究这些话题，以提升对以太坊开发的理解和技能。

## 社区和资源

- ethers.js 官方文档：[https://docs.ethers.io/](https://docs.ethers.io/)
- ethers.js GitHub 仓库：[https://github.com/ethers-io/ethers.js/](https://github.com/ethers-io/ethers.js/)
- 以太坊开发者社区论坛：[https://ethereum.stackexchange.com/](https://ethereum.stackexchange.com/)

## 结论

ethers.js 是开发者进入 Web3 世界的重要工具之一，它提供了丰富的功能和简洁的 API，使以太坊开发变得更加容易和便捷。通过学习和掌握 ethers.js，您将能够构建更加强大和创新的去中心化应用程序，并深入了解区块链技术的应用与发展。

## 最后的思考

开始您的 Web3 之旅，从 ethers.js 开始。不断学习、探索，并与开发者社区分享您的经验和成果，共同推动区块链技术的发展与应用。
