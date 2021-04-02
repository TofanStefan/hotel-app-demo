<template>
  <div class="container-fluid  rooms">
    <button class="btn  btn-sm btn-primary dashboard-button edit-rooms-button">
      <span ><i class="fas fa-plus"></i> </span>
      Add </button>
    <div class="room-data">
      <table class="table">
        <thead class="thead-dark">
        <tr  class="headers">
          <th scope="col">#</th>
          <th scope="col">Type</th>
          <th scope="col">Price</th>
          <th class="display" scope="col">Facilities</th>
          <th scope="col"></th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="item in room.splice(showFrom,showTo)" :key="item.id" class="table-data">
          <th scope="row">{{item.id}}</th>
          <td>{{item.type}}</td>
          <td>{{item.price}}</td>
          <td class="display"><span id="role" class="badge badge-secondary">SHOW!</span></td>
          <td class="" style="text-align: right">

            <i class="fas fa-info"></i>
            <i class="fas fa-pen"></i>
            <i class="fas fa-trash-alt"></i>

          </td>
        </tr>
        </tbody>
      </table>

      <div class="pagination">
        <div class="d-flex justify-content-center" style="width: 100%">
          <i @click="previousPage" class="fas fa-caret-left"></i>
          <div class="page-text">{{curentPage}} of {{totalPages}} </div>
          <i @click="nextPage" class="fas fa-caret-right"></i>

        </div>
      </div>

    </div>

  </div>
</template>

<script>
export default {
  mounted () {
    this.showFrom = parseInt(0)
    this.showTo = parseInt(5)
    this.curentPage = 1
    this.totalPages = this.room.length / 5 + 1
    if (this.totalPages % 1 !== 0) { this.totalPages = parseInt(this.totalPages) + 1 }
  },
  methods: {
    nextPage () {
      if (this.curentPage === this.totalPages) {
        this.curentPage = 1
      } else { this.curentPage++ }
    },
    previousPage () {
      if (this.curentPage !== 1) this.curentPage -= 1
    }

  },
  data () {
    return {
      curentPage: '',
      showFrom: '',
      showTo: '',
      room: [
        {
          id: '3',
          type: 'Double',
          price: '124$',
          facilities: ['Wifi', 'Pool']

        },
        {
          id: '4',
          type: 'Double',
          price: '124$',
          facilities: ['Wifi', 'Pool']

        },
        {
          id: '5',
          type: 'Double',
          price: '124$',
          facilities: ['Wifi', 'Pool']

        },
        {
          id: '6',
          type: 'Double',
          price: '124$',
          facilities: ['Wifi', 'Pool']

        },
        {
          id: '7',
          type: 'Double',
          price: '124$',
          facilities: ['Wifi', 'Pool']

        },
        {
          id: '8',
          type: 'Double',
          price: '124$',
          facilities: ['Wifi', 'Pool']

        },
        {
          id: '9',
          type: 'Double',
          price: '124$',
          facilities: ['Wifi', 'Pool']

        },
        {
          id: '10',
          type: 'Double',
          price: '124$',
          facilities: ['Wifi', 'Pool']

        },
        {
          id: '11',
          type: 'Double',
          price: '124$',
          facilities: ['Wifi', 'Pool']

        },
        {
          id: '12',
          type: 'Double',
          price: '124$',
          facilities: ['Wifi', 'Pool']

        },
        {
          id: '13',
          type: 'Double',
          price: '124$',
          facilities: ['Wifi', 'Pool']

        },
        {
          id: '14',
          type: 'Double',
          price: '124$',
          facilities: ['Wifi', 'Pool']

        },
        {
          id: '15',
          type: 'Double',
          price: '124$',
          facilities: ['Wifi', 'Pool']

        }

      ],
      totalPages: ''

    }
  }
}

</script>

<style scoped>
.fa-pen{
  color: #628bb5;
}
.fa-info{
    color: #6c757d;
}
.fa-trash-alt{
  color: #ec7f7f;
}
.fas{
  margin-right: 8px;
  margin-left: 8px;
}
.pager-button{
  border-radius: 100%;
}
.rooms{
  border: 2px red solid;
  height: 100%;
  position: relative;
}
.room-data{
  margin-top:90px;
}
.pagination{
  left: 0;
  bottom: 30px;
  position: absolute;
  width: 100%;
  border: 2px red solid;
  height: 40px;
}

</style>

<style >
.fa-caret-left,.fa-caret-right{
  font-size: 40px;
}
.edit-rooms-button{
  position: absolute;
  right: 2px;
  top:14px;
}
.page-text{
  margin-top: 5px;
  font-size: 16px;
  margin-left: 15px;
  margin-right: 15px;
}

.edit-icon{
  font-size: 14px;
}
@media screen and (max-width: 414px)
{

  .display{
    display: none!important;
  }

}
</style>
