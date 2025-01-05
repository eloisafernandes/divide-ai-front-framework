import { api } from '@/services/api';
import { ICategory } from '@/interfaces/ICategory';
import { getUserLocalStorage } from '@/context/AuthProvider/util';
import { ErrorResponse, ApiResponse } from '@/interfaces/IResponse';
import { IAIPrediction, IAIPredictionRequest } from '@/interfaces/IAIPrediction';

export async function getPredictionByUser(): Promise<IAIPrediction | null> {
  try {
    const token = getUserLocalStorage()?.token;
    const id = getUserLocalStorage()?.id;
    const response = await api.get<ApiResponse<IAIPrediction>>(`/chat-completion/user/${id}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });

    if (response.data.success) return response.data.data;
    return null;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function createChat(request: IAIPredictionRequest): Promise<IAIPrediction | null> {
    try {
      const token = getUserLocalStorage()?.token;
      const response = await api.post<ApiResponse<IAIPrediction>>('/chat-completion', request, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
  
      if (response.data.success) return response.data.data;
      return null;
    } catch (error: any) {
      const errorResponse = error?.response?.data as ApiResponse<ErrorResponse>;
  
      if (errorResponse && errorResponse.error?.message) {
        throw new Error(errorResponse.error?.message);
      } else {
        throw new Error('Erro desconhecido ao criar previsão');
      }
    }
  }
