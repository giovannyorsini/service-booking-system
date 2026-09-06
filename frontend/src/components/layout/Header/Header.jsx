import { Link, useLocation } from "react-router-dom";

function Header() {
  const { pathname } = useLocation();
  const isDashboard = pathname === "/";

  return (
    <header className="sticky top-0 z-20 border-b border-slate-200/90 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3.5 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="group inline-flex items-center gap-2.5 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-slate-900"
          aria-label="JobTrack home"
        >
          <span className="grid size-8 place-items-center rounded-xl bg-slate-950 text-white shadow-sm transition duration-200 group-hover:-translate-y-0.5 group-hover:shadow-md">
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.9"
              className="size-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 5.75A1.75 1.75 0 0 1 6.75 4h10.5A1.75 1.75 0 0 1 19 5.75v12.5A1.75 1.75 0 0 1 17.25 20H6.75A1.75 1.75 0 0 1 5 18.25V5.75Z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8 8h8M8 12h5M8 16h3"
              />
            </svg>
          </span>

          <span className="text-[1.05rem] font-semibold tracking-tight text-slate-950">
            JobTrack
          </span>
        </Link>

        <nav
          className="flex items-center gap-2"
          aria-label="Primary navigation"
        >
          <Link
            to="/"
            aria-current={isDashboard ? "page" : undefined}
            className={`rounded-lg px-3 py-2 text-sm font-medium transition duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900 ${
              isDashboard
                ? "text-slate-950"
                : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
            }`}
          >
            <span className="hidden sm:inline">Dashboard</span>
            <span className="sm:hidden">Home</span>
          </Link>

          <Link
            to="/requests/new"
            className="inline-flex items-center gap-2 rounded-xl bg-slate-950 px-3.5 py-2.5 text-sm font-medium text-white shadow-sm transition duration-200 hover:-translate-y-0.5 hover:bg-slate-800 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900"
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
            <span className="hidden sm:inline">New request</span>
            <span className="sm:hidden">New</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
