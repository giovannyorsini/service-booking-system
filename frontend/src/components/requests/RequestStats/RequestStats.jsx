function RequestStats({ total, pending, completed }) {
  const stats = [
    {
      label: "Total requests",
      value: total,
      tone: "border-slate-200",
      icon: (
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          className="size-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M7 4.75A1.75 1.75 0 0 1 8.75 3h6.5A1.75 1.75 0 0 1 17 4.75v14.5A1.75 1.75 0 0 1 15.25 21h-6.5A1.75 1.75 0 0 1 7 19.25V4.75Z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.5 7.5h5M9.5 11.5h5M9.5 15.5h3"
          />
        </svg>
      ),
    },
    {
      label: "Pending",
      value: pending,
      tone: "border-amber-200",
      icon: (
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          className="size-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6.5v5l3 1.75"
          />
          <circle cx="12" cy="12" r="8.25" />
        </svg>
      ),
    },
    {
      label: "Completed",
      value: completed,
      tone: "border-emerald-200",
      icon: (
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          className="size-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m7 12.5 3.25 3.25L17.5 8.5"
          />
          <circle cx="12" cy="12" r="8.25" />
        </svg>
      ),
    },
  ];

  return (
    <div className="@container">
      <div className="grid grid-cols-1 gap-3 @sm:grid-cols-3">
        {stats.map((stat, index) => (
          <article
            key={stat.label}
            className={`animate-fade-up rounded-2xl border bg-white p-5 shadow-sm ${stat.tone}`}
            style={{ animationDelay: `${index * 70}ms` }}
          >
            <div className="flex items-start justify-between gap-4">
              <p className="text-sm font-medium text-slate-500">{stat.label}</p>

              <span className="grid size-8 shrink-0 place-items-center rounded-xl bg-slate-100 text-slate-600">
                {stat.icon}
              </span>
            </div>

            <p className="mt-4 text-[clamp(1.8rem,4vw,2.3rem)] font-semibold leading-none tracking-tight text-slate-950">
              {stat.value}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}

export default RequestStats;
