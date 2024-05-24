import { api } from "@/lib/axios";

interface SingInBody {
  email: string;
}

export async function signIn({ email }: SingInBody) {
  await api.post("/authenticate", {email});
}
