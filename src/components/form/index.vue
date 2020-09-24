<template>
  <div>
    <!-- <ElementTest></ElementTest> -->

    <!-- KForm -->
    <k-form :model="userInfo" :rules="rules" ref="loginForm">
      <!-- 用户名 -->
      <k-formItem label="用户名" prop="username">
        <KInput v-model="userInfo.username" placeholder="请输入用户名"></KInput>
      </k-formItem>
      <!-- 密码 -->
      <k-formItem label="密码" prop="password">
        <k-input type="password" v-model="userInfo.password" placeholder="请输入用户名"></k-input>
      </k-formItem>
      <!-- 提交按钮 -->
      <k-formItem>
        <button @click="login">登录</button>
      </k-formItem>
    </k-form>
  </div>
</template>

<script>
// import ElementTest from "@/components/form/ElementTest.vue";
import KInput from "@/components/form/Kinput.vue";
import KFormItem from "@/components/form/kFormItem.vue";
import KForm from "@/components/form/KForm.vue";
// import Notice from "@/components/Notice.vue";

export default {
  name:'index',
  data() {
    return {
      userInfo: {
        username: "Zenon",
        password: ""
      },
      rules: {
        username: [{ required: true, message: "请输入用户名称" }],
        password: [{ required: true, message: "请输入密码" }]
      }
    };
  },
  components: {
    // ElementTest,
    KInput,
    KFormItem,
    KForm
  },
  methods: {
    login() {
      this.$refs["loginForm"].validate(valid => {
        const notice = this.$notice({
          title: "",
          message: valid ? "检验成功!" : "校验失败!",
          duration: 2000
        });
        notice.show();
        // if (valid) {
        //   alert("submit");
        // } else {
        //   console.log("error submit!");
        //   return false;
        // }
      });
    }
  }
};
</script>

<style scoped>
</style>
