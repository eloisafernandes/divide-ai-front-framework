import { api } from '@/services/api';
import { getUserLocalStorage } from '@/context/AuthProvider/util';
import { IDebt } from '@/interfaces/IDebt';
import { ErrorResponse, ApiResponse } from '@/interfaces/IResponse';

export async function getAllDebtsByGroupTransaction(groupTransactionId: number): Promise<IDebt[] | null> {
  try {
    const token = getUserLocalStorage()?.token;
    const response = await api.get<ApiResponse<IDebt[]>>(`/debts/details/${groupTransactionId}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });

    if (response.data.success) return response.data.data;
    return null;
  } catch (error: any) {
    const errorResponse = error?.response?.data as ApiResponse<ErrorResponse>;

    if (errorResponse && errorResponse.error?.message) {
      throw new Error(errorResponse.error?.message);
    } else {
      throw new Error('Erro desconhecido ao tentar recuperar os debitos da transação do grupo');
    }
  }
}

export async function putPaidAt(id: number | null, dataPaidAt: Date | null): Promise<IDebt[] | null> {
  try {
    const token = getUserLocalStorage()?.token;
    console.log(token);
    console.log(id);
    console.log(dataPaidAt);
    const formattedDate = dataPaidAt?.toISOString();
    
    const response = await api.put<ApiResponse<IDebt[]>>(
      `/debts/${id}/paid-at`,
      { paidAt: formattedDate },
      {
        headers: { 'Authorization': `Bearer ${token}` }
      }
    );
    if (response.data.success) return response.data.data;
    return null;
  } catch (error: any) {
    const errorResponse = error?.response?.data as ApiResponse<ErrorResponse>;

    if (errorResponse && errorResponse.error?.message) {
      throw new Error(errorResponse.error?.message);
    } else {
      throw new Error('Erro desconhecido ao tentar recuperar os debitos da transação do grupo');
    }
  }
}