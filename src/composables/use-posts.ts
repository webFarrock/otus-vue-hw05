import {computed, onBeforeMount, ref, watch} from "vue"
import {
  addPost as addPostApi,
  deletePost as deletePostApi,
  fetchComments,
  fetchPosts,
  fetchUsersByIds
} from "@/api/JsonPlaceholder"
import type {Ref} from "vue"
import type {IPost, IUser, IComment, IFilterPayload, IAddPostPayload} from "@/api/typing"

export default (
  filter: Ref<IFilterPayload | null> = ref(null),
  postId: Ref<number | null> = ref(null)
) => {
  const posts: Ref<IPost[]> = ref([])
  const users: Ref<IUser[]> = ref([])
  const selectedPost: Ref<IPost | null> = ref(null)
  const postUser: Ref<IUser | null> = ref(null)
  const postComments: Ref<IComment[]> = ref([])


  const displayPosts = computed(() => {
    const title = filter.value?.postTitle.toLowerCase() || false
    const userName = filter.value?.userName.toLowerCase() || false
    let userIds: number[] = []

    if (userName) userIds = users.value.filter(item => item.name.toLowerCase().includes(userName)).map(item => item.id)
    return posts.value
      .filter(item => {
        if (title) return item.title.toLowerCase().includes(title)
        return true
      })
      .filter(item => {
        if (userIds.length > 0) return userIds.includes(item.userId)
        return true
      })
  })

  const initApp = async () => {
    posts.value = await fetchPosts()
    if (!posts.value.length) return

    const userIds = posts.value.map(item => item.userId)
    users.value = await fetchUsersByIds(userIds)
  }
  const deletePost = async (id: number) => {
    // api предоставляет только фейковое удаление - поэтому фильтруем то что уже получено
    await deletePostApi(id)
    if (selectedPost.value?.id === id) selectedPost.value = null
    posts.value = posts.value.filter(item => item.id !== id)
  }
  const addPost = async (payload: IAddPostPayload) => {
    // в api фейковое добавление, поэтому добавленный посто складываем в существующий массив
    const result = await addPostApi({userId: 1, ...payload})
    posts.value = [result, ...posts.value]
  }

  onBeforeMount(() => initApp())

  watch(postId, async (v) => {
    selectedPost.value = posts.value.find(item => postId.value && item.id === postId.value) || null
    postUser.value = null
    postComments.value = []
    if (selectedPost.value) {
      const {userId, id} = selectedPost.value
      postUser.value = users.value.find(item => item.id === userId) || null
      postComments.value = await fetchComments(id)
    }
  })

  return {
    posts,
    users,
    displayPosts,
    selectedPost,
    postUser,
    postComments,
    deletePost,
    addPost,
  }
}
