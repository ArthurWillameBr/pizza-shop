import { api } from "@/lib/axios";

interface UpdateProfileRequest {
    name: string;
    description: string;
}

export async function UpdateProfile({name, description}: UpdateProfileRequest) {
    await api.put("/profile", {name, description})
}