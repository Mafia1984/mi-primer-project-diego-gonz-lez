
<template>
  <section class="auth-container">
    <h1>Crear cuenta</h1>
    <form @submit.prevent="onSubmit">
      <label>Nombre</label>
      <input v-model.trim="name" type="text" autocomplete="name" />

      <label>Email</label>
      <input v-model.trim="email" type="email" autocomplete="email" required />

      <label>Contraseña</label>
      <input v-model="password" type="password" autocomplete="new-password" required minlength="6" />

      <button :disabled="isLoading" type="submit">
        {{ isLoading ? 'Creando…' : 'Registrarme' }}
      </button>

      <p class="error" v-if="error">{{ error }}</p>
    </form>

    <p class="alt">
      ¿Ya tienes cuenta?
      <RouterLink to="/login">Inicia sesión</RouterLink>
    </p>
  </section>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const router = useRouter();
const store = useAuthStore();

const name = ref('');
const email = ref('');
const password = ref('');
const isLoading = computed(() => store.status === 'loading');
const error = computed(() => store.error);

const onSubmit = async () => {
  try {
    await store.register({ name: name.value, email: email.value, password: password.value });
    router.push('/');
  } catch (e) { }
};
</script>

<style scoped>
.auth-container {
  max-width: 420px; margin: 4rem auto; padding: 2rem;
  border: 1px solid #e5e7eb; border-radius: 12px;
}
label { display:block; margin-top: 1rem; }
input { width: 100%; padding: .75rem; margin-top: .25rem; border: 1px solid #d1d5db; border-radius: 8px; }
button { width: 100%; margin-top: 1.25rem; padding: .75rem; background: #065f46; color: #fff; border: 0; border-radius: 8px; cursor: pointer; }
button[disabled] { opacity: .6; cursor: not-allowed; }
.error { color: #b91c1c; margin-top: .75rem; }
.alt { margin-top: 1rem; text-align:center; }
</style>
