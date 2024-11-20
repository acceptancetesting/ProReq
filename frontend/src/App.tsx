import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Dashboard from "./pages/Dashboard";
import ProjectOverview from "./pages/ProjectOverview";
import CreateProject from "./pages/CreateProject";
import PrivateRoute from "./components/PrivateRoute";
import MainLayout from "./components/MainLayout"; // Import the MainLayout
import { ThemeProvider } from "styled-components";
import theme from "./theme";
import RequirementsList from "./pages/RequirementList";
import CreateRequirement from "./pages/CreateRequirement";
import RequirementDetails from "./pages/RequirementDetails";
import TicketsList from "./pages/TicketsList";
import TestDetails from "./pages/TestDetails";
import TestList from "./pages/TestList";
import TicketDetails from "./pages/TicketDetails";
import CreateTicket from "./pages/CreateTicket";
import CreateTest from "./pages/CreateTest";
import BaselineList from "./pages/BaselineList";
import CreateBaseline from "./pages/CreateBaseline";
import VersionList from "./pages/VersionList";
import ReleaseList from "./pages/ReleaseList";

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Protected Routes */}
          <Route element={<PrivateRoute />}>
            <Route element={<MainLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/projects" element={<Dashboard />} />
              <Route path="/projects/create" element={<CreateProject />} />
              <Route
                path="/projects/:projectId"
                element={<ProjectOverview />}
              />

              {/* Requirements */}
              <Route
                path="/projects/:projectId/requirements"
                element={<RequirementsList />}
              />
              <Route
                path="/projects/:projectId/requirements/create"
                element={<CreateRequirement />}
              />
              <Route
                path="/projects/:projectId/requirements/:requirementId"
                element={<RequirementDetails />}
              />

              {/* Tickets */}
              <Route
                path="/projects/:projectId/tickets"
                element={<TicketsList />}
              />
              <Route
                path="/projects/:projectId/tickets/create"
                element={<CreateTicket />}
              />
              <Route
                path="/projects/:projectId/tickets/:ticketId"
                element={<TicketDetails />}
              />

              {/* Tests */}
              <Route path="/projects/:projectId/tests" element={<TestList />} />
              <Route
                path="/projects/:projectId/tests/create"
                element={<CreateTest />}
              />
              <Route
                path="/projects/:projectId/tests/:testId"
                element={<TestDetails />}
              />

              {/* Baselines */}
              <Route
                path="/projects/:projectId/baselines"
                element={<BaselineList />}
              />
              <Route
                path="/projects/:projectId/baselines/create"
                element={<CreateBaseline />}
              />

              {/* Versions */}
              <Route
                path="/projects/:projectId/versions"
                element={<VersionList />}
              />

              {/* Releases */}
              <Route
                path="/projects/:projectId/releases"
                element={<ReleaseList />}
              />
            </Route>
          </Route>

          {/* Catch-all Route */}
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
