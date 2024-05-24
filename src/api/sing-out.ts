import { api } from "@/lib/axios";

export async function SingOut() {
    await api.post("/sing-out")
}