export function formatServiceType(serviceType) {
  if (!serviceType) {
    return "";
  }

  return serviceType
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

export function formatStatus(status) {
  if (!status) {
    return "";
  }

  return status.charAt(0).toUpperCase() + status.slice(1);
}
