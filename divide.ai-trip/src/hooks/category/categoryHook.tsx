import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteCategory, getAllCategories, createCategory, updateCategory, getAllCategoriesByUser } from "@/services/CategoryService";

export function useCategoryData() {
    const query = useQuery({
        queryFn:  getAllCategories,
        queryKey: ["categories-data"],
    });

    return query;
}

export function useCategoryMutate() {
    const queryClient = useQueryClient();
    const mutate = useMutation({
        mutationFn:  createCategory,
        onSuccess: () => {  
            queryClient.invalidateQueries({ queryKey: ['categories-data-by-user'] });
        }
    });

    return mutate;
}
export function useCategoryDataByUser() {
    const query = useQuery({
        queryFn: () => getAllCategoriesByUser(),
        queryKey: ["categories-data-by-user"],
    });

    return query;
}

export function useCategoryUpdate() {
    const queryClient = useQueryClient();
    const mutate = useMutation({
        mutationFn:  updateCategory,
        onSuccess: () => {  
            queryClient.invalidateQueries({ queryKey: ['categories-data-by-user'] });
        }
    });

    return mutate;
}

export function useCategoryDelete() {
    const queryClient = useQueryClient();
    const mutate = useMutation({
        mutationFn:  deleteCategory,
        onSuccess: () => {  
            queryClient.invalidateQueries({ queryKey: ['categories-data-by-user'] });
        }
    });

    return mutate;
}