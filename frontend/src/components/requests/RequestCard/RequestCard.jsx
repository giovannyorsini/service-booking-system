import { Link } from "react-router-dom";

import RequestStatus from "../RequestStatus/RequestStatus";
import { formatServiceType } from "../../../utils/formatters";

function RequestCard({ request, index = 0 }) {
  return (
    <Link
      to={`/requests/${request.id}`}
      className="group block rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-slate-900"
      style={{ animationDelay: `${index * 55}ms` }}
    >
      <article className="@container animate-fade-up rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 ease-out group-hover:-translate-y-0.5 group-hover:border-slate-300 group-hover:shadow-md">
        <div className="flex flex-col gap-4 @sm:flex-row @sm:items-start @sm:justify-between">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="truncate text-base font-semibold tracking-tight text-slate-950">
                {request.name}
              </h3>
            </div>

            <p className="mt-1 truncate text-sm text-slate-500">
              {request.address}
            </p>
          </div>

          <RequestStatus status={request.status} />
        </div>

        <div className="mt-6 border-t border-slate-100 pt-4">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-slate-400">
            Service
          </p>

          <p className="mt-1 text-sm font-medium text-slate-700">
            {formatServiceType(request.serviceType)}
          </p>
        </div>

        <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
          <span className="text-xs text-slate-400">Request</span>

          <span className="inline-flex items-center gap-1 text-sm font-medium text-slate-700 transition duration-200 group-hover:text-slate-950">
            View details
            <span
              aria-hidden="true"
              className="transition-transform duration-200 group-hover:translate-x-1"
            >
              →
            </span>
          </span>
        </div>
      </article>
    </Link>
  );
}

export default RequestCard;
