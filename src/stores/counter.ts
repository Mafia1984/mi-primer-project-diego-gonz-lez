import { defineStore } from 'pinia';

export const useCounterStore = defineStore('counter', {
  state: () => ({ count: 0 as number }),
  getters: {
    double: (state) => state.count * 2,
  },
  actions: {
    inc() { this.count++; },
    dec() { this.count--; },
    reset() { this.count = 0; },
  },
});
