class ServiceRequest {
  constructor(name, addres, serviceType) {
    this.name = name;
    this.addres = addres;
    this.serviceType = serviceType;
    this.status = "pending";
  }

  updateStatus(newStatus) {
    this.status = newStatus;
  }
}

module.exports = ServiceRequest;
