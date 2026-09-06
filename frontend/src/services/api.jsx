const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

async function handleResponse(response) {
  if (response.status === 204) {
    return null;
  }

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    const message =
      data?.error ||
      "Something went wrong while communicating with the server.";

    throw new Error(message);
  }

  return data;
}

export async function getRequests() {
  const response = await fetch(`${API_BASE_URL}/requests`);

  return handleResponse(response);
}

export async function getRequestById(id) {
  const response = await fetch(`${API_BASE_URL}/requests/${id}`);

  return handleResponse(response);
}

export async function createRequest(requestData) {
  const response = await fetch(`${API_BASE_URL}/requests`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestData),
  });

  return handleResponse(response);
}

export async function updateRequest(id, updateData) {
  const response = await fetch(`${API_BASE_URL}/requests/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updateData),
  });

  return handleResponse(response);
}

export async function deleteRequest(id) {
  const response = await fetch(`${API_BASE_URL}/requests/${id}`, {
    method: "DELETE",
  });

  return handleResponse(response);
}
