<template>
  <div id="login">
    <div class="back" @click="backClick">
      <img src="~assets/img/common/back.svg" alt="">
    </div>
    <section class="form_container">
      <div class="manage_tip">
        <img src="~assets/img/login-register-notFound/mall.png" alt="">
      </div>
      <el-form :model="loginUser" status-icon :rules="rules" ref="loginForm" label-width="90px" class="loginForm">
        <el-form-item label="用户名" prop="name">
          <el-input v-model="loginUser.name" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="loginUser.email" placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="loginUser.password" placeholder="请输入密码" type="password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="submit_btn" @click="submitForm('loginForm')">登录</el-button>
        </el-form-item>
        <div class="tiparea">
          <span>还没有账号？现在<router-link to='/register'>注册</router-link></span>
        </div>
      </el-form>
    </section>
  </div>
</template>

<script>
import jwt_decode from "jwt-decode"

export default {
  name: 'Login',
  data() {
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
        ]
      },
      loginUser: {
        name: "",
        email: "",
        password: "",
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
      this.$bus.$emit('userLogin', this.loginUser)
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios.post('/api/users/login', this.loginUser)
                     .then(res => {
                       this.$message({
                        message: '登录账号成功',
                        type: 'success',
                        offset: 1,
                        duration: 2000
                       })
                       const { token } = res.data
                       //localStorage.setItem() 存储token
                       // 把token存储到localStorage中的eleToken
                       localStorage.setItem('eleToken', token)
                       this.$router.push('/profile')
                       setTimeout(() => {
                         location.reload();
                       }, 500)
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

<style>
#login {
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

.manage_tip {
  width: 100%;
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

.loginForm {
  margin-top: 50px;
  font-size: 14px;
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

.tiparea span a {
  color: #409eff;
}
</style>