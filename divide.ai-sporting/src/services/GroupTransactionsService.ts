import { api } from '@/services/api';
import { IGroupTransaction } from '@/interfaces/IGroupTransactions';
import { ErrorResponse, ApiResponse } from '@/interfaces/IResponse';
import { getUserLocalStorage } from '@/context/AuthProvider/util';
import { IGroupTransactionRequest } from '@/interfaces/IGroupTransaction';

export async function getAllGroupTransactions(groupId: number): Promise<IGroupTransaction[] | null> {
  try {
    const token = getUserLocalStorage()?.token; 
    const response = await api.get<ApiResponse<IGroupTransaction[]>>(`/group-transactions/group/${groupId}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    if (response.data.success) {
      console.log("fdp: ", response.data.data);

      return response.data.data;
    }
    return null;
  } catch (error: any) {
    const errorResponse = error?.response?.data as ApiResponse<ErrorResponse>;

    if (errorResponse && errorResponse.error?.message) {
      throw new Error(errorResponse.error.message);
    } else {
      throw new Error('Erro desconhecido ao buscar as transações do grupo');
    }
  }
}

export async function deleteGroupTransaction({ groupId, transactionId }: { groupId: number, transactionId: number }): Promise<String | null> {
  try {
    const token = getUserLocalStorage()?.token;
    const response = await api.delete(`/group-transactions/${groupId}/${transactionId}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });

    if (response.data.success) {
      return response.data.message;
    }
    return null;
  }
  catch (error: any) {
    const errorResponse = error?.response?.data as ApiResponse<ErrorResponse>;

    if (errorResponse && errorResponse.error?.message) {
      throw new Error(errorResponse.error.message);
    } else {
      throw new Error('Erro desconhecido ao deletar a transação');
    }
  }
}


export async function getGroupTransactionById(id: number): Promise<IGroupTransaction | null> {
  try {
      const token = getUserLocalStorage()?.token;
      const response = await api.get<ApiResponse<IGroupTransaction>>(`/group-transactions/${id}`, {
      headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.data.success) return response.data.data;
      return null;
  } catch (error: any) {
    const errorResponse = error?.response?.data as ApiResponse<ErrorResponse>;

    if (errorResponse && errorResponse.error?.message) {
      throw new Error(errorResponse.error?.message); 
    } else {
      throw new Error('Erro desconhecido ao buscar transação de grupo'); 
    }
  }
}

export async function createGroupTransaction(groupTransaction: IGroupTransactionRequest): Promise<IGroupTransaction | null> {
  try {
      const token = getUserLocalStorage()?.token;
      const response = await api.post<ApiResponse<IGroupTransaction>>(`/group-transactions`, groupTransaction, {
      headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.data.success) return response.data.data;
      return null;
  } catch (error: any) {
    const errorResponse = error?.response?.data as ApiResponse<ErrorResponse>;

    if (errorResponse && errorResponse.error?.message) {
      throw new Error(errorResponse.error?.message); 
    } else {
      throw new Error('Erro desconhecido ao criar transação de grupo'); 
    }
  }
}

export async function updateGroupTransaction(groupTransaction: IGroupTransactionRequest): Promise<IGroupTransaction | null> {
  try {
      const token = getUserLocalStorage()?.token;
      const response = await api.put<ApiResponse<IGroupTransaction>>(`/group-transactions/${groupTransaction.id}`, groupTransaction, {
      headers: { 'Authorization': `Bearer ${token}`, }
      });

      if (response.data.success) return response.data.data;
      return null;
  } catch (error: any) {
    const errorResponse = error?.response?.data as ApiResponse<ErrorResponse>;

    if (errorResponse && errorResponse.error?.message) {
      throw new Error(errorResponse.error?.message); 
    } else {
      throw new Error('Erro desconhecido ao atualizar transação de grupo'); 
    }
  }
}