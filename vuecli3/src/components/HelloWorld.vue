<template>
  <div class="hello">
    <h1 @click="eventHandle">{{ msg }}</h1>
    <p>Original message: "{{ message }}"</p>
    <p>Computed reversed message: "{{ reversedMessage }}"</p>
    <input v-model="message" />
    <el-button type="primary">乐乐</el-button>
    <el-switch v-model="q"></el-switch>

    <el-switch v-model="value"
               active-color="#13ce66"
               inactive-color="#ff4949">
    </el-switch>

    <div class="router-link">
      <div>
        <router-link to='/axios'>axios</router-link>
      </div>
      <div>
        <router-link to='/echarts'>echarts</router-link>
      </div>
      <div>
        <router-link to='/model'>model</router-link>
      </div>
      <div>
        <router-link to='/test'>test</router-link>
      </div>
      <div>
        <router-link to='/mixins'>mixins</router-link>
      </div>
      <div>
        <router-link to='/other'>other</router-link>
      </div>
      <div>
        <router-link to='/eventbus'>eventbus</router-link>
      </div>
      <div>
        <router-link to='/tree'>tree</router-link>
      </div>
      <div>
        <router-link to='/tree2'>tree2</router-link>
      </div>
      <div>
        <router-link to='/docs'>docs</router-link>
      </div>
      <div>
        <router-link to='/docs2'>docs2</router-link>
      </div>
      <div>
        <router-link to='/introjs'>introJs</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "ts-axios-andong";
import { pTest, pTest2 } from "@/utils/test";
import { xhr } from "@/utils/module";

export default {
  name: "HelloWorld",
  props: {
    msg: {
      type: String,
      default: "智慧易"
    }
  },
  created() {
    // this.init();
    // this.getClipboardData();
  },
  data() {
    return {
      message: "Hello",
      q: true,
      value: true
    };
  },
  computed: {
    // 计算属性的 getter
    reversedMessage() {
      // `this` 指向 vm 实例
      return this.message
        .split("")
        .reverse()
        .join("");
    }
  },
  methods: {
    init() {
      pTest({
        method: "GET",
        url: "/base/post"
      })
        .then(res => {
          res.age += 1;
          return res;
        })
        .then(res => {
          window.console.log(res);
        });
      async function test() {
        const user = await pTest2({
          method: "POST"
        });
        window.console.log(user);
      }
      test();
      xhr({ a: "AA" })
        .then(res => {
          res.age += "BB";
          return res;
        })
        .then(res => {
          res.age += "CC";
          return res;
        })
        .then(
          res => {
            console.log(res);
          },
          err => {
            window.console.log(err);
          }
        )
        .catch(err => {
          window.console.log(err);
        });
      /* Promise.resolve("H")
        .then(res => {
          res += "e";
          return res;
        })
        .then(res => {
          res += "llo";
          return res;
        })
        .then(res => {
          window.console.log(res); // Hello
          window.console.log(typeof undefined === "undefined"); // true
        }); */
    },
    eventHandle() {
      // window.console.log(this.reversedMessage);
      this.message = "68123";
    },
    async getClipboardData() {
      const { data } = await axios.get("http://47.95.119.91:8664/xd/imp", {
        params: {
          adp: 1,
          cp: 1,
          prd: 1,
          camp: 1,
          crt: 1,
          lgID: 1
        }
      });
      console.log(data.data);
      try {
        await window.navigator.clipboard.writeText(data.data);
      } catch (err) {
        console.error("Failed to copy: ", err);
      }
    }
  },
  watch: {
    q(newVal, oldVal) {
      console.log(newVal, oldVal);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h1 {
  margin: 40px 0 0;
  cursor: pointer;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.router-link {
  display: flex;
  div {
    margin: 10px;
  }
}
</style>
