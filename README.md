# vue-spa-kit

Vue3 SPA 脚手架

## 使用

```shell

# 安装依赖
$ pnpm install

# 复制环境配置文件
$ cp .env.development.example .env.development

# 启动
$ pnpm start
```

## 命名规范

- 文件/文件夹命名：小写、中划线分割

## 注意事项

- `/src/entry` 目录为 webpack 入口文件，多个文件夹表示多个入口，文件夹内的 index 文件为入口文件

- 会自动全局注册 src/component/base/ 文件夹下的组件(只匹配 base-*.vue 命名的组件，其他命名方式不会注册)

- /static 下的文件将会被复制到根目录