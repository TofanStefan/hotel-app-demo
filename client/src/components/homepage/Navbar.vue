<template>
    <div class="d-flex " v-bind:class="logoShows ? 'justify-content-between' : 'justify-content-end'">

        <div v-show="logoShows"  class="logo" >
            <img id="logoImg" src="../../assets/logo.png">
            <span id="tpbp">TPBP</span>
            <span id="devs">Devs</span>

        </div>
         <div class="options noselect" >
            <a @click="onHomeClick"> Rooms  </a>
            <a  @click="onAboutClick"> About us  </a>
            <a  id="contactText" @click="onContactClick"> Contact </a>
            <button id="registerButton" @click="onRegisterClick">Register</button>
        </div>

     </div>
</template>

<script>
export default {
  data () {
    return {
      logoShows: true
    }
  },
  created () {
    this.myEventHandler()
    window.addEventListener('resize', this.myEventHandler)
  },
  unmounted () {
    window.removeEventListener('resize', this.myEventHandler)
  },
  methods: {
    myEventHandler (e) {
      if (window.innerWidth < 650) { this.logoShows = false } else this.logoShows = true
    },
    onHomeClick () {
      this.$emit('onHomeClick')
    },
    onAboutClick () {
      this.$emit('onAboutClick')
    },
    onContactClick () {
      this.$emit('onContactClick')
    },
    onRegisterClick () {
      this.$emit('onRegisterClick')
    }
  }

}
</script>

<style scoped>

@import url('https://fonts.googleapis.com/css2?family=Indie+Flower&family=Oxygen:wght@300&display=swap');

@media screen and (max-width :350px) {
  .options{
      font-size: 15px;

  }
}

#registerButton{
    padding-left: 14px;
     padding-right: 14px;

    font-size: 16px;
    margin-right: 15px;
    border: 0;
    color: white;
    background: #0076BE;
border-radius: 25px;
}
#registerButton:focus{
    border:0;
    outline: 0;
}

#tpbp{
    font-family: 'Indie Flower', cursive;
    font-size: 22px;
    margin-right: 6px;
    margin-left: 6px;

}
#devs{
    font-family: 'Oxygen', sans-serif;
    font-size: 17px;

}
.d-flex{
    background-color: white;
    height: 50px;
    position:fixed;
    width:100%;
    z-index: 1;
    border-bottom: 2px #0075be4f solid;
}
.options{

    margin-top: 12px;

}
a{
    cursor: pointer;
    padding-right: 4px;
    margin-right: 4px;
     margin-left: 4px;
    font-family: 'Oxygen', sans-serif;
    border-right: 1px rgb(99, 97, 97) solid;
}
#contactText{
    border:0!important;
}
.noselect {
  -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
     -khtml-user-select: none; /* Konqueror HTML */
       -moz-user-select: none; /* Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome and Opera */
}
#logoImg{
    margin-left: 15px;
    margin-top: 5px;
    margin-bottom: 5px;
    width: 60px;

}

</style>
