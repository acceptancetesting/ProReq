// src/pages/CreateRequirement.tsx

import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AppLayout from "../components/AppLayout";
import styled from "styled-components";
import Input from "../components/Input";
import Button from "../components/Button";
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

const Select = styled.select`
  padding: ${(props) => props.theme.spacing(1)};
  font-size: ${(props) => props.theme.typography.body.fontSize};
  border: 1px solid ${(props) => props.theme.colors.neutral.border};
  border-radius: 4px;
  width: 100%;
  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.colors.primary.requirements};
    box-shadow: 0 0 0 2px rgba(40, 167, 69, 0.2);
  }
`;

const CreateRequirement: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState<"Epic" | "Story" | "Task">("Epic");
  const [status, setStatus] = useState("Open");
  const navigate = useNavigate();

  const handleCreateRequirement = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axiosInstance.post("/projects/${projectId}/requirements", {
        projectId,
        title,
        description,
        type,
        status,
      });
      navigate(`/projects/${projectId}/requirements`);
    } catch (err) {
      console.error("Failed to create requirement", err);
    }
  };

  return (
    <AppLayout>
      <h1>Create New Requirement</h1>
      <Form onSubmit={handleCreateRequirement}>
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
          <Label>Type</Label>
          <Select
            value={type}
            onChange={(e) =>
              setType(e.target.value as "Epic" | "Story" | "Task")
            }
          >
            <option value="Epic">Epic</option>
            <option value="Story">Story</option>
            <option value="Task">Task</option>
          </Select>
        </FormGroup>
        <FormGroup>
          <Label>Status</Label>
          <Select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </Select>
        </FormGroup>
        <Button type="submit" primary space="requirements" size="medium">
          Save Requirement
        </Button>
      </Form>
    </AppLayout>
  );
};

export default CreateRequirement;
