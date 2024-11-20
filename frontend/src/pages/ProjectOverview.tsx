import React from "react";
import { useParams } from "react-router-dom";
import AppLayout from "../components/AppLayout";
import styled from "styled-components";
import Card from "../components/Card";

const CardContainer = styled.div`
  display: flex;
  gap: ${(props) => props.theme.spacing(2)};
  flex-wrap: wrap;
  margin-top: ${(props) => props.theme.spacing(2)};
`;

const ProjectOverview: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();

  return (
    <AppLayout>
      <h1>Project Overview</h1>
      <CardContainer>
        <Card to={`/projects/${projectId}/requirements`}>Requirements</Card>
        <Card to={`/projects/${projectId}/tickets`}>Tickets</Card>
        <Card to={`/projects/${projectId}/tests`}>Tests</Card>
        <Card to={`/projects/${projectId}/baselines`}>Baselines</Card>
        <Card to={`/projects/${projectId}/versions`}>Versions</Card>
        <Card to={`/projects/${projectId}/releases`}>Releases</Card>
      </CardContainer>
    </AppLayout>
  );
};

export default ProjectOverview;
