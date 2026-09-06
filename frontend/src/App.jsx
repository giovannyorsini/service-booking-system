import { Route, Routes } from "react-router-dom";

import AppShell from "./components/layout/AppShell/AppShell";
import CreateRequest from "./pages/CreateRequest/CreateRequest";
import Dashboard from "./pages/Dashboard/Dashboard";
import NotFound from "./pages/NotFound/NotFound";
import RequestDetails from "./pages/RequestDetails/RequestDetails";

function App() {
  return (
    <AppShell>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/requests/new" element={<CreateRequest />} />
        <Route path="/requests/:id" element={<RequestDetails />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AppShell>
  );
}

export default App;
