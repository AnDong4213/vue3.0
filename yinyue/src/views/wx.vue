<template>
  <div class="wxchat">

    <a href="javascript:window.location.href='weixin://moments'">打开微信</a>
    <a href="alipay://">打开微信</a>

    <a class="btn"
       @click="upApp1"
       ref="btn">打开微信3</a>
    <h1 @click="upApp2">upApp92</h1>
  </div>
</template>

<script>
// import wx from '@/assets/js/jweixin-1.6.0'
import Clipboard from '@/assets/js/clipboard'
import CallApp from 'callapp-lib'

export default {
  name: 'm-wx',
  data() {
    return {
      instance: null,
      gg: 99
    }
  },
  created() {
    // console.log(Clipboard)
    console.log(document)
    console.log(window.navigator.userAgent)
    alert(window.navigator.userAgent.toLowerCase())
    alert(window.navigator.userAgent.toLowerCase().includes('micromessenger'))
  },
  mounted() {
    // this.upApp1()
    // console.log(document.querySelector('.btn'))
    console.log(this.$refs.btn)
    // document.querySelector('.btn').click()
    // this.$refs.btn.click()
  },
  methods: {
    getUserAgent() {
      alert(navigator.userAgent)
    },
    upApp1() {
      // eslint-disable-next-line no-new
      const instance = new Clipboard('.btn', {
        text: function() {
          return 'https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzU5MzcyMzc2OQ==#wechat_redirect'
          // return 'http://pay-zjjg-xt-test.bobfintech.com.cn:8025/capital-supervision-h5-tencent/payPage/AddBankRefund?orderNo=2022052301000001&shortLink=1'
          // return 'http://supervision.natapp1.cc/YBFrqe339911'
        }
      })
      console.log(instance)
      // this.instance = instance
      instance.on('success', function(e) {
        // alert('文字已复制到剪贴板中')
        console.log(e.text)
      })

      instance.on('error', function(e) {
        alert('异常错误： ' + JSON.stringify(e.message))
        console.log(e)
      })
      const a = this.$refs.btn
      a.href = 'weixin://'
      // alert(88)
      // instance.destroy()
    },
    upApp2() {
      const options = {
        scheme: {
          protocol: 'weixin' // 必填项 URL Scheme 的 scheme 字段，要打开的 APP 的标识，比如这里是微信的标识
        },
        intent: {
          // 安卓原生谷歌浏览器必须传递 Intent 协议地址，才能唤起 APP
          // 这两个是intent的必填项
          package: 'com.tencent.mm', // 腾讯微信包名
          scheme: 'weixin'
        },
        // appstore: 'https://weixin.qq.com/', // 必填项 APP 的下载地址，比如这里是微信的下载地址

        /* yingyongbao:
          'https://sj.qq.com/myapp/detail.htm?apkName=com.tencent.mm', // 必填项 APP 的应用宝地址，比如这里微信的应用宝下载地址 */

        fallback: location.href // 必填项 唤起app端失败后跳转的地址。
      }

      // callapp-lib 中传递出来的是一个类，你需要将它实例化，然后才能去调用实例对象的方法
      const callLib = new CallApp(options)
      console.log(callLib)
      callLib.open({
        // 如果只是唤起app，不需要打开app的某个页面，填空字符串就可以
        path: '',
        // 打开app某个页面，需要接收的参数。如果没有就不用写
        param: {
          url:
            'https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzU5MTMzMDcwNw==#wechat_redirect'
        }
      })
    }
    /* getPath() {
      console.log(this.$route.path)
    } */
  },
  watch: {
    // $route: 'getPath'
  },
  beforeRouteLeave() {
    // console.log(this)
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      // 通过 `vm` 访问组件实例
      console.log(vm)
      console.log(vm.$refs.btn)
      if (vm.$refs) {
        // vm.$refs.btn.click()
      }
    })
  }
  /* beforeUnmount() {
    alert(99)
    this.instance.destroy()
  } */
  // unmounted() {}
}
</script>

<style lang="scss" scoped>
.wxchat {
  height: 300px;
  text-align: center;
  padding-top: 30px;
  p,
  a {
    margin: 20px;
    color: azure;
  }
  h1 {
    margin-top: 20px;
  }
  .btn {
    color: red;
    // visibility: hidden;
  }
}
</style>
