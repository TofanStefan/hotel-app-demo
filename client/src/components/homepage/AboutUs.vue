<template>
  <div class="container-fluid">
      <div class="row p-2">
        <div class="col-md-4">
            <img class="img-fluid" src="../../assets/About-us-Image.png">
        </div>
         <div class="col-md-8">
            <div class="container-fluid align-middle">
                <h1> About us </h1>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
              <p> Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
                reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                culpa qui officia deserunt mollit anim id est laborum.
              </p>
            </div>
        </div>
      </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>

@media screen and (max-width :500px){
    p{
        font-size: 18px!important;
    }
}
h1,p {
    font-family: 'Oxygen', sans-serif;
}
h1{
    margin-bottom: 50px;
}
p{
    font-size: 23px;
}
.align-middle{
    margin-top:80px;
}
.img-fluid{
    max-height: 500px;
    margin-top: 40px;
}

</style>
