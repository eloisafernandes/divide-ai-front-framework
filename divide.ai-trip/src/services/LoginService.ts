import { api } from '@/services/api';
import { ILogin, IUserRegister } from '@/interfaces/IUser';
import { ApiResponse } from '@/interfaces/ICategory';
import { User } from '@/types/User';

/**
 * Sends a login request to the server.
 * @param email The user's email for login.
 * @param password The user's password for login.
 * @returns The user information if the login is successful, or null if an error occurs.
 */
export async function LoginRequest(login: ILogin) {
  try {
    const response = await api.post<ApiResponse<any>>('/auth/authenticate', login);

    if (response.data.success) return response.data.data;
    return null;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function RegisterRequest(register: IUserRegister) {
  try {
    const response = await api.post<ApiResponse<User>>('/users/register', register);

    if (response.data.success) return response.data.data;
    return null;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

/**
 * Retrieves the user profile from the server.
 * @returns The user's profile information.
 */
export async function getProfile() {
  const userDataString = localStorage.getItem('u');
  console.log(userDataString)

  if (!userDataString) {
    throw new Error("User data not found in local storage");
  }

  const userData = JSON.parse(userDataString);
  const token = userData.token;

  if (!token) {
    throw new Error("Token not found in user data");
  }

  try {
    const response = await api.get('/profile/', {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
