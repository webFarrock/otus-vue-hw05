<script setup lang="ts">
import {computed} from "vue"
import type {IPost} from "@/api/typing"

interface Props {
  posts: IPost[];
}

const props = defineProps<Props>()
const emit = defineEmits(['select'])
const posts = computed(() => props.posts)
const handleClick = (id: number) => emit('select', id)
</script>

<template>
  <ul class="flex sm:flex-col overflow-hidden content-center justify-between posts-nav">
    <li class="pb-2 posts-nav__item"
        v-for="{id, title, selected} in posts" :key="id"
        :class="{selected}"
        @click="handleClick(id)"
    >
      {{ title }}
    </li>
  </ul>
</template>

<style scoped lang="scss">
.posts-nav {
  &__item {
    &.selected {
      color: #65a30d;
      text-decoration: underline;
    }

    &:hover {
      cursor: pointer;
      color: #65a30d;
      text-decoration: underline;
    }
  }
}
</style>
