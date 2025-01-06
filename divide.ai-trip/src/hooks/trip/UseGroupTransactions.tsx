import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteGroupTransaction, createGroupTransaction, getAllGroupTransactions, getGroupTransactionById, updateGroupTransaction } from "@/services/GroupTransactionsService";

export function useGroupTransactions(groupId: number) {
  if (!groupId) throw new Error("groupId is required");

  const query = useQuery({
    queryFn: () => getAllGroupTransactions(groupId),
    queryKey: ["group-transactions", groupId],
  });

  return query;
}

export function useGroupTransactionDelete(groupId: number) {
  const queryClient = useQueryClient();
  const mutate = useMutation({
    mutationFn: deleteGroupTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['group-transactions', groupId] });
    }
  });

  return mutate;
}


export function useGroupTransactionMutate() {
  const queryClient = useQueryClient();
  const mutate = useMutation({
      mutationFn:  createGroupTransaction,
      onSuccess: () => {  
          queryClient.invalidateQueries({ queryKey: ['group-transactions'] });
      }
  });

  return mutate;
}

export function useGroupTransactionDataById(id: number) {
  const query = useQuery({
      queryFn: () => getGroupTransactionById(id),
      queryKey: ["group-transaction-by-id"],
  });

  return query;
}

export function useGroupTransactionUpdate() {
  const queryClient = useQueryClient();
  const mutate = useMutation({
      mutationFn:  updateGroupTransaction,
      onSuccess: () => {  
          queryClient.invalidateQueries({ queryKey: ['group-transactions'] });
      }
  });

  return mutate;
}
