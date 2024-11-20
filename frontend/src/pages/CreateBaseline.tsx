import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../api/axios";
import AppLayout from "../components/AppLayout";
import styled from "styled-components";
import Button from "../components/Button";
import Select from "../components/Select";

const FormGroup = styled.div`
  margin-bottom: ${(props) => props.theme.spacing(2)};
`;

const CreateBaseline: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const [name, setName] = useState("");
  const [entities, setEntities] = useState([]);
  const [selectedEntities, setSelectedEntities] = useState<number[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEntities = async () => {
      try {
        const response = await axiosInstance.get(
          `/projects/${projectId}/entities`
        );
        setEntities(response.data);
      } catch (err) {
        console.error("Failed to fetch entities", err);
      }
    };
    fetchEntities();
  }, [projectId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axiosInstance.post(`/projects/${projectId}/baselines`, {
        name,
        entities: selectedEntities.map((id) => ({
          entityType: "requirement",
          entityId: id,
        })),
      });
      navigate(`/projects/${projectId}/baselines`);
    } catch (err) {
      console.error("Failed to create baseline", err);
    }
  };

  return (
    <AppLayout>
      <h1>Create Baseline</h1>
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <label>Baseline Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </FormGroup>
        <FormGroup>
          <label>Select Entities</label>
          <Select
            multiple
            value={selectedEntities.map((id) => id.toString())} // Convert number[] to string[]
            onChange={(e) =>
              setSelectedEntities(
                Array.from(e.target.selectedOptions, (opt) =>
                  parseInt(opt.value)
                )
              )
            }
          >
            {entities.map((entity: any) => (
              <option key={entity.id} value={entity.id}>
                {entity.name}
              </option>
            ))}
          </Select>
        </FormGroup>
        <Button type="submit" primary>
          Create Baseline
        </Button>
      </form>
    </AppLayout>
  );
};

export default CreateBaseline;
