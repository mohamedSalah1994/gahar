import { defineStore } from "pinia";
import axios from "axios";
export const useStore = defineStore("main", {
  state: () => ({
    items: [],
  }),
  actions: {
    createItem(formData) {
      axios
        .post("http://localhost:3000/items", formData)
        .then((response) => {
          // Add the new item to the store.
          this.items.push(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
});
