import { api } from '@/services/api';
import { getUserLocalStorage } from '@/context/AuthProvider/util';
import { IGroup, IGroupForm, IJoinGroup, ISporting, ISportingForm } from '@/interfaces/IGroup';
import { ErrorResponse, ApiResponse } from '@/interfaces/IResponse';

export async function getAllGroupsByUser(): Promise<ISporting[] | null> {
    try {
      const token = getUserLocalStorage()?.token;
      const id = getUserLocalStorage()?.id;
      const response = await api.get<ApiResponse<ISporting[]>>(`/sportings/user/${id}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
  
      if (response.data.success) return response.data.data;
      return null;
    } catch (error: any) {
      const errorResponse = error?.response?.data as ApiResponse<ErrorResponse>;

        if (errorResponse && errorResponse.error?.message) {
          throw new Error(errorResponse.error?.message); 
        } else {
          throw new Error('Erro desconhecido ao buscar os eventos'); 
        }
    }
}
  
export async function getGroupById(id: number): Promise<ISporting | null> {
    try {
        const token = getUserLocalStorage()?.token;
        const response = await api.get<ApiResponse<ISporting>>(`/sportings/${id}`, {
        headers: { 'Authorization': `Bearer ${token}` }
        });

        if (response.data.success) return response.data.data;
        return null;
    } catch (error: any) {
      const errorResponse = error?.response?.data as ApiResponse<ErrorResponse>;

      if (errorResponse && errorResponse.error?.message) {
        throw new Error(errorResponse.error?.message); 
      } else {
        throw new Error('Erro desconhecido ao buscar o evento'); 
      }
    }
}


export async function createGroup(group: ISportingForm): Promise<ISporting | null> {
  try {
      const token = getUserLocalStorage()?.token;
      const response = await api.post<ApiResponse<ISporting>>(`/sportings`, group, {
      headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.data.success) return response.data.data;
      return null;
  } catch (error: any) {
    const errorResponse = error?.response?.data as ApiResponse<ErrorResponse>;

    if (errorResponse && errorResponse.error?.message) {
      throw new Error(errorResponse.error?.message); 
    } else {
      throw new Error('Erro desconhecido ao criar evento esportivo'); 
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
      const response = await api.delete<ApiResponse<null>>(`/sportings/${id}`, {
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
      const response = await api.delete<ApiResponse<null>>(`/sportings/${groupId}/user/${userId}/leave`, {
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
    const response = await api.delete<ApiResponse<null>>(`/sportings/${groupId}/user/${userId}/delete`, {
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
  
  