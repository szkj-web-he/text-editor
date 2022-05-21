# 集成 webpack 基本配置的包

## 特点

1. webpack@5
2. ts
3. eslint
4. sass
5. 支持自定义 webpack 和 babel 配置

> npm i he-webpack -D

## 如何使用这个包

1. 检查项目的 package.json 和这个包里重复的依赖，可以将它从项目里删除

    - 注：不要 npm un,仅仅只是从 package.json 里删除

2. 将项目里的 package.json 更改如下

    - ```javascript
      "scripts": {
      	"start": "datareachable dev",
      	"build": "datareachable build",
      	"build-dev": "datareachable build-dev",
      }
      ```
    - build-dev 可以生产一个 **生产模式的测试版** 的环境变量 `process.env.PRO_DEV`

3. 支持自定义配置 在 package.json 下创建 datareachable.config.js 可以合并配置

4. 版本控制 App\_`版本`(eg:App_v2),它可以自动识别 V2 并作为公共路径;

5. 集成了 Roboto 字体
   使用方法: font-family: "Roboto";
   也可以使用 class => '.font-roboto'

6. 集成了 Alibaba PuHuiTi 字体
   使用方法： font-family: "alipuhui";
   也可以使用 class => '.font-puhui'
