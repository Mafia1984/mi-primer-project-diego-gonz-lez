<template>
  <nav class="nav">
    <router-link to="/" class="link">Inicio</router-link>
    <router-link to="/users" class="link">Usuarios</router-link>
  </nav>
</template>

<style scoped>
.nav { display: flex; gap: 12px; padding: 12px; border-bottom: 1px solid #eee; margin-bottom: 16px; }
.link { text-decoration: none; color: #2c3e50; }
.link.router-link-active { font-weight: 700; color: #42b983; }
</style>
