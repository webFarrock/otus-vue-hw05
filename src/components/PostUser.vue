<script setup lang="ts">
import {computed} from 'vue'
import type {IUser} from "@/api/typing"

interface Props {
  user: IUser | null;
}

const props = defineProps<Props>()
const name = computed(() => props.user?.name)
const username = computed(() => props.user?.username)
</script>

<template>
  <div class="user mb-2">
    <div class="user__sign">{{ name }} [{{ username }}]</div>
  </div>
</template>

<style scoped lang="scss">
.user{
  &__sign{
    text-align: right;
    font-style: italic;
    font-weight: bold;
  }
}
</style>
