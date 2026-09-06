export const ALLOWED_STATUSES = Object.freeze(["pending", "completed"]);

export const PATCHABLE_FIELDS = Object.freeze([
  "name",
  "address",
  "serviceType",
  "status",
]);

export const isNonEmptyString = (value) => {
  return typeof value === "string" && value.trim().length > 0;
};

export const isValidStatus = (status) => {
  return typeof status === "string" && ALLOWED_STATUSES.includes(status);
};

export const getUnknownFields = (payload, allowedFields) => {
  return Object.keys(payload).filter((field) => !allowedFields.includes(field));
};
