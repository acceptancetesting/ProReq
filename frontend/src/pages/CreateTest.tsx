// src/pages/CreateTest.tsx

import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AppLayout from "../components/AppLayout";
import styled from "styled-components";
import Input from "../components/Input";
import Button from "../components/Button";
import Select from "../components/Select";
import axiosInstance from "../api/axios";

const Form = styled.form`
  max-width: 600px;
  margin-top: ${(props) => props.theme.spacing(2)};
`;

const FormGroup = styled.div`
  margin-bottom: ${(props) => props.theme.spacing(2)};
`;

const Label = styled.label`
  display: block;
  margin-bottom: ${(props) => props.theme.spacing(0.5)};
  font-size: ${(props) => props.theme.typography.small.fontSize};
  color: ${(props) => props.theme.colors.neutral.text};
`;

const CreateTest: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Not Started");
  const navigate = useNavigate();

  const handleCreateTest = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axiosInstance.post(`/projects/${projectId}/tests`, {
        projectId,
        title,
        description,
        status,
      });
      navigate(`/projects/${projectId}/tests`);
    } catch (err) {
      console.error("Failed to create test", err);
    }
  };

  return (
    <AppLayout>
      <h1>Create New Test</h1>
      <Form onSubmit={handleCreateTest}>
        <FormGroup>
          <Label>Title</Label>
          <Input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label>Description</Label>
          <Input
            as="textarea"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
          />
        </FormGroup>
        <FormGroup>
          <Label>Status</Label>
          <Select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="Not Started">Not Started</option>
            <option value="In Progress">In Progress</option>
            <option value="Passed">Passed</option>
            <option value="Failed">Failed</option>
          </Select>
        </FormGroup>
        <Button type="submit" primary space="tests" size="medium">
          Save Test
        </Button>
      </Form>
    </AppLayout>
  );
};

export default CreateTest;
