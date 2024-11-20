import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axiosInstance from "../api/axios";
import AppLayout from "../components/AppLayout";
import styled from "styled-components";
import Button from "../components/Button";
import Table from "../components/Table";

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${(props) => props.theme.spacing(2)};
`;

const BaselineList: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const [baselines, setBaselines] = useState([]);

  useEffect(() => {
    const fetchBaselines = async () => {
      try {
        const response = await axiosInstance.get(
          `/projects/${projectId}/baselines`
        );
        setBaselines(response.data);
      } catch (err) {
        console.error("Failed to fetch baselines", err);
      }
    };
    fetchBaselines();
  }, [projectId]);

  const columns = ["Name", "Created At", "Actions"];

  const rows = baselines.map((baseline: any) => [
    baseline.name,
    new Date(baseline.createdAt).toLocaleDateString(),
    <Link to={`/projects/${projectId}/baselines/${baseline.id}`}>View</Link>,
  ]);

  return (
    <AppLayout>
      <Header>
        <h1>Baselines</h1>
        <Link to={`/projects/${projectId}/baselines/create`}>
          <Button primary>Create Baseline</Button>
        </Link>
      </Header>
      <Table columns={columns} rows={rows} />
    </AppLayout>
  );
};

export default BaselineList;
