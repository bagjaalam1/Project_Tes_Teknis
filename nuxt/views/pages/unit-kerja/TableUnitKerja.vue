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

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';

export default {
  setup() {
    const search = ref('');
    const items = ref([]);

    const fetchItems = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/unit-kerja');
        items.value = response.data.daftarUnitKerja.map(item => ({
          name: item.name,
        }));
      } catch (error) {
        console.error('Failed to fetch items:', error);
      }
    };

    onMounted(() => {
      fetchItems();
    });

    return {
      search,
      items,
    };
  },
};
</script>

<style scoped>
</style>
