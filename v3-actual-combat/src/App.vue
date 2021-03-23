<template>
  <div class="container">
    <global-header :user="currentUser"></global-header>
    <!-- <column-list :list='list'></column-list> -->
    <validate-form @form-submit="onFormSubmit">
      <div class="mb-3">
        <label for="exampleInputEmail1"
               class="form-label">邮箱地址</label>
        <validate-input :rules="emailRules"
                        v-model="emailVal"
                        type='text'
                        placeholder='请输入邮箱地址' />
      </div>
      <div class="mb-3">
        <label class="form-label">密码</label>
        <validate-input type="password"
                        placeholder="请输入密码"
                        :rules="passwordRules"
                        v-model="passwordVal" />
      </div>
      <template v-slot:submit>
        <span class="btn btn-danger">Submit</span>
      </template>
    </validate-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import "bootstrap/dist/css/bootstrap.min.css";
import ValidateForm from "@/components/ValidateForm.vue";
import GlobalHeader, { UserProps } from "@/components/GlobalHeader.vue";
import ValidateInput, { RulesProp } from "@/components/ValidateInput.vue";
import { testData } from "./testData";

const currentUser: UserProps = {
  isLogin: true,
  name: "viking"
};

export default defineComponent({
  name: "App",
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

    const onFormSubmit = (val: boolean) => {
      console.log(val);
    };

    return {
      list: testData,
      currentUser,
      emailVal,
      emailRules,
      passwordVal,
      passwordRules,
      onFormSubmit
    };
  },
  components: {
    GlobalHeader,
    ValidateInput,
    ValidateForm
  }
});
</script>

<style scoped>
</style>
