import { useMutation } from "@tanstack/react-query";
import { RegisterRequest } from "@/services/LoginService";

/**
 * Hook to perform user login mutation.
 * 
 * @returns {object} - Returns the react-query object to execute the mutation and manage the state.
 * 
 * This hook uses React Query to perform the login mutation using the `authenticate` function from the authentication context.
 * After a successful mutation, it invalidates the login data query to ensure that updated data is fetched.
 */
export function useRegisterMutate() {
  const mutate = useMutation({
    mutationFn: RegisterRequest,
  });

  return mutate;
}