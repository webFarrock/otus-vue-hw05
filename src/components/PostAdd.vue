<script setup lang="ts">
import {ref, computed, unref} from "vue"

const emit = defineEmits(['add-post'])
const title = ref('')
const body = ref('')
const payload = computed(() => ({title: title.value, body: body.value}))

const reset = () => {
  title.value = ''
  body.value = ''
}
const handleClick = () => {
  if (!(title.value || body.value)) {
    alert('Both title and body fields are required')
    return
  }
  emit('add-post', unref(payload))
  reset()
}
</script>

<template>
  <div class="post-add mt-5">
    <h5 class="text-2xl font-bold mb-2">Create new post</h5>
    <div class="post-add__field mb-4">
      <label class="search-field__name  form-label inline-block mb-2 text-gray-700 text-md">Post title</label>
      <input v-model.trim="title" type="text"
             class="search-field__input form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"/>
    </div>
    <div class="post-add__field">
      <label class="search-field__name form-label inline-block mb-2 text-gray-700 text-md">Post body</label>
      <input type="text" v-model.trim="body"
             class="search-field__input form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"/>
    </div>
    <div class="text-right mt-4">
      <button @click="handleClick" type="button"
              class="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
        Primary
      </button>
    </div>
  </div>
</template>
