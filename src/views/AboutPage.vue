<template>
  <div>
    <input type="file" @change="uploadImage" ref="fileInput" />
    <button @click="submitImage">Upload Image</button>
    <button @click="fetchImageById">Fetch Image by ID</button>
    <img v-if="imageUrl" :src="imageUrl" alt="Uploaded/Fetched Image" />
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      selectedFile: null,
      imageUrl: null,
    };
  },
  methods: {
    uploadImage(event) {
      this.selectedFile = event.target.files[0];
      this.imageUrl = URL.createObjectURL(this.selectedFile);
    },
    submitImage() {
      const formData = new FormData();
      formData.append("image", this.selectedFile);

      axios
        .post("http://localhost:3000/file", formData) // Replace with your API endpoint
        .then(() => {
          console.log("Image uploaded successfully");
          // Handle the response as needed
        })
        .catch((error) => {
          console.error("Error uploading image:", error);
          // Handle the error
        });
    },
    fetchImageById() {
      const imageId = 1; // Replace with the desired image ID
      axios
        .get(`http://localhost:3000/file/${imageId}`) // Replace with your API endpoint for fetching images by ID
        .then((response) => {
          console.log("Image fetched successfully");
          this.imageUrl = response.data.imageUrl;
          console.log(response.data.imageUrl);
        })
        .catch((error) => {
          console.error("Error fetching image:", error);
          // Handle the error
        });
    },
  },
};
</script>
