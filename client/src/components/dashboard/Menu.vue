<template>

  <!-- Send email modal -->
  <div class="modal fade" id="email-modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLongTitle">Send email to all</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-4">
              <div class="form-check">
                <input v-model="sendEmailTo" class="form-check-input"  type="radio" name="flexRadioDefault"  value="Admins" >
                <label class="form-check-label" >
                  Admins
                </label>
              </div>
            </div>
            <div class="col-4">
              <div class="form-check">
                <input v-model="sendEmailTo" class="form-check-input"  type="radio" name="flexRadioDefault"   value="Guests" >
                <label class="form-check-label">
                  Guests
                </label>
              </div>
            </div>
            <div class="col-4">
              <div class="form-check">
                <input v-model="sendEmailTo" class="form-check-input"  type="radio" name="flexRadioDefault"   value="Staff">
                <label class="form-check-label">
                  Staff
                </label>
              </div>
            </div>
          </div>
          <div class="form-group">
          <textarea v-model="emailText" style="margin-top: 30px" class="form-control" id="email-text" placeholder="Type in your email here.." rows="4"></textarea>
        </div>
        </div>
        <div class="modal-footer">
          <button id="modalEmailButton" type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          <button @click="sendEmail" type="button" class="btn btn-primary">Send</button>
        </div>
      </div>
    </div>
  </div>

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
              <ul class="fa-ul">
                <li class="router-links" data-dismiss="modal" aria-label="Close" ><span class="fa-li"><i class="fas fa-user"></i></span> <router-link tag="li" active-class="active" to="/dash-board/profile" exact><a>Profile</a></router-link></li>
                <template v-if="role==='Admin'">
                <li class="router-links" data-dismiss="modal" aria-label="Close" ><span class="fa-li"><i class="fas fa-users-cog"></i></span> <router-link tag="li" active-class="active" to="/dash-board/accounts" exact><a>Accounts</a></router-link></li>
                <li class="router-links" data-dismiss="modal" aria-label="Close" ><span class="fa-li"><i class="fas fa-door-open"></i></span> <router-link tag="li" active-class="active" to="/dash-board/rooms" exact><a>Rooms</a></router-link></li>
                <li class="router-links" data-dismiss="modal" aria-label="Close" ><span class="fa-li"><i class="fas fa-file-alt"></i></span> <router-link tag="li" active-class="active" to="/dash-board/reservations" exact><a>Reservations</a></router-link></li>
                <li class="router-links" data-dismiss="modal" aria-label="Close" ><span class="fa-li"><i class="fas fa-envelope-open"></i></span> <a  data-toggle="modal" data-target="#email-modal" id="emailMobile">Email</a></li>
                </template>
                <template v-if="role==='Guest'">
                  <li class="router-links" data-dismiss="modal" aria-label="Close"><span class="fa-li"><i class="fas fa-door-open"></i></span> <router-link tag="li" active-class="active" to="/dash-board/available-rooms" exact><a>Rooms</a></router-link></li>
                  <li class="router-links" data-dismiss="modal" aria-label="Close"><span class="fa-li"><i class="fas fa-file-alt"></i></span> <router-link tag="li" active-class="active" to="/dash-board/my-reservations" exact><a>Reservations</a></router-link></li>

                </template>
                <li class="router-links" data-dismiss="modal" aria-label="Close"><span class="fa-li"><i class="fas fa-sign-out-alt"></i> </span> <a @click="logout" id="">Logout</a></li>
              </ul>
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
        <ul class="fa-ul">
          <li class="router-links"><span class="fa-li"><i class="fas fa-user"></i></span> <router-link tag="li" active-class="active" to="/dash-board/profile" exact><a>Profile</a></router-link></li>
          <template v-if="role==='Admin'">
          <li class="router-links"><span class="fa-li"><i class="fas fa-users-cog"></i></span> <router-link tag="li" active-class="active" to="/dash-board/accounts" exact><a>Accounts</a></router-link></li>
          <li class="router-links"><span class="fa-li"><i class="fas fa-door-open"></i></span> <router-link tag="li" active-class="active" to="/dash-board/rooms" exact><a>Rooms</a></router-link></li>
          <li class="router-links"><span class="fa-li"><i class="fas fa-file-alt"></i></span> <router-link tag="li" active-class="active" to="/dash-board/reservations" exact><a>Reservations</a></router-link></li>
          <li @click="resetValues" class="router-links"><span class="fa-li"><i class="fas fa-envelope-open"></i></span> <a  data-toggle="modal" data-target="#email-modal" id="email">Email</a></li>

          </template>
          <template v-if="role==='Guest'">
            <li class="router-links"><span class="fa-li"><i class="fas fa-door-open"></i></span> <router-link tag="li" active-class="active" to="/dash-board/available-rooms" exact><a>Rooms</a></router-link></li>
            <li class="router-links"><span class="fa-li"><i class="fas fa-file-alt"></i></span> <router-link tag="li" active-class="active" to="/dash-board/my-reservations" exact><a>Reservations</a></router-link></li>

          </template>
          <li class="router-links" style="cursor: pointer"><span class="fa-li"><i class="fas fa-sign-out-alt"></i> </span> <a @click="logout" id="logout">Logout</a></li>
        </ul>
      </div>

  </div>
  <div style="position: relative">
    <i
      @click = "onShowMenuClick"
      class="fas fa-chevron-right"
      data-toggle="modal" data-target="#exampleModalCenter"></i></div>

</template>
<script>
import axios from 'axios'

export default {
  props: ['role'],
  data () {
    return {
      mobileMenu: false,
      sendEmailTo: 'Admins',
      emailText: '',
      axiosConfig: {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          'Access-Control-Allow-Origin': '*',
          token: localStorage.getItem('token')
        }
      }
    }
  },
  methods: {

    onShowMenuClick () {
      this.mobileMenu = true
    },
    logout () {
      localStorage.clear()
      this.$router.push('/')
    },
    async sendEmail () {
      const data = {

        message: this.emailText
      }
      if (this.emailText === '') {
        alert('Message cannot be empty')
      } else {
        const id = this.convertRoleToId(this.sendEmailTo)
        document.getElementById('modalEmailButton').click()
        await axios.post(`/api/user/${id}/mail`, data, this.axiosConfig)
      }
    },
    resetValues () {
      this.sendEmailTo = 'Admins'
      this.emailText = ''
    },
    convertRoleToId (role) {
      if (role === 'Admins') { return 1 }
      if (role === 'Guests') { return 2 }
      if (role === 'Staff') { return 3 }
      return -1
    }
  },
  mounted () {
    this.sendEmailTo = 'Admins'
  }
}
</script>
<style scoped >
#email,#emailMobile{
  cursor: pointer;
}

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
  font-size: 16px;
  margin-top: 0;
  border: 0;
  margin-left: 15px;
  padding-bottom: 25px;
}
.modal-header{
  border-bottom: 0;
}
.fa-chevron-right{

  font-size: 25px;
  color: #28536B;
  bottom: 20px;
   left: 30px;
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
  color: #629ec4 !important;
}

.router-links{
  padding-top: 40px;
  margin-left: 20px;
}

.mobile-logo{
  margin-left: 50px;
}
</style>
