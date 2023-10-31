<script setup>
import axios from "axios";
import { ref } from "vue";
const form = ref({
  sectionTypeId: "1",
  pageSectionName: "",
  pageSectionUrl: "",
  file: null,
});
const previousForm = ref(null);
const handleSubmit = async () => {
  const sectionTypeIdInt = parseInt(form.value.sectionTypeId, 10);
  const postData = {
    sectionTypeId: sectionTypeIdInt,
    pageSectionName: form.value.pageSectionName,
    pageSectionUrl: form.value.pageSectionUrl,
    pagesId: 1,
    // Include other properties as needed
  };

  // For other types, send data as JSON
  try {
    const response = await axios.post(
      "http://localhost:3000/content",
      postData
    );

    if (response.status === 201 || response.status === 200) {
      // The data has been added successfully
      console.log("Data added successfully!");
      // Reset form fields
      previousForm.value = { ...form };
      form.value.pageSectionName = "";
      form.value.pageSectionUrl = "";
    } else {
      console.log("Something went wrong");
    }
  } catch (err) {
    console.error(err);
  }
};
</script>

<template>
  <form v-on:submit.prevent="handleSubmit" class="custom-form">
    <label for="type">Select a Type:</label>
    <select v-model="form.sectionTypeId" id="type" class="custom-select">
      <option value="1">Header</option>
      <option value="2">Details</option>
      <option value="3">Files</option>
    </select>

    <div v-if="form.sectionTypeId === '1'">
      <label for="name">Name:</label>
      <input
        type="text"
        id="name"
        v-model="form.pageSectionName"
        placeholder="Name"
        required
        class="input-field"
      />

      <label for="url">URL:</label>
      <input
        type="text"
        id="url"
        v-model="form.pageSectionUrl"
        placeholder="URL"
        required
        class="input-field"
      />
    </div>
    <div v-else-if="form.sectionTypeId === '2'">
      <label for="details">Details:</label>
      <textarea
        id="details"
        v-model="form.pageSectionName"
        placeholder="Details"
        class="textarea-field"
      ></textarea>
      <label for="url">URL:</label>
      <input
        type="text"
        id="url"
        v-model="form.pageSectionUrl"
        placeholder="URL"
        required
        class="input-field"
      />
    </div>
    <div v-else-if="form.sectionTypeId === '3'">
      <label for="fileInput">Choose a File:</label>
      <input
        type="file"
        id="fileInput"
        @change="handleFileInput"
        class="file-input"
      />
    </div>

    <button type="submit" class="submit-button">Add</button>
  </form>
</template>
<style>
.custom-form {
  width: 500px;
  margin: 0 auto;
  padding: 30px;
  border: 1px solid #ccc;
  background-color: #f7f7f7;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
}
.custom-select {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin: 8px 0;
  background-color: #f0f0f0; /* Background color for the select element */
  color: #333; /* Text color for the select element */
  font-size: 16px;
  cursor: pointer;
}

/* Additional styling for the options inside the select */
.custom-select option {
  background-color: #f0f0f0; /* Background color for the options */
  color: #333; /* Text color for the options */
  font-size: 16px;
}

/* Style for when the select element is focused */
.custom-select:focus {
  outline: none;
  border-color: #007bff; /* Change border color when focused */
}
/* Style for when the options are hovered over */
.custom-select option:hover {
  background-color: #007bff; /* Change background color on hover */
  color: #fff; /* Change text color on hover */
}
.custom-select option:checked {
  background-color: #007bff; /* Change background color for the selected option */
  color: #fff; /* Change text color for the selected option */
}
.input-field,
.textarea-field,
.file-input {
  display: block;
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin: 8px 0;
}

.textarea-field {
  height: 100px;
}

.submit-button {
  background-color: #007bff;
  color: white;
  font-weight: bold;
  border: none;
  cursor: pointer;
  padding: 10px 15px;
  border-radius: 5px;
  margin-top: 10px;
}

.submit-button:hover {
  background-color: #0056b3;
}
</style>
