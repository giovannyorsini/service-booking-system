import { useEffect } from "react";
import { Link } from "react-router-dom";

import RequestList from "../../components/requests/RequestList/RequestList";
import RequestStats from "../../components/requests/RequestStats/RequestStats";
import useRequests from "../../hooks/useRequests";

function Dashboard() {
  const { requests, isLoading, error, fetchRequests } = useRequests();

  useEffect(() => {
    fetchRequests();
  }, [fetchRequests]);

  const total = requests.length;
  const pending = requests.filter(
    (request) => request.status === "pending",
  ).length;
  const completed = requests.filter(
    (request) => request.status === "completed",
  ).length;

  return (
    <div className="space-y-10">
      <section className="animate-fade-up">
        <div className="overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-sm">
          <div className="relative px-5 py-7 sm:px-8 sm:py-9 lg:px-10 lg:py-10">
            <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/2 bg-[radial-gradient(circle_at_70%_20%,rgba(148,163,184,0.12),transparent_55%)] lg:block" />

            <div className="relative max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                Overview
              </p>

              <h1 className="mt-3 text-[clamp(2rem,5vw,3.4rem)] font-semibold leading-[1.05] tracking-[-0.04em] text-slate-950">
                Service requests
              </h1>

              <p className="mt-4 max-w-xl text-sm leading-6 text-slate-600 sm:text-base">
                Keep customer requests organized, monitor their status, and
                manage each job from one place.
              </p>
            </div>

            <div className="relative mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                to="/requests/new"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-slate-950 px-4 py-3 text-sm font-medium text-white shadow-sm transition duration-200 hover:-translate-y-0.5 hover:bg-slate-800 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900 sm:w-auto"
              >
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="size-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 5v14M5 12h14"
                  />
                </svg>
                New request
              </Link>

              <span className="text-center text-xs text-slate-400 sm:text-left">
                Manage your active work without losing the details.
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-3">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
              At a glance
            </p>
            <h2 className="mt-1 text-lg font-semibold tracking-tight text-slate-950">
              Request activity
            </h2>
          </div>
        </div>

        <RequestStats total={total} pending={pending} completed={completed} />
      </section>

      <section className="space-y-5">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
              Work queue
            </p>
            <h2 className="mt-1 text-lg font-semibold tracking-tight text-slate-950">
              Recent requests
            </h2>
          </div>

          {requests.length > 0 && (
            <span className="text-sm text-slate-400">
              {requests.length} {requests.length === 1 ? "request" : "requests"}
            </span>
          )}
        </div>

        <RequestList
          requests={requests}
          isLoading={isLoading}
          error={error}
          onRetry={fetchRequests}
        />
      </section>
    </div>
  );
}

export default Dashboard;
