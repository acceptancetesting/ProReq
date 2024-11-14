// src/pages/RequirementsList.tsx

import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axiosInstance from "../api/axios";
import Card from "../components/Card";
import Button from "../components/Button";
import styled from "styled-components";
import { FaPlus } from "react-icons/fa";

const RequirementsContainer = styled.div`
  margin-top: ${(props) => props.theme.spacing(2)};
`;

const RequirementCard = styled(Card)`
  margin-bottom: ${(props) => props.theme.spacing(2)};
  border-left: 4px solid ${(props) => props.theme.colors.primary.requirements};
`;

const RequirementTitle = styled.h2`
  font-size: ${(props) => props.theme.typography.h2.fontSize};
  color: ${(props) => props.theme.colors.primary.requirements};
`;

const AddRequirementButton = styled(Button)`
  margin-bottom: ${(props) => props.theme.spacing(2)};
`;

interface Requirement {
  id: number;
  title: string;
  type: "Epic" | "Story" | "Task";
  status: string;
}

const RequirementsList: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const [requirements, setRequirements] = useState<Requirement[]>([]);

  useEffect(() => {
    const fetchRequirements = async () => {
      try {
        const response = await axiosInstance.get(
          `/projects/${projectId}/requirements`
        );
        setRequirements(response.data);
      } catch (err) {
        console.error("Failed to fetch requirements", err);
      }
    };

    fetchRequirements();
  }, [projectId]);

  return (
    <RequirementsContainer>
      <AddRequirementButton
        primary
        space="requirements"
        size="medium"
        as={Link}
        to={`/projects/${projectId}/requirements/create`}
      >
        <FaPlus /> Add Requirement
      </AddRequirementButton>
      {requirements.map((req) => (
        <RequirementCard key={req.id}>
          <RequirementTitle>{req.title}</RequirementTitle>
          <p>Type: {req.type}</p>
          <p>Status: {req.status}</p>
          <Button
            as={Link}
            to={`/projects/${projectId}/requirements/${req.id}`}
            space="requirements"
          >
            View Details
          </Button>
        </RequirementCard>
      ))}
    </RequirementsContainer>
  );
};

export default RequirementsList;
