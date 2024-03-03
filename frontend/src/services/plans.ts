import { API_URL } from "../config";

export async function fetchPlans() {
  const response = await fetch(`${API_URL}/plans`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `${localStorage.getItem("token")}`,
    },
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
}
