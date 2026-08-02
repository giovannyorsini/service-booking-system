export const validateFields = (name, address, serviceType) => {
  return name?.trim() && address?.trim() && serviceType?.trim();
};

export const isValidStatus = (status) => {
  const allowed = ["pending", "completed"];
  return allowed.includes(status);
};
