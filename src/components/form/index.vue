<template>
  <div>
    <k-form :model="userInfo" :rules="rules" ref="loginForm">
      <k-form-item label="用户名" prop="username">
        <k-input
          v-model="userInfo.username"
          placeholder="请输入用户名"
        ></k-input>
      </k-form-item>
      <k-form-item label="密码" prop="password">
        <k-input
          v-model="userInfo.password"
          placeholder="请输入密码"
        ></k-input>
      </k-form-item>
      <k-form-item >
        <button @click="login">提交</button>
      </k-form-item>
    </k-form>
  </div>
</template>

<script>
import kInput from "@/components/form/Kinput.vue";
import kFormItem from "@/components/form/kFormItem.vue";
import kForm from "@/components/form/KForm.vue";
import Notice from "@/components/Notice.vue"
export default {
  name: "Home",
  components: {
    kInput,
    kFormItem,
    kForm,
  },
  data() {
    return {
      userInfo: {
        username: "Zenon",
        password: "",
      },
      rules: {
        username: [{ required: true, message: "请输入用户名称" }],
        password: [{ required: true, message: "请输入密码" }],
      },
    };
  },
  computed: {},
  watch: {},
  methods: {
    login() {
      this.$refs["loginForm"].validate(valid => {
        const notice = this.$create(Notice, {
          title: "",
          message: valid ? "校验成功!" : "校验失败!",
          duration: 2000
        });
        notice.show();
        // if (valid) {
        //   alert("submit");
        // } else {
        //   console.log("error submit!");
        //   return false;
        // }
      })
  },
  }
}
</script>
<style scoped>
</style>	
