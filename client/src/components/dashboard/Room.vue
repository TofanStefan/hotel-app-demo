<template>
  <div class="container" style="border: 2px red solid"  id="containerRoom">
    <div class="row p-2" id="wrap">
      <!-- Carousel -->
      <div class="carouselDiv">
        <div id="opa" class="carousel slide" data-ride="carousel">
          <!-- The slideshow -->
          <div class="carousel-inner">
            <div class="carousel-item active">
              <img src="../../assets/wide-img.jpg" class="d-block w-100" alt="">
            </div>
            <div class="carousel-item">
              <img src="../../assets/room1.jpg" class="d-block w-100" alt="">
            </div>
            <div class="carousel-item">
              <img src="../../assets/room2.jpg" class="d-block w-100" alt="">
            </div>
            <div class="carousel-item">
              <img src="../../assets/room3.jpg" class="d-block w-100" alt="">
            </div>
          </div>
          <!-- Left and right controls -->
          <a class="carousel-control-prev" href="#opa" role="button" data-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
          </a>
          <a class="carousel-control-next" :href="id_two" role="button" data-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
          </a>
        </div>
      </div>
      <!-- Room information -->
      <div class="col-lg-8 info-room">
        <div class="container-fluid align-middle">
          <h3 id="roomName">{{name}}</h3>
          <div>
            <ul class="fa-ul">
              <li><span class="fa-li"><i class="fas fa-chevron-right"></i></span>{{facility1}}</li>
              <li><span class="fa-li"><i class="fas fa-chevron-right"></i></span> Sea view</li>
              <li><span class="fa-li"><i class="fas fa-chevron-right"></i></span>TV</li>
              <li><span class="fa-li"><i class="fas fa-chevron-right"></i></span>Air-conditioner</li>
              <li><span class="fa-li"><i class="fas fa-chevron-right"></i></span>Room service</li>
              <li><span class="fa-li"><i class="fas fa-chevron-right"></i></span>Mini-bar</li>
              <li><span class="fa-li"><i class="fas fa-chevron-right"></i></span>Audio-system</li>
              <li><span class="fa-li"><i class="fas fa-chevron-right"></i></span>Room service</li>
              <li><span class="fa-li"><i class="fas fa-chevron-right"></i></span>Room service</li>
            </ul>
          </div>
          <h4 id="roomPrice">
            <i class="fas fa-dollar-sign" id="dollarSign"></i> {{price}} </h4>
          <p>Price for {{nrOfNights}} nights</p>

        </div>
        <!-- Select button -->
        <div class="d-flex justify-content-end" >
          <button type="button" class="btn btn-primary" id="buttonSelect">Select</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      price: '175',
      name: 'Atlantic Single Room',
      nrOfNights: '3',
      id_two: '', // utilised to give different id's to carousels so we can change the images on each carousel on the page without interfering with the rest of them
      facility1: 'Wi-fi'

    }
  },
  props: ['id_one'],
  created () {
    this.id_two = '#' + this.id_one // referencing the id of the carousel to the control buttons
    console.log(this.id_two)
  }
}
</script>

<style scoped>
.carouselDiv{
  width: 400px !important;
  height: 300px !important;
}
img{
  width: 250px !important;
  height: 290px !important;
  object-fit: cover;
}
#dollarSign{
  color: #59a759ad;
}
#containerRoom{
  align-self: center;
}
.fas{
  color: #0076be;
}
.carousel-inner img{
  width: 100%;
  height: 50%;
}
#buttonSelect{
  align-self: flex-end;
  color: white;
  font-family: "Oxygen", sans-serif;
  background-color: #0076be;
  border: 0;
  font-size: 25px;
  border-radius: 15px;
  bottom: 10px;

}
#wrap{
  background: rgb(255, 255, 255);
  border: 0;
  border-color: #d3dce0;
  border-radius: 15px;

}
ul{
  column-gap: 30px;
  columns: 3;
  -webkit-columns: 3;
  -moz-columns:3;

}
li{
  font-family: "Oxygen", sans-serif;
  font-size: 17px;
}
#roomName{
  font-family: "Oxygen" , sans-serif;
  font-size: 26px;
  margin-top:5px;
}
p{
  font-family: "Oxygen", sans-serif;
  font-size: 17px;
}

@media (max-width: 490px) {
  .carouselDiv{
    width:auto !important;
    height: 200px !important;
  }
  img{
    width: 250px !important;
    height: 200px !important;
    object-fit: fill;
  }
  ul{
    columns: 1;
    -webkit-columns: 1;
    -moz-columns:1;
  }
  #roomName{
    font-family: "Oxygen" , sans-serif;
    font-size: 18px;
    margin-top:5px;
  }
  p{
    font-family: "Oxygen", sans-serif;
    font-size: 13px;
  }
  li{
    font-family: "Oxygen", sans-serif;
    font-size: 12px;
  }
  #buttonSelect{
    align-self: flex-end;
    color: white;
    font-family: "Oxygen", sans-serif;
    background-color: #0076be;
    border: 0;
    font-size: 19px;
    border-radius: 15px;
    bottom: 10px;
  }
  #containerRoom{
    align-self: center;
    margin-right:11px;
  }
  #buttonSelect{
    color: white;
    font-family: "Oxygen", sans-serif;
    background-color: #0076be;
    border: 0;
    font-size: 15px;
    border-radius: 15px;
    bottom: 10px;
    margin-right: -15px;
  }
}
@media (max-width: 1200px){
  .carouselDiv{
    width: 700px !important;
  }
}
@media (min-width: 767px){
  .carouselDiv{
    width: 100% !important;
    height: 290px !important;

  }

}
@media(min-width:1000px){
  .carouselDiv{
    max-width: 310px;
    max-height: 310px;

  }
}
@media (min-width: 1200px) {
  .infoRoom{
    margin-left:50px;
  }
  #buttonSelect{
    color: white;
    font-family: "Oxygen", sans-serif;
    background-color: #0076be;
    border: 0;
    font-size: 25px;
    border-radius: 15px;
    margin-bottom: -75px;
    margin-right: -10px;
  }
  .container{
    max-width: 950px;
  }
}
</style>
