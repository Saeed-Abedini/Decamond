import { RandomUserResponse } from "@/types/auth";

const API_BASE_URL = "https://randomuser.me/api";

export const fetchRandomUser = async (): Promise<RandomUserResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/?results=1&nat=us`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: RandomUserResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching random user:", error);
    throw new Error("Failed to fetch user data");
  }
};

// Create a promise
export const randomUserPromise = fetchRandomUser();
