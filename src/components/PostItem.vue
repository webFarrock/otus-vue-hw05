<script setup lang="ts">
import {computed} from "vue"
import type {IComment, IPost, IUser} from "@/api/typing"
import PostUser from '@/components/PostUser.vue'
import PostComments from '@/components/PostComments.vue'

interface Props {
  post: IPost;
  user: IUser | null;
  comments: IComment[];
}
const props = defineProps<Props>()
const emit = defineEmits(['delete'])
const post = computed(() => props.post)
const user = computed(() => props.user)
const showUser = computed(() => user.value !== null)
const comments = computed(() => props.comments)
const showComments = computed(() => comments.value.length > 0)
const handleClick = () => {
  if (confirm('Delete current post ?')) {
    emit('delete', post.value.id)
  }
}
</script>

<template>
  <div class="post">
    <div class="post__delete mb-2 text-right ">
      <button @click="handleClick"
              class="inline-block px-6 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out"
      >
        Delete post
      </button>
    </div>
    <h4 class="text-2xl font-bold mb-2">{{ post.title }}</h4>
    <p>{{ post.body }}</p>
  </div>
  <PostUser v-if="showUser" :user="user" />
  <PostComments v-if="showComments" :comments="comments" />
</template>
