import { IUser } from "@/interfaces/IUser";

/**
 * Stores user details in localStorage.
 * @param user The user information to be stored. Can be null to remove the user from storage.
 */
export function setUserLocalStorage(user: IUser | null) {
  localStorage.setItem("u", JSON.stringify(user));
}

/**
 * Deletes user details from localStorage.
 */
export function deleteUserLocalStorage() {
  localStorage.removeItem("u");
}

/**
 * Retrieves user information stored in localStorage.
 * @returns The stored user information, or null if no user is stored.
 */
export function getUserLocalStorage() {
  try {
    const json = localStorage.getItem("u");
    if (!json) return null;

    const user: IUser = JSON.parse(json);
    return user ?? null;
  } catch (error) {
    // console.error("Failed to parse user from localStorage", error);
    return null;
  }
}
