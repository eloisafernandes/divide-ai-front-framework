import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteTransacion, getAllTransacions, createTransacion, getTransacionById, updateTransacion, getAllTransacionsByUser, getUserTransacionByMonth, getUserTransacionByCategory } from "@/services/TransacionService";

export function useTransactionData() {
    const query = useQuery({
        queryFn:  getAllTransacions,
        queryKey: ["transacions-data"],
    });

    return query;
}

export function useTransactionMutate() {
    const queryClient = useQueryClient();
    const mutate = useMutation({
        mutationFn:  createTransacion,
        onSuccess: () => {  
            queryClient.invalidateQueries({ queryKey: ['transactions-data-by-user'] });
        }
    });

    return mutate;
}
export function useTransactionDataByUser() {
    const query = useQuery({
        queryFn: () => getAllTransacionsByUser(),
        queryKey: ["transactions-data-by-user"],
    });

    return query;
}

export function useTransactionByMonth() {
    const query = useQuery({
        queryFn:  getUserTransacionByMonth,
        queryKey: ["transactions-by-month"],
    });

    return query;
}

export function useTransactionByCategory() {
    const query = useQuery({
        queryFn:  getUserTransacionByCategory,
        queryKey: ["transactions-by-category"],
    });

    return query;
}

export function useTransactionUpdate() {
    const queryClient = useQueryClient();
    const mutate = useMutation({
        mutationFn:  updateTransacion,
        onSuccess: () => {  
            queryClient.invalidateQueries({ queryKey: ['transactions-data-by-user'] });
        }
    });

    return mutate;
}

export function useTransactionDelete() {
    const queryClient = useQueryClient();
    const mutate = useMutation({
        mutationFn:  deleteTransacion,
        onSuccess: () => {  
            queryClient.invalidateQueries({ queryKey: ['transactions-data-by-user'] });
        }
    });

    return mutate;
}