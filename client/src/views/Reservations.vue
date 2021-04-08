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
              <h4 style="font-size: 20px"> Are you sure you want to delete this reservation ? </h4>
            </div>
            <div class=" modal-footer d-flex justify-content-center">
              <button id="deleteresModalButton" type="button" class="btn btn-primary" data-dismiss="modal">Cancel</button>
              <button @click="deleteRes" type="button" class="btn btn-danger" >Delete</button>
            </div>
          </div>
        </div>
      </div>
      <!-- Modal info -->
      <div v-if="dataloaded" class="modal fade" id="infoModal" tabindex="-1" role="dialog" aria-labelledby="editModal" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="">User Info</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div class="container-fluid p-0">
                <div class="row p-0 ">
                  <div class=" col-lg-6">
                    <ul class="fa-ul">
                      <li> <span class="fa-li"><i class="fas fa-chevron-right"> </i></span><span class="text-header-info">Check-in </span>
                        : {{ currentItem.check_in_date }}
                      </li>
                      <li> <span class="fa-li"><i class="fas fa-chevron-right"> </i></span><span class="text-header-info">Check-out </span>
                        : {{ currentItem.check_out_date }}</li>
                      <li> <span class="fa-li"><i class="fas fa-chevron-right"> </i></span><span class="text-header-info">Days </span>
                        : {{ currentItem.nr_days }} days</li>

                    </ul>
                  </div>
                  <div class=" col-lg-6">
                    <ul class="fa-ul">
                      <li> <span class="fa-li"><i class="fas fa-chevron-right"> </i></span><span class="text-header-info">Last name </span>
                        : {{ currentItem.user.last_name }}
                      </li>
                      <li> <span class="fa-li"><i class="fas fa-chevron-right"> </i></span><span class="text-header-info">Status </span>
                        : {{ currentItem.status }}</li>
                      <li> <span class="fa-li"><i class="fas fa-chevron-right"> </i></span><span class="text-header-info">Price </span>
                        : {{ currentItem.total_price}} <i class="fas fa-dollar-sign"></i></li>
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

      <!--Select type-->

      <div class='row'>
        <div class='col-md-4'>
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text" ><i class="fas fa-search search-icon"></i></span>
            </div>
            <input type="text" class="form-control" placeholder="Ex: room number,name" aria-label="Username" aria-describedby="basic-addon1">
          </div>
        </div>

      </div>

      <!--Select table-->

      <table class="table">

        <thead class="thead-dark">
        <tr  class="headers">
          <th scope="col">#</th>
          <th scope="col">Last Name</th>
          <th scope="col">Status</th>
          <th class="display" scope="col">Check-in</th>
          <th class="display" scope="col">Check-out</th>
          <th scope="col"></th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="item in reservations.slice(showFrom,showTo)" :key="item.id" class="table-data">
          <td>{{item.id}}</td>
          <td>{{item.user.last_name}}</td>
          <td>{{item.status}}</td>
          <td class="display" style="cursor: pointer">{{item.check_in_date}}</td>
          <td class="display" style="cursor: pointer">{{item.check_out_date}}</td>

          <td class="" style="text-align: right">

            <i @click="autocompleteInfoFields(item)" class="fas fa-info option-icons" data-toggle="modal" data-target="#infoModal" ></i>
            <i class="fas fa-trash-alt option-icons" @click="currentItem = item" data-toggle="modal" data-target="#deleteModal" ></i>

          </td>
        </tr>
        </tbody>
      </table>
      <!--Pagination  for table number of rows showed is stored in showRows Variable-->
      <div class="pagination">
        <div class="d-flex justify-content-center" style="width: 100%">
          <i  @click="previousPage" class="fas fa-caret-left"></i>
          <div class="page-text">{{ currentPage }} of {{ totalPages }}</div>
          <i  @click="nextPage" class="fas fa-caret-right"></i>
        </div>
      </div>

    </div>

  </div>
</template>

<script>
import axios from 'axios'
export default {
  mounted () {
    this.loadAll()
    this.showFrom = 0
    this.showTo = this.rowsToShow
    this.currentPage = 1
    this.totalPages = this.reservations.length / this.rowsToShow
    if (this.totalPages === 0) this.totalPages = 1
    if (this.totalPages % 1 !== 0) {
      this.totalPages = parseInt(this.totalPages) + 1
    }
  },
  methods: {
    // gets next n rows from the array of object (pagination)
    async deleteRes () {
      await axios.delete(`/api/reservation/${this.currentItem.id}/delete`, this.axiosConfig)
      await this.loadAll()
      document.getElementById('deleteresModalButton').click()
    },
    async loadAll () {
      const res = await axios.get('api/reservation/get', this.axiosConfig)
      this.reservations = res.data
      this.currentItem = this.reservations[0]
      this.dataloaded = true
    },
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
        this.showTo = this.showFrom + this.rowsToShow
      }
    },

    // gets the array from 0 to showRows (pagination)
    resetArray () {
      this.showFrom = 0
      this.showTo = this.rowsToShow
    },
    // main method for next page for the table of data
    nextPage () {
      if (this.currentPage === this.totalPages) {
        this.currentPage = 1
        this.resetArray()
      } else {
        this.currentPage++
        if (this.currentPage === this.totalPages) { this.nextArray(this.user.length) } else { this.nextArray() }
      }
    },
    // main method for previous page for the table of data
    previousPage () {
      if (this.currentPage !== 1) {
        if (this.currentPage === this.totalPages) {
          this.currentPage -= 1
          this.previousArray(this.user.length)
        } else {
          this.currentPage -= 1
          this.previousArray()
        }
      }
    },

    // autocompletes Info modal fields
    autocompleteInfoFields (item) {
      this.currentItem = item
      // eslint-disable-next-line no-undef
    }
  },
  data () {
    return {
      dataloaded: false,
      currentItem: [{
        id: '',
        check_in_date: '',
        check_out_date: '',
        status: '',
        total_price: '',
        nr_days: '',
        user: {

        }
      }], // for edit
      rowsToShow: 7, // how many rows table has
      currentPage: '',
      showFrom: '', // show From position x
      showTo: '', // show To position y
      totalPages: '', // array.length/ rowsToShow (int),
      axiosConfig: {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          'Access-Control-Allow-Origin': '*',
          token: localStorage.getItem('token')
        }
      },
      reservations: [{
        id: null,
        last_name: null,
        check_in_date: null,
        check_out_date: null,
        user: {
          last_name: null
        }
      }]

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
