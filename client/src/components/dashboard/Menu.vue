<template>
  <div v-if="mobileMenu" class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div ref="menu"  class="container menu " >
            <div class="d-flex logo-wrapper mobile-logo" >

              <img id="logo2" src="../../assets/logo.png">

            </div>
            <div class="link-container link-container-mobile">

                <div class="router-links">
                  <router-link tag="li" active-class="active" to="/dash-board/profile" exact>
                    <span class="icons"> <i class="fas fa-user"></i></span>
                    <a>Profile</a></router-link>
                </div>
                <div class="router-links">
                  <router-link tag="li" active-class="active" to="/dash-board" exact>
                    <span class="icons"><i class="fas fa-users-cog"></i> </span>
                    <a>Accounts</a>
                  </router-link>
                </div>
                <div class="router-links">
                  <router-link tag="li" active-class="active" to="/dash-board" exact>
                    <span class="icons"> <i class="fas fa-door-open"></i> </span>
                    <a>Rooms</a>
                  </router-link> </div>
                <div class="router-links">
                  <router-link tag="li" active-class="active" to="/dash-board" exact>
                    <span class="icons"><i class="fas fa-file-alt"></i> </span> <a>Reservations</a>
                  </router-link> </div>
                <div class="router-links">
                  <router-link tag="li" active-class="active" to="/dash-board" exact>
          <span class="icons">
            <i class="fas fa-envelope-open"></i></span>
                    <a>Email</a>
                  </router-link> </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
  <div  ref="menu"  class="display container menu  " >
    <div class="d-flex justify-content-center logo-wrapper" >

      <img id="logo" src="../../assets/logo.png">

    </div>
      <div class="link-container">
        <div class="router-links">
          <router-link tag="li" active-class="active" to="/dash-board/profile" exact>
            <span class="icons"> <i class="fas fa-user"></i></span>
            <a>Profile</a></router-link>
        </div>
        <div class="router-links">
          <router-link tag="li" active-class="active" to="/dash-board" exact>
            <span class="icons"><i class="fas fa-users-cog"></i> </span>
            <a>Accounts</a>
          </router-link>
        </div>
        <div class="router-links">
          <router-link tag="li" active-class="active" to="/dash-board/rooms" exact>
            <span class="icons"> <i class="fas fa-door-open"></i> </span>
            <a>Rooms</a>
          </router-link> </div>
        <div class="router-links">
          <router-link tag="li" active-class="active" to="/dash-board" exact>
            <span class="icons"><i class="fas fa-file-alt"></i> </span> <a>Reservations</a>
          </router-link> </div>
        <div class="router-links">
          <router-link tag="li" active-class="active" to="/dash-board" exact>
          <span class="icons">
            <i class="fas fa-envelope-open"></i></span>
          <a>Email</a>
          </router-link> </div>
      </div>
  </div>
  <div style="position: relative">
    <i
      @click = "onShowMenuClick"
      class="fas fa-chevron-right"
      data-toggle="modal" data-target="#exampleModalCenter"> </i></div>

</template>
<script>
export default {
  data () {
    return {
      mobileMenu: false
    }
  },
  methods: {

    onShowMenuClick () {
      this.mobileMenu = true
    }

  }
}
</script>
<style scoped >

@media screen and (max-width: 750px){
  .display{
    display: none!important;
  }
  .fa-chevron-right{
    display: block!important;
  }
}
.menu{
  z-index: 1;
  height:100%;
  width: 220px;
  left: -120px;
  border-radius: 20px;
  background:white;

  padding: 0;
}
.display{
  display: block;
}

#logo ,#logo2{
  height:60px;

}
.logo-wrapper{
  margin-top: 20px;
}
.link-container{
  width: 100%;
  height: calc(100% - 160px);
  border-right: 2px #c8c8c8 solid;
  margin-top:20px;
  text-align: left;
}
.link-container-mobile{
  font-size: 20px;
  margin-top: 0;
  border: 0;
  margin-left: 15px;
  padding-bottom: 25px;
}
.modal-header{
  border-bottom: 0;
}
.fa-chevron-right{

  font-size: 30px;
  color: #28536B;
  top: 40px;
   left: 18px;
  position: absolute;
  display: none;
  z-index: 1;

}

.link-container a{
  font-weight: bold;
  color: #2c3e50;
  font-family: "Oxygen", sans-serif;
}
.active a{
  color: red!important;
}

.router-links{
  padding-top: 40px;
  margin-left: 35px;
}
.icons{
  margin-right: 6px;
}
.mobile-logo{
  margin-left: 50px;
}
</style>
