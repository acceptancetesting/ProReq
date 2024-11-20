// src/components/SideNav.tsx

import React, { useState } from "react";
import styled from "styled-components";
import Divider from "./Divider"; // Update the path based on where you save the Divider
import { useSidebar } from "../context/SidebarContext";

import { NavLink } from "react-router-dom";
import {
  FaProjectDiagram,
  FaTasks,
  FaTicketAlt,
  FaVial,
  FaChevronDown,
  FaChevronRight,
  FaSpaceShuttle,
  FaClock,
  FaCodeBranch,
  FaTag,
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
    font-weight: ${(props) => props.theme.typography.h3.fontWeight};
    border-left: 4px solid ${(props) => props.theme.colors.primary.projects};
  }

  &:hover {
    background-color: ${(props) => props.theme.colors.neutral.lightGray};
  }

  svg {
    margin-right: ${(props) => props.theme.spacing(1)};
  }
`;

// const SubNavList = styled.ul`
//   list-style: none;
//   padding-left: ${(props) => props.theme.spacing(4)};
// `;

// const SubNavItem = styled.li`
//   margin-bottom: ${(props) => props.theme.spacing(0.5)};
// `;

interface ExpandIconProps {
  expanded: boolean;
}

const ExpandIcon = styled.span<ExpandIconProps>`
  margin-left: auto;
  display: flex;
  align-items: center;
  transform: ${(props) => (props.expanded ? "rotate(90deg)" : "rotate(0)")};
  transition: transform 0.3s ease-in-out;
`;

const SectionHeading = styled.div`
  padding: ${(props) => props.theme.spacing(2)}
    ${(props) => props.theme.spacing(2)};
  font-size: ${(props) => props.theme.typography.h3.fontSize};
  font-weight: ${(props) => props.theme.typography.h3.fontWeight};
  color: ${(props) => props.theme.colors.primary.projects};
  background-color: ${(props) => props.theme.colors.neutral.lightGray};
`;

const StyledDivider = styled(Divider)`
  margin: ${(props) => props.theme.spacing(2)} 0;
  background-color: ${(props) => props.theme.colors.neutral.border};
  height: 1px;
`;

const SubNavList = styled.ul`
  list-style: none;
  padding-left: ${(props) => props.theme.spacing(6)}; // Indent more
  border-left: 2px solid ${(props) => props.theme.colors.neutral.border}; // Add a vertical line
`;

const SubNavItem = styled.li`
  margin-bottom: ${(props) => props.theme.spacing(0.5)};
  font-size: ${(props) =>
    props.theme.typography.small.fontSize}; // Smaller font for subitems
  color: ${(props) => props.theme.colors.neutral.text};
`;

interface Project {
  id: number;
  name: string;
}

const SideNav: React.FC = () => {
  const { expandedProjects, toggleProject } = useSidebar();

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

  return (
    <SideNavContainer>
      <Logo>ProReq</Logo>
      <NavList>
        <StyledDivider />
        <SectionHeading>Projects</SectionHeading>
        <NavItem>
          <StyledNavLink to="/projects">
            <FaProjectDiagram />
            Projects Overview
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
                <FaSpaceShuttle />
                {project.name}
              </div>
              <ExpandIcon expanded={expandedProjects[project.id]}>
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
                <SubNavItem>
                  <StyledNavLink to={`/projects/${project.id}/baselines`}>
                    <FaClock />
                    Baselines
                  </StyledNavLink>
                </SubNavItem>
                <SubNavItem>
                  <StyledNavLink to={`/projects/${project.id}/versions`}>
                    <FaCodeBranch />
                    Versions
                  </StyledNavLink>
                </SubNavItem>
                <SubNavItem>
                  <StyledNavLink to={`/projects/${project.id}/releases`}>
                    <FaTag />
                    Releases
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
