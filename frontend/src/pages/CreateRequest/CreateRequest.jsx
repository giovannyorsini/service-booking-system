import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import RequestForm from "../../components/requests/RequestForm/RequestForm";
import useRequests from "../../hooks/useRequests";

function CreateRequest() {
  const navigate = useNavigate();

  const { addRequest, isSubmitting, error } = useRequests();

  const [success, setSuccess] = useState(false);

  async function handleCreateRequest(requestData) {
    setSuccess(false);

    try {
      const createdRequest = await addRequest(requestData);

      setSuccess(true);

      setTimeout(() => {
        navigate(`/requests/${createdRequest.id}`);
      }, 700);
    } catch {
      setSuccess(false);
    }
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

        <div className="mt-6">
          <p className="text-sm font-medium text-slate-500">New request</p>

          <h1 className="mt-2 text-[clamp(1.875rem,5vw,2.75rem)] font-semibold leading-tight tracking-tight text-slate-950">
            Create a service request
          </h1>

          <p className="mt-3 max-w-xl text-sm leading-6 text-slate-600 sm:text-base">
            Add the essential customer and service information to create a new
            request.
          </p>
        </div>
      </section>

      {error && (
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
            We couldn't create the request.
          </p>

          <p className="mt-1 text-sm text-rose-700">{error}</p>
        </div>
      )}

      {success && (
        <div
          role="status"
          className="
            rounded-2xl
            border
            border-emerald-200
            bg-emerald-50
            px-5
            py-4
            transition
            duration-300
          "
        >
          <p className="text-sm font-medium text-emerald-900">
            Request created successfully.
          </p>

          <p className="mt-1 text-sm text-emerald-700">
            Opening the request details...
          </p>
        </div>
      )}

      <RequestForm onSubmit={handleCreateRequest} isSubmitting={isSubmitting} />
    </div>
  );
}

export default CreateRequest;
