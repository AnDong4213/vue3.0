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

### 转换资源 URL 的好处是：
```
    file-loader 可以指定要复制和放置资源文件的位置，以及如何使用版本哈希命名以获得更好的缓存。此外，这意味着 你可以就近管理图片文件，可以使用相对路径而不用担心部署时 URL 的问题。使用正确的配置，webpack 将会在打包输出中自动重写文件路径为正确的 URL。

    url-loader 允许你有条件地将文件转换为内联的 base-64 URL (当文件小于给定的阈值)，这会减少小文件的 HTTP 请求数。如果文件大于该阈值，会自动的交给 file-loader 处理。
```

### 在 setup 内注册生命周期钩子
```
为了使组合式 API 的功能和选项式 API 一样完整，我们还需要一种在 setup 中注册生命周期钩子的方法。这要归功于 Vue 导出的几个新函数。组合式 API 上的生命周期钩子与选项式 API 的名称相同，但前缀为 on：即 mounted 看起来会像 onMounted。  这些函数接受一个回调，当钩子被组件调用时，该回调将被执行。
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
