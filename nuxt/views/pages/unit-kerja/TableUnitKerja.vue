<script>
  export default {
    data () {
      return {
        search: '',
        items: [
          {
            name: 'Nebula GTX 3080',
            image: '1.png',
          },
          {
            name: 'Galaxy RTX 3080',
            image: '2.png',
          },
          {
            name: 'Orion RX 6800 XT',
            image: '3.png',
          },
          {
            name: 'Vortex RTX 3090',
            image: '4.png',
          },
          {
            name: 'Cosmos GTX 1660 Super',
            image: '5.png',
          },
        ],
      }
    },
  }
</script>

<template>
  <v-card>
    <v-card-title class="d-flex align-center pe-2">
      <v-icon icon="mdi-video-input-component"></v-icon> &nbsp;
      Daftar Unit Kerja

      <v-spacer></v-spacer>
      <v-spacer></v-spacer>

      <v-text-field
        v-model="search"
        density="compact"
        label="Search"
        prepend-inner-icon="mdi-magnify"
        variant="solo-filled"
        flat
        hide-details
        single-line
      ></v-text-field>
    </v-card-title>

    <v-divider></v-divider>
    <v-data-table v-model:search="search" :items="items">

      <template v-slot:item.image="{ item }">
        <v-card class="my-2" elevation="2" rounded>
          <v-img
            :src="`https://cdn.vuetifyjs.com/docs/images/graphics/gpus/${item.image}`"
            height="64"
            cover
          ></v-img>
        </v-card>
      </template>
    </v-data-table>
  </v-card>
</template>