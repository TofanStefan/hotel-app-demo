<template>

  <!-- Modal -->
  <div class="modal fade" id="edit" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLongTitle">Edit Profile</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <input  class="form-control" :value="firstName"  ><br>
          <input  class="form-control" :value= "lastName">
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary">Save changes</button>
        </div>
      </div>
    </div>
  </div>
  <div  class="container profile-data">
      <button class="btn btn-sm btn-primary dashboard-button edit-bttn" data-toggle="modal" data-target="#edit">
        <span class="fa fa-pen"> </span>Edit
      </button>

    <div class="d-flex justify-content-center profile">
      <div class="card" style="width:200px">
        <img class="card-img-top" src="../assets/not-found.png" alt="Card image">
      </div>
    </div>
    <div class="d-flex justify-content-center">
    <h1 id="name">{{ name }}</h1>
    </div>
    <div class="container" id="userData">

    <div id="data">

      <table>
        <tr>
          <td><span id="role" class="badge badge-secondary">Role</span></td>
          <td><h4> {{role}}</h4></td>
        </tr>
        <tr>
          <td><span id="fn"  class="badge badge-secondary">First Name</span> </td>
          <td><h4>{{firstName}}</h4></td>
        </tr>

        <tr>
          <td> <span id="ln" class="badge badge-secondary">Last Name</span></td>
          <td> <h4> {{lastName}}</h4></td>
        </tr>

        <tr>
          <td><span id="em" class="badge badge-secondary">Email</span>  </td>
          <td><h4>{{email}}</h4> </td>
        </tr>
      </table>

    </div>
  </div>

    </div>

</template>

<script>
export default {
  data () {
    return {
      name: 'Tofan Stefan Sebastian',
      role: 'Manager',
      firstName: 'Tofan',
      lastName: 'Stefan-Sebastian',
      email: 'tofanstefan99ionescu@gmail.com'
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Oxygen&display=swap');

.profile{
  margin-top: 50px;
  font-family: 'Oxygen', sans-serif;

}
#btn-wrapper{
  margin-top: 20px;
}
#data h4{
  color: #8d8d8d;
  font-size: 22px;
  line-height: 1.4;

}

#userData{
  margin-top: 40px;
  border: 1px #ececec solid;
  border-radius: 6px;
  max-width: 500px;

}
#name{
  font-family: 'Oxygen', sans-serif;
  font-size: 25px;
  color: #737373;
  margin-top: 16px;
}
#data{
  text-align: left;
  font-size: 18px;
  font-family: 'Oxygen', sans-serif;
  word-break: break-word;
}
.btn:focus{
  color: white;
}
.badge{
  font-size: 18px;
  margin-right: 20px;
}
.fa-pen{
  margin-right: 5px;
  font-size: 14px;
}
.profile-data{
  position: relative;
  margin-top:100px ;
}
.edit-bttn{
  position: absolute;
  top: -85px;
  right: 5px;

}
</style>
<style>

.dashboard-button
{

  color: white;

  font-family: 'Oxygen', sans-serif;
  width: 80px;
  border-radius: 7px;
  font-size: 16px;
  padding: 0;

}
.
.dashboard-button:focus,.dashboard-button:hover
{
  color: white!important;
}
</style>
