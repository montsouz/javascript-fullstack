export async function getPurchasedPlans() {
  const response = await fetch("http://localhost:3000/purchases", {
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

export async function purchasePlan(planId: number) {
  const response = await fetch("http://localhost:3000/purchases", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({ planId }),
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
}