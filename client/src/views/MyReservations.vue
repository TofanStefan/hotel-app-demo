<template>

  <div class="container-fluid p-0 wrapper">

    <!-- room wrapper -->
    <div class="for-scroll outside-border p-1" id="style-1">
      <div  class="rooms-wrapper">
        <template  v-for="item in reservations" :key="item.id">
          <div class="container p-0 room-wrapper" >
            <div class="row room-border">
              <div class="col-sm-3 p-0 ">
                <div :id="'item'+item.id" class="carousel slide" data-ride="carousel">
                  <div class="carousel-inner">
                    <div class="carousel-item active">
                      <img class="d-block w-100" :src="item.room.photos[0]" alt="First slide">
                    </div>
                    <div class="carousel-item">
                      <img class="d-block w-100" :src="item.room.photos[1]"  alt="Second slide">
                    </div>
                    <div class="carousel-item">
                      <img class="d-block w-100" :src="item.room.photos[2]" alt="Third slide">
                    </div>
                  </div>
                  <a class="carousel-control-prev" :href="'#item'+item.id" role="button" data-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="sr-only">Previous</span>
                  </a>
                  <a class="carousel-control-next" :href="'#item'+item.id" role="button" data-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="sr-only">Next</span>
                  </a>
                </div>
              </div>
              <div class="col-sm-9 p-0 " style="border-left: 2px #c8c8c8 solid">
                <div class="container-fluid text-data">
                  <h4>Atlantic {{ item.room.type }} Room</h4>
                  <ul class="fa-ul" >
                    <li><span class="fa-li"><i class="fas fa-chevron-right"></i></span>Check in : {{ item.check_in_date }}</li>
                    <li><span class="fa-li"><i class="fas fa-chevron-right"></i></span>Check out : {{ item.check_out_date }}</li>
                    <li><span class="fa-li"><i class="fas fa-chevron-right"></i></span>Nights : {{ item.nr_days }}
                      <template  v-if="item.nr_days===1"  >night</template>
                      <template  v-else  >nights</template>

                    </li>
                  </ul>
                  <h4  id="roomPrice">
                    Price {{item.total_price}} <span> <i class="fas fa-dollar-sign" id="dollarSign"></i></span>  </h4>

                  <button v-if="item.action==='Cancel'" @click="cancel(item)" class="btn btn-danger room-button">Cancel</button>
                  <button v-if="item.action==='Check in'" @click="checkIn(item)" class="btn btn-primary room-button">Check in</button>
                  <button v-if="item.action==='Check out'" @click="checkOut(item)" class="btn btn-primary room-button">Check out</button>
                </div>
              </div>

            </div>

          </div>
        </template>
      </div>
    </div>

  </div>

</template>

<script>
import axios from 'axios'
export default {

  data () {
    return {
      reservations: [],
      axiosConfig: {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          'Access-Control-Allow-Origin': '*',
          token: localStorage.getItem('token')
        }
      }
    }
  },

  async mounted () {
    await this.load()
  },
  methods: {
    async load () {
      const res = await axios.get('/api/reservation/getMyReservations', this.axiosConfig)
      this.reservations = res.data

      for (let index = 0; index < this.reservations.length; index++) {
        for (let pindex = 0; pindex < 3; pindex++) { this.reservations[index].room.photos[pindex] = this.reservations[index].room.photos[pindex].replace('public', '') }
      }
    },
    async cancel (item) {
      await axios.delete(`api/reservation/${item.id}/deleteMy`, this.axiosConfig)
      await this.load()
    },
    async checkIn (item) {
      await axios({ method: 'put', url: `/api/reservation/${item.id}/checkIn`, headers: { token: localStorage.getItem('token') } })
      await this.load()
    },
    async checkOut (item) {
      await axios({ method: 'put', url: `/api/reservation/${item.id}/checkOut`, headers: { token: localStorage.getItem('token') } })
      await this.load()
    }
  }

}

</script>

<style scoped>
h4{
  text-align: left  ;
}
.wrapper{

  height: 100%;

}
.rooms-wrapper{

  height: 100%;
  width: calc(100% - 25px);

}
.room-wrapper{
  margin-bottom: 20px;

}
@media screen and (max-width: 750px) {

  .for-scroll {

    height: 65% !important;
  }
}
.for-scroll{
  overflow-y:scroll;
  width: 100%;
  height: 75%;
}
#style-1::-webkit-scrollbar-track
{
  -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
  border-radius: 5px;
  background-color: #F5F5F5;
}

#style-1::-webkit-scrollbar
{
  width: 5px;
  background-color: #F5F5F5;
}

#style-1::-webkit-scrollbar-thumb
{
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
  background-color: #555;
}
.room-border{

  border: 2px solid #c8c8c8;

  border-radius: 16px;

}
#roomPrice{
  position: absolute;
  bottom: 8px;
}
.outside-border{
  margin-top: 95px  ;

}
img{
  object-fit: cover;
  width: 100%;
  height: 100%;
  border-bottom-left-radius: 16px;
  border-top-left-radius: 16px;
}
.carousel-item{
  height: 180px;
}
.carousel{
  height: 180px;
  border-radius: 40px!important;

}
.room-button{
  position: absolute;
  right: 5px;
  bottom: 5px;
  border-radius: 20px;
}
.text-data{
  position: relative;
  height: 180px;

}
ul{
  column-gap: 10px;
  columns: 1;
  -webkit-columns: 1;
  -moz-columns:1;

}
li{
  font-family: "Oxygen", sans-serif;
  font-size: 17px;
}
.fas{
  color: #0076be;
}
@media screen and (max-width: 370px){
  ul{
    column-gap: 10px;
    columns: 1;
    -webkit-columns: 1;
    -moz-columns:1;
  }
  .text-data{
    height: auto;
    padding-bottom: 20px;
  }

}
</style>
