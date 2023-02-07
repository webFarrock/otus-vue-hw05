<script lang="ts" setup>
import {ref, computed} from "vue"
import type {Ref} from "vue"
import type {IFilterPayload} from "@/api/typing"
import PostItem from '@/components/PostItem.vue'
import PostList from '@/components/PostList.vue'
import PostsFilter from '@/components/PostsFilter.vue'
import PostAdd from '@/components/PostAdd.vue'
import usePosts from "@/composables/use-posts"

const postId: Ref<number | null> = ref(null)
const filter: Ref<IFilterPayload | null> = ref(null)
const {
  displayPosts,
  selectedPost,
  postUser,
  postComments,
  deletePost,
  addPost,
} = usePosts(filter, postId)


const showPosts = computed(() => displayPosts.value.length > 0)
const showPost = computed(() => selectedPost.value !== null)

const handleSelectPost = (id: number) => postId.value = id
const handleFilter = (IFilterPayload: { postTitle: string, userName: string }) => filter.value = IFilterPayload

</script>

<template>
  <div class="w-full flex flex-col sm:flex-row flex-grow overflow-hidden">
    <div class="sm:w-1/3 md:1/4 w-full flex-shrink flex-grow-0 p-4">
      <div class="sticky top-0 w-full">
        <h3 class="text-3xl font-bold mb-8">Posts</h3>
        <PostsFilter @filter="handleFilter"/>
        <PostList @select="handleSelectPost" v-if="showPosts" :posts="displayPosts"/>
      </div>
    </div>
    <div v-if="!showPosts">posts not found</div>
    <main role="main" class="w-full h-full flex-grow p-3 overflow-auto">
      <h3 class="text-3xl font-bold mb-8">Post item</h3>
      <PostItem v-if="showPost"
                :post="selectedPost"
                :user="postUser"
                :comments="postComments"
                @delete="deletePost"
      ></PostItem>
      <div v-else>Choose or create post item</div>
      <PostAdd @add-post="addPost"/>
    </main>
  </div>
</template>
