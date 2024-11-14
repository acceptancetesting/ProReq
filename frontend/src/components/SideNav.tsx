// src/components/SideNav.tsx

import React, { useState } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import {
  FaProjectDiagram,
  FaTasks,
  FaTicketAlt,
  FaVial,
  FaChevronDown,
  FaChevronRight,
} from "react-icons/fa";
import axiosInstance from "../api/axios";

const SideNavContainer = styled.div`
  width: 250px;
  background-color: #ffffff;
  border-right: 1px solid ${(props) => props.theme.colors.neutral.border};
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  overflow-y: auto;
`;

const Logo = styled.div`
  padding: ${(props) => props.theme.spacing(2)};
  font-size: ${(props) => props.theme.typography.h2.fontSize};
  font-weight: ${(props) => props.theme.typography.h2.fontWeight};
  color: ${(props) => props.theme.colors.primary.projects};
`;

const NavList = styled.ul`
  list-style: none;
  padding: 0;
  margin-top: ${(props) => props.theme.spacing(2)};
`;

const NavItem = styled.li`
  margin-bottom: ${(props) => props.theme.spacing(1)};
`;

const StyledNavLink = styled(NavLink)`
  display: flex;
  align-items: center;
  padding: ${(props) => props.theme.spacing(1)}
    ${(props) => props.theme.spacing(2)};
  color: ${(props) => props.theme.colors.neutral.text};
  text-decoration: none;
  font-size: ${(props) => props.theme.typography.body.fontSize};
  &.active {
    background-color: ${(props) => props.theme.colors.primary.projects};
    color: #ffffff;
  }
  &:hover {
    background-color: ${(props) => props.theme.colors.neutral.lightGray};
  }
  svg {
    margin-right: ${(props) => props.theme.spacing(1)};
  }
`;

const SubNavList = styled.ul`
  list-style: none;
  padding-left: ${(props) => props.theme.spacing(4)};
`;

const SubNavItem = styled.li`
  margin-bottom: ${(props) => props.theme.spacing(0.5)};
`;

const ExpandIcon = styled.span`
  margin-left: auto;
  display: flex;
  align-items: center;
`;

interface Project {
  id: number;
  name: string;
}

const SideNav: React.FC = () => {
  const [expandedProjects, setExpandedProjects] = useState<{
    [key: number]: boolean;
  }>({});
  const [projects, setProjects] = useState<Project[]>([]);

  React.useEffect(() => {
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

  const toggleProject = (projectId: number) => {
    setExpandedProjects((prev) => ({
      ...prev,
      [projectId]: !prev[projectId],
    }));
  };

  return (
    <SideNavContainer>
      <Logo>ProReq</Logo>
      <NavList>
        <NavItem>
          <StyledNavLink to="/projects">
            <FaProjectDiagram />
            Projects
          </StyledNavLink>
        </NavItem>
        {projects.map((project) => (
          <NavItem key={project.id}>
            <StyledNavLink
              to={`/projects/${project.id}`}
              onClick={() => toggleProject(project.id)}
              style={{ justifyContent: "space-between" }}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <FaProjectDiagram />
                {project.name}
              </div>
              <ExpandIcon>
                {expandedProjects[project.id] ? (
                  <FaChevronDown />
                ) : (
                  <FaChevronRight />
                )}
              </ExpandIcon>
            </StyledNavLink>
            {expandedProjects[project.id] && (
              <SubNavList>
                <SubNavItem>
                  <StyledNavLink to={`/projects/${project.id}/requirements`}>
                    <FaTasks />
                    Requirements
                  </StyledNavLink>
                </SubNavItem>
                <SubNavItem>
                  <StyledNavLink to={`/projects/${project.id}/tickets`}>
                    <FaTicketAlt />
                    Tickets
                  </StyledNavLink>
                </SubNavItem>
                <SubNavItem>
                  <StyledNavLink to={`/projects/${project.id}/tests`}>
                    <FaVial />
                    Tests
                  </StyledNavLink>
                </SubNavItem>
              </SubNavList>
            )}
          </NavItem>
        ))}
      </NavList>
    </SideNavContainer>
  );
};

export default SideNav;
