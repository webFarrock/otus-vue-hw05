<script lang="ts" setup>
import {onBeforeMount, ref, computed, watch} from "vue"
import {fetchPosts, fetchComments, fetchUsersByIds} from "@/api/JsonPlaceholder"
import type {Ref} from "vue"
import type {IPost, IUser, IComment} from "@/api/typing"
import PostItem from '@/components/PostItem.vue'
import PostList from '@/components/PostList.vue'
import PostsFilter from '@/components/PostsFilter.vue'

interface FilterPayload {
  postTitle: string;
  userName: string;
}

const filter: Ref<FilterPayload | null> = ref(null)
const posts: Ref<IPost[]> = ref([])
const users: Ref<IUser[]> = ref([])
const postUser: Ref<IUser | null> = ref(null)
const postComments: Ref<IComment[]> = ref([])
const selectedPost: Ref<IPost | null> = ref(null)

const displayPosts = computed(() => {
  const title = filter.value?.postTitle.toLowerCase() || false
  const userName = filter.value?.userName.toLowerCase() || false
  let userIds:number[] = []

  if(userName) userIds = users.value.filter(item => item.name.toLowerCase().includes(userName)).map(item => item.id)
  return posts.value
      .filter(item => {
        if(title) return item.title.toLowerCase().includes(title)
        return true
      })
      .filter(item => {
        if(userIds.length > 0) return userIds.includes(item.userId)
        return true
      })
      .map(item => {
        item.selected = item.id === selectedPost.value?.id
        return item
      })
})
const showPosts = computed(() => displayPosts.value.length > 0)
const showPost = computed(() => selectedPost.value !== null)

const initApp = async () => {
  posts.value = await fetchPosts()
  if (!posts.value.length) return

  const userIds = posts.value.map(item => item.userId)
  users.value = await fetchUsersByIds(userIds)
}
const handleSelectPost = (id: number) => selectedPost.value = posts.value.find(item => item.id === id) || null
const handleFilter = (filterPayload: { postTitle: string, userName: string }) => filter.value = filterPayload

onBeforeMount(() => initApp())

watch(selectedPost, async (v) => {
  postUser.value = null
  postComments.value = []
  if (v) {
    postUser.value = users.value.find(item => item.id === v.userId) || null
    postComments.value = await fetchComments(v.id)
  }
})

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
      <PostItem v-if="showPost" :post="selectedPost" :user="postUser" :comments="postComments"></PostItem>
      <div v-else>Choose post item</div>
    </main>
  </div>
</template>
