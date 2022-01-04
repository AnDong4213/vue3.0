/* 
简单的分析，从输入 URL到回车后发生的行为如下： 
URL解析：首先判断你输入的是一个合法的URL 还是一个待搜索的关键词，并且根据你输入的内容进行对应操作
DNS 查询： 获取到了域名对应的目标服务器IP地址
TCP 连接： 确定目标服务器服务器的IP地址后，则经历三次握手建立TCP连接
HTTP 请求：当建立tcp连接之后，就可以在这基础上进行通信，浏览器发送 http 请求到目标服务器
响应请求： 当服务器接收到浏览器的请求之后，就会进行逻辑操作，处理完成之后返回一个HTTP响应消息
页面渲染：
  当浏览器接收到服务器响应的资源后，首先会对资源进行解析：
  查看响应头的信息，根据不同的指示做对应处理，比如重定向，存储cookie，解压gzip，缓存资源等等
  查看响应头的 Content-Type的值，根据不同的资源类型采用不同的解析方式

  解析HTML，构建 DOM 树
  解析 CSS ，生成 CSS 规则树
  合并 DOM 树和 CSS 规则，生成 render 树
  布局 render 树（ Layout / reflow ），负责各元素尺寸、位置的计算
  绘制 render 树（ paint ），绘制页面像素信息
  浏览器会将各层的信息发送给 GPU，GPU会将各层合成（ composite ），显示在屏幕上

*/

// css加载不会阻塞DOM树的解析
// css加载会阻塞DOM树的渲染
// css加载会阻塞后面js语句的执行

/* https://juejin.cn/post/6844904040346681358
https://juejin.cn/post/6928677404332425223 */

/* 
SPA SEO SSR三者有什么区别
SPA通俗的说就是单页面应用（single page application

优点
页面之间的切换非常快
一定程度减少了后端服务器的压力
后端程序只需要提供api，不需要客户端到底是web端还是手机等
缺点
首屏打开速度很慢，因为用户首次加载需要先下载SPA框架及应用程序的代码，然后再渲染页面。
不利于SEO搜索引擎优化

我们之前说SPA单页面应用，通过AJAX获取数据，这就难保证我们的页面能被搜索引擎正常收到，并且有一些搜索引擎不支持执行js和通过ajax获取数据，那就更不用提SEO了。为了解决这个问题，，SSR登场了

SSR通俗的说就是服务器端渲染(server side rendering)
优点
更快的响应时间，不用等待所有的js都下载完成，浏览器变成显示比较完整的页面
更好的SSR，我们可以将SEO的关键信息直接在后台就渲染成html，从而保证搜索引擎的爬虫都能爬取到关键数据

缺点
占用更多的cpu和内存资源
一些常用的浏览器的api可能无法正常使用，比如window，document，alert等，如果使用的话需要对运行环境加以判断
开发调试会有一些麻烦，因为涉及到了浏览器及服务器，对于SPA的一些组件的声明周期的管理会变得复杂
可能会由于某些因素导致服务器渲染的结果与浏览器端的结果不一致。

多页面应用
 每一次页面跳转的时候，后台服务器都会返回一个新的html文档，这种类型的网站也就是多页网站，也叫多页应用。

*/

/* 
http的三次握手
客户端访问服务器端的web服务的时候，需要在客户端和服务器之间创建TCP connection 的连接 。 TCP请求是在这个连接的基础上去发送的，只有在建立连接的基础上才能发送http请求。

在http的不同版本上创建的连接的时间不一样。http1.0的时候在一次访问完成后就断开。 http1.1在一次访问之后还可以保持连接。

首先 客户端机器给服务器发送一个TCP请求报文，
第一握手：发送报文中把SYN(TCP/IP建立连接时使用的握手信号)置为1，参数seq=x  然后客户端处于SYN-Sent状态，等待服务器确认
第二次握手：服务器端收到报文之后，给报文来源ip返回一个确认包，其中SYN=1 ，确认序号ACK=x+1，参数sqe=Y，此时服务器端状态为SYN-Recive，此时建立的连接为半连接（DDOS攻击就是基于这个协议来进行，使服务器产生半连接占用，导致正常用户无法访问）
第三次握手：客户端收到服务器发来的报文，确认SYN=1 ,ACK=之前自己发送的seq+1，确定已经建立半连接，然后再次向服务器发送ACK=seq+1,Seq=Z ，此时，服务器端收到该报文之后确定ACK=自己发出的seq+1，则确定第三次握手成功，建立起TCP连接。之后在两着之前经行http请求数据的发送与接收。

2.四次挥手
四次挥手也叫连接终止协议。


为什么3次
当网络原因服务端没有收到客户端的请求，且没有给客户端反馈。超时后客户端会再次向服务端发送请求。当网络畅通后服务器段收到最开始的请求并反馈给客户端。导致客户端认为自己未发送这个请求，服务端认为自己发送了一个新的请求，导致服务端性能浪费。
*/

/* 
设计模式

工厂模式
工厂模式是用来创建对象的一种最常用的设计模式，不暴露创建对象的具体逻辑，而是将将逻辑封装在一个函数中，那么这个函数就可以被视为一个工厂。
将 new 操作单独封装，遇到 new 时，就要考虑是否该使用工厂模式。(new 操作主要是出现面向对象，创建实例的过程中) <br />
创建一个类，在创建一个工厂 Creator，里面写个 create 函数，利用 create 函数创建一个类的实例并返回。<br />
通过工厂方法把构造函数和用户之间隔离，不产生耦合关系，符合设计原则。<br />
jquery-$('div')，React.createElement()*/

/* 单例模式
模式涉及到一个单一的类，该类负责创建自己的对象，同时确保只有单个实例被创建。
jquery中只有一个$，模拟登录框，vuex和redux中的store */

// 代理模式（Proxy Pattern）是为一个对象提供一个代用品，以便控制对它的访问
{
  let muti = function (...args) {
    console.log("开始计算乘积");
    var a = 1;
    for (var i = 0, l = args.length; i < l; i++) {
      a = a * args[i];
    }
    return a;
  };

  let proxyMult = (function () {
    var cache = {};
    return function (...args) {
      if (args in cache) {
        return cache[args];
      }
      //   return (cache[args] = muti.apply(this, args));
      cache[args] = muti.apply(this, args);
      return cache[args];
    };
  })();

  console.log(proxyMult(1, 2, 3, 4)); // 输出:24
  console.log(proxyMult(1, 2, 3, 4)); // 输出:24
  console.log(proxyMult(1, 2, 3, 4, 5)); // 输出:24
  // 当第二次调用 proxyMult(1, 2, 3, 4) 时，本体 mult 函数并没有被计算，proxyMult 直接返回了之前缓存好的计算结果
  // 缓存代理

  //  现在的很多前端框架或者状态管理框架都使用代理模式，用于监听变量的变化
  // 使用代理模式代理对象的访问的方式，一般又被称为拦截器，比如我们在项目中经常使用 Axios 的实例来进行 HTTP 的请求，使用拦截器 interceptor 可以提前对 请求前的数据 服务器返回的数据进行一些预处理
}

// 说说你对发布订阅、观察者模式的理解？区别？

// 一、观察者模式 -- 观察者模式定义了对象间的一种一对多的依赖关系，当一个对象的状态发生改变时，所有依赖于它的对象都将得到通知，并自动更新。
// 被观察者
{
  class Subject {
    constructor() {
      this.observerList = [];
    }
    addObserver(observer) {
      this.observerList.push(observer);
    }
    removeObserver(observer) {
      const index = this.observerList.findIndex(
        (o) => o.name === observer.name
      );
      this.observerList.splice(index, 1);
    }
    notifyObservers(message) {
      // console.log(this.observerList);
      const observers = this.observerList;
      observers.forEach((observer) => observer.notified(message));
    }
  }
  // 观察者：
  class Observer {
    constructor(name, subject) {
      this.name = name;
      if (subject) {
        subject.addObserver(this);
      }
    }

    notified(message) {
      console.log(this.name, "got message", message);
    }
  }

  // 使用代码
  const subject = new Subject();
  const observerA = new Observer("observerA", subject);
  const observerB = new Observer("observerB");
  subject.addObserver(observerB);

  subject.notifyObservers("Hello from subject");
  // subject.removeObserver(observerA);
  subject.notifyObservers("Hello again");

  console.log("--------------------------------");
}

/* 
二、发布订阅模式
发布-订阅是一种消息范式，消息的发送者（称为发布者）不会将消息直接发送给特定的接收者（称为订阅者）。而是将发布的消息分为不同的类别，无需了解哪些订阅者（如果有的话）可能存在

同样的，订阅者可以表达对一个或多个类别的兴趣，只接收感兴趣的消息，无需了解哪些发布者存在
*/
{
  class PubSub {
    constructor() {
      this.messages = {};
      this.listeners = {};
    }
    // 添加发布者
    publish(type, content) {
      const existContent = this.messages[type];
      if (!existContent) {
        this.messages[type] = [];
      }
      this.messages[type].push(content);
    }
    // 添加订阅者
    subscribe(type, cb) {
      const existListener = this.listeners[type];
      if (!existListener) {
        this.listeners[type] = [];
      }
      this.listeners[type].push(cb);
    }
    // 通知
    notify(type) {
      const messages = this.messages[type];
      const subscribers = this.listeners[type] || [];
      subscribers.forEach((cb, index) => cb(messages[index]));
    }
  }
  // 发布者代码
  class Publisher {
    constructor(name, context) {
      this.name = name;
      this.context = context;
    }
    publish(type, content) {
      this.context.publish(type, content);
    }
  }
  // 订阅者代码
  class Subscriber {
    constructor(name, context) {
      this.name = name;
      this.context = context;
    }
    subscribe(type, cb) {
      this.context.subscribe(type, cb);
    }
  }

  const TYPE_A = "music";
  const TYPE_B = "movie";
  const TYPE_C = "novel";

  const pubsub = new PubSub();

  const publisherA = new Publisher("publisherA", pubsub);
  publisherA.publish(TYPE_A, "we are young");
  publisherA.publish(TYPE_B, "the silicon valley");
  const publisherB = new Publisher("publisherB", pubsub);
  publisherB.publish(TYPE_A, "stronger");
  const publisherC = new Publisher("publisherC", pubsub);
  publisherC.publish(TYPE_C, "a brief history of time");

  const subscriberA = new Subscriber("subscriberA", pubsub);
  subscriberA.subscribe(TYPE_A, (res) => {
    console.log("subscriberA received", res);
  });
  const subscriberB = new Subscriber("subscriberB", pubsub);
  subscriberB.subscribe(TYPE_C, (res) => {
    console.log("subscriberB received", res);
  });
  const subscriberC = new Subscriber("subscriberC", pubsub);
  subscriberC.subscribe(TYPE_B, (res) => {
    console.log("subscriberC received", res);
  });

  pubsub.notify(TYPE_A);
  pubsub.notify(TYPE_B);
  pubsub.notify(TYPE_C);

  // 发布者和订阅者需要通过发布订阅中心进行关联，发布者的发布动作和订阅者的订阅动作相互独立，无需关注对方，消息派发由发布订阅中心负责

  // 两种设计模式思路是一样的
  //在观察者模式中，观察者是知道Subject的，Subject一直保持对观察者进行记录。然而，在发布订阅模式中，发布者和订阅者不知道对方的存在。它们只有通过消息代理进行通信。

  // 在发布订阅模式中，组件是松散耦合的，正好和观察者模式相反。

  // 观察者模式大多数时候是同步的，比如当事件触发，Subject就会去调用观察者的方法。而发布-订阅模式大多数时候是异步的（使用消息队列）
}

{
  // 装饰者模式
  // 装饰者模式（Decorator Pattern）就是动态的给类或对象增加方法的设计模式。
  // 适合对已拥有必备组件的对象进行扩展高阶组件或属性
}

// 策略模式（Strategy Pattern）指的是定义一系列的算法，把它们一个个封装起来，目的就是将算法的使用与算法的实现分离开来

{
  console.log(
    "----------------------------------------------------------------"
  );
  // console.log(9.3 / 0.3);
  // 字面量创建对象和new创建对象有什么区别，new内部都实现了什么，手写一个new
  // 字面量：1,字面量创建对象更简单，方便阅读 2,不需要作用域解析，速度更快

  function Foo() {
    this.name = "zhao";
    this.age = 24;
    // console.log(this);
  }

  let aa = new Foo();
  console.log(aa);
  console.log(aa.name);

  /* new: 
      创建一个新对象
    使新对象的__proto__指向原函数的prototype
    改变this指向（指向新的obj）并执行该函数，执行结果保存起来作为result
    判断执行函数的结果是不是null或Undefined，如果是则返回之前的新对象，如果不是则返回result
  */

  function myNew(fn, ...args) {
    // 创建一个空对象
    let obj = {};
    // 使空对象的隐式原型指向原函数的显式原型
    obj.__proto__ = fn.prototype;
    // this指向obj
    let result = fn.apply(obj, args);
    // console.log(result);  // undefined
    // 返回
    return result instanceof Object ? result : obj;
  }
  let bb = myNew(Foo);
  console.log(bb);
}

/* function Bar() {
  this.aaa = 9;
}
Bar();
console.log(aaa);  */ // 9

{
  // 原型和原型链
  // 原型： 原型分为隐式原型和显式原型，每个对象都有一个隐式原型，它指向自己的构造函数的显式原型。
  // 原型链： 多个__proto__组成的集合成为原型链
}

{
  /* async function async1() {
    console.log("async1 start");
    await async2();
    console.log("async1 end");
  }
  async function async2() {
    console.log("async2");
  }
  async1();
  console.log("script start"); */
  // async1 start，async2， script start，async1 end
}

/* var sss = 999;
console.log(window.sss);  */ // 999

{
  // 为什么要使用模块化？都有哪几种方式可以实现模块化，各有什么特点？
  /*
  为什么要使用模块化

    防止命名冲突
    更好的分离，按需加载
    更好的复用性
    更高的维护性
   */
  //exports和module.exports有什么区别？
  /*
    1，导出方式不一样
        exports.xxx='xxx'
        module.export = {}
    2，exports是module.exports的引用，两个指向的是用一个地址，而require能看到的只有module.exports
  */
  // JS模块包装格式有哪些？ 1，commonjs 同步运行，不适合前端。2，AMD,异步运行 3，2，CMD,异步运行
  // ES6和commonjs的区别
  /* 
    commonjs模块输出的是值的拷贝，而ES6输出的值是值的引用
    commonjs是在运行时加载，是一个对象，ES6是在编译时加载，是一个代码块
    commonjs的this指向当前模块，ES6的this指向undefined
  */
}

{
  console.log("---------------");
  // JSON.parse(JSON.stringify(obj))我们一般用来深拷贝，其过程说白了 就是利用JSON.stringify 将js对象序列化（JSON字符串），再使用JSON.parse来反序列化(还原)js对象；

  // 1、如果obj里面有时间对象，则JSON.stringify后再JSON.parse的结果，时间将只是字符串的形式。而不是时间对象；
  /* var test = {
    name: "a",
    date: [new Date(1536627600000), new Date(1540047600000)]
  };
  console.log(JSON.parse(JSON.stringify(test))); */

  // 2、如果obj里有RegExp、Error对象，则序列化的结果将只得到空对象；

  // 3、如果obj里有函数，undefined，则序列化的结果会把函数或 undefined，symbol丢失；
  // 4、如果obj里有NaN、Infinity和-Infinity，则序列化的结果会变成null
  // 5、JSON.stringify()只能序列化对象的可枚举的自有属性，例如 如果obj中的对象是有构造函数生成的， 则使用JSON.parse(JSON.stringify(obj))深拷贝后，会丢弃对象的constructor；

  function Person(name) {
    this.name = name;
    console.log(name);
  }
  const liai = new Person("liai");

  const test = {
    name: "a",
    func: function hehe() {
      console.log("fff");
    },
    haha: undefined,
    age: 8,
    date: new RegExp("\\w+"), // 空对象
    hehe: null,
    liai,
    arr: [1, 23],
    c: Symbol("dd")
  };
  // undefined、任意的函数以及 symbol 作为对象属性值时 JSON.stringify() 将跳过（忽略）对它们进行序列化
  console.log(JSON.parse(JSON.stringify(test)));
  console.log(
    JSON.stringify([
      "aaa",
      undefined,
      function aa() {
        return true;
      },
      Symbol("dd")
    ])
  ); // ["aaa",null,null,null]  undefined、任意的函数以及 symbol 作为数组元素值时，JSON.stringify() 会将它们序列化为 null

  function judgeType(obj) {
    // tostring会返回对应不同的标签的构造函数
    const toString = Object.prototype.toString;
    const map = {
      "[object Boolean]": "boolean",
      "[object Number]": "number",
      "[object String]": "string",
      "[object Function]": "function",
      "[object Array]": "array",
      "[object Date]": "date",
      "[object RegExp]": "regExp",
      "[object Undefined]": "undefined",
      "[object Null]": "null",
      "[object Object]": "object"
    };
    if (obj instanceof Element) {
      return "element";
    }
    return map[toString.call(obj)];
  }
  console.log(judgeType([]));

  function deepClone(data) {
    const type = judgeType(data);

    let obj = null;
    if (type == "array") {
      obj = [];
      for (let i = 0; i < data.length; i++) {
        obj.push(this.deepClone(data[i]));
      }
      return obj;
    } else if (type == "object") {
      obj = {};
      for (let key in data) {
        if (data.hasOwnProperty(key)) {
          obj[key] = this.deepClone(data[key]);
        }
      }
    } else {
      return data;
    }
    return obj;
  }

  console.log(deepClone(test));

  // 转换值如果有 toJSON() 函数，该函数返回什么值，序列化结果就是什么值，并且忽略其他属性的值。
  console.log(
    JSON.stringify({
      say: "hello JSON.stringify",
      toJSON: function () {
        return "today i learn";
      }
    })
  );
}

{
  console.log("------------------------------------------");

  // 图片懒加载  图片懒加载--不仅影响页面渲染速度，还浪费带宽，到可视区域再加载。
  // 当访问一个网页的时候，优先显示可视区域内的图片而不是一次性加载所有的图片，但需要显示时再发送图片请求，避免网页打开时加载过多的资源。这样可以有利于前端性能优化，减轻服务器压力以及提升用户体验。vue-lazyload

  // “预加载”顾名思义就是事先加载，它预判用户可能的操作，事先加载好可能浏览的图片，从而在用户正真访问时从缓存中快速访问，达到快速流畅的效果。而预加载分为两类，有序加载和无序加载。
}
{
  console.log("-------------------------------");

  /* function shuffle(arr) {
    for (let i = arr.length - 1; i >= 0; i--) {
      let rIndex = Math.floor(Math.random() * (i + 1));
      // 打印交换值
      console.log(i, rIndex);
      let temp = arr[rIndex];
      arr[rIndex] = arr[i];
      arr[i] = temp;
    }
    return arr;
  }

  console.log(shuffle([1, 2, 3, 4, 5, 6])); */

  /* 
  promise.all 接收一个数组，只有数组内各项状态都变成 Fulfilled状态时 ，Promise.all 的状态才会变成 Fulfilled；只要有一项被 Rejected，Promise.all就会变成 Rejected；
  返回值将会按照参数内的 promise 顺序排列，而不是由调用 promise 的完成顺序决定。

Promise.race 也接受一个 Promise 对象的数组，但是只要一项状态改变，Promise.race 状态就会改变。
  */

  /* Promise.all([Promise.reject(1), Promise.resolve(2), Promise.resolve(3)])
    .then(
      (res) => console.log(res),
      (err) => console.log(err) // 1
    )
    .catch((err) => {
      console.log(err);
    }); */

  // 要达到就算失败也能打印所有的信息
  // 我们可以把.then抽离出来。封装成一个函数，然后用map方法,对每个promise .then一下，然后返回新的数组。
  /* function handlePromise(promiseList) {
    return promiseList.map((promise) =>
      promise.then(
        (res) => ({ status: "ok", res }),
        (err) => ({ status: "not ok", err })
      )
    );
  }

  Promise.all(
    handlePromise([Promise.reject(1), Promise.resolve(2), Promise.resolve(3)])
  ).then(
    (res) => console.log(res),
    (err) => console.log(err)
  ); */

  Promise.allSettled([
    Promise.reject(1),
    Promise.resolve(2),
    Promise.resolve(3)
  ]).then((res) => {
    console.log(res);
  });

  // Promise.prototype.catch()方法是.then(null, rejection)或.then(undefined, rejection)的别名，用于指定发生错误时的回调函数。
  // then()方法指定的回调函数，如果运行中抛出错误，也会被catch()方法捕获。
  // 一般来说，不要在then()方法里面定义 Reject 状态的回调函数（即then的第二个参数），总是使用catch方法。

  // 跟传统的try/catch代码块不同的是，如果没有使用catch()方法指定错误处理的回调函数或者.then的第二个参数，Promise 对象抛出的错误不会传递到外层代码，即不会有任何反应。
  /* const someAsyncThing = function () {
    return new Promise(function (resolve, reject) {
      // 下面一行会报错，因为x没有声明
      resolve(x + 2); // x is not defined，但是不会退出进程、终止脚本执行
      // Promise 内部的错误不会影响到 Promise 外部的代码，通俗的说法就是“Promise 会吃掉错误”。
    });
  };
  someAsyncThing().then(
    function () {
      console.log("everything is great");
    }
    // (err) => {
    //   console.log(err);
    // }
  );
  // .catch((err) => {
  //   console.log(err);
  // });
  setTimeout(() => {
    console.log(123);
  }); */

  /* const promise = new Promise(function (resolve, reject) {
    resolve("ok");
    setTimeout(function () {
      throw new Error("test"); // 出现
    }, 0);
    // throw new Error("test"); // 不出现报错
  });
  promise.then(function (value) {
    console.log(value);
  }); */
}

{
  /* setTimeout(function () {
    console.log(3);
  }, 0);
  Promise.resolve().then(function () {
    console.log(2);
  });
  console.log(1); // 1,2,3 */
  // 有可能会在一个回调失败之后继续使用链式操作，即，使用一个 catch，这对于在链式操作中抛出一个失败之后，再次进行新的操作会很有用。
  /* new Promise((resolve, reject) => {
    console.log("初始化");
    resolve();
  })
    .then(() => {
      throw new Error("有哪里不对了");
      console.log("执行「这个」”");
    })
    .catch(() => {
      console.log("执行「那个」--出错了");
    })
    .then(() => {
      console.log("执行「这个」，无论前面发生了什么");
    }); */
  /* 初始化
    执行「那个」--出错了
    执行「这个」，无论前面发生了什么 */
}

{
  /* (function () {
    var a = (b = 5);
  })();
  console.log(a);
  console.log(b); */
}

{
  // 10.前端工程化
  /* 
  
  一般来说前端工程包含，项目初始化，项目开发，提交，构建，部署，测试，监控等流程。工程化就是以工程的角度来解决这些问题。比如项目初始化我们一般使用npm init, 创建页面模板使用plop，我们喜欢使用ES6+开发，但是需要通过babel编码成ES5，持续集成的时候我们使用git/ci cd，但是为了保持开发规范我们引入了ESLint，部署一般使用git/cd或者jenkins等等。*/
}
