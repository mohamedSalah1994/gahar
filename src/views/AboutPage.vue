<template>
  <div>
    <button @click="fetchData">Fetch Data</button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  methods: {
    fetchData() {
      axios
        .get("https://10.18.121.124:448/api/pages/getpages") // Replace with your API URL
        .then((response) => {
          console.log("Response from API:", response.data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    },
  },
};
</script>
