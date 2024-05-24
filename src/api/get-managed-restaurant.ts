import { api } from "@/lib/axios";

export interface GetManagedRestauranteResponse {
  id: string;
  name: string;
  description: string | null;
  createdAt: string | null;
  updatedAt: string | null;
  managerId: string | null;
}

export async function getManagedRestaurante() {
  const response = await api.get<GetManagedRestauranteResponse>("/managed-restaurant");

  return response.data;
}
