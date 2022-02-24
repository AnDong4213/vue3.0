async function async1() {
  console.log("1"); 
  await async2();
  console.log("2"); 
  Promise.resolve('9').then(res => console.log(res))
}

async function async2() {
  console.log("3"); 
}

async1();

new Promise(function (resolve) {
  console.log("4"); 
  resolve();
  console.log("5");
}).then(function () {
  console.log("6");
});

setTimeout(function () {
  console.log("7"); 
});

console.log("8"); 

// 1 3 4 5 8  2 6 9  7

// var age = 8;

const obj = {
  age: 4,
  getAge() {
    console.log(this);
    console.log(this.age);
  },
  getAge2: () => {
    console.log(this);
    console.log(this.age);
  }
};

obj.getAge();
obj.getAge2();

/* document.body.style = "background:blue";
setTimeout(function () {
  document.body.style = "background:black";
}, 1000); */

{
  console.log("-------------------------------------------");
  // JavaScript笔记：封箱与开箱
  // 包装器（wrapper）  手动封箱（不建议）：
  let a = new String("abc"); // String {'abc'}
  console.log(a);
  console.log(typeof a); // object
  console.log(a instanceof String); // true
  console.log(Object.prototype.toString.call(a)); // [object String]
  console.log(a.toString());

  // 内建原生类型函数（比如String()、Number()、Boolean()等）似乎可以用来构建原生值，但返回的实际上是一个包装后的原生值，一个对象。

  // 封箱包装器
  // 如果对原生值访问属性或方法，比如str.length或者num.toString()，JS会自动对值进行封箱，以便访问。
  let aa = 99;
  console.log(typeof aa.toString());
  console.log("99".length);

  // 开箱  使用valueOf()方法
  let aaa = new String("abc");
  console.log(aaa);
  console.log(aaa.valueOf());
  console.log(aaa + ""); // 也可以利用隐式类型转换：
}

{
  let arr = [];

  setTimeout(() => arr.push(6), 0);
  arr.push(1);
  const p = new Promise((resolve) => {
    arr.push(2);
    resolve();
  });
  arr.push(3);
  p.then(() => arr.push(5));
  arr.push(4);
  setTimeout(() => arr.push(7), 0);

  setTimeout(() => {
    // 应该输出 [1,2,3,4,5,6,7]
    // 在 iOS 小程序环境，这里会输出 [1,2,3,4,6,5,7]
    console.log(arr);
  }, 0);
}

{
  new Promise(() => {
    console.log(9900);
  });
}
