import { formatStatus } from "../../../utils/formatters";

function RequestStatus({ status }) {
  const statusStyles = {
    pending: "bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-200",
    completed:
      "bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-200",
  };

  const style =
    statusStyles[status] ||
    "bg-slate-100 text-slate-700 ring-1 ring-inset ring-slate-200";

  return (
    <span
      className={`
        inline-flex
        w-fit
        items-center
        rounded-full
        px-2.5
        py-1
        text-xs
        font-medium
        ${style}
      `}
    >
      <span
        aria-hidden="true"
        className="mr-1.5 size-1.5 rounded-full bg-current"
      />

      {formatStatus(status)}
    </span>
  );
}

export default RequestStatus;
