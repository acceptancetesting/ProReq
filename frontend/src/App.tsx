// src/App.tsx

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
import ProjectDetails from "./pages/ProjectDetails";
import CreateProject from "./pages/CreateProject";
import PrivateRoute from "./components/PrivateRoute";
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

// Similarly import TicketsList, CreateTicket, TicketDetails, TestsList, CreateTest, TestDetails

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
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/projects" element={<Dashboard />} />
            <Route path="/projects/create" element={<CreateProject />} />
            {/* Nested Routes under /projects/:projectId */}
            <Route path="/projects/:projectId/*" element={<ProjectDetails />}>
              {/* <Route
                path=""
                element={
                  <PrivateRoute>
                    <ProjectOverview />
                  </PrivateRoute>
                }
              /> */}
              <Route path="requirements" element={<RequirementsList />} />
              <Route
                path="requirements/create"
                element={<CreateRequirement />}
              />
              <Route
                path="requirements/:requirementId"
                element={<RequirementDetails />}
              />
              <Route path="tickets" element={<TicketsList />} />
              <Route path="tickets/create" element={<CreateTicket />} />
              <Route path="tickets/:ticketId" element={<TicketDetails />} />
              <Route path="tests" element={<TestList />} />
              <Route path="tests/create" element={<CreateTest />} />
              <Route path="tests/:testId" element={<TestDetails />} />
              {/* Similarly add routes for tickets and tests */}
            </Route>{" "}
            {/* Private route clousure */}
          </Route>

          {/* Catch-all Route */}
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
