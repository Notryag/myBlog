应用层
传输控制层
网络层
链路层
物理层

```js
// 连接baidu
nc www.baidu.com 80
GET / HTTP/1.0
// 收到的就是字符串

```
先建立连接,然后跑协议(http等)

### 缓存
缓存分为强缓存和协商缓存

1. 强缓存：不会向服务器发送请求，直接从缓存中读取资源，在chrome控制台的network选项中可以看到该请求返回200的状态码;

2. 协商缓存：向服务器发送请求，服务器会根据这个请求的request header的一些参数来判断是否命中协商缓存，如果命中，则返回304状态码并带上新的response header通知浏览器从缓存中读取资源；

强缓存
cache-control:max-age=600
expires: Mon,14 Sep 2020 09:02:20 GMT
协商缓存 304
<- last-modified: Mon,14 Sep 2020 09:02:20 GMT
-> if-modified-since: Mon,14 Sep 2020 09:02:20 GMT
<- etag: W/"5f2cbe0f-2382"
-> if-none-match: W/"5f2cbe0f-2382"