# 集成webpack基本配置的包

## 特点
1. webpack@5
4. ts
5. eslint
6. sass
7. 支持自定义webpack和babel配置

> npm i ${package-name} -D
    -  就目前而言 package-name = test-bin-he2

## 如何使用这个包
1. 检查项目的package.json和这个包里重复的依赖，可以将它从项目里删除
    -   注：不要 npm un,仅仅只是从package.json里删除
    
2. 将项目里的package.json更改如下
    - ``` javascript
      "scripts": {
      	"start": "datareachable dev",
      	"build": "datareachable build",
      	"build-dev": "datareachable build-dev",
      } 
      ```
      
    - build-dev可以生产一个  **生产模式的测试版** 的环境变量 ```process.env.PRO_DEV``` 
    
      嗯~ 差不多了 应该没啥忘记说的了把
    
      不行的话 应该都看的懂  webpack文件夹都是webpack配置
    
      bin文件时启服务的配置
