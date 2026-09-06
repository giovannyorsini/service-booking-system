import { ServiceRequest } from "../models/serviceRequest.js";
import * as store from "../data/requestsStore.js";
import {
  isNonEmptyString,
  isValidStatus,
  getUnknownFields,
  PATCHABLE_FIELDS,
} from "../utils/validation.js";
import { AppError } from "../utils/AppError.js";

export const getAllRequests = () => {
  return store.getAllRequests();
};

export const getRequestById = (id) => {
  const request = store.findRequestById(id);

  if (!request) {
    throw new AppError("Request not found", 404);
  }

  return request;
};

export const createRequest = ({ name, address, serviceType }) => {
  if (
    !isNonEmptyString(name) ||
    !isNonEmptyString(address) ||
    !isNonEmptyString(serviceType)
  ) {
    throw new AppError("Name, address, and service type are required", 400);
  }

  const newRequest = new ServiceRequest(
    name.trim(),
    address.trim(),
    serviceType.trim().toLowerCase(),
  );

  return store.addRequest(newRequest);
};

export const updateRequest = (id, updates) => {
  if (!updates || typeof updates !== "object" || Array.isArray(updates)) {
    throw new AppError("Request body must be a valid object", 400);
  }

  const fields = Object.keys(updates);

  if (fields.length === 0) {
    throw new AppError(
      "At least one field is required to update a request",
      400,
    );
  }

  const unknownFields = getUnknownFields(updates, PATCHABLE_FIELDS);

  if (unknownFields.length > 0) {
    throw new AppError(
      `Unsupported field(s): ${unknownFields.join(", ")}`,
      400,
    );
  }

  const normalizedUpdates = {};

  if ("name" in updates) {
    if (!isNonEmptyString(updates.name)) {
      throw new AppError("Name must be a non-empty string", 400);
    }

    normalizedUpdates.name = updates.name.trim();
  }

  if ("address" in updates) {
    if (!isNonEmptyString(updates.address)) {
      throw new AppError("Address must be a non-empty string", 400);
    }

    normalizedUpdates.address = updates.address.trim();
  }

  if ("serviceType" in updates) {
    if (!isNonEmptyString(updates.serviceType)) {
      throw new AppError("Service type must be a non-empty string", 400);
    }

    normalizedUpdates.serviceType = updates.serviceType.trim().toLowerCase();
  }

  if ("status" in updates) {
    if (typeof updates.status !== "string") {
      throw new AppError("Status must be a string", 400);
    }

    const normalizedStatus = updates.status.trim().toLowerCase();

    if (!isValidStatus(normalizedStatus)) {
      throw new AppError("Status not allowed", 400);
    }

    normalizedUpdates.status = normalizedStatus;
  }

  const updatedRequest = store.updateRequest(id, normalizedUpdates);

  if (!updatedRequest) {
    throw new AppError("Request not found", 404);
  }

  return updatedRequest;
};

export const deleteRequest = (id) => {
  const deletedRequest = store.deleteRequest(id);

  if (!deletedRequest) {
    throw new AppError("Request not found", 404);
  }

  return deletedRequest;
};
