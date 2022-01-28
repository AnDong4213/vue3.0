## Vue Loader

```java
    // 当 Vue Loader 编译单文件组件中的 <template> 块时，它也会将所有遇到的资源 URL 转换为 webpack 模块请求。
    <img src="../image.png">

    createElement('img', {
    attrs: {
        src: require('../image.png') // 现在这是一个模块的请求了
    }
    })
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
