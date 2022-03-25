# 集成 webpack 基本配置的包

## 特点

1. webpack@5
2. ts
3. eslint
4. sass
5. 支持自定义 webpack 和 babel 配置

> npm i ${package-name} -D

    -  就目前而言 package-name = test-bin-he2

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

        嗯~ 差不多了 应该没啥忘记说的了把

        不行的话 应该都看的懂 webpack 文件夹都是 webpack 配置

        bin 文件时启服务的配置
