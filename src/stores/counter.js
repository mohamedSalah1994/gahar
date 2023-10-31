import { defineStore } from "pinia";

export const useCounterStore = defineStore({
  id: "counter",
  state: () => ({
    count: 20,
  }),
  actions: {
    increse() {
      this.count++;
    },
    decrese() {
      this.count--;
    },
  },
});
