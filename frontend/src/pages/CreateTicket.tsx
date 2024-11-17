// src/pages/CreateTicket.tsx

import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AppLayout from "../components/AppLayout";
import styled from "styled-components";
import Input from "../components/Input";
import Button from "../components/Button";
import axiosInstance from "../api/axios";
import Select from "../components/Select";

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

const CreateTicket: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [status, setStatus] = useState("Open");
  const navigate = useNavigate();

  const handleCreateTicket = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axiosInstance.post(`/projects/${projectId}/tickets`, {
        projectId,
        title,
        description,
        priority,
        status,
      });
      navigate(`/projects/${projectId}/tickets`);
    } catch (err) {
      console.error("Failed to create ticket", err);
    }
  };

  return (
    <AppLayout>
      <h1>Create New Ticket</h1>
      <Form onSubmit={handleCreateTicket}>
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
          <Label>Priority</Label>
          <Select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </Select>
        </FormGroup>
        <FormGroup>
          <Label>Status</Label>
          <Select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
          </Select>
        </FormGroup>
        <Button type="submit" primary space="tickets" size="medium">
          Save Ticket
        </Button>
      </Form>
    </AppLayout>
  );
};

export default CreateTicket;
