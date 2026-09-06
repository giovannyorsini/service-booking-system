import { Link } from "react-router-dom";

function RequestEmptyState() {
  return (
    <div
      className="
        rounded-2xl
        border
        border-dashed
        border-slate-300
        bg-white
        px-6
        py-14
        text-center
      "
    >
      <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-slate-100">
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          className="size-5 text-slate-500"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8 7h8M8 11h5m-9 8 1.8-3.6A2 2 0 0 1 7.6 14H17a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2H7.4A2 2 0 0 1 5 17.9V16a2 2 0 0 1 2-2h.6"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 6.5A2.5 2.5 0 0 0 16.5 4h-9A2.5 2.5 0 0 0 5 6.5v5A2.5 2.5 0 0 0 7.5 14h9a2.5 2.5 0 0 0 2.5-2.5v-5Z"
          />
        </svg>
      </div>

      <h3 className="mt-4 text-base font-semibold tracking-tight text-slate-950">
        No service requests yet
      </h3>

      <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500">
        Create your first service request to start tracking your work.
      </p>

      <Link
        to="/requests/new"
        className="
          mt-6
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
          shadow-sm
          transition
          duration-200
          hover:-translate-y-0.5
          hover:bg-slate-800
        "
      >
        Create request
      </Link>
    </div>
  );
}

export default RequestEmptyState;
