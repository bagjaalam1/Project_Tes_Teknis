<script setup>
import avatar1 from '@images/avatars/avatar-1.png'
import axios from 'axios'
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { format } from 'date-fns'

const route = useRoute()
const router = useRouter()

const pegawaiData = {
  avatarImg: avatar1,
  nip: '',
  nama: '',
  tempatLahir: '',
  alamat: '',
  tanggalLahir: null,
  jenisKelamin: '',
  golongan: '',
  eselon: '',
  jabatan: '',
  tempatTugas: '',
  agama: '',
  unitKerjaId: [],
  noHp: '',
  npwp: ''
}

const refInputEl = ref()
const pegawaiDataLocal = ref({
  ...structuredClone(pegawaiData),
  fotoFile: null
})
const unitKerjaItems = ref([])
const dateMenu = ref(false)
const formattedTanggalLahir = ref('')

const fetchPegawaiById = async (id) => {
  try {
    const response = await axios.get(`http://localhost:3001/api/pegawais/${id}`)
    const pegawai = response.data
    console.log('pegawai', pegawai)
    pegawaiDataLocal.value = {
      ...pegawai,
      avatarImg: pegawai.fotoUrl || avatar1,
      fotoFile: null
    }
    formattedTanggalLahir.value = pegawai.tanggalLahir ? format(new Date(pegawai.tanggalLahir), 'dd-MM-yyyy') : '' // agar mudah dibaca
    console.log('pegawaiDataLocalTanggalLahir:', pegawaiDataLocal.value.tanggalLahir)
    console.log('pegawai.tanggalLahir', pegawai.tanggalLahir)
  } catch (error) {
    console.error(error.message)
  }
}

const resetForm = () => {
  pegawaiDataLocal.value = structuredClone(pegawaiData)
}

const changeAvatar = file => {
  const fileReader = new FileReader()
  const { files } = file.target
  if (files && files.length) {
    pegawaiDataLocal.value.fotoFile = files[0]
    fileReader.readAsDataURL(files[0])
    fileReader.onload = () => {
      if (typeof fileReader.result === 'string')
        pegawaiDataLocal.value.avatarImg = fileReader.result
    }
  }
}

// reset avatar image
const resetAvatar = () => {
  pegawaiDataLocal.value.avatarImg = pegawaiData.avatarImg
}

// fetch unit kerja
const fetchUnitKerja = async () => {
  try {
    const response = await axios.get('http://localhost:3001/api/unit-kerja')
    unitKerjaItems.value = response.data.daftarUnitKerja.map(item => ({
      id: item.id,
      name: item.name
    }))
    console.log('unitKerjaItems:', unitKerjaItems.value);
    console.log('formattedTanggalLahir', formattedTanggalLahir)
  } catch (error) {
    console.log(error.message)
  }
}

const updateFormattedDate = () => {
  console.log('masuk updateFormattedDate')
  formattedTanggalLahir.value = format(new Date(pegawaiDataLocal.value.tanggalLahir), 'dd-MM-yyyy')
}

watch(() => pegawaiDataLocal.value.tanggalLahir, (newDate) => {
  formattedTanggalLahir.value = newDate ? format(new Date(newDate), 'dd-MM-yyyy') : ''
  console.log('Tanggal Lahir Value',pegawaiDataLocal.value.tanggalLahir)
})

onMounted(() => {
  fetchUnitKerja()
  const id = route.params.id
  if (id) {
    fetchPegawaiById(id)
  }
  console.log('Tanggal Lahir Value',format(new Date('2002-08-05T12:00:00.000Z'), 'dd-MM-yyyy'))
})

const goBack = () => {
  router.go(-1)
}

</script>

<template>
  <VRow>
    <VCol cols="12">
      <VCard title="Detail Pegawai">
        <VCardText class="d-flex">
          <!-- 👉 Avatar -->
          <VAvatar rounded="lg" size="100" class="me-6" :image="pegawaiDataLocal.avatarImg" />
        </VCardText>

        <VDivider />

        <VCardText>
          <!-- 👉 Form -->
          <VForm class="mt-6">
            <VRow>
              <!-- 👉 Name -->
              <VCol md="6" cols="12">
                <VTextField v-model="pegawaiDataLocal.nama" placeholder="Name" label="Name" readonly/>
              </VCol>

              <!-- 👉 NIP -->
              <VCol md="6" cols="12">
                <VTextField v-model="pegawaiDataLocal.nip" placeholder="1234567890" label="NIP" readonly/>
              </VCol>

              <!-- 👉 Tempat Lahir -->
              <VCol cols="12" md="6">
                <VTextField v-model="pegawaiDataLocal.tempatLahir" label="Tempat Lahir" placeholder="Tempat Lahir" readonly/>
              </VCol>

              <!-- 👉 Alamat -->
              <VCol cols="12" md="6">
                <VTextField v-model="pegawaiDataLocal.alamat" label="Alamat" placeholder="Alamat" readonly/>
              </VCol>

              <!-- 👉 Tanggal Lahir -->
              <VCol cols="12" md="6">
                <div>
                  <VTextField v-model="formattedTanggalLahir" label="Tanggal Lahir" prepend-icon="ri-calendar-line"
                    readonly></VTextField>
                </div>
              </VCol>


              <!-- 👉 Jenis Kelamin -->
              <VCol cols="12" md="6">
                <VRadioGroup v-model="pegawaiDataLocal.jenisKelamin" label="Jenis Kelamin" readonly>
                  <VRadio label="Laki-Laki" value="L"></VRadio>
                  <VRadio label="Perempuan" value="P"></VRadio>
                </VRadioGroup>
              </VCol>

              <!-- 👉 Golongan -->
              <VCol cols="12" md="6">
                <VSelect v-model="pegawaiDataLocal.golongan" label="Golongan" :items="['I', 'II', 'III', 'IV']"
                  placeholder="Golongan" readonly/>
              </VCol>

              <!-- 👉 Eselon -->
              <VCol cols="12" md="6">
                <VSelect v-model="pegawaiDataLocal.eselon" label="Eselon"
                  :items="['Ia', 'Ib', 'IIa', 'IIb', 'IIIa', 'IIIb', 'IVa', 'IVb']" placeholder="Eselon" readonly/>
              </VCol>

              <VCol cols="12" md="6">
                <VTextField v-model="pegawaiDataLocal.jabatan" label="Jabatan" placeholder="Jabatan" readonly/>
              </VCol>

              <!-- 👉 Unit Kerja -->
              <VCol cols="12" md="6">
                <VSelect v-model="pegawaiDataLocal.unitKerjaId" label="Unit Kerja" placeholder="Unit Kerja"
                  :items="unitKerjaItems" item-title="name" item-value="id" readonly/>
              </VCol>

              <!-- 👉 Tempat Tugas -->
              <VCol cols="12" md="6">
                <VTextField v-model="pegawaiDataLocal.tempatTugas" label="Tempat Tugas" placeholder="Tempat Tugas" readonly/>
              </VCol>

              <!-- 👉 Agama -->
              <VCol cols="12" md="6">
                <VTextField v-model="pegawaiDataLocal.agama" label="Agama" placeholder="Agama" readonly/>
              </VCol>

              <!-- 👉 No. HP -->
              <VCol cols="12" md="6">
                <VTextField v-model="pegawaiDataLocal.noHp" label="No. HP" placeholder="No. HP" readonly/>
              </VCol>

              <!-- 👉 NPWP -->
              <VCol cols="12" md="6">
                <VTextField v-model="pegawaiDataLocal.npwp" label="NPWP" placeholder="NPWP" readonly/>
              </VCol>

              <VCol cols="12" class="d-flex flex-wrap gap-4">
                <VBtn @click="goBack" color="primary">Back</VBtn>
              </VCol>
            </VRow>
          </VForm>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
</template>
