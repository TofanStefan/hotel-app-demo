<template>

  <div class="dashboard d-flex">
      <Admin></Admin>

  </div>

</template>
<script>
import Admin from '../components/dashboard/Admin.vue'
export default {
  components: {
    Admin
  }

}
</script>

<style scoped>
#nav {
  padding: 30px;
}

 a {
  font-weight: bold;
  color: #2c3e50;
}

 a.router-link-exact-active {
  color: #42b983;
}
.dashboard{
  height: 100vh!important;
  width: 100%;
    background: rgb(130,157,189);
    background: linear-gradient(90deg, rgba(130,157,189,1) 0%, rgba(192,196,212,1) 34%, rgba(147,193,203,1) 100%);
  min-height:800px;
}
</style>
