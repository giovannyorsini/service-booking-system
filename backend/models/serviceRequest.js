export class ServiceRequest {
  constructor(name, addres, serviceType) {
    // Millisecond timestamp is sufficient for this in-memory prototype.
    // Consider UUIDs to avoid collisions in distributed environments.
    this.id = Date.now();
    this.name = name;
    this.addres = addres;
    this.serviceType = serviceType;
    // New requests are queued as pending by default until triage/assignment.
    this.status = "pending";
  }

  updateStatus(newStatus) {
    // Keep mutations explicit through a method to preserve a clear model API.
    this.status = newStatus;
  }
}
