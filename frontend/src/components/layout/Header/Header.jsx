import { Link, useLocation } from "react-router-dom";

function Header() {
  const location = useLocation();

  const isDashboard = location.pathname === "/";

  return (
    <header className="border-b border-slate-200 bg-white">
      <div
        className="
          mx-auto
          flex
          max-w-7xl
          items-center
          justify-between
          gap-4
          px-4
          py-4
          sm:px-6
          lg:px-8
        "
      >
        <Link
          to="/"
          className="
            text-lg
            font-semibold
            tracking-tight
            text-slate-950
            transition
            duration-200
            hover:text-slate-700
          "
        >
          JobTrack
        </Link>

        {!isDashboard && (
          <Link
            to="/"
            className="
              hidden
              text-sm
              font-medium
              text-slate-500
              transition
              duration-200
              hover:text-slate-950
              sm:inline-flex
            "
          >
            Dashboard
          </Link>
        )}
      </div>
    </header>
  );
}

export default Header;
