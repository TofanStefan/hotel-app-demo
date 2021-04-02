<template>
  <div class="container-fluid">
    <div class="row p-2">
      <div class="col-md-8">
        <h1>Contact</h1>
        <div class="container cs">
          <div id="contact-info">
            <p>Email: jhonweek@gmail.com</p>
            <p>Phone: +23055023444</p>
          </div>
          <div class="d-flex justify-content-center">
            <i class="fab fa-instagram"></i>
            <div class="divider"></div>
            <i class="fab fa-facebook"></i>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <img class="img-fluid" src="../../assets/Contact-us-Image.png" />
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
@media screen and (max-width: 1400px) {
  .img-fluid {
    margin-top: 40px !important;
  }
}
@media screen and (max-width: 980px) {
  .img-fluid {
    margin-top: 70px !important;
  }
}

@media screen and (max-width: 500px) {

  p {
    font-size: 18px !important;
  }
}
h1,
p {
  font-family: "Oxygen", sans-serif;
}

p {
  font-size: 23px;
}

.img-fluid {
  margin-right: 20px;
  max-height: 500px;
}
.cs {
  margin-top: 30px;
  border: rgb(156, 153, 153) 2px;
  border-style: dashed;
  width: ~'calc(100% - 30px)';
  max-width: 500px;
  height: 170px;
}
.row {
  margin-top: 60px;
}
.col-md-8 {
  margin-bottom: 50px;
}
#contact-info {
  margin-top: 20px;
}
.divider {
  width: 20px;
}
.fab {
  font-size: 35px;
}
.fa-facebook {
  color: #0d8af0;
}
.fa-instagram {
  color: #d74d56;
}
</style>
