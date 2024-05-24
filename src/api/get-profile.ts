import { api } from "@/lib/axios";

interface GetProfileResponse {
  id: string;
  name: string;
  email: string;
  phone: string;
  createdAt: string | null;
  updatedAt: string | null;
  role: "manager" | "customer";
}

export async function getProfile() {
  const response = await api.get<GetProfileResponse>("/me");

  return response.data;
}
