import { createChat, getPredictionByUserAndGroupId } from "@/services/AIPredictionService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
  
export function useAIPredictionData(groupId: number) {
    const query = useQuery({
        queryFn: () => getPredictionByUserAndGroupId(groupId),
        queryKey: ["prediction-data", groupId],
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
