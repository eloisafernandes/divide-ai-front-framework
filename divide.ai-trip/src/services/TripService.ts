import { api } from '@/services/api';
import { getUserLocalStorage } from '@/context/AuthProvider/util';
import { IJoinGroup, ITrip, ITripForm } from '@/interfaces/IGroup';
import { ErrorResponse, ApiResponse } from '@/interfaces/IResponse';

export async function getAllTripsByUser(): Promise<ITrip[] | null> {
    try {
      const token = getUserLocalStorage()?.token;
      const id = getUserLocalStorage()?.id;
      const response = await api.get<ApiResponse<ITrip[]>>(`/trips/user/${id}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
  
      if (response.data.success) return response.data.data;
      return null;
    } catch (error: any) {
      const errorResponse = error?.response?.data as ApiResponse<ErrorResponse>;

        if (errorResponse && errorResponse.error?.message) {
          throw new Error(errorResponse.error?.message); 
        } else {
          throw new Error('Erro desconhecido ao entrar na viagem'); 
        }
    }
}
  
export async function getTripById(id: number): Promise<ITrip | null> {
    try {
        const token = getUserLocalStorage()?.token;
        const response = await api.get<ApiResponse<ITrip>>(`/trips/${id}`, {
        headers: { 'Authorization': `Bearer ${token}` }
        });

        if (response.data.success) return response.data.data;
        return null;
    } catch (error: any) {
      const errorResponse = error?.response?.data as ApiResponse<ErrorResponse>;

      if (errorResponse && errorResponse.error?.message) {
        throw new Error(errorResponse.error?.message); 
      } else {
        throw new Error('Erro desconhecido ao buscar a viagem'); 
      }
    }
}


export async function createTrip(trip: ITripForm): Promise<ITrip | null> {
    try {
        const token = getUserLocalStorage()?.token;
        const response = await api.post<ApiResponse<ITrip>>(`/trips`, trip, {
        headers: { 'Authorization': `Bearer ${token}` }
        });

        if (response.data.success) return response.data.data;
        return null;
    } catch (error: any) {
      const errorResponse = error?.response?.data as ApiResponse<ErrorResponse>;

      if (errorResponse && errorResponse.error?.message) {
        throw new Error(errorResponse.error?.message); 
      } else {
        throw new Error('Erro desconhecido ao criar a viagem'); 
      }
    }
}

export async function updateTrip(trip: ITripForm): Promise<ITrip | null> {
    try {
        const token = getUserLocalStorage()?.token;
        const response = await api.put<ApiResponse<ITrip>>(`/trips/${trip.id}`, trip, {
        headers: { 'Authorization': `Bearer ${token}`, }
        });

        if (response.data.success) return response.data.data;
        return null;
    } catch (error: any) {
      const errorResponse = error?.response?.data as ApiResponse<ErrorResponse>;

      if (errorResponse && errorResponse.error?.message) {
        throw new Error(errorResponse.error?.message); 
      } else {
        throw new Error('Erro desconhecido ao atualizar a viagem'); 
      }
    }
}

export async function joinTrip(joinGroup: IJoinGroup): Promise<ITrip | null> {
    try {
        const token = getUserLocalStorage()?.token;

        const response = await api.post<ApiResponse<ITrip>>(`/trips/join`, joinGroup, {
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
          throw new Error('Erro desconhecido ao entrar no grupo de viagem'); 
        }
    }
}
  
export async function deleteTrip(id: number): Promise<void | null> {
    try {
      const token = getUserLocalStorage()?.token;
      const response = await api.delete<ApiResponse<null>>(`/trips/${id}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
  
      if (response.data.success) return response.data.data;
      return null;
    } catch (error: any) {
        const errorResponse = error?.response?.data as ApiResponse<ErrorResponse>;
  
        if (errorResponse && errorResponse.error?.message) {
          throw new Error(errorResponse.error?.message); 
        } else {
          throw new Error('Erro desconhecido ao deletar viagem'); 
        }
    }
}

export async function leaveTrip(groupId: number, userId: number): Promise<void | null> {
    try {
      const token = getUserLocalStorage()?.token;
      const response = await api.delete<ApiResponse<null>>(`/trips/${groupId}/user/${userId}/leave`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
  
      if (response.data.success) return response.data.data;
      return null;
    } catch (error: any) {
        const errorResponse = error?.response?.data as ApiResponse<ErrorResponse>;
  
        if (errorResponse && errorResponse.error?.message) {
          throw new Error(errorResponse.error?.message); 
        } else {
          throw new Error('Erro desconhecido ao sair do grupo de viagem'); 
        }
    }
}

export async function deleteMember(groupId: number, userId: number): Promise<void | null> {
  try {
    const token = getUserLocalStorage()?.token;
    const response = await api.delete<ApiResponse<null>>(`/trips/${groupId}/user/${userId}/delete`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });

    if (response.data.success) return response.data.data;
    return null;
  } catch (error: any) {
      const errorResponse = error?.response?.data as ApiResponse<ErrorResponse>;

      if (errorResponse && errorResponse.error?.message) {
        throw new Error(errorResponse.error?.message); 
      } else {
        throw new Error('Erro desconhecido ao deletar membro da viagem'); 
      }
  }
}
  
  