import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import RequestForm from "../../components/requests/RequestForm/RequestForm";
import useRequests from "../../hooks/useRequests";

function CreateRequest() {
  const navigate = useNavigate();
  const { addRequest, isSubmitting, error } = useRequests();
  const [submitError, setSubmitError] = useState(null);

  async function handleCreateRequest(requestData) {
    setSubmitError(null);

    try {
      const createdRequest = await addRequest(requestData);

      navigate(`/requests/${createdRequest.id}`, {
        state: { created: true },
      });
    } catch (err) {
      setSubmitError(err.message);
    }
  }

  const displayedError = submitError || error;

  return (
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

        <div className="mt-6">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
            New request
          </p>

          <h1 className="mt-3 text-[clamp(2rem,5vw,2.9rem)] font-semibold leading-[1.05] tracking-[-0.035em] text-slate-950">
            Create a service request
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
            Add the essential customer and service information to create a new
            request.
          </p>
        </div>
      </section>

      {displayedError && (
        <div
          role="alert"
          className="animate-fade-in rounded-2xl border border-rose-200 bg-rose-50 px-5 py-4"
        >
          <p className="text-sm font-medium text-rose-950">
            We couldn't create the request.
          </p>
          <p className="mt-1 text-sm leading-6 text-rose-700">
            {displayedError}
          </p>
        </div>
      )}

      <RequestForm onSubmit={handleCreateRequest} isSubmitting={isSubmitting} />
    </div>
  );
}

export default CreateRequest;
