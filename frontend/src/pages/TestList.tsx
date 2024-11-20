// src/pages/TestsList.tsx

import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axiosInstance from "../api/axios";
import Card from "../components/Card";
import Button from "../components/Button";
import styled from "styled-components";
import { FaPlus } from "react-icons/fa";

const TestsContainer = styled.div`
  margin-top: ${(props) => props.theme.spacing(2)};
`;

const TestsCard = styled(Card)`
  margin-bottom: ${(props) => props.theme.spacing(2)};
  border-left: 4px solid ${(props) => props.theme.colors.primary.tests};
`;

const TestsTitle = styled.h2`
  font-size: ${(props) => props.theme.typography.h2.fontSize};
  color: ${(props) => props.theme.colors.primary.tests};
`;

const AddTestsButton = styled(Button)`
  margin-bottom: ${(props) => props.theme.spacing(2)};
`;

interface Test {
  id: number;
  title: string;
  priority: string;
  status: string;
}

const TestsList: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const [Tests, setTests] = useState<Test[]>([]);

  useEffect(() => {
    const fetchTests = async () => {
      try {
        const response = await axiosInstance.get(
          `/projects/${projectId}/Tests`
        );
        setTests(response.data);
      } catch (err) {
        console.error("Failed to fetch Tests", err);
      }
    };

    fetchTests();
  }, [projectId]);

  return (
    <TestsContainer>
      <AddTestsButton
        primary
        space="tests"
        size="medium"
        as={Link}
        to={`/projects/${projectId}/tests/create`}
      >
        <FaPlus /> Add Test
      </AddTestsButton>
      {Tests.map((test) => (
        <TestsCard key={test.id} to={`/projects/${projectId}/tests/${test.id}`}>
          <TestsTitle>{test.title}</TestsTitle>
          <p>Priority: {test.priority}</p>
          <p>Status: {test.status}</p>
        </TestsCard>
      ))}
    </TestsContainer>
  );
};

export default TestsList;
