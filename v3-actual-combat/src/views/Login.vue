<template>
  <div class="login-page mx-auto p-3 w-330">
    <h5 class="my-4 text-center">登录到者也</h5>
    <validate-form @form-submit="onFormSubmit">
      <div class="mb-3">
        <label for="form-label"
               class="form-label">邮箱地址</label>
        <validate-input :rules="emailRules"
                        v-model="emailVal"
                        type='text'
                        foo-bar="乐乐"
                        placeholder='请输入邮箱地址' />
      </div>
      <div class="mb-3">
        <label class="form-label">密码</label>
        <validate-input type="password"
                        placeholder="请输入密码"
                        :rules="passwordRules"
                        v-model="passwordVal" />
      </div>
      <!-- <template v-slot:submit>
        <span class="btn btn-danger">Submit</span>
      </template> -->
      <template #submit>
        <button type="submit"
                class="btn btn-primary btn-block btn-large">登录</button>
      </template>
    </validate-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import ValidateInput, { RulesProp } from "@/components/ValidateInput.vue";
import ValidateForm from "@/components/ValidateForm.vue";
import createMessage from "@/components/createMessage";

export default defineComponent({
  name: "Login",
  components: {
    ValidateInput,
    ValidateForm
  },
  setup() {
    const emailVal = ref("");
    const emailRules: RulesProp = [
      { type: "required", message: "电子邮箱地址不能为空" },
      { type: "email", message: "请输入正确的电子邮箱格式" }
    ];
    const passwordVal = ref("");
    const passwordRules: RulesProp = [
      { type: "required", message: "密码不能为空" }
    ];
    const router = useRouter();
    const store = useStore();
    const onFormSubmit = (result: boolean) => {
      console.log("result", result);
      if (result) {
        // router.push({ name: "column", params: { id: 3 } });
        const payload = {
          email: emailVal.value,
          password: passwordVal.value
        };
        store
          .dispatch("loginAndFetch", payload)
          .then(() => {
            createMessage("登录成功 2秒后跳转首页", "success");
            router.push("/");
          })
          .catch(e => {
            console.log(e.message);
          });
      }
    };
    return {
      emailRules,
      emailVal,
      passwordVal,
      passwordRules,
      onFormSubmit
    };
  }
});
</script>
