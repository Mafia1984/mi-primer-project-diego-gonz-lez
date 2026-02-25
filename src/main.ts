
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { IonicVue } from '@ionic/vue'

import App from './App.vue'
import router from './router'
import { initWebnative } from './webnative'  // << ESTA LÍNEA ES OBLIGATORIA


// ----- Ionic CSS core + utilitarios -----
import '@ionic/vue/css/core.css'
import '@ionic/vue/css/normalize.css'
import '@ionic/vue/css/structure.css'
import '@ionic/vue/css/typography.css'

// Opcionales útiles
import '@ionic/vue/css/padding.css'
import '@ionic/vue/css/float-elements.css'
import '@ionic/vue/css/text-alignment.css'
import '@ionic/vue/css/text-transformation.css'
import '@ionic/vue/css/flex-utils.css'
import '@ionic/vue/css/display.css'

// Tu css global si existe
// import './assets/main.css'

const app = createApp(App)
app.use(createPinia())
app.use(IonicVue)
app.use(router)

app.mount('#app')

// Inicializar WebNative
initWebnative()
  .then(() => console.log("WebNative inicializado correctamente"))
  .catch(err => console.error("Error inicializando WebNative:", err))
