<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useTheme } from 'vuetify'
import authV1MaskDark from '@images/pages/auth-v1-mask-dark.png'
import authV1MaskLight from '@images/pages/auth-v1-mask-light.png'
import authV1Tree2 from '@images/pages/auth-v1-tree-2.png'
import authV1Tree from '@images/pages/auth-v1-tree.png'
import axios from 'axios'

// Definisikan layout sebagai 'blank' untuk halaman login
definePageMeta({
  layout: 'blank',
})

const form = ref({
  email: '',
  password: '',
})

const vuetifyTheme = useTheme()
const router = useRouter()

const authThemeMask = computed(() => {
  return vuetifyTheme.global.name.value === 'light' ? authV1MaskLight : authV1MaskDark
})

const isPasswordVisible = ref(false)
const loginError = ref('')

const login = async () => {
  try {
    const response = await axios.post('http://localhost:3001/api/login', {
      email: form.value.email,
      password: form.value.password
    })
    console.log('response data',response.data)
    // Simpan token dan redirect
    localStorage.setItem('token', response.data.token)
    router.push('/dashboard')
  } catch (error) {
    console.error('Login failed:', error)
    loginError.value = 'Login failed: ' + (error.response?.data?.message || 'Unknown error')
  }
}
</script>



<template>
  <div class="auth-wrapper d-flex align-center justify-center pa-4">
    <VCard
      class="auth-card pa-4 pt-7"
      max-width="448"
    >
      <VCardText class="pt-2">
        <h4 class="text-h4 mb-1">
          Welcome!
        </h4>
        <p class="mb-0">
          Please sign-in to your account
        </p>
      </VCardText>

      <VCardText>
        <VForm @submit.prevent="login">
          <VRow>
            <!-- email -->
            <VCol cols="12">
              <VTextField
                v-model="form.email"
                label="Email"
                type="email"
              />
            </VCol>

            <!-- password -->
            <VCol cols="12">
              <VTextField
                v-model="form.password"
                label="Password"
                placeholder="············"
                :type="isPasswordVisible ? 'text' : 'password'"
                :append-inner-icon="isPasswordVisible ? 'ri-eye-off-line' : 'ri-eye-line'"
                @click:append-inner="isPasswordVisible = !isPasswordVisible"
              />
              <div class="d-flex align-center justify-space-between flex-wrap my-6"></div>

              <!-- error message -->
              <div v-if="loginError" class="text-danger mb-4">{{ loginError }}</div>

              <!-- login button -->
              <VBtn
                block
                type="submit"
                color="primary"
              >
                Login
              </VBtn>
            </VCol>

            <!-- create account -->
            <VCol
              cols="12"
              class="text-center text-base"
            >
              <span>Don't have account?</span>
              <NuxtLink
                class="text-primary ms-2"
                to="/register"
              >
                Create an account
              </NuxtLink>
            </VCol>
          </VRow>
        </VForm>
      </VCardText>
    </VCard>

    <VImg
      class="auth-footer-start-tree d-none d-md-block"
      :src="authV1Tree"
      :width="250"
    />

    <VImg
      :src="authV1Tree2"
      class="auth-footer-end-tree d-none d-md-block"
      :width="350"
    />

    <!-- bg img -->
    <VImg
      class="auth-footer-mask d-none d-md-block"
      :src="authThemeMask"
    />
  </div>
</template>



<style lang="scss">
@use "@core/scss/template/pages/page-auth";
</style>
