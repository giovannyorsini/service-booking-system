import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";

import RequestStatus from "../../components/requests/RequestStatus/RequestStatus";
import useRequests from "../../hooks/useRequests";
import { formatServiceType } from "../../utils/formatters";

function RequestDetails() {
  const { id } = useParams();

  const { requests, isLoading, error, fetchRequests, changeRequestStatus } =
    useRequests();

  const [isUpdating, setIsUpdating] = useState(false);
  const [updateError, setUpdateError] = useState(null);

  useEffect(() => {
    fetchRequests();
  }, [fetchRequests]);

  const request = useMemo(
    () =>
      requests.find(
        (currentRequest) => String(currentRequest.id) === String(id),
      ),
    [requests, id],
  );

  async function handleStatusChange() {
    if (!request) {
      return;
    }

    const nextStatus = request.status === "pending" ? "completed" : "pending";

    setIsUpdating(true);
    setUpdateError(null);

    try {
      await changeRequestStatus(request.id, nextStatus);
    } catch (err) {
      setUpdateError(err.message);
    } finally {
      setIsUpdating(false);
    }
  }

  if (isLoading) {
    return (
      <div className="mx-auto max-w-3xl animate-pulse space-y-6">
        <div className="h-4 w-32 rounded bg-slate-200" />
        <div className="h-10 w-72 rounded bg-slate-200" />
        <div className="h-64 rounded-2xl bg-slate-200" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-3xl">
        <div
          role="alert"
          className="
            rounded-2xl
            border
            border-rose-200
            bg-rose-50
            px-6
            py-10
            text-center
          "
        >
          <h1 className="text-base font-semibold text-rose-950">
            We couldn't load this request.
          </h1>

          <p className="mt-2 text-sm text-rose-700">{error}</p>

          <button
            type="button"
            onClick={fetchRequests}
            className="
              mt-5
              rounded-xl
              bg-rose-950
              px-4
              py-2.5
              text-sm
              font-medium
              text-white
              transition
              duration-200
              hover:bg-rose-900
            "
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  if (!request) {
    return (
      <div className="mx-auto max-w-3xl">
        <div
          className="
            rounded-2xl
            border
            border-slate-200
            bg-white
            px-6
            py-12
            text-center
          "
        >
          <h1 className="text-lg font-semibold text-slate-950">
            Request not found
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            This service request may have been removed or does not exist.
          </p>

          <Link
            to="/"
            className="
              mt-5
              inline-flex
              items-center
              justify-center
              rounded-xl
              bg-slate-950
              px-4
              py-2.5
              text-sm
              font-medium
              text-white
            "
          >
            Back to dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <section>
        <Link
          to="/"
          className="
            inline-flex
            items-center
            text-sm
            font-medium
            text-slate-500
            transition
            duration-200
            hover:text-slate-950
          "
        >
          <span aria-hidden="true" className="mr-2">
            ←
          </span>
          Back to dashboard
        </Link>

        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500">
              Request details
            </p>

            <h1 className="mt-2 text-[clamp(1.875rem,5vw,2.75rem)] font-semibold leading-tight tracking-tight text-slate-950">
              {request.name}
            </h1>

            <p className="mt-2 text-sm text-slate-500">Request #{request.id}</p>
          </div>

          <RequestStatus status={request.status} />
        </div>
      </section>

      {updateError && (
        <div
          role="alert"
          className="
            rounded-2xl
            border
            border-rose-200
            bg-rose-50
            px-5
            py-4
          "
        >
          <p className="text-sm text-rose-700">{updateError}</p>
        </div>
      )}

      <section
        className="
          rounded-2xl
          border
          border-slate-200
          bg-white
          p-5
          shadow-sm
          sm:p-7
        "
      >
        <div className="divide-y divide-slate-100">
          <div className="py-4 first:pt-0">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
              Customer
            </p>

            <p className="mt-1 text-sm font-medium text-slate-800">
              {request.name}
            </p>
          </div>

          <div className="py-4">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
              Service address
            </p>

            <p className="mt-1 text-sm font-medium text-slate-800">
              {request.address}
            </p>
          </div>

          <div className="py-4">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
              Service type
            </p>

            <p className="mt-1 text-sm font-medium text-slate-800">
              {formatServiceType(request.serviceType)}
            </p>
          </div>

          <div className="py-4 last:pb-0">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
              Status
            </p>

            <div className="mt-2">
              <RequestStatus status={request.status} />
            </div>
          </div>
        </div>
      </section>

      <section
        className="
          rounded-2xl
          border
          border-slate-200
          bg-slate-50
          p-5
          sm:p-6
        "
      >
        <h2 className="text-base font-semibold tracking-tight text-slate-950">
          Request actions
        </h2>

        <p className="mt-1 text-sm leading-6 text-slate-500">
          Update the current status of this service request.
        </p>

        <button
          type="button"
          onClick={handleStatusChange}
          disabled={isUpdating}
          className="
            mt-5
            inline-flex
            w-full
            items-center
            justify-center
            rounded-xl
            bg-slate-950
            px-4
            py-3
            text-sm
            font-medium
            text-white
            transition
            duration-200
            hover:-translate-y-0.5
            hover:bg-slate-800
            disabled:cursor-not-allowed
            disabled:opacity-60
            sm:w-auto
          "
        >
          {isUpdating
            ? "Updating..."
            : request.status === "pending"
              ? "Mark as completed"
              : "Mark as pending"}
        </button>
      </section>
    </div>
  );
}

export default RequestDetails;
