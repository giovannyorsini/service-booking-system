import { useEffect } from "react";
import { Link } from "react-router-dom";

import RequestStats from "../../components/requests/RequestStats/RequestStats";
import RequestList from "../../components/requests/RequestList/RequestList";
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
    <div className="space-y-8">
      <section>
        <div className="flex flex-col gap-5 @container sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-medium text-slate-500">Overview</p>

            <h1 className="mt-2 text-[clamp(1.875rem,5vw,3rem)] font-semibold leading-tight tracking-tight text-slate-950">
              Service requests
            </h1>

            <p className="mt-3 max-w-xl text-sm leading-6 text-slate-600 sm:text-base">
              Manage and track your service requests from one place.
            </p>
          </div>

          <Link
            to="/requests/new"
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
            New request
          </Link>
        </div>
      </section>

      <section>
        <RequestStats total={total} pending={pending} completed={completed} />
      </section>

      <section className="space-y-5">
        <div>
          <h2 className="text-lg font-semibold tracking-tight text-slate-950">
            Recent requests
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            View and manage your latest service requests.
          </p>
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
