<template>
  <div>
    <register @exit="disableRegister" v-if="showRegister"></register>
    <div ref="wrapper"
         @click="disableRegisterOnOutsideClick"
         :class="{'no-scroll':showRegister}">
      <navbar id="navbar"  @onHomeClick="scroll('rooms')"
               @onAboutClick="scroll('aboutUs')"
               @onContactClick="scroll('contact')"
               @onRegisterClick="onRegisterClick"> </navbar>

      <div id="firstImageContainer">
        <img src="../assets/hotel2.jpg" class="img-fluid" alt="Responsive image">
        <div id="hotelNameWrapper">  <span id="hotelNameText"> Atlantic Hotel </span> </div>
      </div>
      <Splitter :show="true"></Splitter>
      <CheckRooms id="rooms" style="margin-top:50px" ></CheckRooms>
      <Splitter :show="false"></Splitter>
      <AboutUs id="aboutUs"></AboutUs>
      <Splitter :show="false"></Splitter>
      <ContactUs id="contact"></ContactUs>
    </div>
  </div>

</template>

<script>
import Splitter from '@/components/homepage/Splitter'
import Navbar from '@/components/homepage/Navbar'
import Register from '@/components/homepage/Register'
import CheckRooms from '@/components/homepage/CheckRooms'
import ContactUs from '@/components/homepage/ContactUs'
import AboutUs from '@/components/homepage/AboutUs'

export default {
  components: {
    Splitter,
    Navbar,
    CheckRooms,
    Register,
    ContactUs,
    AboutUs

  },
  data () {
    return {
      showRegister: false

    }
  },
  methods: {
    // navbar scroll to the element
    scroll (id) {
      // eslint-disable-next-line no-undef
      $('html, body').animate({
        // eslint-disable-next-line no-undef
        scrollTop: $('#' + id).offset().top - $('#navbar').height() // minus the nav height
      }, 600)
    },
    onRegisterClick () {
      this.showRegister = true // show register container
      this.$refs.wrapper.style.opacity = '0.1' // set opacity of the wrapper
    },
    disableRegister () {
      this.showRegister = false // hide register container
      this.$refs.wrapper.style.opacity = '1' // set opacity of the wrapper
    },
    disableRegisterOnOutsideClick (event) {
      if (event.target.tagName !== 'BUTTON') {
        this.disableRegister()
      }
    }
  }
}
</script>

<style>
body {
  width: 100%;
  height: 100%;
  background-color: rgb(255, 255, 255);

}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>

<style scoped>

@media screen and (max-width: 700px) {
  #hotelNameWrapper {
    position: absolute;
    bottom: 40px !important;
    font-size: 30px !important;

  }
  #hotelNameText {
    font-size: 30px !important;
  }
}

@media screen and (max-width: 400px) {
  #hotelNameWrapper {
    position: absolute;
    bottom: 8px !important;
    font-size: 30px !important;
  }
}

#firstImageContainer {
  position: relative;
}

.no-scroll {
  height: 100vh;
  overflow: hidden;
}

#hotelNameText {
  font-size: 50px;
  font-family: 'Oxygen', sans-serif;
}

#hotelNameWrapper {
  width: 100%;
  position: absolute;
  color: white;
  bottom: 60px;
  background: rgba(200, 191, 191, 0.6);
}

.img-fluid {
  opacity: .8;
  width: 100%;
}
</style>
