import { api } from '@/services/api';
import { ITransacion, ITransacionResponse } from '@/interfaces/ITransacion';
import { ApiResponse } from '@/interfaces/ApiResponse';
import { getUserLocalStorage } from '@/context/AuthProvider/util';
import { VWTransaction } from '@/types/VWTransaction';
import { VWTransactionByCategory } from '@/types/VWTransactionByCategory';

export async function getAllTransacions(): Promise<ITransacion[] | null> {
  try {
    const token = getUserLocalStorage()?.token;
    const response = await api.get<ApiResponse<ITransacion[]>>('/user-transactions', {
      headers: { 'Authorization': `Bearer ${token}` }
    });

    if (response.data.success) return response.data.data;
    return null;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getAllTransacionsByUser(): Promise<ITransacionResponse[] | null> {
  try {
    const token = getUserLocalStorage()?.token;
    const id = getUserLocalStorage()?.id;
    const response = await api.get<ApiResponse<ITransacionResponse[]>>(`/user-transactions/transactions/${id}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });

    if (response.data.success) return response.data.data;
    return null;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getTransacionById(id: number): Promise<ITransacion | null> {
  try {
    const token = getUserLocalStorage()?.token;
    const response = await api.get<ApiResponse<ITransacion>>(`/user-transactions/transactions/${id}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });

    if (response.data.success) return response.data.data;
    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getUserTransacionByMonth(): Promise<VWTransaction[] | null> {
  try {
    const token = getUserLocalStorage()?.token;
    const id = getUserLocalStorage()?.id;
    const response = await api.get<ApiResponse<VWTransaction[]>>(`/user-transactions/transactions/grouped-by-month/${id}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });

    if (response.data.success) return response.data.data;
    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getUserTransacionByCategory(): Promise<VWTransactionByCategory[] | null> {
  try {
    const token = getUserLocalStorage()?.token;
    const id = getUserLocalStorage()?.id;
    const response = await api.get<ApiResponse<VWTransactionByCategory[]>>(`/user-transactions/transactions/grouped-by-category/${id}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });

    if (response.data.success) return response.data.data;
    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function createTransacion(transacion: ITransacion): Promise<ITransacion | null> {
  try {
    const token = getUserLocalStorage()?.token;
    const response = await api.post<ApiResponse<ITransacion>>('/user-transactions', transacion, {
      headers: { 'Authorization': `Bearer ${token}` }
    });

    if (response.data.success) return response.data.data;
    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function updateTransacion(transacion: ITransacion): Promise<ITransacion | null> {
  try {
    const token = getUserLocalStorage()?.token;
    const response = await api.put<ApiResponse<ITransacion>>(`/user-transactions/${transacion.id}`, transacion, {
      headers: { 'Authorization': `Bearer ${token}`, }
    });

    if (response.data.success) return response.data.data;
    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function deleteTransacion(id: number): Promise<void | null> {
  try {
    const token = getUserLocalStorage()?.token;
    const response = await api.delete<ApiResponse<null>>(`/user-transactions/${id}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });

    if (!response.data.success) {
      throw new Error('Failed to delete category');
    }
  } catch (error) {
    console.error(error);
    return null;
  }
}
