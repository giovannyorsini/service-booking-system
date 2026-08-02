import * as requestService from "../services/requestService.js";

export const getRequests = (req, res) => {
  const requests = requestService.getAllRequests();
  res.json(requests);
};

export const createRequest = (req, res) => {
  const { name, address, serviceType } = req.body;
  try {
    const newRequest = requestService.createRequest(name, address, serviceType);
    res.status(201).json(newRequest);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateRequestStatus = (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const updated = requestService.updateRequestStatus(id, status);
    res.json(updated);
  } catch (error) {
    const statusCode = error.message === "Request not found" ? 404 : 400;
    res.status(statusCode).json({ error: error.message });
  }
};
