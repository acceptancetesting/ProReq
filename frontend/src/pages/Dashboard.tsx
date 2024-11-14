// src/pages/Dashboard.tsx

import React from "react";
import AppLayout from "../components/AppLayout";
import ProjectList from "./ProjectList";
import styled from "styled-components";

const DashboardHeader = styled.h1`
  font-size: ${(props) => props.theme.typography.h1.fontSize};
  font-weight: ${(props) => props.theme.typography.h1.fontWeight};
`;

const Dashboard: React.FC = () => (
  <AppLayout>
    <DashboardHeader>Welcome, John Doe</DashboardHeader>
    <ProjectList />
  </AppLayout>
);

export default Dashboard;
