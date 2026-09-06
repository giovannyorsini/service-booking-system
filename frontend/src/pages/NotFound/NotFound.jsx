import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="mx-auto max-w-2xl py-10 sm:py-16">
      <div className="rounded-[1.75rem] border border-slate-200 bg-white px-6 py-14 text-center shadow-sm sm:px-10">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
          404
        </p>

        <h1 className="mt-3 text-[clamp(2rem,5vw,3rem)] font-semibold leading-tight tracking-[-0.04em] text-slate-950">
          Page not found
        </h1>

        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-500 sm:text-base">
          The page you're looking for doesn't exist or may have moved.
        </p>

        <Link
          to="/"
          className="mt-6 inline-flex items-center justify-center rounded-xl bg-slate-950 px-4 py-3 text-sm font-medium text-white shadow-sm transition duration-200 hover:-translate-y-0.5 hover:bg-slate-800 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900"
        >
          Back to dashboard
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
