<template>
  <nav class="navbar navbar-dark bg-primary justify-content-between mb-4 px-4">
    <router-link class="navbar-brand"
                 to="/">者也专栏</router-link>
    <ul v-if="!user.isLogin"
        class="list-inline mb-0">
      <li class="list-inline-item">
        <router-link to="/login"
                     class="btn btn-outline-light my-2">登陆</router-link>
      </li>
      <li class="list-inline-item">
        <router-link to="/signup"
                     class="btn btn-outline-light my-2">注册</router-link>
      </li>
    </ul>
    <ul v-else
        class="list-inline mb-0">
      <li class="list-inline-item">
        <dropdown @item-clicked="gaga"
                  :title="`你好 ${user.nickName}`">
          <dropdown-item closeAfterClick>
            <router-link to="/create"
                         class="dropdown-item">新建文章</router-link>
          </dropdown-item>
          <dropdown-item closeAfterClick>
            <router-link :to="`/column/${user.column}`"
                         class="dropdown-item">我的专栏</router-link>
          </dropdown-item>
          <dropdown-item closeAfterClick>
            <router-link to='/edit'
                         class="dropdown-item">编辑资料</router-link>
          </dropdown-item>
          <dropdown-item closeAfterClick><a href="#"
               class="dropdown-item"
               @click="handleLogout">退出登陆</a>
          </dropdown-item>
        </dropdown>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { useRouter } from "vue-router";
import Dropdown from "@/components/Dropdown.vue";
import DropdownItem from "@/components/DropdownItem.vue";
import store, { UserProps } from "@/store";
import createMessage from "@/components/createMessage";

export default defineComponent({
  name: "GlobalHeader",
  props: {
    user: {
      type: Object as PropType<UserProps>,
      required: true
    }
  },
  setup() {
    const router = useRouter();

    const handleLogout = () => {
      store.commit("logout");
      createMessage("退出登录成功，2秒后跳转到首页", "success", 2000);
      setTimeout(() => {
        router.push("/");
      }, 2000);
    };

    const gaga = (p: any) => {
      console.log('p---', p.props)
    }

    return {
      handleLogout,
      gaga
    };
  },
  components: {
    Dropdown,
    DropdownItem
  }
});
</script>
