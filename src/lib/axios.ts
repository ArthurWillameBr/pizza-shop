import { env } from "@/env"
import axios from "axios"

export const api = axios.create({
    baseURL: env.VITE_API_URL,
    withCredentials: true
})

if (env.VITE_ENABLED_API_DELAY) {
    api.interceptors.response.use(
        async (response) => {
            await new Promise((resolve) => setTimeout(resolve, 2000))

            return response
        },
        async (error) => {
            await new Promise((resolve) => setTimeout(resolve, 2000))

            return Promise.reject(error)
        }
    )
}