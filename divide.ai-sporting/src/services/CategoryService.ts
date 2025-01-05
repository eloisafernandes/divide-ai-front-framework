import { api } from '@/services/api';
import { ICategory } from '@/interfaces/ICategory';
import { getUserLocalStorage } from '@/context/AuthProvider/util';
import { ErrorResponse, ApiResponse } from '@/interfaces/IResponse';

export async function getAllCategories(): Promise<ICategory[] | null> {
  try {
    const token = getUserLocalStorage()?.token;
    const response = await api.get<ApiResponse<ICategory[]>>('/categories', {
      headers: { 'Authorization': `Bearer ${token}` }
    });

    if (response.data.success) return response.data.data;
    return null;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getAllCategoriesByUser(): Promise<ICategory[] | null> {
  try {
    const token = getUserLocalStorage()?.token;
    const id = getUserLocalStorage()?.id;
    const response = await api.get<ApiResponse<ICategory[]>>(`/categories/user/${id}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });

    if (response.data.success) return response.data.data;
    return null;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getCategoryById(id: number): Promise<ICategory | null> {
  try {
    const token = getUserLocalStorage()?.token;
    const response = await api.get<ApiResponse<ICategory>>(`/categories/${id}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });

    if (response.data.success) return response.data.data;
    return null;
  } catch (error: any) {
    const errorResponse = error?.response?.data as ApiResponse<ErrorResponse>;

    if (errorResponse && errorResponse.error?.message) {
      throw new Error(errorResponse.error?.message);
    } else {
      throw new Error('Erro desconhecido ao retornar categoria pelo id');
    }
  }
}


export async function createCategory(category: ICategory): Promise<ICategory | null> {
  try {
    const token = getUserLocalStorage()?.token;
    const response = await api.post<ApiResponse<ICategory>>('/categories', category, {
      headers: { 'Authorization': `Bearer ${token}` }
    });

    if (response.data.success) return response.data.data;
    return null;
  } catch (error: any) {
    const errorResponse = error?.response?.data as ApiResponse<ErrorResponse>;

    if (errorResponse && errorResponse.error?.message) {
      throw new Error(errorResponse.error?.message);
    } else {
      throw new Error('Erro desconhecido ao criar categoria');
    }
  }
}

export async function updateCategory(category: ICategory): Promise<ICategory | null> {
  try {
    const token = getUserLocalStorage()?.token;
    const response = await api.put<ApiResponse<ICategory>>(`/categories/${category.id}`, category, {
      headers: { 'Authorization': `Bearer ${token}`, }
    });

    if (response.data.success) return response.data.data;
    return null;
  } catch (error: any) {
    const errorResponse = error?.response?.data as ApiResponse<ErrorResponse>;

    if (errorResponse && errorResponse.error?.message) {
      throw new Error(errorResponse.error?.message);
    } else {
      throw new Error('Erro desconhecido ao editar categoria');
    }
  }
}

  export async function deleteCategory(id: number): Promise<void | null> {
    try {
      const token = getUserLocalStorage()?.token;
      const response = await api.delete<ApiResponse<null>>(`/categories/${id}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (!response.data.success) {
        throw new Error('Erro ao deletar categoria');
      }
    } catch (error: any) {
      const errorResponse = error?.response?.data as ApiResponse<ErrorResponse>;
  
      if (errorResponse && errorResponse.error?.message) {
        throw new Error(errorResponse.error?.message);
      } else {
        throw new Error('Erro desconhecido ao deletar categoria');
      }
    }
  }
