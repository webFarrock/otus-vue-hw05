import axios, {Axios} from "axios"
import type {IPost, IUser, IComment} from "@/api/typing"

class JsonPlaceholder {
    private readonly baseUrl = 'https://jsonplaceholder.typicode.com'
    private request: Axios

    constructor() {
        this.request = axios.create({
            baseURL: this.baseUrl,
        })
    }

    async fetchPosts() {
        const { data } = await this.request.get<IPost[]>('/posts')
        return data || []
    }

    async fetchComments(postId: number) {
        const { data } = await this.request.get<IComment[]>(`/posts/${postId}/comments`)
        return data || []
    }

    async fetchUsersByIds(id: number[]) {
        const params = { id }
        const { data } = await this.request.get<IUser[]>(`/users`, { params })
        return data || null
    }
}

export const fetchPosts = () => new JsonPlaceholder().fetchPosts()
export const fetchComments = (postId: number) => new JsonPlaceholder().fetchComments(postId)
export const fetchUsersByIds = (id:number[]) => new JsonPlaceholder().fetchUsersByIds(id)
