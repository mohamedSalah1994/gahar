<script setup>
import { defineProps } from "vue";
const data = defineProps({
  userName: {
    type: String,
    required: true,
  },
  userAge: {
    type: Number,
    required: true,
  },
});
</script>

<template>
  <div class="comp">
    <h2>hello from component</h2>
    <h3>Name is {{ data.userName }} , Age is {{ data.userAge }}</h3>
  </div>
</template>
