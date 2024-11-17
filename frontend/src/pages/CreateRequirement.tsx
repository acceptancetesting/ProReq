import React, { useState, useEffect } from "react";
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

interface CreateRequirementPayload {
  projectId: string | undefined;
  title: string;
  description: string;
  type: "Epic" | "Story" | "Task";
  status: string;
  relationships?: { targetId: string; type: string }[];
}

const CreateRequirement: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState<"Epic" | "Story" | "Task">("Epic");
  const [status, setStatus] = useState("Open");
  const [relatedRequirement, setRelatedRequirement] = useState("");
  const [relationshipType, setRelationshipType] = useState("Dependency");
  const [existingRequirements, setExistingRequirements] = useState([]);
  const navigate = useNavigate();

  // Fetch existing requirements for the dropdown
  useEffect(() => {
    const fetchRequirements = async () => {
      try {
        const response = await axiosInstance.get(
          `/projects/${projectId}/requirements`
        );
        setExistingRequirements(response.data);
      } catch (err) {
        console.error("Failed to fetch requirements", err);
      }
    };
    fetchRequirements();
  }, [projectId]);

  const handleCreateRequirement = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload: CreateRequirementPayload = {
      projectId,
      title,
      description,
      type,
      status,
    };

    if (relatedRequirement) {
      payload.relationships = [
        {
          targetId: relatedRequirement,
          type: relationshipType,
        },
      ];
    }

    try {
      await axiosInstance.post(`/projects/${projectId}/requirements`, payload);
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
        <FormGroup>
          <Label>Related Requirement (Optional)</Label>
          <Select
            value={relatedRequirement}
            onChange={(e) => setRelatedRequirement(e.target.value)}
          >
            <option value="">None</option>
            {existingRequirements.map((req: any) => (
              <option key={req.id} value={req.id}>
                {req.title}
              </option>
            ))}
          </Select>
        </FormGroup>
        <FormGroup>
          <Label>Relationship Type</Label>
          <Select
            value={relationshipType}
            onChange={(e) => setRelationshipType(e.target.value)}
            disabled={!relatedRequirement} // Disable if no related requirement selected
          >
            <option value="Dependency">Dependency</option>
            <option value="Parent-Child">Parent-Child</option>
            <option value="Relates To">Relates To</option>
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
