<script setup>
// import router from "@/router";
import axios from "axios";
import { onMounted, ref, computed } from "vue";

const form = ref({
  pageName: null,
  shortLink: "",
  pageUrl: "",
  pagPagesId: null,
});

const items = ref([]);
const imageFile = ref(null);

const handleImageChange = (event) => {
  const file = event.target.files[0];
  imageFile.value = file;
};

const handleSubmit = async () => {
  const formData = new FormData();

  formData.append("pageName", form.value.pageName);
  formData.append("pagPagesId", form.value.pagPagesId);
  formData.append("pageUrl", form.value.pageUrl);
  formData.append("shortLink", form.value.shortLink);

  if (imageFile.value) {
    formData.append("imageUrl", imageFile.value);
  }

  try {
    const result = await axios.post(
      "https://10.18.121.124:448/api/pages/postpage",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          // Add any other headers as needed
        },
      }
    );
    console.log(result);
    if (result.status === 201 || result.status === 200) {
      const newItem = { ...form.value, id: result.data.id };
      items.value.push(newItem);
    } else {
      console.log("Something went wrong");
    }
  } catch (err) {
    console.error(err);
  }
};

const fetchData = async () => {
  try {
    const response = await axios.get(
      "https://10.18.121.124:448/api/pages/getpages"
    );
    items.value = response.data;
    console.log(response.data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
onMounted(() => {
  fetchData();
});

// Create a computed property to map page IDs to their names
const pageNameMap = computed(() => {
  const map = {};
  for (const item of items.value) {
    map[item.id] = item.pageName;
  }
  return map;
});
</script>

<template>
  <form v-on:submit.prevent="handleSubmit">
    <!-- <input type="text" v-model="form.id" placeholder="id" /> -->
    <input type="text" v-model="form.pageName" placeholder="Page name" />

    <select v-model="form.pagPagesId" id="page_id">
      <option value="" disabled>Select a page</option>
      <option v-for="item in items" :key="item.id" :value="item.pagesId">
        {{ item.pageName }}
      </option>
    </select>
    <input type="text" v-model="form.pageUrl" placeholder="url" />
    <input type="text" v-model="form.shortLink" placeholder="short link" />

    <input
      type="file"
      id="image"
      ref="imageInput"
      accept="image/*"
      @change="handleImageChange"
    />

    <button type="submit">Add</button>
  </form>
  <hr />
  <table>
    <thead id="header">
      <tr>
        <th>id</th>
        <th>Page name</th>
        <th class="page_id">p.page_id</th>
        <th class="url">url</th>
        <th class="link">short link</th>
        <th class="image">image url</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in items" :key="item.id">
        <td>{{ item.pages }}</td>
        <td>{{ item.pageName }}</td>
        <td class="page_id">{{ pageNameMap[item.pagPagesId] }}</td>
        <td class="url">{{ item.pageUrl }}</td>
        <td class="url">{{ item.shortLink }}</td>
        <td class="url">{{ item.imageUrl }}</td>
      </tr>
    </tbody>
  </table>
</template>

<style>
form {
  width: 500px;
  margin: 0 auto;
  padding: 30px;
  border: 1px solid #ccc;
  background-color: #f7f7f7;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
}

input,
select {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin: 8px 0;
}

button {
  background-color: #007bff;
  color: white;
  font-weight: bold;
  border: none;
  cursor: pointer;
  padding: 10px 15px;
  border-radius: 5px;
  margin-top: 10px;
}

button:hover {
  background-color: #0056b3;
}

/* Table */

table {
  border-collapse: collapse;
  width: 100%;
}

thead tr th {
  background-color: #ccc;
  padding: 8px;
  border: 1px solid #bbb;
}

tbody tr td {
  padding: 8px;
  border: 1px solid #bbb;
}

.page_id {
  width: 150px;
}

.url {
  width: 300px;
}
</style>
