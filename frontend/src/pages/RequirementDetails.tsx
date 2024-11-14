// src/pages/RequirementDetails.tsx

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../api/axios";
import AppLayout from "../components/AppLayout";
import Card from "../components/Card";
import styled from "styled-components";
import Button from "../components/Button";
import Breadcrumbs from "../components/Breadcrumbs";

const RequirementHeader = styled.h1`
  font-size: ${(props) => props.theme.typography.h1.fontSize};
  color: ${(props) => props.theme.colors.primary.requirements};
`;

const RequirementDetailsCard = styled(Card)`
  margin-bottom: ${(props) => props.theme.spacing(2)};
`;

const EditButton = styled(Button)`
  margin-right: ${(props) => props.theme.spacing(1)};
`;

interface Requirement {
  id: number;
  title: string;
  description: string;
  type: "Epic" | "Story" | "Task";
  status: string;
}

const RequirementDetails: React.FC = () => {
  const { projectId, requirementId } = useParams<{
    projectId: string;
    requirementId: string;
  }>();
  const [requirement, setRequirement] = useState<Requirement | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRequirement = async () => {
      try {
        const response = await axiosInstance.get(
          `/projects/${projectId}/requirements/${requirementId}`
        );
        setRequirement(response.data);
      } catch (err) {
        console.error("Failed to fetch requirement", err);
      }
    };

    fetchRequirement();
  }, [requirementId]);

  if (!requirement) return <div>Loading...</div>;

  return (
    <AppLayout>
      <Breadcrumbs />
      <RequirementHeader>{requirement.title}</RequirementHeader>
      <RequirementDetailsCard>
        <p>
          <strong>Type:</strong> {requirement.type}
        </p>
        <p>
          <strong>Status:</strong> {requirement.status}
        </p>
        <p>
          <strong>Description:</strong>
        </p>
        <p>{requirement.description}</p>
        <EditButton
          primary
          space="requirements"
          size="small"
          onClick={() =>
            navigate(
              `/projects/${projectId}/requirements/${requirementId}/edit`
            )
          }
        >
          Edit Requirement
        </EditButton>
        <Button
          primary
          space="requirements"
          size="small"
          onClick={() => navigate(`/projects/${projectId}/requirements`)}
        >
          Back to Requirements
        </Button>
      </RequirementDetailsCard>
      {/* Additional sections like Comments, Tags can be added here */}
    </AppLayout>
  );
};

export default RequirementDetails;
