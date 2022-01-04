/* 

防抖
函数防抖（debounce）：当持续触发scroll事件，不会执行handle函数，当停止scroll事件的一段时间（1000毫秒）之后事件处理函数才会执行一次。 如果设定的时间到来之前，又一次触发了事件，就重新开始延时。
*/
// 每打一个字就监听到了，就很耗性能。
const input1 = document.getElementById("input1");
let timer = null;
input1.addEventListener("keyup", function () {
  if (timer) {
    clearTimeout(timer);
  }
  timer = setTimeout(() => {
    console.log(input1.value);
    timer = null;
  }, 200);
});

/* let aa = setTimeout(() => {
  console.log(88);
}, 2000);
setTimeout(() => {
  clearTimeout(aa); // 不会打印88
}, 1000); */
function debounce(fn, wait = 500) {
  let timer2 = null;

  return function (...args) {
    if (timer2) {
      clearTimeout(timer2);
    }
    timer2 = setTimeout(() => {
      fn.apply(this, args);
    }, wait);
  };
}
// 处理函数
function handle(a) {
  console.log(Math.random());
  console.log(a);
}
// window.addEventListener("resize", debounce(handle, 200));

/* 
函数节流
函数节流（throttle）：当持续触发事件时，保证一定时间段内只调用一次事件处理函数。
*/
function throttle(fn, delay) {
  let timer1 = null;

  return function (...args) {
    if (!timer1) {
      timer1 = setTimeout(() => {
        fn.apply(this, args);
        timer1 = null;
      }, delay);
    }
  };
}
// window.addEventListener("resize", throttle(handle, 500));

// 3. 函数柯里化
//是把接受多个参数的函数变换成接受一部分参数的函数，并且返回接受余下参数且返回结果的新函数
const curryIt = (func, ...args) => {
  // 获取函数的参数个数
  const fnLen = func.length;

  return function (...innerArgs) {
    innerArgs = args.concat(innerArgs);
    // 参数未搜集足的话，继续递归搜集
    if (innerArgs.length < fnLen) {
      return curryIt.call(this, func, ...innerArgs);
    } else {
      // 否则拿着搜集的参数调用func
      func.apply(this, innerArgs);
    }
  };
};
const add = curryIt((num1, num2, num3) => {
  console.log(num1, num2, num3, num1 + num2 + num3);
});
// add(1)(2)(3); // 1 2 3 6
// add(4, 5)(6); // 4 5 6 15
add(4, 5, 6); // 4 5 6 15

{
  // 实现一个call方法，模拟call和apply方法
  // 1,将方法fn添加成对象obj的属性，delete删除了obj上的fn方法
  let name = "时间跳跃";
  let obj = {
    name: "----听风是风"
  };

  function fn(a, b, c) {
    console.log(a + b + c + this.name);
  }
  Function.prototype.call_ = function (obj) {
    var args = [];
    // 注意i从1开始
    for (var i = 1, len = arguments.length; i < len; i++) {
      args.push("arguments[" + i + "]");
    }
    obj.fn = this; // 此时this就是函数fn
    eval("obj.fn(" + args + ")"); // 执行fn
    delete obj.fn; //删除fn
  };
  fn.call_(obj, "我的", "名字", "是");

  Function.prototype.myCall = function () {
    var ctx = arguments[0] || window;
    ctx.fn = this;

    var args = [];
    for (var i = 1; i < arguments.length; i++) {
      args.push(arguments[i]);
    }
    var result = ctx.fn(...args);
    delete ctx.fn;

    return result;
  };
  fn.myCall(obj, "我的call", "名字", "是");

  Function.prototype.myApply = function () {
    var ctx = arguments[0] || window;
    ctx.fn = this;

    if (!arguments[1]) {
      var result = ctx.fn();
      delete ctx.fn;
      return result;
    }
    var result = ctx.fn(...arguments[1]);
    delete ctx.fn;

    return result;
  };
  fn.myApply(obj, ["我的apply", "名字", "是"]);
}

{
  // js 手动实现bind方法，
  let obj = {
    z: 1
  };
  let obj1 = {
    z: 2
  };

  function fn(x, y) {
    console.log(x + y + this.z);
  }
  fn.prototype.age = 26;

  // bind并不是立即执行，而是返回一个新函数，且新函数的this无法再次被修改，支持函数柯里化
  // 返回的bound函数在调用时得考虑new调用与普通调用，毕竟两者this指向不同。
  // 构造函数实例的constructor属性永远指向构造函数本身

  Function.prototype.myBind = function (obj) {
    if (typeof this !== "function") {
      throw new Error(
        "Function.prototype.bind - what is trying to be bound is not callable"
      );
    }
    var args = Array.prototype.slice.call(arguments, 1);
    var fn = this;
    //创建中介函数
    var fn_ = function () {};
    var bound = function (...params) {
      // var params = Array.prototype.slice.call(arguments);
      //通过constructor判断调用方式，为true this指向实例，否则为obj
      fn.apply(this.constructor === fn ? this : obj, args.concat(params));
      // console.log(this);
    };
    fn_.prototype = fn.prototype;
    bound.prototype = new fn_();

    return bound;
  };

  let bound2 = fn.myBind(obj, 2);
  bound2(3);
  // let person = new bound2(3);
  // console.log(person.age);

  /* function myNew(fn, ...args) {
    // 创建一个空对象
    let obj = {};
    // 使空对象的隐式原型指向原函数的显式原型
    obj.__proto__ = fn.prototype;
    // this指向obj
    let result = fn.apply(obj, args);
    // console.log(result);  // undefined
    // 返回
    return result instanceof Object ? result : obj;
  } */

  /* const instanceOf = function (A, B) {
    let p = A;
    while (p) {
      if (p === B.prototype) {
        return true;
      }
      // p = p.__proto__;
      p = Object.getPrototypeOf(p);
    }
    return false;
  }; */
  // prototype是函数特有，普通对象只有__proto__，两者指向相同
}

{
  console.log("--------------------------------");
  // 实现一个函数，n秒后执行函数func
  const sleep = (func, delay) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(func());
      }, delay);
    });
  };

  sleep(() => console.log(9), 1000);
}
