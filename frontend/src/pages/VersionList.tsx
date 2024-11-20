import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../api/axios";
import AppLayout from "../components/AppLayout";
import Table from "../components/Table";

const VersionList: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const [versions, setVersions] = useState([]);

  useEffect(() => {
    const fetchVersions = async () => {
      try {
        const response = await axiosInstance.get(
          `/projects/${projectId}/versions`
        );
        setVersions(response.data);
      } catch (err) {
        console.error("Failed to fetch versions", err);
      }
    };
    fetchVersions();
  }, [projectId]);

  const columns = ["Entity Type", "Entity ID", "Version", "Created At"];

  const rows = versions.map((version: any) => [
    version.entityType,
    version.entityId,
    version.version,
    new Date(version.createdAt).toLocaleDateString(),
  ]);

  return (
    <AppLayout>
      <h1>Version List</h1>
      <Table columns={columns} rows={rows} />
    </AppLayout>
  );
};

export default VersionList;
