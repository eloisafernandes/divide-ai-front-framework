import { createChat, getPredictionByUser } from "@/services/AIPredictionService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
  
export function useAIPredictionData() {
    const query = useQuery({
        queryFn:  getPredictionByUser,
        queryKey: ["prediction-data"],
    });

    return query;
}

export function useAIPredictionMutate() {
    const queryClient = useQueryClient();
    const mutate = useMutation({
        mutationFn:  createChat,
        onSuccess: () => {  
            queryClient.invalidateQueries({ queryKey: ['prediction-data'] });
        }
    });

    return mutate;
}
