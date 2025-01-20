import { api } from '@/services/api';
import { getUserLocalStorage } from '@/context/AuthProvider/util';
import { IGroup, IGroupForm, IJoinGroup, IReform, IReformForm } from '@/interfaces/IGroup';
import { ErrorResponse, ApiResponse } from '@/interfaces/IResponse';

export async function getAllGroupsByUser(): Promise<IReform[] | null> {
    try {
      const token = getUserLocalStorage()?.token;
      const id = getUserLocalStorage()?.id;
      const response = await api.get<ApiResponse<IReform[]>>(`/reforms/user/${id}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
  
      if (response.data.success) return response.data.data;
      return null;
    } catch (error: any) {
      const errorResponse = error?.response?.data as ApiResponse<ErrorResponse>;

        if (errorResponse && errorResponse.error?.message) {
          throw new Error(errorResponse.error?.message); 
        } else {
          throw new Error('Erro desconhecido ao entrar no grupo de reforma'); 
        }
    }
}
  
export async function getGroupById(id: number): Promise<IReform | null> {
    try {
        const token = getUserLocalStorage()?.token;
        const response = await api.get<ApiResponse<IReform>>(`/reforms/${id}`, {
        headers: { 'Authorization': `Bearer ${token}` }
        });

        if (response.data.success) return response.data.data;
        return null;
    } catch (error: any) {
      const errorResponse = error?.response?.data as ApiResponse<ErrorResponse>;

      if (errorResponse && errorResponse.error?.message) {
        throw new Error(errorResponse.error?.message); 
      } else {
        throw new Error('Erro desconhecido ao buscar reforma'); 
      }
    }
}


export async function createGroup(group: IReformForm): Promise<IReform | null> {
    try {
        const token = getUserLocalStorage()?.token;
        const response = await api.post<ApiResponse<IReform>>(`/reforms`, group, {
        headers: { 'Authorization': `Bearer ${token}` }
        });

        if (response.data.success) return response.data.data;
        return null;
    } catch (error: any) {
      const errorResponse = error?.response?.data as ApiResponse<ErrorResponse>;

      if (errorResponse && errorResponse.error?.message) {
        throw new Error(errorResponse.error?.message); 
      } else {
        throw new Error('Erro desconhecido ao criar reforma'); 
      }
    }
}

export async function updateGroup(group: IReformForm): Promise<IReform | null> {
    try {
        const token = getUserLocalStorage()?.token;
        const response = await api.put<ApiResponse<IReform>>(`/reforms/${group.id}`, group, {
        headers: { 'Authorization': `Bearer ${token}`, }
        });

        if (response.data.success) return response.data.data;
        return null;
    } catch (error: any) {
      const errorResponse = error?.response?.data as ApiResponse<ErrorResponse>;

      if (errorResponse && errorResponse.error?.message) {
        throw new Error(errorResponse.error?.message); 
      } else {
        throw new Error('Erro desconhecido ao atualizar reforma'); 
      }
    }
}

export async function joinGroup(joinGroup: IJoinGroup): Promise<IReform | null> {
    try {
        const token = getUserLocalStorage()?.token;

        const response = await api.post<ApiResponse<IReform>>(`/reforms/join`, joinGroup, {
        headers: { 'Authorization': `Bearer ${token}` },
        });

        if (response.data.success) {
        return response.data.data;
        } 
        return null;
    } catch (error: any) {
        const errorResponse = error?.response?.data as ApiResponse<ErrorResponse>;

        if (errorResponse && errorResponse.error?.message) {
          throw new Error(errorResponse.error?.message); 
        } else {
          throw new Error('Erro desconhecido ao entrar no grupo de reforma'); 
        }
    }
}
  
export async function deleteGroup(id: number): Promise<void | null> {
    try {
      const token = getUserLocalStorage()?.token;
      const response = await api.delete<ApiResponse<null>>(`/reforms/${id}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
  
      if (response.data.success) return response.data.data;
      return null;
    } catch (error: any) {
        const errorResponse = error?.response?.data as ApiResponse<ErrorResponse>;
  
        if (errorResponse && errorResponse.error?.message) {
          throw new Error(errorResponse.error?.message); 
        } else {
          throw new Error('Erro desconhecido ao deletar reforma'); 
        }
    }
}

export async function leaveGroup(groupId: number, userId: number): Promise<void | null> {
    try {
      const token = getUserLocalStorage()?.token;
      const response = await api.delete<ApiResponse<null>>(`/reforms/${groupId}/user/${userId}/leave`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
  
      if (response.data.success) return response.data.data;
      return null;
    } catch (error: any) {
        const errorResponse = error?.response?.data as ApiResponse<ErrorResponse>;
  
        if (errorResponse && errorResponse.error?.message) {
          throw new Error(errorResponse.error?.message); 
        } else {
          throw new Error('Erro desconhecido ao sair do grupo de reforma'); 
        }
    }
}

export async function deleteMember(groupId: number, userId: number): Promise<void | null> {
  try {
    const token = getUserLocalStorage()?.token;
    const response = await api.delete<ApiResponse<null>>(`/reforms/${groupId}/user/${userId}/delete`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });

    if (response.data.success) return response.data.data;
    return null;
  } catch (error: any) {
      const errorResponse = error?.response?.data as ApiResponse<ErrorResponse>;

      if (errorResponse && errorResponse.error?.message) {
        throw new Error(errorResponse.error?.message); 
      } else {
        throw new Error('Erro desconhecido ao deletar membro do grupo de reforma'); 
      }
  }
}
  
  