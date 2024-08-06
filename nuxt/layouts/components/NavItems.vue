<script setup>
import VerticalNavSectionTitle from '@/@layouts/components/VerticalNavSectionTitle.vue'
import VerticalNavGroup from '@layouts/components/VerticalNavGroup.vue'
import VerticalNavLink from '@layouts/components/VerticalNavLink.vue'
</script>

<template>
  <!-- 👉 Dashboards -->
  <VerticalNavGroup
    :item="{
      title: 'Dashboards',
      icon: 'ri-home-smile-line',
    }"
  >
    <VerticalNavLink
      :item="{
        title: 'Daftar Pegawai',
        to: '/dashboard',
      }"
    />

    <VerticalNavLink
      :item="{
        title: 'Unit Kerja',
        to: '/unit-kerja',
      }"
    />
  </VerticalNavGroup>
</template>
