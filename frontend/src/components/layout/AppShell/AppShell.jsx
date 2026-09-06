import Header from "../Header/Header";

function AppShell({ children }) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-950">
      <Header />

      <main
        className="
          mx-auto
          w-full
          max-w-7xl
          px-4
          py-6
          sm:px-6
          sm:py-8
          lg:px-8
          lg:py-10
        "
      >
        {children}
      </main>
    </div>
  );
}

export default AppShell;
