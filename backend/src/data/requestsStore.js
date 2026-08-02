// In-memory store used for local development/demo purposes.
// Replace with a database-backed repository for production usage.
const requests = [];

export const getAllRequests = () => requests;

export const addRequest = (request) => {
  requests.push(request);
  return request;
};

export const findRequestById = (id) => requests.find((r) => r.id == id);

export const updateRequestStatus = (id, newStatus) => {
  const request = findRequestById(id);
  if (request) {
    request.updateStatus(newStatus);
  }
  return request;
};
