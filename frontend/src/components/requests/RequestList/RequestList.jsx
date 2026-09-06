import RequestCard from "../RequestCard/RequestCard";
import RequestEmptyState from "../RequestEmptyState/RequestEmptyState";

function RequestList({ requests, isLoading, error, onRetry }) {
  if (isLoading) {
    return (
      <div
        className="@container"
        aria-label="Loading requests"
        aria-live="polite"
      >
        <div className="grid grid-cols-1 gap-4 @lg:grid-cols-2">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="animate-pulse rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1 space-y-3">
                  <div className="h-4 w-32 rounded-full bg-slate-200" />
                  <div className="h-3 w-48 max-w-full rounded-full bg-slate-100" />
                </div>
                <div className="h-6 w-20 shrink-0 rounded-full bg-slate-100" />
              </div>

              <div className="mt-6 border-t border-slate-100 pt-4">
                <div className="h-2.5 w-14 rounded-full bg-slate-100" />
                <div className="mt-2 h-3 w-36 rounded-full bg-slate-100" />
              </div>

              <div className="mt-5 border-t border-slate-100 pt-4">
                <div className="h-3 w-24 rounded-full bg-slate-100" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        role="alert"
        className="animate-fade-in rounded-2xl border border-rose-200 bg-rose-50 px-6 py-12 text-center"
      >
        <div className="mx-auto grid size-11 place-items-center rounded-2xl bg-white text-rose-600 shadow-sm ring-1 ring-rose-200">
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            className="size-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 8v4.5M12 16.5h.01"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.3 4.5 3.9 16a2 2 0 0 0 1.75 3h12.7a2 2 0 0 0 1.75-3L13.7 4.5a2 2 0 0 0-3.4 0Z"
            />
          </svg>
        </div>

        <h3 className="mt-4 text-base font-semibold text-rose-950">
          We couldn't load your requests.
        </h3>

        <p className="mt-2 text-sm leading-6 text-rose-700">{error}</p>

        <button
          type="button"
          onClick={onRetry}
          className="mt-5 inline-flex items-center justify-center rounded-xl bg-rose-950 px-4 py-2.5 text-sm font-medium text-white transition duration-200 hover:bg-rose-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-950"
        >
          Try again
        </button>
      </div>
    );
  }

  if (requests.length === 0) {
    return <RequestEmptyState />;
  }

  return (
    <div className="@container">
      <div className="grid grid-cols-1 gap-4 @lg:grid-cols-2">
        {requests.map((request, index) => (
          <RequestCard key={request.id} request={request} index={index} />
        ))}
      </div>
    </div>
  );
}

export default RequestList;
