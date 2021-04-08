<template>
  <div class="container-fluid p-0  rooms">

    <div class="account-data">
      <!-- Modal delete -->
      <div class="modal fade" id="deleteModal" tabindex="-1" role="dialog" aria-labelledby="" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <h4 style="font-size: 20px"> Are you sure you want to delete this user ? </h4>
            </div>
            <div class=" modal-footer d-flex justify-content-center">
              <button type="button" id="deleteModalButton" class="btn btn-primary" data-dismiss="modal">Cancel</button>
              <button @click="deleteUser" type="button" class="btn btn-danger" >Delete</button>
            </div>
          </div>
        </div>
      </div>
      <!-- Modal edit -->
      <div  class="modal fade" id="editModal" tabindex="-1" role="dialog" aria-labelledby="editModal" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLongTitle">Edit user</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
             <div class="container">
               <div class="row">
                <div class="col-4">
               <div class="form-check">
                 <input v-model="editRole" class="form-check-input"  type="radio" name="flexRadioDefault" id="radio1" value="Admin" >
                 <label class="form-check-label" for="radio1">
                   Admin
                 </label>
               </div>
                </div>
               <div class="col-4">
               <div class="form-check">
                 <input v-model="editRole" class="form-check-input"  type="radio" name="flexRadioDefault" id="radio2"  value="Guest" >
                 <label class="form-check-label" for="radio2">
                   Guest
                 </label>
               </div>
               </div>
               <div class="col-4">
               <div class="form-check">
                 <input v-model="editRole" class="form-check-input"  type="radio" name="flexRadioDefault" id="radio3"  value="Staff">
                 <label class="form-check-label" for="radio3">
                   Staff
                 </label>
               </div>
               </div>
               </div>
               <div class="input-group mb-3 m-auto input-email">
                 <input v-model="editEmail" type="text" class="form-control" placeholder="Account Email" aria-label="Recipient's username" aria-describedby="basic-addon2"
                 >
                 <span class="input-group-text" id="basic-addon2">EMAIL</span>
               </div>
               <div v-if="editErrorMsg" class="alert alert-warning m-3" role="alert">
                 {{editErrorMsg}}
               </div>

             </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal" id="closeEdit">Close</button>
              <button @click="editUser"  type="button" class="btn btn-primary">Save changes</button>
            </div>
          </div>
        </div>
      </div>
      <!-- Modal info -->
      <div class="modal fade" id="infoModal" tabindex="-1" role="dialog" aria-labelledby="editModal" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="">User Info</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div class="container-fluid">
                <div class="row">
                  <div class=" col-lg-6">
                    <ul class="fa-ul">
                      <li> <span class="fa-li"><i class="fas fa-chevron-right"> </i></span><span class="text-header-info">Role </span> : {{curentItem.roleId}} </li>
                      <li> <span class="fa-li"><i class="fas fa-chevron-right"> </i></span><span class="text-header-info">First Name </span>:{{curentItem.first_name}}</li>

                    </ul>
                  </div>
                  <div class=" col-lg-6">
                    <ul class="fa-ul">
                      <li> <span class="fa-li"><i class="fas fa-chevron-right"> </i></span><span class="text-header-info">Created </span> :{{curentItem.createdAt}}  </li>
                      <li> <span class="fa-li"><i class="fas fa-chevron-right"> </i></span><span class="text-header-info">Last name </span> :{{curentItem.last_name}}</li>
                    </ul>
                  </div>
                </div>
                <div class="row">
                  <div class=" col-12">
                    <ul class="fa-ul">
                      <li> <span class="fa-li"><i class="fas fa-chevron-right"> </i></span><span class="text-header-info">Email </span>: {{curentItem.email}}</li>
                    </ul>

                  </div>
                </div>

            </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
      <!--Modal Add-->
      <div  class="modal fade" id="addModal" tabindex="-1" role="dialog" aria-labelledby="addModal" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Add user</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div class="container">
                    <div class="row">
                      <div class="col-md-6">
                        <div class="form-group">

                          <input v-model="addModel.firstName" type="text" class="form-control" aria-describedby="emailHelp" placeholder="Enter first name">

                        </div>
                    </div>
                      <div class="col-md-6">
                        <div class="form-group">
                          <input v-model="addModel.lastName"  type="text" class="form-control"  aria-describedby="emailHelp" placeholder="Enter last name">

                      </div>

                      </div>
                    </div>
                <div v-if="addModel.fnameError||addModel.lnameError" class="alert alert-warning" role="alert">
                  <div> {{addModel.fnameError}}  </div>
                  <div> {{addModel.lnameError}}  </div>
                </div>
                <input type="email" v-model="addModel.email"  class="form-control input-add"  aria-describedby="emailHelp" placeholder="Enter email">
                <div v-if="addModel.emailError" class="alert alert-warning" role="alert">
                  <div> {{addModel.emailError}}  </div>
                </div>
                <input type="password" v-model="addModel.password" class="form-control input-add"  aria-describedby="emailHelp" placeholder="Password">
                <div v-if="addModel.passwordError" class="alert alert-warning" role="alert">
                  <div> {{addModel.passwordError}}  </div>
                </div>
                <div class="row">
                  <div class="col-4">
                    <div class="form-check">
                      <input v-model="addModel.role"  class="form-check-input"  type="radio" name="flexRadioDefault"  value="Admin" >
                      <label class="form-check-label" for="radio1">
                        Admin
                      </label>
                    </div>
                  </div>
                  <div class="col-4">
                    <div class="form-check">
                      <input v-model="addModel.role" class="form-check-input"  type="radio" name="flexRadioDefault"   value="Guest" >
                      <label class="form-check-label" for="radio2">
                        Guest
                      </label>
                    </div>
                  </div>
                  <div class="col-4">
                    <div class="form-check">
                      <input v-model="addModel.role" class="form-check-input"  type="radio" name="flexRadioDefault"   value="Staff">
                      <label class="form-check-label" for="radio3">
                        Staff
                      </label>
                    </div>
                  </div>
                </div>
                <div v-if="addModel.serverError" style="margin-top: 20px" class="alert alert-warning" role="alert">
                  <div> {{addModel.serverError}}  </div>
                </div>

              </div>
            </div>
            <div class="modal-footer">
              <button @click="resetAddModel" id="addModalButton" type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              <button @click="addUser" type="button" class="btn btn-primary">Add</button>
            </div>
          </div>
        </div>
      </div>

      <!--Select type-->

      <div class='row'>
        <div class='col-md-4'>
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text" ><i class="fas fa-search search-icon"></i></span>
            </div>
            <input type="text" class="form-control" placeholder="Search by email,name" aria-label="Username" aria-describedby="basic-addon1">
          </div>
        </div>

        <div class='col-md-4'>
        <div class="form-group">
          <select v-model="showByRole" @change="loadbyRole" class="form-control" id="exampleFormControlSelect1">
            <option>All</option>
            <option>Admin</option>
            <option>Guest</option>
            <option>Staff</option>
          </select>
        </div>
        </div>
      </div>

      <!--Select table-->

      <table class="table">

        <thead class="thead-dark">
        <tr  class="headers">
          <th scope="col">First Name</th>
          <th scope="col">Last Name</th>
          <th scope="col">Role</th>
          <th class="display" scope="col">Email</th>
          <th style="text-align: right" scope="col"> <button data-toggle="modal" data-target="#addModal"  class="btn  btn-sm btn-light edit-rooms-button">

            Add </button></th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="item in users.slice(showFrom,showTo)" :key="item.id" class="table-data">
          <td scope="row">{{item.first_name}}</td>
          <td>{{item.last_name}}</td>
          <td>{{item.roleId}}</td>
          <td class="display" style="cursor: pointer">{{item.email}}</td>

          <td class="" style="text-align: right">

            <i @click="autocompleteInfoFields(item)" class="fas fa-info option-icons" data-toggle="modal" data-target="#infoModal" ></i>
            <i @click="autocompleteEditFields(item)" class="fas fa-pen option-icons" data-toggle="modal" data-target="#editModal"></i>
            <i @click="curentItem=item" class="fas fa-trash-alt option-icons" data-toggle="modal" data-target="#deleteModal" ></i>

          </td>
        </tr>
        </tbody>
      </table>
      <!--Pagination  for table number of rows showed is stored in showRows Variable-->
      <div class="pagination">
        <div class="d-flex justify-content-center" style="width: 100%">
          <i  @click="previousPage" class="fas fa-caret-left"></i>
          <div class="page-text">{{curentPage}} of {{totalPages}} </div>
          <i  @click="nextPage" class="fas fa-caret-right"></i>
        </div>
      </div>

    </div>

  </div>
</template>

<script>
import axios from 'axios'
import validation from '../functions/validation'

export default {

  mounted () {
    this.loadAll()
    this.paginationStart()
  },
  methods: {
    resetAddModel () {
      this.addModel.role = 'Guest'
      this.addModel.password = ''
      this.addModel.firstName = ''
      this.addModel.lastName = ''
      this.addModel.email = ''
      this.resetAddValidation()
    },
    resetAddValidation () {
      this.addModel.passwordError = null
      this.addModel.emailError = null
      this.addModel.fnameError = null
      this.addModel.lnameError = null
    },
    asignCurrentItem (item) {
      this.curentItem = item
    },
    addUserValidation () {
      this.resetAddValidation()
      let validationNumber = 0
      if (!validation.email(this.addModel.email)) {
        this.addModel.emailError = 'Please enter a valid email'
        validationNumber++
      } else this.addModel.emailError = null
      if (validation.isEmpty(this.addModel.lastName)) {
        this.addModel.lnameError = 'Last name cannot be empty'
        validationNumber++
      }
      if (validation.isEmpty(this.addModel.firstName)) {
        this.addModel.fnameError = 'First name cannot be empty'
        validationNumber++
      }
      if (!validation.onlyLetters(this.addModel.firstName)) {
        this.addModel.fnameError = 'First name cannot contain numbers'
        validationNumber++
      }
      if (!validation.onlyLetters(this.addModel.lastName)) {
        this.addModel.lnameError = 'Last name cannot contain numbers'
        validationNumber++
      }
      if (!validation.passowrd(this.addModel.password)) {
        this.addModel.passwordError = 'Password needs atleast 6 characters'
        validationNumber++
      }

      if (validationNumber === 0) { return true } else { return false }
    },
    async addUser () {
      this.addModel.serverError = ''
      if (this.addUserValidation()) {
        try {
          await axios.post('/api/user/create', {
            first_name: this.addModel.firstName,
            last_name: this.addModel.lastName,
            email: this.addModel.email,
            password: this.addModel.password,
            roleId: this.convertFromRole(this.addModel.role)
          }, this.axiosConfig)
          this.loadAll()
          this.showByRole = 'All'
          document.getElementById('addModalButton').click()
          this.resetAddModel()
        } catch (err) {
          this.addModel.serverError = err.response.data.message
        }
      }
    },
    async deleteUser () {
      await axios.delete(`/api/user/${this.curentItem.id}/delete`, this.axiosConfig)
      document.getElementById('deleteModalButton').click()
      this.loadAll()
      this.showByRole = 'All'
    },
    async editUser () {
      if (validation.email(this.editEmail)) {
        const role = this.convertFromRole(this.editRole)
        const postData = {
          roleId: role,
          email: this.editEmail
        }
        await axios.put(`/api/user/${this.curentItem.id}/update`, postData, this.axiosConfig)
        this.loadAll()
        document.getElementById('closeEdit').click()
      } else this.editErrorMsg = 'Please enter a valid email address'
    },
    async loadbyRole () {
      if (this.showByRole === 'All') { this.loadAll() } else {
        const roleId = this.convertFromRole(this.showByRole)
        const res = await axios.get(`/api/user/${roleId}/get`, this.axiosConfig)
        this.users = res.data
        for (const item of this.users) {
          item.roleId = this.convertId(item.roleId)
        }
      }
    },
    async loadAll () {
      const res = await axios.get('/api/user/get', this.axiosConfig)
      this.users = res.data
      for (const item of this.users) { item.roleId = this.convertId(item.roleId) }
    },
    convertId (value) {
      switch (value) {
        case 1 : return 'Admin'
        case 2 : return 'Guest'
        case 3 : return 'Staff'
      }
    },
    convertFromRole (value) {
      switch (value) {
        case 'Admin' : return 1
        case 'Guest' : return 2
        case 'Staff' : return 3
      }
    },
    paginationStart () {
      this.showFrom = 0
      this.showTo = this.rowsToShow
      this.curentPage = 1
      this.totalPages = this.users.length / this.rowsToShow
      if (this.totalPages === 0) this.totalPages = 1
      if (this.totalPages % 1 !== 0) {
        this.totalPages = parseInt(this.totalPages) + 1
      }
    },
    // gets next n rows from the array of object (pagination)
    nextArray (ev) {
      this.showFrom += this.rowsToShow
      this.showTo += this.rowsToShow
      if (ev) {
        this.showTo = ev
      }
    },
    // gets previous n rows from the array of object (pagination)
    previousArray (ev) {
      this.showFrom -= this.rowsToShow
      this.showTo -= this.rowsToShow
      if (ev) {
        console.log(this.showFrom)
        this.showTo = this.showFrom + this.rowsToShow
        console.log(this.showTo)
      }
    },

    // gets the array from 0 to showRows (pagination)
    resetArray () {
      this.showFrom = 0
      this.showTo = this.rowsToShow
    },
    // main method for next page for the table of data
    nextPage () {
      if (this.curentPage === this.totalPages) {
        this.curentPage = 1
        this.resetArray()
      } else {
        this.curentPage++
        if (this.curentPage === this.totalPages) { this.nextArray(this.users.length) } else { this.nextArray() }
      }
    },
    // main method for previous page for the table of data
    previousPage () {
      if (this.curentPage !== 1) {
        if (this.curentPage === this.totalPages) {
          this.curentPage -= 1
          this.previousArray(this.users.length)
        } else {
          this.curentPage -= 1
          this.previousArray()
        }
      }
    },
    // autocompletes Edit modal fields
    autocompleteEditFields (item) {
      this.editErrorMsg = null
      this.curentItem = item
      this.editRole = item.roleId
      this.editEmail = item.email
    },
    // autocompletes Info modal fields
    autocompleteInfoFields (item) {
      this.curentItem = item
      // eslint-disable-next-line no-undef
    }
  },
  data () {
    return {
      addModel: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        role: 'Guest',
        fnameError: '',
        lnameError: '',
        emailError: '',
        passwordError: '',
        serverError: ''

      },
      axiosConfig: {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          'Access-Control-Allow-Origin': '*',
          token: localStorage.getItem('token')
        }
      },
      editErrorMsg: null,
      editRole: null,
      editEmail: null,
      showByRole: 'All',
      curentItem: '', // for edit
      rowsToShow: 7, // how many rows table has
      curentPage: '',
      showFrom: '', // show From position x
      showTo: '', // show To position y
      totalPages: 1, // array.length/ rowsToShow (int)

      users: []
    }
  }
}

</script>

<style scoped>

.fa-pen{
  color: #628bb5;
}
.input-add{
  margin-bottom: 10px;
}
.fa-info{

  color: #6c757d;
}
.fa-trash-alt{
  color: #ec7f7f;
}
.fa-info,.fa-trash-alt,.fa-pen{
  cursor: pointer;
}
.option-icons{
  margin-right: 8px;
  margin-left: 8px;
}
.text-header-info{
  font-weight: 500;
}
.input-email{
  margin-top: 25px!important;
  width: 90%
}

.rooms{
  border: 2px transparent solid;
  height: 100%;
  position: relative;
}
.account-data{
  margin-top:40px;
}
.pagination{
  left: 0;
  bottom: 30px;
  position: absolute;
  width: 100%;
  height: 40px;
}

@media screen and (max-width: 544px){
  .headers{
    font-size: 13px!important;
  }
  .table-data{
    font-size: 15px!important;
  }
}

@media screen and (max-width: 367px)
{

  .headers{
    font-size: 14px!important;
  }
  .table-data{
    font-size: 12px!important;
  }
  .option-icons{
    margin-right: 4px;
    margin-left: 4px;
  }
  .edit-rooms-button{
    padding: 0px 0px!important;
    margin-right: -5px;
    width: 60px;

  }

}
.search-icon{
  color: #0d8af0;
}
.table{
  position: relative;
}
input[type="file"]{
  position: absolute;
  left:20000px;
}
td
{
  max-width: 12vw;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

td,th{
  text-align: left;
  font-family: "Oxygen", sans-serif;
}

</style>

<style >

li{
  text-align: left;
}

</style>
