<script lang="ts" setup>
import {onBeforeMount, ref, computed, watch} from "vue"
import {fetchPosts, fetchComments, fetchUsersById} from "@/api/JsonPlaceholder"
import type {Ref} from "vue"
import type {IPost, IUser, IComment} from "@/api/typing"

const posts: Ref<IPost[]> = ref([])
const postUser: Ref<IUser | null> = ref(null)
const postComments: Ref<IComment[]> = ref([])
const displayPosts = computed(() => posts.value.map(item => {
  item.selected = item.id === selectedPost.value?.id
  return item
}))
const selectedPost: Ref<IPost|null> = ref(null)
const showPost = computed(() => selectedPost.value !== null)

const initApp = async () => posts.value = await fetchPosts()
const handleSelectPost = (id:number) => selectedPost.value = posts.value.find(item => item.id === id) || null

onBeforeMount(() => initApp())
watch(selectedPost, async(v) => {
  postUser.value = null
  postComments.value = []
  if(v){
    postUser.value = await fetchUsersById(v.userId)
    postComments.value = await fetchComments(v.id)
  }
})

</script>

<template>
  <div class="w-full flex flex-col sm:flex-row flex-grow overflow-hidden">
    <div class="sm:w-1/3 md:1/4 w-full flex-shrink flex-grow-0 p-4">
      <div class="sticky top-0 w-full">
        <ul class="flex sm:flex-col overflow-hidden content-center justify-between posts-nav">
          <li class="pb-2 posts-nav__item"
              v-for="{id, title, selected} in displayPosts" :key="id"
              :class="{selected}"
              @click="handleSelectPost(id)"
          >
            {{ title }}
          </li>
        </ul>
      </div>
    </div>
    <main role="main" class="w-full h-full flex-grow p-3 overflow-auto">
      <template v-if="showPost">
        <div>{{ selectedPost }}</div>
        <div>{{ postUser }}</div>
        <div>{{ postComments }}</div>
      </template>
      <template v-else>Выберите пост</template>
    </main>
  </div>
</template>

<style scoped lang="scss">
  .posts-nav{
    &__item{
      &.selected{
        color: #65a30d;
        text-decoration: underline;
      }
      &:hover{
        cursor: pointer;
        color: #65a30d;
        text-decoration: underline;
      }
    }
  }
</style>
