import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getExpenses, createExpense} from "@/services/ExpenseService";

export function useExpense() {
  const query = useQuery({
    queryFn: getExpenses,
    queryKey: ["expnses-data"],
  });

  return query;
}

export function useTransitionMutation() {
  const queryClient = useQueryClient();
  const mutate = useMutation({
    mutationFn: createExpense,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['expnses-data'] });
    },
  });

  return mutate;
}