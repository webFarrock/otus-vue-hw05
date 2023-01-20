<script setup lang="ts">
import {computed} from 'vue'
import type {IComment} from "@/api/typing"

interface Props {
  comments: IComment[];
}

const props = defineProps<Props>()
const comments = computed(() => props.comments)
</script>

<template>
  <div class="comments mb-2 ml-8">
    <h5 class="text-2xm font-bold mb-2">PostComments</h5>
    <div class="comments__item mb-2" v-for="{id, name, body, email} in comments" :key="id">
      <div class="comments__item-name">{{ name }}</div>
      <div class="comments__item-body">{{ body }}</div>
      <div class="comments__item-email">{{ email }}</div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.comments {
  &__item-email {
    text-align: right;
    font-style: italic;
  }
}
</style>
