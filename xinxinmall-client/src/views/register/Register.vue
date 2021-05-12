<template>
  <div id="register">
    <div class="back" @click="backClick">
      <img src="~assets/img/common/back.svg" alt="">
    </div>
    <section class="form_container">
      <div class="manage_tip">
        <img src="~assets/img/login-register-notFound/mall.png" alt="">
      </div>
      <el-form :model="registerUser" status-icon :rules="rules" ref="registerForm" label-width="90px" class="registerForm">
        <el-form-item label="用户名" prop="name">
          <el-input v-model="registerUser.name" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="registerUser.email" placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="registerUser.password" placeholder="请输入密码" type="password"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="password2">
          <el-input v-model="registerUser.password2" placeholder="请确认密码" type="password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="submit_btn" @click="submitForm('registerForm')">注册</el-button>
        </el-form-item>
      </el-form>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Register',
  data() {
    let validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.registerUser.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    }
    return {
      rules: {
        name: [
          { required: true, message: "用户名不能为空", trigger: "blur" },
          { min: 2, max: 30, message: "长度在 2 到 30 个字符", trigger: "blur" }
        ],
        email: [
          { required: true, message: "邮箱不能为空", trigger: "blur" },
          {type: "email", required: true, message: "邮箱格式不正确", trigger: "blur"}
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          { min: 6, max: 30, message: "长度在 6 到 30 个字符", trigger: "blur" }
        ],
        password2: [
          { required: true, message: "确认密码不能为空", trigger: "blur" },
          { validator: validatePass2, trigger: "blur" }
        ]
      },
      registerUser: {
        name: "",
        email: "",
        password: "",
        password2: "",
        identity: ""
      },
    }
  },
  methods: {
    backClick() {
      this.$router.back();
      // this.$router.go(-1);
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios.post('/api/users/register', this.registerUser)
                     .then(res => {
                       console.log(res)
                       // 注册成功
                       this.$message({
                         message: '账号注册成功',
                         type: 'success',
                         offset: 1,
                         duration: 2000
                       })
                       this.$router.push('/login')
                     })
                     .catch(err => {
                       throw err
                     })
        } else {
          console.log('error submit!!');
          return false;
        }
      })
    }
  }
}
</script>

<style scoped>
#register {
  position: absolute;
  z-index: 10;
  width: 100%;
  height: 100%;
  background: url("~assets/img/login-register-notFound/bg.jpg") no-repeat;
}

.form_container {
  width: 100%;
  height: 60%;
}

.back {
  width: 22px;
  padding-top: 5px;
}

.back img {
  width: 100%;
}

.form_container {
  margin-top: 10%;
  padding: 10px;
  text-align: center;
}

.registerForm {
  margin-top: 50px;
}

.submit_btn {
  width: 100%;
  background-color: #FF8198;
  border-color: #FF8198;
}

.submit_btn:hover {
  background-color: #FF8198;
  border-color: #FF8198;
}
</style>