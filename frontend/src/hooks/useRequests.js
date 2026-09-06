import { useCallback, useState } from "react";

import {
  createRequest,
  deleteRequest,
  getRequestById,
  getRequests,
  updateRequest,
} from "../services/api";

function useRequests() {
  const [requests, setRequests] = useState([]);
  const [currentRequest, setCurrentRequest] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [isRequestLoading, setIsRequestLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const [error, setError] = useState(null);

  const fetchRequests = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await getRequests();

      setRequests(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchRequestById = useCallback(async (id) => {
    setIsRequestLoading(true);
    setError(null);
    setCurrentRequest(null);

    try {
      const data = await getRequestById(id);

      setCurrentRequest(data);

      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsRequestLoading(false);
    }
  }, []);

  const addRequest = useCallback(async (requestData) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const newRequest = await createRequest(requestData);

      setRequests((currentRequests) => [newRequest, ...currentRequests]);

      return newRequest;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsSubmitting(false);
    }
  }, []);

  const changeRequest = useCallback(async (id, updateData) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const updatedRequest = await updateRequest(id, updateData);

      setRequests((currentRequests) =>
        currentRequests.map((request) =>
          request.id === updatedRequest.id ? updatedRequest : request,
        ),
      );

      setCurrentRequest((currentRequest) =>
        currentRequest?.id === updatedRequest.id
          ? updatedRequest
          : currentRequest,
      );

      return updatedRequest;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsSubmitting(false);
    }
  }, []);

  const changeRequestStatus = useCallback(
    async (id, status) => {
      return changeRequest(id, { status });
    },
    [changeRequest],
  );

  const removeRequest = useCallback(async (id) => {
    setIsDeleting(true);
    setError(null);

    try {
      await deleteRequest(id);

      setRequests((currentRequests) =>
        currentRequests.filter((request) => request.id !== id),
      );

      setCurrentRequest((currentRequest) =>
        currentRequest?.id === id ? null : currentRequest,
      );
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsDeleting(false);
    }
  }, []);

  return {
    requests,
    currentRequest,
    isLoading,
    isRequestLoading,
    isSubmitting,
    isDeleting,
    error,
    fetchRequests,
    fetchRequestById,
    addRequest,
    changeRequest,
    changeRequestStatus,
    removeRequest,
  };
}

export default useRequests;
