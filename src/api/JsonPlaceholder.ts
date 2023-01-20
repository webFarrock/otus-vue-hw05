import axios, {Axios} from "axios"
import type {IPost, IPostFilter, IUser, IComment} from "@/api/typing"

class JsonPlaceholder {
    private readonly baseUrl = 'https://jsonplaceholder.typicode.com'
    private request: Axios

    constructor() {
        this.request = axios.create({
            baseURL: this.baseUrl,
        })
    }

    async fetchPosts(filter: IPostFilter = {}) {
        const params = { ...filter }
        const { data } = await this.request.get<IPost[]>('/posts', { params })
        return data || []
    }

    async fetchComments(postId: number) {
        const { data } = await this.request.get<IComment[]>(`/posts/${postId}/comments`)
        return data || []
    }

    async fetchUsersById(id: number) {
        const params = { id }
        const { data } = await this.request.get<IUser[]>(`/users`, { params })
        return data[0] || null
    }
}

export const fetchPosts = (filter: IPostFilter = {}) => new JsonPlaceholder().fetchPosts(filter)
export const fetchComments = (postId: number) => new JsonPlaceholder().fetchComments(postId)
export const fetchUsersById = (id:number) => new JsonPlaceholder().fetchUsersById(id)
