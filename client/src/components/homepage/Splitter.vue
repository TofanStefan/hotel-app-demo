<template>
  <div class="d-flex align-items-center justify-content-center">

    <template v-if="show">
      <div class="square"> <img class="icons" src="../../assets/wifi-solid.svg"> </div>
      <div class="square" >  <img class="icons" src="../../assets/utensils-solid.svg"> </div>
      <div class="square" > <img class="icons" src="../../assets/swimming-pool-solid.svg">  </div>
      <div class="square" ><img class="icons" src="../../assets/nfc3.png">  </div>
      <div class="square" ><img class="icons" src="../../assets/dumbbell-solid.svg">  </div>
    </template>

   </div>
</template>

<script>
export default {
  data () {
    return {
      showSquares: true
    }
  },
  props: {
    show: {
      type: Boolean,
      default: false
    }
  }

}
</script>

<style scoped>
@media screen and (max-width :750px) {
    .square{
    width: 12vw!important;
    height: 12vw!important;
    border-radius: 2vw!important;
    }
     .d-flex{
        height: 100px!important;

    }

}
@media screen and (max-width :500px) {
    .d-flex{
        height: 70px!important;

    }

}
.d-flex{
    margin-top: 10px;
    height: 130px;
    background: rgba(189, 214, 231, 0.54);
    opacity: 0.6;

}
.square{
    width: 100px;
    height: 100px;

   color: black;
    background-color: white;
    margin: 0px 2vw;
    border-radius: 25px;

}
.icons{
    height: 50%;
    width: 50%;
    margin-top: 20%;
}

</style>
