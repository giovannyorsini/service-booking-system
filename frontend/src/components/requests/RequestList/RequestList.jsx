import RequestCard from "../RequestCard/RequestCard";
import RequestEmptyState from "../RequestEmptyState/RequestEmptyState";

function RequestList({ requests, isLoading, error, onRetry }) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-4" aria-label="Loading requests">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="
              animate-pulse
              rounded-2xl
              border
              border-slate-200
              bg-white
              p-5
            "
          >
            <div className="h-4 w-32 rounded bg-slate-200" />

            <div className="mt-3 h-3 w-48 rounded bg-slate-100" />

            <div className="mt-6 h-3 w-20 rounded bg-slate-100" />

            <div className="mt-2 h-3 w-40 rounded bg-slate-100" />

            <div className="mt-5 border-t border-slate-100 pt-4">
              <div className="h-3 w-24 rounded bg-slate-100" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div
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
        <h3 className="text-base font-semibold text-rose-950">
          We couldn't load your requests.
        </h3>

        <p className="mt-2 text-sm text-rose-700">{error}</p>

        <button
          type="button"
          onClick={onRetry}
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
    );
  }

  if (requests.length === 0) {
    return <RequestEmptyState />;
  }

  return (
    <div className="grid grid-cols-1 gap-4">
      {requests.map((request) => (
        <RequestCard key={request.id} request={request} />
      ))}
    </div>
  );
}

export default RequestList;
