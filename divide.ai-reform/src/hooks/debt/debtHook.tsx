import {getAllDebtsByGroupTransaction, putPaidAt} from "@/services/DebtService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useDebtDataGroupTransaction(groupTransactionId: number) {
    const query = useQuery({
        queryFn: () => getAllDebtsByGroupTransaction(groupTransactionId),
        queryKey: ["groups-data-by-debt"],
    });

    return query;
}

// export function useGroupMutate() {
//     const queryClient = useQueryClient();
//     const mutate = useMutation({
//         mutationFn:  createGroup,
//         onSuccess: () => {  
//             queryClient.invalidateQueries({ queryKey: ['groups-data-by-user'] });
//         }
//     });

//     return mutate;
// }

// export function useGroupDataById(id: number) {
//     const query = useQuery({
//         queryFn: () => getGroupById(id),
//         queryKey: ["groups-data-by-id"],
//     });

//     return query;
// }

export function usePaidAtUpdate({ id, date }: { id: number | null; date: Date | null }) {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: () => {
        //if (!id || !date) return Promise.reject(new Error("ID and date are required"));
        //const formattedDate = date.toISOString(); // Format date if provided
        return putPaidAt(id, date);
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['groups-data-by-debt'] });
      },
    });
}

// export function useJoinGroup() {
//     const queryClient = useQueryClient();
//     const mutate = useMutation({
//         mutationFn:  joinGroup,
//         onSuccess: () => {  
//             queryClient.invalidateQueries({ queryKey: ['groups-data-by-user'] });
//         }
//     });

//     return mutate;
// }

// export function useGroupDelete() {
//     const queryClient = useQueryClient();
//     const mutate = useMutation({
//         mutationFn:  deleteGroup,
//         onSuccess: () => {  
//             queryClient.invalidateQueries({ queryKey: ['groups-data-by-user'] });
//         }
//     });

//     return mutate;
// }

// export function useGroupLeave(groupId: number, userId: number) {
//     const queryClient = useQueryClient();
    
//     const mutate = useMutation({
//       mutationFn: () => leaveGroup(groupId, userId), 
//       onSuccess: () => {  
//         queryClient.invalidateQueries({ queryKey: ['groups-data-by-user'] });
//       }
//     });
  
//     return mutate;
// }
  

// export function useGroupDeleteMember(groupId: number, userId: number) {
//     const queryClient = useQueryClient();
    
//     const mutate = useMutation({
//       mutationFn: () => deleteMember(groupId, userId), 
//       onSuccess: () => {  
//         queryClient.invalidateQueries({ queryKey: ['groups-data-by-id'] });
//       }
//     });
  
//     return mutate;
// }