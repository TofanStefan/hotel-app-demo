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
              <h4 style="font-size: 20px"> Are you sure you want to delete this room ? </h4>
            </div>
            <div class=" modal-footer d-flex justify-content-center">
              <button id="deleteModalButton" type="button" class="btn btn-primary" data-dismiss="modal">Cancel</button>
              <button @click="deleteRoom" type="button" class="btn btn-danger" >Delete</button>
            </div>
          </div>
        </div>
      </div>
      <!-- Modal edit -->
      <div  class="modal fade" id="editModal" tabindex="-1" role="dialog" aria-labelledby="editModal" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLongTitle">Edit room</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div class="container-fluid">
                <div class="row">
                  <div class="col-4">
                    <div class="card" >

                      <img class="card-img-top" id="imgE1" :src="curentItem.photos[0]" alt="Card image cap">
                      <div class="card-body">
                        <input @change="updateFile" type="file" id="photo1" >
                        <button class="btn-sm btn-secondary inputSelectors" id="photo1Selector">Select</button>
                      </div>
                    </div>
                  </div>
                  <div class="col-4">
                    <div class="card">
                      <img class="card-img-top "  id="imgE2" :src="curentItem.photos[1]" alt="Card image cap">
                      <div class="card-body">
                        <input @change="updateFile" type="file" id="photo2">
                        <button class="btn-sm btn-secondary inputSelectors" id="photo2Selector">Select</button>
                      </div>
                    </div>
                  </div>
                  <div class="col-4">
                    <div class="card" >
                      <img class="card-img-top"  id="imgE3" :src="curentItem.photos[2]" alt="Card image cap">
                      <div class="card-body">
                        <input @change="updateFile"  type="file" id="photo3">
                        <button class="btn-sm btn-secondary inputSelectors" id="photo3Selector">Select</button>
                      </div>
                    </div>
                  </div>
              </div>
                <div class="form-group edit-type-selector">
                  <select  v-model="editRoomModel.type" class="form-control" id="editTypeSelector">
                    <option>Single</option>
                    <option>Double</option>
                    <option>Twin</option>
                  </select>
                  <div class="input-group mb-3 " id="edit-price">
                    <input  v-model="editRoomModel.price"  type="number" class="form-control" placeholder="Price" aria-label="Recipient's username"
                            aria-describedby="basic-addon2" src="" >

                    <div class="input-group-append">
                      <span class="input-group-text" id="basic-addon2"><i class="fas fa-dollar-sign dollar-sign"> </i></span>
                    </div>
                  </div>

                </div>
                <div v-if="editRoomModel.priceError" class="alert alert-warning" role="alert">
                  {{editRoomModel.priceError}}
                </div>

                <div class="check-boxes-container" id="cbid">
                    <div class="form-check" style="">
                      <input v-model="editRoomModel.facilities"  class="form-check-input" type="checkbox" id="SeaView" value="Sea View">
                      <label class="form-check-label" for="SeaView">Sea View</label>
                    </div>

                    <div class="form-check form-check">
                      <input v-model="editRoomModel.facilities"  class="form-check-input" type="checkbox" id="Wi-Fi" value="Wi-Fi">
                      <label class="form-check-label" for="Wi-Fi">Wi-Fi</label>
                  </div>

                  <div class="form-check form-check">
                    <input v-model="editRoomModel.facilities"  class="form-check-input" type="checkbox" id="AudioSystem" value="Audio System">
                    <label class="form-check-label" for="AudioSystem">Audio System</label>
                  </div>
                  <div class="form-check ">
                    <input v-model="editRoomModel.facilities"  class="form-check-input" type="checkbox" id="TV" value="TV">
                    <label class="form-check-label" for="TV">TV</label>
                  </div>

                  <div class="form-check ">
                    <input v-model="editRoomModel.facilities"  class="form-check-input" type="checkbox" id="MiniBar" value="Mini-Bar">
                    <label class="form-check-label" for="MiniBar">Mini-Bar</label>
                  </div>
                  <div class="form-check ">
                    <input v-model="editRoomModel.facilities"  class="form-check-input" type="checkbox" id="AirCon" value="Air Conditioner">
                    <label class="form-check-label" for="AirCon">Air Conditioner</label>
                  </div>
                </div>
                <div v-if="editRoomModel.facilitiesError" class="alert alert-warning" role="alert">
                  {{editRoomModel.facilitiesError}}
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button id="modalEditButton" type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              <button @click="editRoom" type="button" class="btn btn-primary">Save changes</button>
            </div>
          </div>
        </div>
      </div>
      <!-- Modal info -->
      <div class="modal fade" id="infoModal" tabindex="-1" role="dialog" aria-labelledby="editModal" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="">Room Info</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div class="container-fluid">
                <div class="row">
                  <div class="col-4">
                    <div class="card" >
                      <img class="card-img-top" :src="curentItem.photos[0]" alt="Card image cap">
                    </div>
                  </div>
                  <div class="col-4">
                    <div class="card">
                      <img class="card-img-top" :src="curentItem.photos[1]" alt="Card image cap">

                    </div>
                  </div>
                  <div class="col-4">
                    <div class="card" >
                      <img class="card-img-top" :src="curentItem.photos[2]" alt="Card image cap">
                    </div>
                  </div>
                </div>
                <div class="form-group edit-type-selector">
                  <select v-model="infoRoomModel.type" class="form-control" id="infoTypeSelector" disabled>
                    <option>Single</option>
                    <option>Double</option>
                    <option>Twin</option>
                  </select>
                  <div class="input-group mb-3 " id="info-edit-price">
                    <input  v-model="infoRoomModel.price"   type="text" class="form-control" placeholder="Price" aria-label="Recipient's username"
                            aria-describedby="basic-addon2" src="" disabled >

                    <div class="input-group-append" >
                      <span class="input-group-text" ><i class="fas fa-dollar-sign dollar-sign"> </i></span>
                    </div>
                  </div>
                </div>

                <div class="check-boxes-container" id="cbidw">
                  <div class="form-check" style="">
                    <input v-model="infoRoomModel.facilities"  class="form-check-input" type="checkbox" id="SeaViewi" value="Sea View" disabled>
                    <label class="form-check-label" for="SeaView">Sea View</label>
                  </div>

                  <div class="form-check form-check">
                    <input v-model="infoRoomModel.facilities"  class="form-check-input" type="checkbox" id="Wi-Fii" value="Wi-Fi" disabled>
                    <label class="form-check-label" for="Wi-Fi">Wi-Fi</label>
                  </div>

                  <div class="form-check form-check">
                    <input v-model="infoRoomModel.facilities"  class="form-check-input" type="checkbox" id="AudioSystemi" value="Audio System" disabled>
                    <label class="form-check-label" for="AudioSystem">Audio System</label>
                  </div>
                  <div class="form-check ">
                    <input v-model="infoRoomModel.facilities"  class="form-check-input" type="checkbox" id="TVi" value="TV" disabled>
                    <label class="form-check-label" for="TV">TV</label>
                  </div>

                  <div class="form-check ">
                    <input v-model="infoRoomModel.facilities"  class="form-check-input" type="checkbox" id="MiniBari" value="Mini-Bar" disabled>
                    <label class="form-check-label" for="MiniBar">Mini-Bar</label>
                  </div>
                  <div class="form-check ">
                    <input v-model="infoRoomModel.facilities"  class="form-check-input" type="checkbox" id="AirConi" value="Air Conditioner" disabled>
                    <label class="form-check-label" for="AirCon">Air Conditioner</label>
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
              <h5 class="modal-title">Add room</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div class="container-fluid">
                <div class="row">
                  <div class="col-4">
                    <div class="card" >
                      <img class="card-img-top" id="imgA1" :src="addRoomModel.imgSrc1" alt="Card image cap">
                      <div class="card-body">
                        <input @change="updateFile" type="file" id="photo1Add" >
                        <button  class="btn-sm btn-secondary inputSelectors" id="photo1SelectorAdd">Select</button>
                      </div>
                    </div>
                  </div>
                  <div class="col-4">
                    <div class="card">
                      <img class="card-img-top"  id="imgA2" :src="addRoomModel.imgSrc2" alt="Card image cap">
                      <div class="card-body">
                        <input @change="updateFile" type="file" id="photo2Add">
                        <button   class="btn-sm btn-secondary inputSelectors" id="photo2SelectorAdd">Select</button>
                      </div>
                    </div>
                  </div>
                  <div class="col-4">
                    <div class="card" >
                      <img class="card-img-top"  id="imgA3" :src="addRoomModel.imgSrc3" alt="Card image cap">
                      <div class="card-body">
                        <input @change="updateFile" type="file" id="photo3Add">
                        <button  class="btn-sm btn-secondary inputSelectors" id="photo3SelectorAdd">Select</button>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="form-group edit-type-selector">
                  <select v-model="addRoomModel.type" class="form-control" id="addTypeSelector">
                    <option>Single</option>
                    <option>Double</option>
                    <option>Twin</option>
                  </select>
                  <div class="input-group mb-3 " id="add-price" >
                    <input v-model="addRoomModel.price" type="number" class="form-control" placeholder="Price" aria-label="Recipient's username"
                           aria-describedby="basic-addon2" src="" >

                    <div class="input-group-append">
                      <span class="input-group-text" ><i class="fas fa-dollar-sign dollar-sign"> </i></span>
                    </div>
                  </div>
                </div>
                <div v-if="addRoomModel.priceError" class="alert alert-warning" role="alert">
                  {{addRoomModel.priceError}}
                </div>

                <div class="check-boxes-container" >
                  <div class="form-check" style="">
                    <input v-model="addRoomModel.facilities" class="form-check-input" type="checkbox" id="SeaViewa" value="Sea View">
                    <label class="form-check-label" for="SeaView">Sea View</label>
                  </div>

                  <div class="form-check form-check">
                    <input v-model="addRoomModel.facilities" class="form-check-input" type="checkbox" id="Wi-Fia" value="Wi-Fi">
                    <label class="form-check-label" for="Wi-Fi">Wi-Fi</label>
                  </div>
                  <div  class="form-check form-check">
                    <input v-model="addRoomModel.facilities" class="form-check-input" type="checkbox" id="AudioSystema" value="Audio System">
                    <label class="form-check-label" for="AudioSystem">Audio System</label>
                  </div>
                  <div class="form-check ">
                    <input v-model="addRoomModel.facilities" class="form-check-input" type="checkbox" id="TVa" value="TV">
                    <label class="form-check-label" for="TV">TV</label>
                  </div>
                  <div class="form-check ">
                    <input v-model="addRoomModel.facilities" class="form-check-input" type="checkbox" id="MiniBara" value="Mini Bar">
                    <label class="form-check-label" for="MiniBar">Mini-Bar</label>
                  </div>
                  <div class="form-check ">
                    <input v-model="addRoomModel.facilities" class="form-check-input" type="checkbox" id="AirCona" value="Air Conditioner">
                    <label class="form-check-label" for="AirCon">Air Conditioner</label>
                  </div>
                </div>
                <div v-if="addRoomModel.facilitiesError" class="alert alert-warning" role="alert">
                  {{addRoomModel.facilitiesError}}
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button @click="resetAddValues" id="modalAddButton" type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              <button @click="addRoom" type="button" class="btn btn-primary">Add</button>
            </div>
          </div>
        </div>
      </div>

      <!--Select type-->
      <div class="form-group">
        <select @change="getByType" v-model="typeToShow" class="form-control" id="exampleFormControlSelect1">
          <option>All</option>
          <option>Single</option>
          <option>Double</option>
          <option>Twin</option>
        </select>
      </div>

      <!--Select table-->

      <table class="table">

        <thead class="thead-dark">
        <tr  class="headers">
          <th scope="col">#</th>
          <th scope="col">Type</th>
          <th scope="col">Price</th>
          <th class="display" scope="col">Facilities</th>
          <th style="text-align: right" scope="col"> <button @click="resetAddValues" data-toggle="modal" data-target="#addModal"  class="btn  btn-sm btn-light edit-rooms-button">

            Add </button></th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="item in rooms.slice(showFrom,showTo)" :key="item.id" class="table-data">
          <th scope="row">{{item.id}}</th>
          <td>{{item.type}}</td>
          <td>{{item.price}}<i class="fas fa-dollar-sign dollar-sign"></i></td>
          <td class="display" style="cursor: pointer">{{item.facilities.toString()}}</td>

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

export default {
  mounted () {
    // verify auth
    if (!localStorage.token) { this.$router.push('/') }
    this.loadAll()
    this.bindButtonsToFile()
    this.showFrom = 0
    this.showTo = this.rowsToShow
    this.curentPage = 1
    this.totalPages = this.rooms.length / this.rowsToShow
    if (this.totalPages === 0) { this.totalPages = 1 }
    if (this.totalPages % 1 !== 0) {
      this.totalPages = parseInt(this.totalPages) + 1
    }
  },
  methods: {

    roomValidation (item) {
      item.priceError = null
      item.facilitiesError = null
      let validation = 0
      if (!item.price) {
        validation++
        item.priceError = 'Price cannot be empty'
      }
      if (item.facilities.length === 0) {
        validation++
        item.facilitiesError = 'Please select some facilities'
      }
      if (validation === 0) return true
      return false
    },
    async getByType () {
      if (this.typeToShow === 'All') { this.loadAll() } else {
        const res = await axios.get(`api/room/${this.typeToShow}/get`, this.axiosConfig)
        this.rooms = res.data
      }
    },
    async editRoom () {
      if (this.roomValidation(this.editRoomModel)) {
        const photo1 = document.getElementById('photo1').files
        const photo2 = document.getElementById('photo2').files
        const photo3 = document.getElementById('photo3').files
        const data = new FormData()
        const pointer = []
        if (photo1[0]) {
          data.append('photos', photo1[0])
          pointer.push(0)
        }
        if (photo2[0]) {
          data.append('photos', photo2[0])
          pointer.push(1)
        }
        if (photo3[0]) {
          data.append('photos', photo3[0])
          pointer.push(2)
        }
        data.append('price', this.editRoomModel.price)
        data.append('type', this.editRoomModel.type)
        data.append('count', pointer)
        data.append('facilities', this.editRoomModel.facilities)
        await axios.put(`api/room/${this.curentItem.id}/update`, data, {
          headers: {
            accept: 'application/json',
            'Accept-Language': 'en-US,en;q=0.8',
            'Content-Type': undefined,
            token: localStorage.getItem('token')
          }
        })
        document.getElementById('modalEditButton').click()
        await this.loadAll()
      }
    },
    async addRoom () {
      if (this.roomValidation(this.addRoomModel)) {
        const photo1 = document.getElementById('photo1Add').files
        const photo2 = document.getElementById('photo2Add').files
        const photo3 = document.getElementById('photo3Add').files
        const data = new FormData()
        if (photo1[0]) {
          data.append('photos', photo1[0])
        }
        if (photo2[0]) {
          data.append('photos', photo2[0])
        }
        if (photo3[0]) {
          data.append('photos', photo3[0])
        }

        data.append('price', this.addRoomModel.price)
        data.append('type', this.addRoomModel.type)
        data.append('facilities', this.addRoomModel.facilities)

        await axios.post('api/room/create', data, {
          headers: {
            accept: 'application/json',
            'Accept-Language': 'en-US,en;q=0.8',
            'Content-Type': undefined,
            token: localStorage.getItem('token')
          }
        })
        document.getElementById('modalAddButton').click()
        await this.loadAll()
      }
    },
    async deleteRoom () {
      try {
        await axios.delete(`/api/room/${this.curentItem.id}/delete`, this.axiosConfig)
      } catch (err) {
        console.log(err.message)
      }
      await this.loadAll()
      document.getElementById('deleteModalButton').click()
    },
    async loadAll () {
      this.typeToShow = 'All'
      const res = await axios.get('/api/room/get', this.axiosConfig)
      this.rooms = res.data
    },
    bindButtonsToFile () {
      // edit
      // input selectors
      // eslint-disable-next-line no-undef
      $('#photo1Selector').click(function () {
        // eslint-disable-next-line no-undef
        $('#photo1').click()
      })
      // eslint-disable-next-line no-undef
      $('#photo2Selector').click(function () {
        // eslint-disable-next-line no-undef
        $('#photo2').click()
      })

      // eslint-disable-next-line no-undef
      $('#photo3Selector').click(function () {
        // eslint-disable-next-line no-undef
        $('#photo3').click()
      })

      // add
      // eslint-disable-next-line no-undef
      $('#photo1SelectorAdd').click(function () {
        // eslint-disable-next-line no-undef
        $('#photo1Add').click()
      })

      // eslint-disable-next-line no-undef
      $('#photo2SelectorAdd').click(function () {
        // eslint-disable-next-line no-undef
        $('#photo2Add').click()
      })

      // eslint-disable-next-line no-undef
      $('#photo3SelectorAdd').click(function () {
        // eslint-disable-next-line no-undef
        $('#photo3Add').click()
      })
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
    // shows images chosen in real time used for add and edit modal
    updateFile (event) {
      let imgId = 'imgA'
      if (event.target.id.includes('Add') === false) { imgId = 'imgE' }
      const photoNo = event.target.id.slice(5, 6)
      const input = event.target.files
      if (input && input[0]) {
        const reader = new FileReader()
        reader.onload = function (e) {
        // eslint-disable-next-line no-undef
          document.getElementById(imgId + photoNo).src = e.target.result
        }
        reader.readAsDataURL(input[0]) // convert to base64 string
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
        if (this.curentPage === this.totalPages) { this.nextArray(this.rooms.length) } else { this.nextArray() }
      }
    },
    // main method for previous page for the table of data
    previousPage () {
      if (this.curentPage !== 1) {
        if (this.curentPage === this.totalPages) {
          this.curentPage -= 1
          this.previousArray(this.rooms.length)
        } else {
          this.curentPage -= 1
          this.previousArray()
        }
      }
    },
    // autocompletes Edit modal fields
    autocompleteEditFields (item) {
      this.curentItem = item
      for (let i = 0; i < this.curentItem.photos.length; i++) {
        this.curentItem.photos[i] = this.curentItem.photos[i].replace('public', '')
      }
      this.editRoomModel.price = item.price
      this.editRoomModel.type = item.type
      this.editRoomModel.facilities = item.facilities
    },
    // autocompletes Info modal fields
    autocompleteInfoFields (item) {
      this.curentItem = item
      for (let i = 0; i < this.curentItem.photos.length; i++) {
        this.curentItem.photos[i] = this.curentItem.photos[i].replace('public', '')
      }
      this.infoRoomModel.price = item.price
      this.infoRoomModel.type = item.type
      this.infoRoomModel.facilities = item.facilities
    },

    resetAddValues () {
      this.addRoomModel.facilities = []
      this.addRoomModel.price = ''
      this.addRoomModel.photos = []
      this.addRoomModel.type = 'Single'
      document.getElementById('photo1Add').value = null
      document.getElementById('photo2Add').value = null
      document.getElementById('photo3Add').value = null
      this.addRoomModel.imgSrc1 = '/img/not-found-room.png'
      this.addRoomModel.imgSrc2 = '/img/not-found-room.png'
      this.addRoomModel.imgSrc3 = '/img/not-found-room.png'
    }

  },
  data () {
    return {
      axiosConfig: {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          'Access-Control-Allow-Origin': '*',
          token: localStorage.getItem('token')
        }
      },
      editRoomModel: {
        type: '',
        price: '',
        facilities: [],
        photos: [],
        priceError: null,
        facilitiesError: null

      },
      infoRoomModel: {
        type: '',
        price: '',
        facilities: [],
        photos: []

      },
      typeToShow: 'All',
      addRoomModel: { // add object

        type: 'Single',
        price: '',
        facilities: [],
        imgSrc1: '/img/not-found-room.png',
        imgSrc2: '/img/not-found-room.png',
        imgSrc3: '/img/not-found-room.png',
        facilitiesError: null,
        priceError: null

      },
      curentItem: {
        photos: ['/img/no-img-room.png', '/img/no-img-room.png', '/img/no-img-room.png']
      }, // for edit
      rowsToShow: 7, // how many rows table has
      curentPage: '',
      showFrom: '', // show From position x
      showTo: '', // show To position y
      totalPages: '', // array.lenght/ rowsToShow (int)

      copyOfRoom: [''],
      rooms: []

    }
  }
}

</script>

<style scoped>
.form-group{
  width: 180px;

}

.check-boxes-container{
  margin: auto;
  text-align: left;
  width: 258px;
}
.fa-pen{
  color: #628bb5;
}
.card{
  width: 8rem;
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

.rooms{
  border: 2px transparent solid;
  height: 100%;
  position: relative;
}
#edit-price,#info-edit-price,#add-price{
  margin-top: 12px;
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
  .card{
    width: 7rem;
    height: 150px!important;
  }
  .card-img-top{
    max-height: 100px!important;
  }
}
@media screen and (max-width: 425px){
  .card{
    width: 5rem;

  }
  .inputSelectors{
    padding-left: 0;
    padding-right: 0;
    width: calc(3rem - 9px);
    font-size: 10px;
  }
}
@media screen and (max-width: 325px){
  .card{
    width: 4rem;
  }
  .inputSelectors{
    padding-left: 0;
    padding-right: 0;
    width: calc(3rem - 18px);
    font-size: 9px;
  }
}
@media screen and (max-width: 367px)
{

  .headers{
    font-size: 13px!important;
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
.dollar-sign{
  margin-left: 4px;
  color: #42b983;
}
.table{
  position: relative;
}
input[type="file"]{
  position: absolute;
  left:20000px;
}
.edit-type-selector{

  width: 258px;
  margin: auto;
  margin-top: 20px;
}
.card{
  height: 220px;
  position: relative;
}
.card-img-top{
  max-height: 160px;
}
.inputSelectors{
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
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
img{

  width: 100%!important;
  height: 100%!important;
  object-fit: cover!important;
}

</style>

<style >
.fa-caret-left,.fa-caret-right{
  font-size: 30px;
  cursor: pointer;
}
.edit-rooms-button{

  border-radius: 40px;
  width: 80px;
  font-family: "Oxygen", sans-serif;
}
.page-text{
  margin-top: 2px;
  font-size: 16px;
  margin-left: 15px;
  margin-right: 15px;
}
.card{
  border: none;
}

@media screen and (max-width: 466px)
{

  .display{
    display: none!important;
  }

}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}
</style>
