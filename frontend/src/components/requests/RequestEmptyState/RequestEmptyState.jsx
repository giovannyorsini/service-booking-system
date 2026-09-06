import { Link } from "react-router-dom";

function RequestEmptyState() {
  return (
    <div className="animate-fade-in rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center shadow-sm">
      <div className="mx-auto grid size-12 place-items-center rounded-2xl bg-slate-100 text-slate-500">
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          className="size-5"
        >
          <rect x="4.5" y="4.5" width="15" height="15" rx="2.5" />
          <path strokeLinecap="round" d="M8 9h8M8 12h8M8 15h4" />
        </svg>
      </div>

      <h3 className="mt-5 text-base font-semibold tracking-tight text-slate-950">
        No service requests yet
      </h3>

      <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500">
        Create your first service request to start tracking your work.
      </p>

      <Link
        to="/requests/new"
        className="mt-6 inline-flex items-center justify-center rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition duration-200 hover:-translate-y-0.5 hover:bg-slate-800 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900"
      >
        Create request
      </Link>
    </div>
  );
}

export default RequestEmptyState;
