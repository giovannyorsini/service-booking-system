import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import RequestEditForm from "../../components/requests/RequestEditForm/RequestEditForm";
import RequestStatus from "../../components/requests/RequestStatus/RequestStatus";
import useRequests from "../../hooks/useRequests";
import { formatServiceType } from "../../utils/formatters";

function RequestDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    currentRequest,
    isRequestLoading,
    isSubmitting,
    isDeleting,
    error,
    fetchRequestById,
    changeRequest,
    removeRequest,
  } = useRequests();

  const [isEditing, setIsEditing] = useState(false);
  const [actionError, setActionError] = useState(null);

  useEffect(() => {
    fetchRequestById(id);
  }, [fetchRequestById, id]);

  async function handleUpdate(updatedData) {
    if (!currentRequest) {
      return;
    }

    setActionError(null);

    try {
      await changeRequest(currentRequest.id, updatedData);

      setIsEditing(false);
    } catch (err) {
      setActionError(err.message);
    }
  }

  async function handleDelete() {
    if (!currentRequest) {
      return;
    }

    const confirmed = window.confirm(
      "Are you sure you want to delete this service request?",
    );

    if (!confirmed) {
      return;
    }

    setActionError(null);

    try {
      await removeRequest(currentRequest.id);

      navigate("/");
    } catch (err) {
      setActionError(err.message);
    }
  }

  if (isRequestLoading) {
    return (
      <div className="mx-auto max-w-3xl space-y-6">
        <div className="animate-pulse space-y-4">
          <div className="h-4 w-32 rounded bg-slate-200" />
          <div className="h-10 w-72 rounded bg-slate-200" />

          <div className="rounded-2xl bg-slate-200 p-7">
            <div className="space-y-5">
              <div className="h-4 w-24 rounded bg-slate-300" />
              <div className="h-4 w-48 rounded bg-slate-300" />
              <div className="h-4 w-28 rounded bg-slate-300" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error && !currentRequest) {
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
            onClick={() => fetchRequestById(id)}
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

  if (!currentRequest) {
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
            This service request does not exist.
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
              transition
              duration-200
              hover:bg-slate-800
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
              {currentRequest.name}
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Request #{currentRequest.id}
            </p>
          </div>

          <RequestStatus status={currentRequest.status} />
        </div>
      </section>

      {actionError && (
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
          <p className="text-sm font-medium text-rose-900">
            We couldn't complete that action.
          </p>

          <p className="mt-1 text-sm text-rose-700">{actionError}</p>
        </div>
      )}

      {isEditing ? (
        <section>
          <div className="mb-4">
            <h2 className="text-lg font-semibold tracking-tight text-slate-950">
              Edit request
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Update the request information below.
            </p>
          </div>

          <RequestEditForm
            request={currentRequest}
            onSubmit={handleUpdate}
            onCancel={() => {
              setIsEditing(false);
              setActionError(null);
            }}
            isSubmitting={isSubmitting}
          />
        </section>
      ) : (
        <>
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
                  {currentRequest.name}
                </p>
              </div>

              <div className="py-4">
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  Service address
                </p>

                <p className="mt-1 text-sm font-medium text-slate-800">
                  {currentRequest.address}
                </p>
              </div>

              <div className="py-4">
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  Service type
                </p>

                <p className="mt-1 text-sm font-medium text-slate-800">
                  {formatServiceType(currentRequest.serviceType)}
                </p>
              </div>

              <div className="py-4 last:pb-0">
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  Status
                </p>

                <div className="mt-2">
                  <RequestStatus status={currentRequest.status} />
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
              Manage the information and status of this service request.
            </p>

            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => {
                  setIsEditing(true);
                  setActionError(null);
                }}
                className="
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
                  shadow-sm
                  transition
                  duration-200
                  hover:-translate-y-0.5
                  hover:bg-slate-800
                  sm:w-auto
                "
              >
                Edit request
              </button>

              <button
                type="button"
                onClick={handleDelete}
                disabled={isDeleting}
                className="
                  inline-flex
                  w-full
                  items-center
                  justify-center
                  rounded-xl
                  border
                  border-rose-200
                  bg-white
                  px-4
                  py-3
                  text-sm
                  font-medium
                  text-rose-700
                  transition
                  duration-200
                  hover:border-rose-300
                  hover:bg-rose-50
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                  sm:w-auto
                "
              >
                {isDeleting ? "Deleting..." : "Delete request"}
              </button>
            </div>
          </section>
        </>
      )}
    </div>
  );
}

export default RequestDetails;
