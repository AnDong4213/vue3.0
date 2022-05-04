const registerRouter = require('./backend/router')

module.exports = {
  css: {
    loaderOptions: {
      sass: {
        // 全局引入变量
        additionalData: `
          @import "@/assets/scss/variable.scss";
          @import "@/assets/scss/mixin.scss";
        `
      }
    }
  },
  devServer: {
    before(app) {
      registerRouter(app)
    }
  },
  configureWebpack: (config) => {
    if (process.env.npm_config_report) {
      const BundleAnalyzerPlugin =
        require('webpack-bundle-analyzer').BundleAnalyzerPlugin
      config.plugins.push(new BundleAnalyzerPlugin())
    }
  }
}

// 前端模块体系
/*
  在 ES6 之前，社区制定了一些模块加载方案，最主要的有 CommonJS 和 AMD 两种。
  ES6 模块的设计思想是尽量的静态化，使得编译时就能确定模块的依赖关系，以及输入和输出的变量。CommonJS 和 AMD 模块，都只能在运行时确定这些东西。
  ES6 模块不是对象，而是通过export命令显式指定输出的代码，再通过import命令输入。

  export命令规定的是对外的接口，必须与模块内部的变量建立一一对应关系。
  // 报错
  export 1;

  // 报错
  var m = 1;
  export m;
  1只是一个值，不是接口。

  export语句输出的接口，与其对应的值是动态绑定关系，即通过该接口，可以取到模块内部实时的值。CommonJS 模块输出的是值的缓存，不存在动态更新，
  export var foo = 'bar';
  setTimeout(() => foo = 'baz', 500);
  输出变量foo，值为bar，500 毫秒之后变成baz。

  注意，import命令具有提升效果，会提升到整个模块的头部，首先执行。
  foo();
  import { foo } from 'my_module';
  这种行为的本质是，import命令是编译阶段执行的，在代码运行之前。

  import语句是 Singleton 模式。

  使用整体加载，即用星号（*）指定一个对象，所有输出值都加载在这个对象上面。
  import * as circle from './circle';

  export default就是输出一个叫做default的变量或方法，然后系统允许你为它取任意名字。

  CommonJS 模块输出的是一个值的拷贝，ES6 模块输出的是值的引用。
  CommonJS 模块是运行时加载，ES6 模块是编译时输出接口。
  CommonJS 模块的require()是同步加载模块，ES6 模块的import命令是异步加载，有一个独立的模块依赖的解析阶段。

*/

// ['1', '2', '3'].map(parseInt)
// CSS伪类与伪元素   https://blog.csdn.net/m0_37686205/article/details/88396191
