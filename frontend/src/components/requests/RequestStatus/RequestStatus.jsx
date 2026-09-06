import { formatStatus } from "../../../utils/formatters";

function RequestStatus({ status }) {
  const styles = {
    pending: {
      container: "bg-amber-50 text-amber-700 ring-amber-200",
      dot: "bg-amber-500",
    },
    completed: {
      container: "bg-emerald-50 text-emerald-700 ring-emerald-200",
      dot: "bg-emerald-500",
    },
  };

  const currentStyle = styles[status] || {
    container: "bg-slate-100 text-slate-700 ring-slate-200",
    dot: "bg-slate-500",
  };

  return (
    <span
      className={`inline-flex w-fit items-center gap-2 rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${currentStyle.container}`}
    >
      <span
        aria-hidden="true"
        className={`size-1.5 rounded-full ${currentStyle.dot}`}
      />
      {formatStatus(status)}
    </span>
  );
}

export default RequestStatus;
