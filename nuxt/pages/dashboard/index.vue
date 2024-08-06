<script setup>
import TablePegawai from '@/views/dashboard/TablePegawai.vue';

definePageMeta({
  middleware: ['auth']
})
</script>

<template>
  <VRow class="match-height">
    <VCol cols="12">
      <TablePegawai />
    </VCol>
  </VRow>
</template>
