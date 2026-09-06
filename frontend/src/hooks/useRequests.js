import { useCallback, useState } from "react";

import { createRequest, getRequests, updateRequest } from "../services/api";

function useRequests() {
  const [requests, setRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
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

  const changeRequestStatus = useCallback(async (id, status) => {
    setError(null);

    try {
      const updatedRequest = await updateRequest(id, { status });

      setRequests((currentRequests) =>
        currentRequests.map((request) =>
          request.id === updatedRequest.id ? updatedRequest : request,
        ),
      );

      return updatedRequest;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, []);

  return {
    requests,
    isLoading,
    isSubmitting,
    error,
    fetchRequests,
    addRequest,
    changeRequestStatus,
  };
}

export default useRequests;
