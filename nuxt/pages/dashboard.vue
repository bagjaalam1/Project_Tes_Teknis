<script setup>
import TablePegawai from '@/views/dashboard/TablePegawai.vue';
import ButtonAdd from '@/views/dashboard/ButtonAdd.vue';
import ButtonCetak from '@/views/dashboard/ButtonCetak.vue';

</script>

<template>
  <VRow class="match-height">
    <VCol cols="2">
      <ButtonAdd />
    </VCol>

    <VCol cols="2">
      <ButtonCetak/>
    </VCol>

    <VCol cols="12">
      <TablePegawai />
    </VCol>
  </VRow>
</template>
