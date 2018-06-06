# koa2-template

### 目录结构

```
|-- koa2-demo
    |-- .editorconfig
    |-- .gitignore
    |-- app.js
    |-- index.html
    |-- package-lock.json
    |-- package.json
    |-- README.md
    |-- bin
    |   |-- www
    |-- config // 配置文件
    |   |-- db.js // 数据库配置
    |   |-- mail.js // 邮箱和授权码
    |   |-- wechat.js  // 微信配置
    |-- controllers
    |   |-- apiController.js // api
    |   |-- logController.js // 日志
    |   |-- uploadCtrl.js // 上传文件
    |   |-- wechatCtrl.js // 微信相关
    |-- middlewares
    |   |-- log.js  //日志
    |   |-- mail.js // 发送邮件
    |   |-- response.js // 响应
    |   |-- socket.js // socket中间件
    |-- model
    |   |-- db.js // 数据库连接
    |   |-- logModel.js
    |   |-- userModel.js
    |-- public
    |   |-- images
    |   |-- javascripts
    |   |-- stylesheets
    |       |-- style.css
    |-- routes
    |   |-- api.js
    |   |-- index.js
    |-- upload // 上传文件到这个文件夹
    |-- views
        |-- error.pug
        |-- index.pug
        |-- layout.pug
```

> make koa2 backstage project faster & easy start !
