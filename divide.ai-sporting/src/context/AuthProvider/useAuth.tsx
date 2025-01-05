import { useContext } from "react";
import { AuthContext } from "@/context/AuthProvider";

/**
 * A hook that allows access to the authentication context.
 * @returns The authentication context obtained from AuthContext. This allows components using this hook to access the authentication state and related functionalities.
 */
export function useAuth() {
  const context = useContext(AuthContext);
  return context;
}
