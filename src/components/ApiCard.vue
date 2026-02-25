
<!-- src/components/ApiCard.vue -->
<template>
  <ion-card>
    <ion-card-header>
      <ion-card-title class="text-lg">{{ title }}</ion-card-title>
      <ion-card-subtitle v-if="subtitle">{{ subtitle }}</ion-card-subtitle>
    </ion-card-header>
    <ion-card-content>
      <div v-if="loading" class="text-sm">Cargando…</div>
      <div v-else-if="error" class="text-sm text-red-600">{{ error }}</div>
      <div v-else>
        <slot />
      </div>
      <ion-button size="small" fill="clear" @click="onRefresh">Refrescar</ion-button>
    </ion-card-content>
  </ion-card>
</template>
<script setup lang="ts">
import { IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonButton } from '@ionic/vue';

defineProps<{ title: string; subtitle?: string; loading?: boolean; error?: string | null }>();
const emit = defineEmits<{ (e: 'refresh'): void }>();
const onRefresh = () => emit('refresh');
</script>
