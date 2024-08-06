<script setup>
import { ref, onMounted, watch } from 'vue'
import axios from 'axios'
import Papa from 'papaparse'
import { saveAs } from 'file-saver'
import { useRouter } from 'vue-router'

const router = useRouter()

const search = ref('')
const items = ref([])
const itemsUnitKerja = ref([])
const selectedUnitKerja = ref([])

const goToAccountSettings = () => {
  router.push('/add-pegawai')
}

const fetchData = async () => {
  try {
    const response = await axios.get('http://localhost:3001/api/pegawais')
    items.value = response.data
    mapPegawaiWithUnitKerja()
    console.log(items.value)
  } catch (error) {
    console.log(error.message)
  }
}

const fetchUnitKerja = async () => {
  try {
    const response = await axios.get('http://localhost:3001/api/unit-kerja')
    itemsUnitKerja.value = response.data.daftarUnitKerja.map(item => ({
      id: item.id,
      name: item.name
    }))
    mapPegawaiWithUnitKerja()
    console.log('itemsUnitKerja', itemsUnitKerja.value)
  } catch (error) {
    console.error(error)
  }
}

const mapPegawaiWithUnitKerja = () => {
  if (items.value.length && itemsUnitKerja.value.length) {
    items.value = items.value.map(pegawai => {
      const unitKerja = itemsUnitKerja.value.find(unit => unit.id === pegawai.unitKerjaId)
      return {
        ...pegawai,
        unitKerjaName: unitKerja ? unitKerja.name : 'Unknown'
      }
    })
  }
}

const fetchPegawaiByUnitKerja = async () => {
  if (selectedUnitKerja.value.length === 0) {
    fetchData()
    return
  }
  console.log('state unit kerja', selectedUnitKerja.value)

  try {
    const response = await axios.get(`http://localhost:3001/api/pegawais/unit-kerja/${selectedUnitKerja.value[0].id}`)
    items.value = response.data.pegawai
    mapPegawaiWithUnitKerja()
    console.log(items.value)
  } catch (error) {
    console.error(error)
  }
}

const deleteItem = async (id) => {
  try {
    await axios.delete(`http://localhost:3001/api/pegawais/${id}`);
    items.value = items.value.filter(item => item.id !== id);
    console.log('Item deleted successfully');
  } catch (error) {
    console.error('Error deleting item:', error);
  }
};

const exportToCSV = () => {
  const csvData = items.value.map(item => ({
    NIP: item.nip,
    Nama: item.nama,
    TempatLahir: item.tempatLahir,
    Alamat: item.alamat,
    TanggalLahir: item.tanggalLahir.split('T')[0], // Extract the date part
    JenisKelamin: item.jenisKelamin,
    Golongan: item.golongan,
    Eselon: item.eselon,
    Jabatan: item.jabatan,
    TempatTugas: item.tempatTugas,
    Agama: item.agama,
    NoHP: item.noHp,
    NPWP: item.npwp,
  }));

  const csv = Papa.unparse(csvData, {
    header: true,
  });

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  saveAs(blob, 'data_pegawai.csv');
};

watch(selectedUnitKerja, () => {
  fetchPegawaiByUnitKerja()
})

onMounted(() => {
  fetchData()
  fetchUnitKerja()
})
</script>



<style scoped>
.no-background {
  background: none !important;
  box-shadow: none !important;
}

@media print {
  .no-print {
    display: none !important;
  }
}
</style>


<template>
  <v-card>
    <v-card-actions>
      <v-btn color="primary" @click="goToAccountSettings">
        <i class="ri-add-line mr-3"></i>
        <span class="d-none d-sm-block">Tambah Pegawai</span>
      </v-btn>
      <v-btn color="info" @click="exportToCSV">
        <i class="ri-file-download-line mr-3"></i>
        <span class="d-none d-sm-block">Ekspor CSV</span>
      </v-btn>
    </v-card-actions>
    <v-card-title class="d-flex align-center pe-2">
      <v-icon icon="mdi-video-input-component"></v-icon> &nbsp;
      Daftar Pegawai

      <client-only>
        <v-combobox clearable chips multiple label="Filter by unit kerja" v-model="selectedUnitKerja"
          :items="itemsUnitKerja" class="ml-12"
          item-title="name" item-value="id"
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
          <td>{{ item.unitKerjaName }}</td>
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
        </tr>
      </template>

    </v-data-table>
  </v-card>
</template>
