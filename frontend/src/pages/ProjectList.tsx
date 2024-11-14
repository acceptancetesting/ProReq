// src/components/ProjectList.tsx

import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axios";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Card from "../components/Card";
import Button from "../components/Button";

const ProjectsContainer = styled.div`
  margin-top: ${(props) => props.theme.spacing(2)};
`;

const ProjectCard = styled(Card)`
  margin-bottom: ${(props) => props.theme.spacing(2)};
`;

const ProjectTitle = styled.h2`
  font-size: ${(props) => props.theme.typography.h2.fontSize};
  color: ${(props) => props.theme.colors.primary.projects};
`;

const ProjectDescription = styled.p`
  font-size: ${(props) => props.theme.typography.body.fontSize};
`;

const AddProjectButton = styled(Button)`
  margin-bottom: ${(props) => props.theme.spacing(2)};
`;

interface Project {
  id: number;
  name: string;
  description: string;
}

const ProjectList: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axiosInstance.get("/projects");
        setProjects(response.data);
      } catch (err) {
        console.error("Failed to fetch projects", err);
      }
    };

    fetchProjects();
  }, []);

  return (
    <ProjectsContainer>
      <AddProjectButton
        primary
        space="projects"
        size="medium"
        as={Link}
        to="/projects/create"
      >
        + New Project
      </AddProjectButton>
      {projects.map((project) => (
        <ProjectCard key={project.id}>
          <ProjectTitle>{project.name}</ProjectTitle>
          <ProjectDescription>{project.description}</ProjectDescription>
          <Button as={Link} to={`/projects/${project.id}`} space="projects">
            View Details
          </Button>
        </ProjectCard>
      ))}
    </ProjectsContainer>
  );
};

export default ProjectList;
