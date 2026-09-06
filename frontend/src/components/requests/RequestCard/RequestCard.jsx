import { Link } from "react-router-dom";

import RequestStatus from "../RequestStatus/RequestStatus";
import { formatServiceType } from "../../../utils/formatters";

function RequestCard({ request }) {
  return (
    <article
      className="
        @container
        group
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-5
        shadow-sm
        transition
        duration-200
        ease-out
        hover:-translate-y-0.5
        hover:shadow-md
      "
    >
      <div className="@sm:flex @sm:items-start @sm:justify-between">
        <div className="min-w-0">
          <h3 className="truncate text-base font-semibold tracking-tight text-slate-950">
            {request.name}
          </h3>

          <p className="mt-1 truncate text-sm text-slate-500">
            {request.address}
          </p>
        </div>

        <div className="mt-3 @sm:mt-0">
          <RequestStatus status={request.status} />
        </div>
      </div>

      <div className="mt-5">
        <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
          Service
        </p>

        <p className="mt-1 text-sm font-medium text-slate-700">
          {formatServiceType(request.serviceType)}
        </p>
      </div>

      <div className="mt-5 border-t border-slate-100 pt-4">
        <Link
          to={`/requests/${request.id}`}
          className="
            inline-flex
            items-center
            text-sm
            font-medium
            text-slate-700
            transition-colors
            duration-200
            hover:text-slate-950
          "
        >
          View request
          <span
            aria-hidden="true"
            className="
              ml-1
              transition-transform
              duration-200
              group-hover:translate-x-0.5
            "
          >
            →
          </span>
        </Link>
      </div>
    </article>
  );
}

export default RequestCard;
