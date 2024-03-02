export async function fetchPlans() {
  const response = await fetch("http://localhost:3000/plans", {
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
