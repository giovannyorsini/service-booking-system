import { ServiceRequest } from "../models/serviceRequest.js";
import * as store from "../data/requestsStore.js";
import { validateFields, isValidStatus } from "../utils/validation.js";

export const getAllRequests = () => store.getAllRequests();

export const createRequest = (name, address, serviceType) => {
  if (!validateFields(name, address, serviceType)) {
    throw new Error("Fields cannot be empty");
  }
  const newRequest = new ServiceRequest(name, address, serviceType);
  return store.addRequest(newRequest);
};

export const updateRequestStatus = (id, status) => {
  if (!status) {
    throw new Error("Status is required");
  }
  if (!isValidStatus(status)) {
    throw new Error("Status not allowed");
  }
  const updated = store.updateRequestStatus(id, status);
  if (!updated) {
    throw new Error("Request not found");
  }
  return updated;
};
