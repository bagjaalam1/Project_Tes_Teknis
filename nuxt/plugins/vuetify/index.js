import { createVuetify } from 'vuetify'
import { VBtn } from 'vuetify/components/VBtn'
import defaults from './defaults'
import { icons } from './icons'
import { themes } from './theme'

// Styles
import '@core/scss/template/libs/vuetify/index.scss'
import 'vuetify/styles'
import 'remixicon/fonts/remixicon.css';

export default defineNuxtPlugin(nuxtApp => {
  const vuetify = createVuetify({
    ssr: true,
    aliases: {
      IconBtn: VBtn,
    },
    defaults,
    icons: icons,
    theme: {
      defaultTheme: 'light',
      themes,
    },
  })

  nuxtApp.vueApp.use(vuetify)
})
