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

            <input v-model="email"   class="form-control input-l" placeholder="Email/Username">
            <input v-model="password" class="form-control input-l" placeholder="Password">
            <button @click="login" > Log In</button>

         </div>

         <div class="form" id="sign-in" v-if="showLogin==false">
            <div class="d-flex justify-content-center">
            <input class="form-control input-s f-name-input" placeholder="First Name">
            <input class="form-control input-s l-name-input" placeholder="Last Name">
            </div>
            <input class="form-control input-s" placeholder="Email">
            <input class="form-control input-s" placeholder="Password">
            <button>Sign up</button>

         </div>

    </div>

</template>

<script>
import axios from 'axios'
export default {

  data () {
    return {
      showLogin: true,
      email: '',
      password: ''

    }
  },
  methods: {
    exit () {
      this.$emit('exit')
    },
    async login () {
      const params = new URLSearchParams()
      params.append('email', this.email)
      params.append('password', this.password)
      const config = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }

      console.log(await axios.post('/api/user/login', params, config))
    }
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
    height: 20px;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    max-width: 400px;
    height: 600px;
    z-index: 1;
    border: 1px #0075be4f solid;

}
.form{
    margin-top: 60px;
    width: 70%;
    margin-left: 15%;
}
input{
    font-family: 'Oxygen', sans-serif;
    border: 1px solid #0076BE;
    border-radius: 10px;
    height: 48px;

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
