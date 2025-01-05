import { api } from '@/services/api';
import { getUserLocalStorage } from '@/context/AuthProvider/util';
import { IGroup, IGroupForm, IJoinGroup } from '@/interfaces/IGroup';
import { ErrorResponse, ApiResponse } from '@/interfaces/IResponse';

export async function getAllGroupsByUser(): Promise<IGroup[] | null> {
    try {
      const token = getUserLocalStorage()?.token;
      const id = getUserLocalStorage()?.id;
      const response = await api.get<ApiResponse<IGroup[]>>(`/groups/user/${id}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
  
      if (response.data.success) return response.data.data;
      return null;
    } catch (error: any) {
      const errorResponse = error?.response?.data as ApiResponse<ErrorResponse>;

        if (errorResponse && errorResponse.error?.message) {
          throw new Error(errorResponse.error?.message); 
        } else {
          throw new Error('Erro desconhecido ao entrar no grupo'); 
        }
    }
}
  
export async function getGroupById(id: number): Promise<IGroup | null> {
    try {
        const token = getUserLocalStorage()?.token;
        const response = await api.get<ApiResponse<IGroup>>(`/groups/${id}`, {
        headers: { 'Authorization': `Bearer ${token}` }
        });

        if (response.data.success) return response.data.data;
        return null;
    } catch (error: any) {
      const errorResponse = error?.response?.data as ApiResponse<ErrorResponse>;

      if (errorResponse && errorResponse.error?.message) {
        throw new Error(errorResponse.error?.message); 
      } else {
        throw new Error('Erro desconhecido ao buscar o grupo'); 
      }
    }
}


export async function createGroup(group: IGroupForm): Promise<IGroup | null> {
    try {
        const token = getUserLocalStorage()?.token;
        const response = await api.post<ApiResponse<IGroup>>(`/groups`, group, {
        headers: { 'Authorization': `Bearer ${token}` }
        });

        if (response.data.success) return response.data.data;
        return null;
    } catch (error: any) {
      const errorResponse = error?.response?.data as ApiResponse<ErrorResponse>;

      if (errorResponse && errorResponse.error?.message) {
        throw new Error(errorResponse.error?.message); 
      } else {
        throw new Error('Erro desconhecido ao criar grupo'); 
      }
    }
}

export async function updateGroup(group: IGroupForm): Promise<IGroup | null> {
    try {
        const token = getUserLocalStorage()?.token;
        const response = await api.put<ApiResponse<IGroup>>(`/groups/${group.id}`, group, {
        headers: { 'Authorization': `Bearer ${token}`, }
        });

        if (response.data.success) return response.data.data;
        return null;
    } catch (error: any) {
      const errorResponse = error?.response?.data as ApiResponse<ErrorResponse>;

      if (errorResponse && errorResponse.error?.message) {
        throw new Error(errorResponse.error?.message); 
      } else {
        throw new Error('Erro desconhecido ao atualizar no grupo'); 
      }
    }
}

export async function joinGroup(joinGroup: IJoinGroup): Promise<IGroup | null> {
    try {
        const token = getUserLocalStorage()?.token;

        const response = await api.post<ApiResponse<IGroup>>(`/groups/join`, joinGroup, {
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
          throw new Error('Erro desconhecido ao entrar no grupo'); 
        }
    }
}
  
export async function deleteGroup(id: number): Promise<void | null> {
    try {
      const token = getUserLocalStorage()?.token;
      const response = await api.delete<ApiResponse<null>>(`/groups/${id}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
  
      if (response.data.success) return response.data.data;
      return null;
    } catch (error: any) {
        const errorResponse = error?.response?.data as ApiResponse<ErrorResponse>;
  
        if (errorResponse && errorResponse.error?.message) {
          throw new Error(errorResponse.error?.message); 
        } else {
          throw new Error('Erro desconhecido ao deletar grupo'); 
        }
    }
}

export async function leaveGroup(groupId: number, userId: number): Promise<void | null> {
    try {
      const token = getUserLocalStorage()?.token;
      const response = await api.delete<ApiResponse<null>>(`/groups/${groupId}/user/${userId}/leave`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
  
      if (response.data.success) return response.data.data;
      return null;
    } catch (error: any) {
        const errorResponse = error?.response?.data as ApiResponse<ErrorResponse>;
  
        if (errorResponse && errorResponse.error?.message) {
          throw new Error(errorResponse.error?.message); 
        } else {
          throw new Error('Erro desconhecido ao sair do grupo'); 
        }
    }
}

export async function deleteMember(groupId: number, userId: number): Promise<void | null> {
  try {
    const token = getUserLocalStorage()?.token;
    const response = await api.delete<ApiResponse<null>>(`/groups/${groupId}/user/${userId}/delete`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });

    if (response.data.success) return response.data.data;
    return null;
  } catch (error: any) {
      const errorResponse = error?.response?.data as ApiResponse<ErrorResponse>;

      if (errorResponse && errorResponse.error?.message) {
        throw new Error(errorResponse.error?.message); 
      } else {
        throw new Error('Erro desconhecido ao deletar membro do grupo'); 
      }
  }
}
  
  