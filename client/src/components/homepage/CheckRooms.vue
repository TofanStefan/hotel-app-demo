<template>
  <div class="container">
    <div class="row">
      <div v-bind:class="imageLayout ? 'col-lg-6' : 'container'" >
        <div class="ad-wraper">
          <div id="firstAd" class="text-container">
            <h1>
              <span class="bulletPoint"
                ><i class="fas fa-chevron-right"></i
              ></span>
              Competitive price
            </h1>
          </div>
          <div id="secondAd" class="text-container">
            <h1>
              <span class="bulletPoint"
                ><i class="fas fa-chevron-right"></i
              ></span>
              Safe enviroment
            </h1>

            <div class="s-flex float-right">
              <p>Online check in and check out</p>
              <p>Room access with phone</p>
              <p>No direct contact with staff</p>
            </div>
          </div>
          <div id="thirdAd" class="text-container">
            <h1>
              <span class="bulletPoint"
                ><i class="fas fa-chevron-right"></i
              ></span>
              High quality services
            </h1>
          </div>
        </div>

        <button @click="gotoRoomsPage" id="checkRooms" >
          Check available rooms
          <span class="btnBullet"><i class="fas fa-chevron-right"></i></span>
        </button>

      </div>
      <div v-bind:class="imageLayout ? 'col-sm-3' : 'col-6'">
        <img class="img-fluid" src="../../assets/hotel3.png" />
      </div>
      <div v-bind:class="imageLayout ? 'col-sm-3' : 'col-6'">
        <img class="img-fluid" src="../../assets/hotel4.png" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      imageLayout: true
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
      if (window.innerWidth < 990) this.imageLayout = false
      else this.imageLayout = true
    },
    gotoRoomsPage () {
      window.location.href = 'available-rooms'
    }
  }
}
</script>

<style scoped>
@media screen and (max-width: 700px) {
  h1 {
    font-size: 30px !important;
  }
  p {
    font-size: 18px !important;
  }
}
@media screen and (max-width: 767px) {
  .ad-wraper{
    display: block!important;
    margin-left: 20px;
  }
}
@media screen and (max-width: 330px) {
  #checkRooms {
    font-size: 22px !important;
  }
}
@media screen and (max-width: 420px) {
  h1 {
    font-size: 22px !important;
  }
  p {
    font-size: 14px !important;
  }
  .text-container {
    margin-left: 10px !important;
    margin-top: 0px !important;
  }
}
#checkRooms {
  border-radius: 30px;
  color: white;
  font-family: "Oxygen", sans-serif;
  background-color: #0076be;
  border: 0;
  padding: 15px 20px;
  margin-bottom: 35px;
  font-size: 23px;
  margin-top: 20px;
}
#checkRooms:focus {
  border: 0;
  outline: 0;
}
.btnBullet {
  color: white;
  margin-left: 6px;
}
.img-fluid {
  max-height: 500px;
}
h1 {
  font-family: "Oxygen", sans-serif;

  font-size: 38px;
}
.bulletPoint {
  margin-right: 10px;
  color: #0076be;
}
.text-container {
  text-align: left;
  position: relative;
  margin-top: 20px;
  margin-left: 20px;
}
#firstAd {
  margin-bottom: 40px;
}
#secondAd {
  margin-bottom: 150px;
}
#thirdAd {
  margin-bottom: 20px;
}
.s-flex {
  text-align: left;
  right: 0;
  width: 75%;
}
p {
  font-family: "Oxygen", sans-serif;
  font-size: 20px;
}
.ad-wraper{
 display: inline-block;
}
</style>
