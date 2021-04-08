<template>

    <div  class="container m-auto content-area p-0">

      <div class="d-flex justify-content-center">
        <Menu role="Admin"> </Menu>
      <div  class="container-fluid" >
       <router-view/>
      </div>
    </div>
    </div>
</template>

<script>
import Menu from './Menu.vue'
export default {
  data () {
    return {
      mobileMenu: false
    }
  },
  components: {
    Menu

  },
  methods: {

  }
}

</script>
<style scoped>
.content-area{
  background: white;
  height: 80%;
  min-height: 640px;
  max-width: 1000px;
  border-radius: 20px;

}
.d-flex{
  height: 100%;
  width: 100%;
}

</style>
