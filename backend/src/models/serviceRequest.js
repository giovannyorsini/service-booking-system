import { randomUUID } from "node:crypto";

export class ServiceRequest {
  constructor(name, address, serviceType) {
    this.id = randomUUID();
    this.name = name;
    this.address = address;
    this.serviceType = serviceType;
    this.status = "pending";
  }

  update(updates = {}) {
    if ("name" in updates) {
      this.name = updates.name;
    }

    if ("address" in updates) {
      this.address = updates.address;
    }

    if ("serviceType" in updates) {
      this.serviceType = updates.serviceType;
    }

    if ("status" in updates) {
      this.status = updates.status;
    }

    return this;
  }

  updateStatus(newStatus) {
    return this.update({
      status: newStatus,
    });
  }
}
