function RequestStats({ total, pending, completed }) {
  const stats = [
    {
      label: "Total requests",
      value: total,
    },
    {
      label: "Pending",
      value: pending,
    },
    {
      label: "Completed",
      value: completed,
    },
  ];

  return (
    <div className="@container">
      <div className="grid grid-cols-1 gap-3 @sm:grid-cols-3">
        {stats.map((stat) => (
          <article
            key={stat.label}
            className="
              rounded-2xl
              border
              border-slate-200
              bg-white
              p-5
              shadow-sm
            "
          >
            <p className="text-sm font-medium text-slate-500">{stat.label}</p>

            <p className="mt-2 text-[clamp(1.75rem,4vw,2.25rem)] font-semibold tracking-tight text-slate-950">
              {stat.value}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}

export default RequestStats;
