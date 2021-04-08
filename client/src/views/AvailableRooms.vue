<template>
  <!-- container wrapper -->
  <div ref="tes" class="container-fluid p-0 wrapper">
    <div class="container date-container">
    <div class="d-flex">
     <div id="first-date">
       <div class="input-group mb-3">
         <input  id="dp1" type="text" class="form-control clickable input-md" readonly="readonly"  placeholder="Check-In">
       <div class="input-group-append">
         <span class="input-group-text cal" id="basic-addon2"><i class="far fa-calendar-alt"></i></span>
       </div>
       </div>
     </div>
      <div id="last-date">
        <div class="input-group mb-3">
      <input ref="last"  @change="loadRooms" id="dp2" type="text" class="form-control clickable input-md"  readonly="readonly" placeholder=" Check-Out">
          <div  class="input-group-append">
          <span class="input-group-text cal" id="basic-addon1" ><i class="far fa-calendar-alt"></i></span>

        </div>
        </div>
      </div>
  </div>
    </div>

     <!-- room wrapper -->
    <div class="for-scroll outside-border p-1" id="style-1">
    <div  class="rooms-wrapper">
      <template  v-for="item in rooms" :key="item.id">
        <div class="container p-0 room-wrapper" >
          <div class="row room-border">
            <div class="col-sm-3 p-0 ">
              <div :id="'item'+item.id" class="carousel slide" data-ride="carousel">
                <div class="carousel-inner">
                  <div class="carousel-item active">
                    <img class="d-block w-100" :src="item.photos[0]" alt="First slide">
                  </div>
                  <div class="carousel-item">
                    <img class="d-block w-100" :src="item.photos[1]"  alt="Second slide">
                  </div>
                  <div class="carousel-item">
                    <img class="d-block w-100" :src="item.photos[2]" alt="Third slide">
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
                <h4>Atlantic {{ item.type }} Room</h4>
                <ul class="fa-ul" >
                  <li v-for="fac in item.facilities" :key="fac"><span class="fa-li"><i class="fas fa-chevron-right"></i></span>{{ fac }}</li>
                </ul>
              <div id="roomPrice">

                <h4 >
                  Price : {{item.total_price}} <span> <i class="fas fa-dollar-sign" id="dollarSign"></i></span>
                </h4>
                <p v-if="nr_nights!=1" style="text-align: left" > Price for {{nr_nights}} nights  </p>
                <p v-else style="text-align: left" > Price for {{nr_nights}} night  </p>

              </div>
                <button  @click="reserve(item)" class="btn btn-secondary room-button">Reserve</button>
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

// eslint-disable-next-line no-unused-vars

export default {

  data () {
    return {
      start_date: null,
      end_date: null,
      nr_nights: null,
      rooms: [],
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
    /* global  $:true */
    /* eslint no-undef: 2 */
    var nowTemp = new Date()
    var now = new Date(nowTemp.getFullYear(), nowTemp.getMonth(), nowTemp.getDate(), 0, 0, 0, 0)

    var checkin = $('#dp1').datepicker({
      format: 'yyyy-mm-dd',
      beforeShowDay: function (date) {
        return date.valueOf() >= now.valueOf()
      },
      autoclose: true,
      dateFormat: 'yyyy-mm-dd'

    }).on('changeDate', function (ev) {
      if (ev.date.valueOf() > checkout.datepicker('getDate').valueOf() || !checkout.datepicker('getDate').valueOf()) {
        var newDate = new Date(ev.date)
        newDate.setDate(newDate.getDate() + 1)
        checkout.datepicker('update', newDate)
      }

      $('#dp2')[0].focus()
    })

    var checkout = $('#dp2').datepicker({
      format: 'yyyy-mm-dd',
      beforeShowDay: function (date) {
        if (!checkin.datepicker('getDate').valueOf()) {
          return date.valueOf() >= new Date().valueOf()
        } else {
          return date.valueOf() > checkin.datepicker('getDate').valueOf()
        }
      },
      autoclose: true,
      dateFormat: 'YYYY-MM-DD'

    })

    const startDate = new Date()
    const endDate = new Date()
    startDate.setDate(startDate.getDate())
    endDate.setDate(endDate.getDate() + 1)
    const start = startDate.getFullYear() + '-' + ('0' + (startDate.getMonth() + 1)).slice(-2) + '-' + ('0' + startDate.getDate()).slice(-2)
    const end = endDate.getFullYear() + '-' + ('0' + (endDate.getMonth() + 1)).slice(-2) + '-' + ('0' + endDate.getDate()).slice(-2)

    document.getElementById('dp1').value = start
    document.getElementById('dp2').value = end
    window.$(this.$refs.last).datepicker().on('changeDate', await this.loadRooms)
    this.loadRooms()
  },
  methods: {
    async reserve (item) {
      if (localStorage.getItem('token')) {
        const data = {
          check_in_date: this.start_date,
          check_out_date: this.end_date,
          roomId: item.id,
          nr_days: this.nr_nights,
          total_price: item.total_price
        }
        await axios.post('api/reservation/create', data, this.axiosConfig)
        await this.loadRooms()
      } else {
        this.$router.push('/?login=true')
      }
    },
    async loadRooms () {
      if (document.getElementById('dp1').value !== '' && document.getElementById('dp2').value !== '') {
        const start = document.getElementById('dp1').value
        const end = document.getElementById('dp2').value
        this.start_date = start
        this.end_date = end
        const res = axios.get(`/api/reservation/${start}/${end}/available`, this.axiosConfig)
        this.rooms = (await res).data.rooms
        this.nr_nights = (await res).data.nr_days
        for (let index = 0; index < this.rooms.length; index++) {
          for (let i = 0; i < 3; i++) {
            this.rooms[index].photos[i] = this.rooms[index].photos[i].replace('public', '')
          }
        }
      }
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
#first-date{
  margin-right: 15px;
}
#last-date{
  margin-left: 15px;
}
.rooms-wrapper{

  height: 100%;
  width: calc(100% - 25px);

}
#dollarSign{
  color: #42b983;
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
.outside-border{

}
.no_nigths{
  font-size: 12px;
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
#roomPrice{
  position: absolute;
  bottom: 0;
  left: 10px;
  margin: 0;
  padding: 0;
  line-height: 2px;
}
.room-button{
  position: absolute;
  right: 5px;
  bottom: 5px;
  border-radius: 20px;
  background-color: #0076be;
}
.text-data{
  position: relative;
  height: 180px;

}
ul{
  column-gap: 10px;
  columns: 2;
  -webkit-columns: 2;
  -moz-columns:2;

}
li{
  font-family: "Oxygen", sans-serif;
  font-size: 17px;
}
.fas{
  color: #0076be;
}
.cal{
  background-color: #1a76ba;
}
#dp1,#dp2{
  background-color: white;
  font-family: "Oxygen", sans-serif;
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
.date-container{
  max-width: 600px;
  margin-top: 40px;
  margin-bottom: 3px;
}

input {
  padding:10px;
  font-family: FontAwesome, "Open Sans", Verdana, sans-serif;
  font-style: normal;
  font-weight: normal;
  text-decoration: inherit;
  border-radius: 0 !important;
}
.form-control {
  border-radius: 0 !important;
  font-size: 12x;
}
.fa-calendar-alt{
  color: #fcfcfc;
}

.clickable { cursor: pointer; }

</style>
