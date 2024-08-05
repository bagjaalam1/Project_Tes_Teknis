<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const goToAccountSettings = () => {
  router.push('/add-pegawai');
};
</script>

<template>
    <VBtn
      color="primary"
      @click="goToAccountSettings"
    >
        <i class="ri-add-line mr-3"></i>
        <span class="d-none d-sm-block">Tambah Pegawai</span>
    </VBtn>
</template>