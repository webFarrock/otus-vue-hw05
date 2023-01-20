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
const post = computed(() => props.post)
const user = computed(() => props.user)
const showUser = computed(() => user.value !== null)
const comments = computed(() => props.comments)
const showComments = computed(() => comments.value.length > 0)
</script>

<template>
  <div class="post">
    <h4 class="text-2xl font-bold mb-2">{{ post.title }}</h4>
    <p>{{ post.body }}</p>
  </div>
  <PostUser v-if="showUser" :user="user" />
  <PostComments v-if="showComments" :comments="comments" />
</template>
