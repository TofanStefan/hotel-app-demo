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
          <div class="card" style="margin-bottom: 20px" >
            <img class="card-img-top profile-image" id="editImage" src="" alt="Card image cap">
            <div class="card-body">
              <input  @change="previewPhoto" type="file" id="profile-photo" >
              <button @click="loadimage"  class="btn-sm btn-secondary inputSelectors" id="photo1Selector">Select</button>
            </div>
          </div>
          <input  v-model="editModel.fname" placeholder="First name" class="form-control"><br>
          <div v-if="errorMsgFname" class="alert alert-warning alert-profilr" role="alert">
            {{errorMsgFname}}
          </div>
          <input v-model="editModel.lname" placeholder="Last name" class="form-control">
          <div v-if="errorMsgLname" class="alert alert-warning alert-profile" role="alert">
           {{errorMsgLname}}
          </div>
        </div>
        <div class="modal-footer">
          <button id="exitEditProfileModal" type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          <button @click="edit" type="button" class="btn btn-primary">Save changes</button>
        </div>
      </div>
    </div>
  </div>
  <div  class="container profile-data">
      <button @click = "resetModel" class="btn btn-sm btn-primary dashboard-button edit-bttn" data-toggle="modal" data-target="#edit">
        <span class="fa fa-pen"> </span>Edit
      </button>

    <div class="d-flex justify-content-center profile">
      <div class="card" style=" width:300px;" >
        <img class="card-img-top profile-image" :src="profilePhoto" alt="Card image">
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
import axios from 'axios'
import validation from '@/functions/validation'

export default {
  data () {
    return {
      role: '',
      firstName: '',
      lastName: '',
      email: '',
      profilePhoto: '',
      editModel: {
        fname: '',
        lname: ''
      },
      errorMsgFname: null,
      errorMsgLname: null

    }
  },
  methods: {
    validate () {
      this.errorMsgFname = ''
      this.errorMsgLname = ''
      let validationNumber = 0
      if (validation.isEmpty(this.editModel.fname)) {
        this.errorMsgFname = 'First name cannot be empty'
        validationNumber++
      }
      if (validation.isEmpty(this.editModel.lname)) {
        this.errorMsgLname = 'Last name cannot be empty'
        validationNumber++
      }
      if (!validation.onlyLetters(this.editModel.fname)) {
        this.errorMsgFname = 'First name cannot contain numbers'
        validationNumber++
      }
      if (!validation.onlyLetters(this.editModel.lname)) {
        this.errorMsgLname = 'Last name cannot contain numbers'
        validationNumber++
      }
      console.log(validationNumber)
      if (validationNumber === 0) { return true } else { return false }
    },
    async edit () {
      if (this.validate() === true) {
        const config = {
          headers: {
            accept: 'application/json',
            'Accept-Language': 'en-US,en;q=0.8',
            'Content-Type': undefined,
            token: localStorage.getItem('token')
          }
        }
        const image = document.getElementById('profile-photo').files
        const data = new FormData()
        if (image && image[0]) {
          data.append('profile_photo', image[0])
        }
        data.append('first_name', this.editModel.fname)
        data.append('last_name', this.editModel.lname)
        await axios.put('api/user/updateProfile', data, config)
        await this.load()
        document.getElementById('exitEditProfileModal').click()
      }
    },
    resetModel () {
      this.editModel.lname = this.lastName
      this.editModel.fname = this.firstName
      document.getElementById('profile-photo').value = null
      document.getElementById('editImage').src = this.profilePhoto
    },
    loadimage () {
      document.getElementById('profile-photo').click()
    },
    previewPhoto () {
      const input = document.getElementById('profile-photo').files
      if (input && input[0]) {
        const reader = new FileReader()
        reader.onload = function (e) {
          // eslint-disable-next-line no-undef
          document.getElementById('editImage').src = e.target.result
        }
        reader.readAsDataURL(input[0]) // convert to base64 string
      }
    },
    convertId (value) {
      switch (value) {
        case 1 : return 'Admin'
        case 2 : return 'Guest'
        case 3 : return 'Staff'
      }
    },
    async load () {
      const res = await axios.get('/api/user/getUser', {
        headers: { token: localStorage.getItem('token') }
      })
      this.role = this.convertId(res.data.roleId)
      this.firstName = res.data.first_name
      this.lastName = res.data.last_name
      this.profilePhoto = res.data.profile_photo.replace('public', '')
      this.email = res.data.email
    }

  },
  async mounted () {
    if (!localStorage.getItem('token')) { this.$router.push('/') } else {
      this.load()
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
.alert-profile{
  margin:auto ;
  margin-top: 20px;
  width: 70%;
}

#userData{
  margin-top: 20px;

  border-radius: 6px;
  max-width: 500px;

}
#name{
  font-family: 'Oxygen', sans-serif;
  font-size: 25px;
  color: #737373;

}
.form-control{
  margin: auto;
  width: 70%;
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
#profile-photo{
 display: none;
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
.card{
  padding-top: 20px;
}
.profile-image{
  object-fit: contain;
  height: 200px;
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
