<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const search = ref('')
const items = ref([])

const fetchData = async () => {
  try {
    const response = await axios.get('http://localhost:3001/api/pegawais')
    items.value = response.data
    console.log(items.value)
  } catch (error) {
    console.log(error.message)
  }
}
onMounted(fetchData)
</script>

<template>
  <v-card>
    <v-card-title class="d-flex align-center pe-2">
      <v-icon icon="mdi-video-input-component"></v-icon> &nbsp;
      Daftar Pegawai


      <client-only>
        <v-combobox clearable chips multiple label="Combobox"
          :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']" class="ml-12"
          density="compact"></v-combobox>
      </client-only>

      <v-spacer></v-spacer>

      <v-text-field v-model="search" density="compact" label="Search" prepend-inner-icon="mdi-magnify"
        variant="solo-filled" flat hide-details single-line></v-text-field>
    </v-card-title>

    <v-divider></v-divider>
    <v-data-table v-model:search="search" :items="items">

      <template v-slot:headers>
        <tr>
          <th>NIP</th>
          <th>Nama</th>
          <th>L/P</th>
          <th>Golongan</th>
          <th>Eselon</th>
          <th>Unit Kerja</th>
          <th>Action</th>
        </tr>
      </template>

      <template v-slot:item="{ item }">
        <tr>
          <td>{{ item.nip }}</td>
          <td>{{ item.nama }}</td>
          <td>{{ item.jenisKelamin }}</td>
          <td>{{ item.golongan }}</td>
          <td>{{ item.eselon }}</td>
          <td>{{ item.unitKerjaId }}</td>
          <td>
          <td class="text-center">
            <div class="d-flex justify-center align-center">
              <v-btn :to="`/dashboard/edit/${item.id}`" class="no-background">
                <i class="ri-pencil-line" style="font-size: 24px; margin-right: 8px; color: limegreen"></i>
              </v-btn>
              <v-btn :to="`/dashboard/detail/${item.id}`" class="no-background">
                <i class="ri-article-line" style="font-size: 24px; margin-right: 8px; color:darkcyan"></i>
              </v-btn>
              <v-btn icon @click="deleteItem(item.id)" class="no-background">
                  <i class="ri-delete-bin-6-line" style="font-size: 24px; color: red;"></i>
                </v-btn>
            </div>
          </td>

          </td>
        </tr>
      </template>


    </v-data-table>
  </v-card>
</template>

<style scoped>
.no-background {
  background: none !important;
  box-shadow: none !important;
}
</style>