<script setup lang="ts">
import {ref, watch, computed, unref} from "vue"

const emit = defineEmits(['filter'])
const postTitle = ref('')
const userName = ref('')
const filterPayload = computed(() => ({postTitle: postTitle.value, userName: userName.value}))

watch(filterPayload, () => emit('filter', unref(filterPayload)))
</script>

<template>
  <div class="search mb-4">
    <div class="search__field search-field mb-4">
      <label class="search-field__name  form-label inline-block mb-2 text-gray-700 text-md">Post title</label>
      <input v-model.trim="postTitle" type="text"
             class="search-field__input form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"/>
    </div>
    <div class="search__field search-field">
      <label class="search-field__name form-label inline-block mb-2 text-gray-700 text-md">User name</label>
      <input v-model.trim="userName" type="text"
             class="search-field__input form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"/>
    </div>
  </div>
</template>
