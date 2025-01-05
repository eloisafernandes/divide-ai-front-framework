import { IUser } from '@/interfaces/IUser';

/**
 * Interface that extends the IUser interface and adds methods and properties related to the authentication context.
 */
export interface IContext extends IUser {
  /**
   * Asynchronous function that authenticates the user based on the provided email and password.
   * @param email The user's email.
   * @param password The user's password.
   * @returns A Promise that resolves when the authentication is successful and rejects when it is not.
   */
  authenticate: (email: string, password: string) => Promise<void>;

  /**
   * Function that logs out the user, ending their session.
   */
  logout: () => void;
}

export interface IAuthProvider {
  /**
   * The JSX elements (React) that will be wrapped by the authentication provider.
   */
  children: JSX.Element;
}

export interface IJwtPayload {
  id: number;
  sub: string;
  iat: number;
  exp: number;
}