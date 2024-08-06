<script setup>
import avatar1 from '@images/avatars/avatar-1.png'
import { ref, onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { format } from 'date-fns'
import { formatInTimeZone } from 'date-fns-tz'
import axios from 'axios'

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
const isSubmitted = ref(false)

const formatDate = (dateString) => {
  const timeZone = 'Asia/Bangkok' // Time zone untuk Indochina Time
  const zonedDate = formatInTimeZone(dateString, timeZone)
  return format(zonedDate, "EEE MMM dd yyyy HH:mm:ss 'GMT'XXX (zzzz)")
}

const fetchPegawaiById = async (id) => {
  try {
    const response = await axios.get(`http://localhost:3001/api/pegawais/${id}`)
    const pegawai = response.data
    pegawaiDataLocal.value = {
      ...pegawai,
      avatarImg: pegawai.fotoUrl || avatar1,
      fotoFile: null
    }
    formattedTanggalLahir.value = pegawai.tanggalLahir ? format(new Date(pegawai.tanggalLahir), 'dd-MM-yyyy') : '' // agar mudah dibaca
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
  } catch (error) {
    console.log(error.message)
  }
}

const submitForm = async () => {
  const formData = new FormData()

  for (const key in pegawaiDataLocal.value) {
    if (key !== 'avatarImg' && key !== 'fotoFile') {
      formData.append(key, pegawaiDataLocal.value[key])
    }
  }

  if (pegawaiDataLocal.value.fotoFile) {
    formData.append('foto', pegawaiDataLocal.value.fotoFile)
  }

  const formDataAsObject = {}
  formData.forEach((value, key) => {
    formDataAsObject[key] = value
  })

  try {
    const id = route.params.id
    await axios.put(`http://localhost:3001/api/pegawais/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    isSubmitted.value = true
    router.push('/dashboard')
    resetForm()
  } catch (error) {
    console.error(error.message)
  }
}

const updateFormattedDate = () => {
  formattedTanggalLahir.value = format(new Date(pegawaiDataLocal.value.tanggalLahir), 'dd-MM-yyyy')
}

watch(() => pegawaiDataLocal.value.tanggalLahir, (newDate) => {
  formattedTanggalLahir.value = newDate ? format(new Date(newDate), 'dd-MM-yyyy') : ''
})

onMounted(() => {
  fetchUnitKerja()
  const id = route.params.id
  if (id) {
    fetchPegawaiById(id)
  }
})

const goBack = () => {
  router.go(-1)
}

</script>

<template>
  <VRow>
    <VCol cols="12">
      <VCard title="Edit Pegawai">
        <VCardText class="d-flex">
          <!-- 👉 Avatar -->
          <VAvatar rounded="lg" size="100" class="me-6" :image="pegawaiDataLocal.avatarImg" />

          <!-- 👉 Upload Photo -->
          <form class="d-flex flex-column justify-center gap-5">
            <div class="d-flex flex-wrap gap-2">
              <VBtn color="primary" @click="refInputEl?.click()">
                <VIcon icon="ri-upload-cloud-line" class="d-sm-none" />
                <span class="d-none d-sm-block">Upload new photo</span>
              </VBtn>

              <input ref="refInputEl" type="file" name="file" accept=".jpeg,.png,.jpg,GIF" hidden @input="changeAvatar" />

              <VBtn type="reset" color="error" variant="outlined" @click="resetAvatar">
                <span class="d-none d-sm-block">Reset</span>
                <VIcon icon="ri-refresh-line" class="d-sm-none" />
              </VBtn>
            </div>

            <p class="text-body-1 mb-0">
              Allowed JPG, GIF or PNG. Max size of 800K
            </p>
          </form>
        </VCardText>

        <VDivider />

        <VCardText>
          <!-- 👉 Form -->
          <VForm class="mt-6" @submit.prevent="submitForm">
            <VRow>
              <!-- 👉 Name -->
              <VCol md="6" cols="12">
                <VTextField v-model="pegawaiDataLocal.nama" placeholder="Name" label="Name" />
              </VCol>

              <!-- 👉 NIP -->
              <VCol md="6" cols="12">
                <VTextField v-model="pegawaiDataLocal.nip" placeholder="1234567890" label="NIP" />
              </VCol>

              <!-- 👉 Tempat Lahir -->
              <VCol cols="12" md="6">
                <VTextField v-model="pegawaiDataLocal.tempatLahir" label="Tempat Lahir" placeholder="Tempat Lahir" />
              </VCol>

              <!-- 👉 Alamat -->
              <VCol cols="12" md="6">
                <VTextField v-model="pegawaiDataLocal.alamat" label="Alamat" placeholder="Alamat" />
              </VCol>

              <!-- 👉 Tanggal Lahir -->
              <VCol cols="12" md="6">
                <div>
                  <VTextField v-model="formattedTanggalLahir" label="Tanggal Lahir" prepend-icon="ri-calendar-line" readonly @click="dateMenu = true" />
                  <VMenu v-model="dateMenu" :close-on-content-click="false" activator="parent" transition="scale-transition" offset-y min-width="auto">
                    <VDatePicker v-model="pegawaiDataLocal.tanggalLahir" no-title scrollable @input="updateFormattedDate">
                      <template v-slot:actions>
                        <VBtn text color="primary" @click="dateMenu = false" style="margin-top: -40px">OK</VBtn>
                      </template>
                    </VDatePicker>
                  </VMenu>
                </div>
              </VCol>

              <!-- 👉 Jenis Kelamin -->
              <VCol cols="12" md="6">
                <VRadioGroup v-model="pegawaiDataLocal.jenisKelamin" label="Jenis Kelamin">
                  <VRadio label="Laki-Laki" value="L"></VRadio>
                  <VRadio label="Perempuan" value="P"></VRadio>
                </VRadioGroup>
              </VCol>

              <!-- 👉 Golongan -->
              <VCol cols="12" md="6">
                <VSelect v-model="pegawaiDataLocal.golongan" label="Golongan" :items="['Ia', 'Ib', 'Ic', 'Id', 'IIa', 'IIb', 'IIc', 'IId', 'IIIa', 'IIIb', 'IIIc', 'IIId', 'IVa', 'IVb', 'IVc', 'IVd', 'IVe']" placeholder="Golongan" />
              </VCol>

              <!-- 👉 Eselon -->
              <VCol cols="12" md="6">
                <VSelect v-model="pegawaiDataLocal.eselon" label="Eselon" :items="['I', 'II', 'III', 'IV']" placeholder="Eselon" />
              </VCol>

              <VCol cols="12" md="6">
                <VTextField v-model="pegawaiDataLocal.jabatan" label="Jabatan" placeholder="Jabatan" readonly />
              </VCol>

              <!-- 👉 Unit Kerja -->
              <VCol cols="12" md="6">
                <VSelect v-model="pegawaiDataLocal.unitKerjaId" label="Unit Kerja" placeholder="Unit Kerja" :items="unitKerjaItems" item-title="name" item-value="id" />
              </VCol>

              <!-- 👉 Tempat Tugas -->
              <VCol cols="12" md="6">
                <VTextField v-model="pegawaiDataLocal.tempatTugas" label="Tempat Tugas" placeholder="Tempat Tugas" />
              </VCol>

              <!-- 👉 Agama -->
              <VCol cols="12" md="6">
                <VTextField v-model="pegawaiDataLocal.agama" label="Agama" placeholder="Agama" />
              </VCol>

              <!-- 👉 No. HP -->
              <VCol cols="12" md="6">
                <VTextField v-model="pegawaiDataLocal.noHp" label="No. HP" placeholder="No. HP" />
              </VCol>

              <!-- 👉 NPWP -->
              <VCol cols="12" md="6">
                <VTextField v-model="pegawaiDataLocal.npwp" label="NPWP" placeholder="NPWP" />
              </VCol>

              <!-- 👉 Form Actions -->
              <VCol cols="12" class="d-flex flex-wrap gap-4">
                <VBtn type="submit">Submit</VBtn>
                <NuxtLink v-if="isSubmitted" to="/dashboard" style="display: none;">Go to Dashboard</NuxtLink>

                <VBtn color="secondary" variant="outlined" type="reset" @click.prevent="resetForm">
                  Reset
                </VBtn>

                <VBtn @click="goBack" color="primary">Back</VBtn>
              </VCol>
            </VRow>
          </VForm>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
</template>
