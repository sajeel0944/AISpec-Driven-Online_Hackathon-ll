import { UserDetails } from "@/types/chatbot.types";

export default function GetUserData(): UserDetails | null {
  const storedData = localStorage.getItem("user");

  if (storedData) {
    let user_data: UserDetails | null = null;

    if (storedData) {
      try {
        user_data = JSON.parse(storedData);
      } catch (err) {
        console.warn(
          "GetUserData: invalid user_data in localStorage, removing",
          err,
        );
        localStorage.removeItem("user_data");
        user_data = null;
      }
    }

    return user_data || null;
  }

  return null;
}
