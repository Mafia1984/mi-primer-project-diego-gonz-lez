<script setup lang="ts">
import { useCounterStore } from '@/stores/counter';
const counter = useCounterStore();
</script>

<template>
  <section>
    <h1>Inicio</h1>
    <p>
      Count: <strong>{{ counter.count }}</strong> — doble: {{ counter.double }}
    </p>
    <button @click="counter.inc">+1</button>
    <button @click="counter.dec">-1</button>
    <button @click="counter.reset">Reset</button>
    <p style="margin-top:12px;">Ir a <router-link to="/users">Usuarios</router-link></p>
  </section>
</template>
