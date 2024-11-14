// src/components/Breadcrumbs.tsx

import React from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import styled from "styled-components";

const BreadcrumbContainer = styled.div`
  margin-bottom: ${(props) => props.theme.spacing(2)};
  font-size: ${(props) => props.theme.typography.small.fontSize};
  color: ${(props) => props.theme.colors.neutral.text};
`;

const Crumb = styled.span`
  &::after {
    content: " > ";
    margin-left: 5px;
  }
  &:last-child::after {
    content: "";
  }
`;

const Breadcrumbs: React.FC = () => {
  const location = useLocation();
  const { projectId, requirementId, ticketId, testId } = useParams();

  const pathSegments = location.pathname.split("/").filter((seg) => seg);

  return (
    <BreadcrumbContainer>
      {pathSegments.map((segment, index) => {
        const url = `/${pathSegments.slice(0, index + 1).join("/")}`;
        let name = segment.charAt(0).toUpperCase() + segment.slice(1);

        // Replace dynamic IDs with meaningful names if possible
        if (segment === "projects" && projectId) {
          name = "Projects";
        }
        if (segment === "requirements" && requirementId) {
          name = "Requirements";
        }
        if (segment === "tickets" && ticketId) {
          name = "Tickets";
        }
        if (segment === "tests" && testId) {
          name = "Tests";
        }

        return (
          <Crumb key={url}>
            {index < pathSegments.length - 1 ? (
              <Link to={url}>{name}</Link>
            ) : (
              name
            )}
          </Crumb>
        );
      })}
    </BreadcrumbContainer>
  );
};

export default Breadcrumbs;
