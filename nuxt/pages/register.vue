<script setup>
import { useTheme } from 'vuetify'
import authV1MaskDark from '@images/pages/auth-v1-mask-dark.png'
import authV1MaskLight from '@images/pages/auth-v1-mask-light.png'
import authV1Tree2 from '@images/pages/auth-v1-tree-2.png'
import authV1Tree from '@images/pages/auth-v1-tree.png'
import axios from 'axios'

const form = ref({
  username: '',
  email: '',
  password: '',
  repassword: '',
})

const vuetifyTheme = useTheme()

const authThemeMask = computed(() => {
  return vuetifyTheme.global.name.value === 'light' ? authV1MaskLight : authV1MaskDark
})

const isPasswordVisible = ref(false)
const isRepasswordVisible = ref(false)

const register = async () => {
  try {
    const response = await axios.post('http://localhost:3001/api/register', {
      username: form.value.username,
      email: form.value.email,
      password: form.value.password,
      repassword: form.value.repassword
    })

    this.$router.push('/login')
  } catch (error) {
    console.error('Registration failed:', error)
  }
}

definePageMeta({ layout: 'blank' })
</script>

<template>

  <div class="auth-wrapper d-flex align-center justify-center pa-4">
    <VCard
      class="auth-card pa-4 pt-7"
      max-width="448"
    >

      <VCardText class="pt-2">
        <h4 class="text-h4 mb-1">
          Create Account
        </h4>
      </VCardText>

      <VCardText>
        <VForm @submit.prevent="register">
          <VRow>
            <!-- Username -->
            <VCol cols="12">
              <VTextField
                v-model="form.username"
                label="Username"
                placeholder="Username"
                required
              />
            </VCol>
            <!-- email -->
            <VCol cols="12">
              <VTextField
                v-model="form.email"
                label="Email"
                placeholder="example@email.com"
                type="email"
                required
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
                required
              />
            </VCol>

            <VCol cols="12">
              <VTextField
                v-model="form.repassword"
                label="Re-password"
                placeholder="············"
                :type="isRepasswordVisible ? 'text' : 'password'"
                :append-inner-icon="isRepasswordVisible ? 'ri-eye-off-line' : 'ri-eye-line'"
                @click:append-inner="isRepasswordVisible = !isRepasswordVisible"
                required
              />

              <div class="d-flex align-center my-6">
              </div>
              <VBtn
                block
                type="submit"
              >
                Sign up
              </VBtn>
            </VCol>

            <!-- login instead -->
            <VCol
              cols="12"
              class="text-center text-base"
            >
              <span>Already have an account?</span>
              <NuxtLink
                class="text-primary ms-2"
                to="login"
              >
                Sign in instead
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
