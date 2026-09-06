import { Routes, Route } from "react-router-dom";

import AppShell from "./components/layout/AppShell/AppShell";

import Dashboard from "./pages/Dashboard/Dashboard";
import CreateRequest from "./pages/CreateRequest/CreateRequest";
import RequestDetails from "./pages/RequestDetails/RequestDetails";

function App() {
  return (
    <AppShell>
      <Routes>
        <Route path="/" element={<Dashboard />} />

        <Route path="/requests/new" element={<CreateRequest />} />

        <Route path="/requests/:id" element={<RequestDetails />} />
      </Routes>
    </AppShell>
  );
}

export default App;
