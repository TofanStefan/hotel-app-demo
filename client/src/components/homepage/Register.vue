<template>
    <div class="container">
        <i @click="exit" id="exit" class="fas fa-times"></i>

        <div class="d-flex justify-content-end">
                <img class="img-fluid" src="../../assets/logo.png">
        </div>

        <div class="d-flex justify-content-center ls-text">
            <h1 @click="showLogin=true" id="l-text">Log in </h1>
            <h1 @click="showLogin=false" id="s-text">Sign up </h1>
            <span v-if="showLogin"><i class="fas fa-chevron-right"></i></span>
            <span v-if="showLogin==false"><i class="fas fa-chevron-left"></i></span>
         </div>
         <div class="form"  id="log-in" v-if="showLogin">

            <input v-model="loginValues.email"   class="form-control input-l" placeholder="Email/Username">
            <input v-model="loginValues.password" type="password" class="form-control input-l" :class="{'error':loginValues.errorMsgL}" placeholder="Password">
           <div v-if="loginValues.errorMsgL" class="alert alert-danger" role="alert">{{loginValues.errorMsgL}}
           </div>
            <button @click="login" > Log In</button>

         </div>

         <div class="form" id="sign-in" v-if="showLogin==false" >
            <div class="d-flex justify-content-center form-row-lf"   :class="{'ma-bot':signupValues.msg.fname||signupValues.msg.lname} " >
            <input v-model="signupValues.fname" @touchend="validateFname" type="text" @keyup="validateFname"  class="form-control input-s f-name-input" placeholder="First Name">
              <input v-model="signupValues.lname" @touchend="validateLname"   type="text" @keyup="validateLname"  class="form-control input-s l-name-input" placeholder="Last Name">
            </div>
           <div v-if="signupValues.msg.fname||signupValues.msg.lname"  class="alert alert-danger error-msgs"  role="alert">
             <div>{{signupValues.msg.fname}}</div>
             <div>{{signupValues.msg.lname}}</div>
           </div>

           <input @touchend="validateEmail"  @keyup="validateEmail"   v-model="signupValues.email"  type="email" class="form-control input-s"
                   placeholder="Email" :class="{'ma-bot':signupValues.msg.email}" >
           <div v-if="signupValues.msg.email" class="alert alert-danger error-msgs" role="alert">
             {{signupValues.msg.email}}</div>
            <input @touchend="validatePassword"  @keyup="validatePassword" v-model="signupValues.password" type="password" class="form-control input-s" :class="{'error':signupValues.errorMsgS}" placeholder="Password">
           <div v-if="signupValues.msg.password" class="alert alert-danger error-msgs" role="alert">
             {{signupValues.msg.password}}</div>
           <div  v-if="signupValues.errorMsgS" class="alert alert-danger" role="alert">{{signupValues.errorMsgS}}
           </div>
            <button style="margin-bottom: 35px" @click="signup">Sign up</button>

         </div>

    </div>

</template>

<script>
import axios from 'axios'
export default {

  data () {
    return {
      showLogin: true,
      loginValues: {
        email: '',
        password: '',
        errorMsgL: ''
      },
      signupValues: {
        fname: '',
        lname: '',
        email: '',
        password: '',
        errorMsgS: '',
        msg: {
          email: null,
          fname: null,
          lname: null,
          password: null
        }
      }
    }
  },
  methods: {
    exit () {
      this.$emit('exit')
    },
    validateEmail () {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      if (re.test(String(this.signupValues.email).toLowerCase())) { this.signupValues.msg.email = null; return true } else {
        this.signupValues.msg.email = 'Please enter a valid email address'
      }
      return false
    },
    validateFname () {
      if (/\d/.test(String(this.signupValues.fname).toLowerCase())) {
        this.signupValues.msg.fname = 'First name cannot contain numbers'
      } else if (this.signupValues.fname.length === 0) { this.signupValues.msg.fname = 'First name cannot be empty' } else { this.signupValues.msg.fname = null; return true }
      return false
    },
    validateLname () {
      if (/\d/.test(String(this.signupValues.lname).toLowerCase())) {
        this.signupValues.msg.lname = 'Last name cannot contain numbers'
      } else if (this.signupValues.lname.length === 0) { this.signupValues.msg.lname = 'Last name cannot be empty' } else { this.signupValues.msg.lname = null; return true }
      return false
    },
    validatePassword () {
      if (this.signupValues.password.length < 6) { this.signupValues.msg.password = 'Field needs atleast 6 characters' } else {
        this.signupValues.msg.password = null
        return true
      }
      return false
    },
    // login request
    async login () {
      try {
        const res = await axios.post('/api/user/login', {
          email: this.loginValues.email,
          password: this.loginValues.password
        })
        this.loginValues.errorMsgL = ''
        localStorage.setItem('token', res.data.token)
        await this.$router.push('/dash-board/profile')
      } catch (err) {
        this.loginValues.errorMsgL = err.response.data.message
        this.loginValues.password = ''
      }
    },
    // signup request
    async signup () {
      if (this.validateLname() === true && this.validatePassword() === true && this.validateFname() === true && this.validateEmail() === true) {
        try {
          await axios.post('/api/user/create', {
            email: this.signupValues.email,
            password: this.signupValues.password,
            first_name: this.signupValues.fname,
            last_name: this.signupValues.lname
          })
          this.signupValues.errorMsgS = ''
          alert('Account has been created')
          this.exit()
          await this.$router.push('/')
        } catch (err) {
          this.signupValues.errorMsgS = err.response.data.message
          this.signupValues.password = ''
        }
      }
    }

  },
  mounted () {
    if (localStorage.getItem('token')) { this.$router.push('/dash-board/profile') }
  }
}
</script>

<style scoped>
@media screen and (max-width :365px) {

.fa-chevron-right{

    left: 30px!important;

}
.fa-chevron-left{

    right: 30px!important;

}

}
h1{
    font-size: 28px;
    font-family: 'Oxygen', sans-serif;
    font-weight:600;
    cursor: pointer;

}
#l-text{
    border-right: 2px solid gray;
    padding-right: 10px;
}
#s-text{
    margin-left: 10px;
}
.ls-text{
    margin-top: 45px;
    position: relative;
}
.form-row-lf{
  height: 53px;
  margin-bottom: 13px;
}
.justify-content-end{
    margin-top:80px;
    margin-right: 20px;
}
.fa-chevron-right,.fa-chevron-left{

    color: #0076BE;
    position: absolute;
}
span{
    margin-bottom: 20px;
}
.fa-chevron-right{

    left: 60px;
    top: 10px;
}
.fa-chevron-left{

    right: 60px;
    top: 10px;
}
#exit{
    color: #a1a1a1;
    font-size: 18px;
    position: absolute;
    left: 20px;
    top: 20px;
    cursor: pointer;
}
.img-fluid{
    height: 50px;
}

.container{

    background: rgb(255, 255, 255);
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    max-width: 400px;
    min-height: 600px;
    max-height: 700px;
    z-index: 1;
    border: 1px #0075be4f solid;

}
.error-msgs{
  padding-top:3px;
  padding-bottom:3px;
  font-size: 13px;
}
.form{
    margin-top: 30px;
    width: 70%;
    margin-left: 15%;
}
input{
    font-family: 'Oxygen', sans-serif;
    border: 1px solid #0076BE;
    border-radius: 10px;
    height: 48px;

}
.error{
  margin-bottom: 20px!important;
}
.input-l{
    margin-bottom: 40px;
}
.input-s{
    margin-bottom: 20px;
}
input:hover,input:focus{
    box-shadow: 0 0 8px #0076BE;
}
.ma-bot{
  margin-bottom: 5px!important;
}
button{
    color: white;
    background: #0076BE;
    border-radius: 20px;
    font-family: 'Oxygen', sans-serif;
    width: 70%;
    font-size: 24px;
    padding-top: 8px;
    padding-bottom: 8px;
    border: none;
    margin-top: 20px;
}
button:focus,button:hover{
    border: 0;

    outline: 0;
   box-shadow: 0 0 11px #0076BE;

}
.f-name-input{
    margin-right:4px;
}
.l-name-input{
    margin-left:4px;
}

</style>
