import * as requestService from "../services/requestService.js";

export const getRequests = (req, res) => {
  const requests = requestService.getAllRequests();

  res.status(200).json(requests);
};

export const getRequestById = (req, res) => {
  const { id } = req.params;

  const request = requestService.getRequestById(id);

  res.status(200).json(request);
};

export const createRequest = (req, res) => {
  const newRequest = requestService.createRequest(req.body);

  res.status(201).json(newRequest);
};

export const updateRequest = (req, res) => {
  const { id } = req.params;

  const updatedRequest = requestService.updateRequest(id, req.body);

  res.status(200).json(updatedRequest);
};

export const deleteRequest = (req, res) => {
  const { id } = req.params;

  requestService.deleteRequest(id);

  res.status(204).send();
};
