import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../api/axios";
import AppLayout from "../components/AppLayout";
import Table from "../components/Table";

const ReleaseList: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const [releases, setReleases] = useState([]);

  useEffect(() => {
    const fetchReleases = async () => {
      try {
        const response = await axiosInstance.get(
          `/projects/${projectId}/releases`
        );
        setReleases(response.data);
      } catch (err) {
        console.error("Failed to fetch releases", err);
      }
    };
    fetchReleases();
  }, [projectId]);

  const columns = ["Name", "Version", "Created At", "Actions"];

  const rows = releases.map((release: any) => [
    release.name,
    release.version,
    new Date(release.createdAt).toLocaleDateString(),
    <button onClick={() => alert(`View Release: ${release.name}`)}>
      View
    </button>,
  ]);

  return (
    <AppLayout>
      <h1>Release List</h1>
      <Table columns={columns} rows={rows} />
    </AppLayout>
  );
};

export default ReleaseList;
