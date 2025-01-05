import { createGroup, deleteGroup, deleteMember, getAllGroupsByUser, getGroupById, joinGroup, leaveGroup, updateGroup } from "@/services/GroupService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useGroupDataByUser() {
    const query = useQuery({
        queryFn: () => getAllGroupsByUser(),
        queryKey: ["groups-data-by-user"],
    });

    return query;
}

export function useGroupMutate() {
    const queryClient = useQueryClient();
    const mutate = useMutation({
        mutationFn:  createGroup,
        onSuccess: () => {  
            queryClient.invalidateQueries({ queryKey: ['groups-data-by-user'] });
        }
    });

    return mutate;
}

export function useGroupDataById(id: number) {
    const query = useQuery({
        queryFn: () => getGroupById(id),
        queryKey: ["groups-data-by-id"],
    });

    return query;
}

export function useGroupUpdate() {
    const queryClient = useQueryClient();
    const mutate = useMutation({
        mutationFn:  updateGroup,
        onSuccess: () => {  
            queryClient.invalidateQueries({ queryKey: ['groups-data-by-user'] });
        }
    });

    return mutate;
}

export function useJoinGroup() {
    const queryClient = useQueryClient();
    const mutate = useMutation({
        mutationFn:  joinGroup,
        onSuccess: () => {  
            queryClient.invalidateQueries({ queryKey: ['groups-data-by-user'] });
        }
    });

    return mutate;
}

export function useGroupDelete() {
    const queryClient = useQueryClient();
    const mutate = useMutation({
        mutationFn:  deleteGroup,
        onSuccess: () => {  
            queryClient.invalidateQueries({ queryKey: ['groups-data-by-user'] });
        }
    });

    return mutate;
}

export function useGroupLeave(groupId: number, userId: number) {
    const queryClient = useQueryClient();
    
    const mutate = useMutation({
      mutationFn: () => leaveGroup(groupId, userId), 
      onSuccess: () => {  
        queryClient.invalidateQueries({ queryKey: ['groups-data-by-user'] });
      }
    });
  
    return mutate;
}
  

export function useGroupDeleteMember(groupId: number, userId: number) {
    const queryClient = useQueryClient();
    
    const mutate = useMutation({
      mutationFn: () => deleteMember(groupId, userId), 
      onSuccess: () => {  
        queryClient.invalidateQueries({ queryKey: ['groups-data-by-id'] });
      }
    });
  
    return mutate;
}