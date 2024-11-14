// src/pages/ProjectDetails.tsx

import React, { useEffect, useState } from "react";
import { useParams, Outlet, Link, useNavigate } from "react-router-dom";
import axiosInstance from "../api/axios";
import AppLayout from "../components/AppLayout";
import Card from "../components/Card";
import styled from "styled-components";
import Button from "../components/Button";
import Breadcrumbs from "../components/Breadcrumbs";
import { FaPlus } from "react-icons/fa";

const ProjectHeader = styled.h1`
  font-size: ${(props) => props.theme.typography.h1.fontSize};
  color: ${(props) => props.theme.colors.primary.projects};
`;

const Tabs = styled.div`
  display: flex;
  border-bottom: 1px solid ${(props) => props.theme.colors.neutral.border};
  margin-bottom: ${(props) => props.theme.spacing(2)};
`;

const Tab = styled(Link)<{ active?: boolean }>`
  padding: ${(props) => props.theme.spacing(1)}
    ${(props) => props.theme.spacing(2)};
  color: ${(props) =>
    props.active ? "#FFFFFF" : props.theme.colors.neutral.text};
  background-color: ${(props) =>
    props.active ? props.theme.colors.primary.projects : "transparent"};
  text-decoration: none;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  &:hover {
    background-color: ${(props) =>
      props.active
        ? props.theme.colors.primary.projects
        : props.theme.colors.neutral.lightGray};
  }
`;

const OverviewCard = styled(Card)`
  margin-bottom: ${(props) => props.theme.spacing(2)};
`;

interface Project {
  id: number;
  name: string;
  description: string;
}

const ProjectDetails: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await axiosInstance.get(`/projects/${projectId}`);
        setProject(response.data);
      } catch (err) {
        console.error("Failed to fetch project", err);
      }
    };

    fetchProject();
  }, [projectId]);

  if (!project) return <div>Loading...</div>;

  return (
    <AppLayout>
      <Breadcrumbs />
      <ProjectHeader>{project.name}</ProjectHeader>
      <Tabs>
        <Tab to={`/projects/${projectId}`} style={{ pointerEvents: "none" }}>
          Overview
        </Tab>
        <Tab to={`/projects/${projectId}/requirements`}>Requirements</Tab>
        <Tab to={`/projects/${projectId}/tickets`}>Tickets</Tab>
        <Tab to={`/projects/${projectId}/tests`}>Tests</Tab>
      </Tabs>
      <OverviewCard>
        <p>{project.description}</p>
        {/* Additional project details can be added here */}
        <Button
          primary
          space="projects"
          size="medium"
          onClick={() => navigate(`/projects/${projectId}/requirements/create`)}
          style={{ marginRight: "10px" }}
        >
          <FaPlus /> Add Requirement
        </Button>
        <Button
          primary
          space="projects"
          size="medium"
          onClick={() => navigate(`/projects/${projectId}/tickets/create`)}
        >
          <FaPlus /> Add Ticket
        </Button>
      </OverviewCard>
      {/* Render sub-entity components via Outlet */}
      <Outlet />
    </AppLayout>
  );
};

export default ProjectDetails;
