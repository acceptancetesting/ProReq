// src/pages/TestDetails.tsx

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../api/axios";
import AppLayout from "../components/AppLayout";
import Card from "../components/Card";
import styled from "styled-components";
import Button from "../components/Button";
import Breadcrumbs from "../components/Breadcrumbs";

const TestHeader = styled.h1`
  font-size: ${(props) => props.theme.typography.h1.fontSize};
  color: ${(props) => props.theme.colors.primary.tests};
`;

const TestDetailsCard = styled(Card)`
  margin-bottom: ${(props) => props.theme.spacing(2)};
`;

const EditButton = styled(Button)`
  margin-right: ${(props) => props.theme.spacing(1)};
`;

interface Test {
  id: number;
  title: string;
  description: string;
  status: string;
}

const TestDetails: React.FC = () => {
  const { projectId, testId } = useParams<{
    projectId: string;
    testId: string;
  }>();
  const [test, setTest] = useState<Test | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTest = async () => {
      try {
        const response = await axiosInstance.get(
          `/projects/${projectId}/tests/${testId}`
        );
        setTest(response.data);
      } catch (err) {
        console.error("Failed to fetch test", err);
      }
    };

    fetchTest();
  }, [testId]);

  if (!test) return <div>Loading...</div>;

  return (
    <AppLayout>
      <Breadcrumbs />
      <TestHeader>{test.title}</TestHeader>
      <TestDetailsCard>
        <p>
          <strong>Status:</strong> {test.status}
        </p>
        <p>
          <strong>Description:</strong>
        </p>
        <p>{test.description}</p>
        <EditButton
          primary
          space="tests"
          size="small"
          onClick={() =>
            navigate(`/projects/${projectId}/tests/${testId}/edit`)
          }
        >
          Edit Test
        </EditButton>
        <Button
          primary
          space="tests"
          size="small"
          onClick={() => navigate(`/projects/${projectId}/tests`)}
        >
          Back to Tests
        </Button>
      </TestDetailsCard>
    </AppLayout>
  );
};

export default TestDetails;
