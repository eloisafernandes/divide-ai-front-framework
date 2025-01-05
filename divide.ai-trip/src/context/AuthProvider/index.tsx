import { jwtDecode } from "jwt-decode";
import { createContext, useState } from "react";
import { IUser } from "@/interfaces/IUser";
import { IAuthProvider, IContext, IJwtPayload } from "@/context/AuthProvider/types";
import { setUserLocalStorage, getUserLocalStorage, deleteUserLocalStorage } from "@/context/AuthProvider/util";
import { LoginRequest } from "@/services/LoginService";

// Creation of an authentication context with empty initial values.
export const AuthContext = createContext<IContext>({} as IContext);

/**
 * Component that provides the authentication context for the application.
 * @param children The JSX elements to be wrapped by the authentication provider.
 */
export function AuthProvider({ children }: IAuthProvider) {
  const [user, setUser] = useState<IUser>(() => {
    const user = getUserLocalStorage();
    return user ?? {} as IUser;
  });

  /**
   * Asynchronous function that performs user authentication.
   * @param email The user's email.
   * @param password The user's password.
   */
  async function authenticate(email: string, password: string) {
    const response = await LoginRequest({ email, password });

    const decodedToken = jwtDecode<IJwtPayload>(response.token);
    const payload = { token: response.token, id: decodedToken.id, email: decodedToken.sub };

    setUser(payload);
    setUserLocalStorage(payload);
  }

  /**
   * Function that logs out the user.
   */
  function logout() {
    setUser({} as IUser);
    setUserLocalStorage(null);
    deleteUserLocalStorage();
  }

  return (
    <AuthContext.Provider value={{ ...user, authenticate, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
