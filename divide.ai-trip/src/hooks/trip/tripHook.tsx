import { createTrip, deleteTrip, deleteMember, getAllTripsByUser, getTripById, joinTrip, leaveTrip, updateTrip } from "@/services/TripService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useTripDataByUser() {
    const query = useQuery({
        queryFn: () => getAllTripsByUser(),
        queryKey: ["groups-data-by-user"],
    });

    return query;
}

export function useTripMutate() {
    const queryClient = useQueryClient();
    const mutate = useMutation({
        mutationFn:  createTrip,
        onSuccess: () => {  
            queryClient.invalidateQueries({ queryKey: ['groups-data-by-user'] });
        }
    });

    return mutate;
}

export function useTripDataById(id: number) {
    const query = useQuery({
        queryFn: () => getTripById(id),
        queryKey: ["groups-data-by-id"],
    });

    return query;
}

export function useTripUpdate() {
    const queryClient = useQueryClient();
    const mutate = useMutation({
        mutationFn:  updateTrip,
        onSuccess: () => {  
            queryClient.invalidateQueries({ queryKey: ['groups-data-by-user'] });
        }
    });

    return mutate;
}

export function useJoinTrip() {
    const queryClient = useQueryClient();
    const mutate = useMutation({
        mutationFn:  joinTrip,
        onSuccess: () => {  
            queryClient.invalidateQueries({ queryKey: ['groups-data-by-user'] });
        }
    });

    return mutate;
}

export function useTripDelete() {
    const queryClient = useQueryClient();
    const mutate = useMutation({
        mutationFn:  deleteTrip,
        onSuccess: () => {  
            queryClient.invalidateQueries({ queryKey: ['groups-data-by-user'] });
        }
    });

    return mutate;
}

export function useTripLeave(groupId: number, userId: number) {
    const queryClient = useQueryClient();
    
    const mutate = useMutation({
      mutationFn: () => leaveTrip(groupId, userId), 
      onSuccess: () => {  
        queryClient.invalidateQueries({ queryKey: ['groups-data-by-user'] });
      }
    });
  
    return mutate;
}
  

export function useTripDeleteMember(groupId: number, userId: number) {
    const queryClient = useQueryClient();
    
    const mutate = useMutation({
      mutationFn: () => deleteMember(groupId, userId), 
      onSuccess: () => {  
        queryClient.invalidateQueries({ queryKey: ['groups-data-by-id'] });
      }
    });
  
    return mutate;
}