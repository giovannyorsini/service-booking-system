// In-memory store used for local development/demo purposes.
// Can be replaced with a database-backed repository
const requests = [];

export const getAllRequests = () => {
  return [...requests];
};

export const findRequestById = (id) => {
  return requests.find((request) => String(request.id) === String(id));
};

export const addRequest = (request) => {
  requests.push(request);

  return request;
};

export const updateRequest = (id, updates) => {
  const request = findRequestById(id);

  if (!request) {
    return null;
  }

  request.update(updates);

  return request;
};

export const deleteRequest = (id) => {
  const index = requests.findIndex(
    (request) => String(request.id) === String(id),
  );

  if (index === -1) {
    return null;
  }

  const [deletedRequest] = requests.splice(index, 1);

  return deletedRequest;
};
