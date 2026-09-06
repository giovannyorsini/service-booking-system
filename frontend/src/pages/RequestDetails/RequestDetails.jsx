import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";

import ConfirmDialog from "../../components/ui/ConfirmDialog/ConfirmDialog";
import RequestEditForm from "../../components/requests/RequestEditForm/RequestEditForm";
import RequestStatus from "../../components/requests/RequestStatus/RequestStatus";
import useRequests from "../../hooks/useRequests";
import { formatServiceType } from "../../utils/formatters";

function RequestDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

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
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
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

    setActionError(null);

    try {
      await removeRequest(currentRequest.id);
      navigate("/", { replace: true });
    } catch (err) {
      setActionError(err.message);
      setIsDeleteDialogOpen(false);
    }
  }

  if (isRequestLoading) {
    return (
      <div className="mx-auto max-w-3xl space-y-6">
        <div className="animate-pulse space-y-5">
          <div className="h-4 w-32 rounded-full bg-slate-200" />
          <div className="h-9 w-72 max-w-full rounded-full bg-slate-200" />
          <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
            <div className="space-y-6">
              <div className="h-3 w-20 rounded-full bg-slate-100" />
              <div className="h-4 w-52 rounded-full bg-slate-200" />
              <div className="h-px bg-slate-100" />
              <div className="h-3 w-28 rounded-full bg-slate-100" />
              <div className="h-4 w-72 max-w-full rounded-full bg-slate-200" />
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
          className="rounded-2xl border border-rose-200 bg-rose-50 px-6 py-12 text-center"
        >
          <h1 className="text-base font-semibold text-rose-950">
            We couldn't load this request.
          </h1>
          <p className="mt-2 text-sm leading-6 text-rose-700">{error}</p>
          <button
            type="button"
            onClick={() => fetchRequestById(id)}
            className="mt-5 inline-flex items-center justify-center rounded-xl bg-rose-950 px-4 py-2.5 text-sm font-medium text-white transition duration-200 hover:bg-rose-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-950"
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
        <div className="rounded-2xl border border-slate-200 bg-white px-6 py-12 text-center shadow-sm">
          <h1 className="text-lg font-semibold tracking-tight text-slate-950">
            Request not found
          </h1>
          <p className="mt-2 text-sm leading-6 text-slate-500">
            This service request doesn't exist or is no longer available.
          </p>
          <Link
            to="/"
            className="mt-5 inline-flex items-center justify-center rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-medium text-white transition duration-200 hover:bg-slate-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900"
          >
            Back to dashboard
          </Link>
        </div>
      </div>
    );
  }

  const created = Boolean(location.state?.created);

  return (
    <>
      <div className="mx-auto max-w-3xl space-y-8">
        <section className="animate-fade-up">
          <Link
            to="/"
            className="inline-flex items-center rounded-lg text-sm font-medium text-slate-500 transition duration-200 hover:text-slate-950 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-slate-900"
          >
            <span aria-hidden="true" className="mr-2">
              ←
            </span>
            Back to dashboard
          </Link>

          <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                Request details
              </p>

              <h1 className="mt-3 truncate text-[clamp(2rem,5vw,2.9rem)] font-semibold leading-[1.05] tracking-[-0.035em] text-slate-950">
                {currentRequest.name}
              </h1>

              <p className="mt-2 truncate text-sm text-slate-500">
                Request #{currentRequest.id}
              </p>
            </div>

            <RequestStatus status={currentRequest.status} />
          </div>
        </section>

        {created && (
          <div
            role="status"
            className="animate-fade-in rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4"
          >
            <p className="text-sm font-medium text-emerald-950">
              Request created successfully.
            </p>
            <p className="mt-1 text-sm leading-6 text-emerald-700">
              You can review or edit the request below.
            </p>
          </div>
        )}

        {actionError && (
          <div
            role="alert"
            className="rounded-2xl border border-rose-200 bg-rose-50 px-5 py-4"
          >
            <p className="text-sm font-medium text-rose-950">
              We couldn't complete that action.
            </p>
            <p className="mt-1 text-sm leading-6 text-rose-700">
              {actionError}
            </p>
          </div>
        )}

        {isEditing ? (
          <section className="space-y-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                Edit
              </p>
              <h2 className="mt-1 text-lg font-semibold tracking-tight text-slate-950">
                Update request
              </h2>
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
            <section className="animate-fade-in rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
              <div className="divide-y divide-slate-100">
                <div className="py-4 first:pt-0">
                  <p className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-slate-400">
                    Customer
                  </p>
                  <p className="mt-1 text-sm font-medium text-slate-800">
                    {currentRequest.name}
                  </p>
                </div>

                <div className="py-4">
                  <p className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-slate-400">
                    Service address
                  </p>
                  <p className="mt-1 text-sm font-medium leading-6 text-slate-800">
                    {currentRequest.address}
                  </p>
                </div>

                <div className="py-4">
                  <p className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-slate-400">
                    Service type
                  </p>
                  <p className="mt-1 text-sm font-medium text-slate-800">
                    {formatServiceType(currentRequest.serviceType)}
                  </p>
                </div>

                <div className="py-4 last:pb-0">
                  <p className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-slate-400">
                    Current status
                  </p>
                  <div className="mt-2">
                    <RequestStatus status={currentRequest.status} />
                  </div>
                </div>
              </div>
            </section>

            <section className="rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:p-6">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                    Actions
                  </p>
                  <h2 className="mt-1 text-lg font-semibold tracking-tight text-slate-950">
                    Manage request
                  </h2>
                </div>
                <p className="text-xs text-slate-400">
                  Changes are saved immediately.
                </p>
              </div>

              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={() => {
                    setIsEditing(true);
                    setActionError(null);
                  }}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-slate-950 px-4 py-3 text-sm font-medium text-white shadow-sm transition duration-200 hover:-translate-y-0.5 hover:bg-slate-800 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900 sm:w-auto"
                >
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    className="size-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m15.5 5.5 3 3M6 18l1-4L15.5 5.5a2.12 2.12 0 0 1 3 3L10 17l-4 1Z"
                    />
                  </svg>
                  Edit request
                </button>

                <button
                  type="button"
                  onClick={() => setIsDeleteDialogOpen(true)}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-rose-200 bg-white px-4 py-3 text-sm font-medium text-rose-700 transition duration-200 hover:border-rose-300 hover:bg-rose-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-600 sm:w-auto"
                >
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    className="size-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6.5 7.5h11M9 7.5v10.5h6V7.5M10 4.5h4l1 3H9l1-3Z"
                    />
                  </svg>
                  Delete request
                </button>
              </div>
            </section>
          </>
        )}
      </div>

      <ConfirmDialog
        open={isDeleteDialogOpen}
        title="Delete this request?"
        description="This action permanently removes the request from the current in-memory store. You won't be able to recover it after deletion."
        confirmLabel="Delete request"
        isLoading={isDeleting}
        onConfirm={handleDelete}
        onCancel={() => setIsDeleteDialogOpen(false)}
      />
    </>
  );
}

export default RequestDetails;
