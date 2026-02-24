
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { initWebnative } from './webnative'  // << ESTA LÍNEA ES OBLIGATORIA

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')

// Inicializar WebNative
initWebnative()
  .then(() => console.log("WebNative inicializado correctamente"))
  .catch(err => console.error("Error inicializando WebNative:", err))

  