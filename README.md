# 反物质维度 手动翻译版

基于 [aquamarine309](https://github.com/aquamarine309) 的 [AntimatterDimensionsJSModules](https://github.com/aquamarine309/AntimatterDimensionsJSModules)。

大部分翻译来自于安卓版的翻译。

## 部分翻译标准

- 括号保留半角括号（`()`），其余符号均使用全角。
- 全角符号前后不使用空格。
- 括号外空一格，括号内不空格。
- 大部分情况下，中文与数值之间需要插入空格。
- 大部分情况下，中文之间不应当出现空格。
- 使用“倍率”而不是“乘数”。

## 本地运行

要在本地运行，首先需要安装 [node.js](https://nodejs.org/zh-cn)。

之后，需要安装 [http-server](https://www.npmjs.com/package/http-server)，在命令行运行下列指令即可：

```
npm install http-server -g
```

最后，在仓库文件夹内，运行下列指令：

```
http-server -c-1 .
```

即可建立本地运行服务器。根据输出的指示，打开本地服务器的地址即可。