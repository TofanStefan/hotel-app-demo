<template>
  <div class="about">
    <h1 v-for="room in rooms" :key="room.id">
      {{ room.name }}
      <i class="fa fa-pen" @click="onEdit(room)"></i>
      <i class="fa fa-trash" @click="onDelete(room)"></i>
    </h1>

    <form v-if="room" @submit.prevent="onSubmitEdit">
      <input type="text" v-model="form.name" class="form-control">
      <button class="btn btn-primary">Submit</button>
    </form>

    <form v-else @submit.prevent="onSubmit">
      <input type="text" v-model="form.name" class="form-control">
      <button class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      rooms: [],
      room: null,
      form: {
        name: ''
      }
    }
  },

  created () {
    this.load()
  },

  methods: {
    async load () {
      const { data } = await axios.get('/api/available-rooms')
      this.rooms = data
    },

    onEdit (room) {
      this.room = room
      this.form.name = room.name
    },

    async onDelete (room) {
      await axios.delete(`/api/available-rooms/${room.id}`)
      await this.load()
    },

    async onSubmitEdit () {
      await axios.put(`/api/available-rooms/${this.room.id}`, { name: this.form.name })
      await this.load()
      this.form.name = ''
      this.room = null
    },

    async onSubmit () {
      await axios.post('/api/available-rooms', { name: this.form.name })
      await this.load()
      this.form.name = ''
    }
  }
}
</script>
