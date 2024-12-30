import axios from "axios";

const API_BASE_URL = "https://your-backend-api.com/api/suppliers";

interface StoreData {
  name: string;
  address: string;
  // Add other store properties here
}

interface ApiResponse {
  data: {
    id: string;
    name: string;
    address: string;
    // Add other response properties here
  };
}

export const createStore = async (
  storeData: StoreData
): Promise<ApiResponse> => {
  try {
    const response = await axios.post<ApiResponse>(
      `${API_BASE_URL}/create-store`,
      storeData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error creating store:", error);
    throw error;
  }
};
