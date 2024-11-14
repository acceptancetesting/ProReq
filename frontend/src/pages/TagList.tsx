// src/components/TagList.tsx

import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axios";
import { useParams } from "react-router-dom";

interface Tag {
  id: number;
  name: string;
  // Include other tag fields as needed
}

interface TagListProps {
  requirementId: number;
}

const TagList: React.FC<TagListProps> = ({ requirementId }) => {
  const [tags, setTags] = useState<Tag[]>([]);
  const { projectId } = useParams<{ projectId: string }>();

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await axiosInstance.get(
          `/projects/${projectId}/requirements/${requirementId}/tags`
        );
        setTags(response.data);
      } catch (err) {
        console.error("Failed to fetch tags", err);
      }
    };

    fetchTags();
  }, [requirementId]);

  return (
    <div>
      <h3>Tags</h3>
      <ul>
        {tags.map((tag) => (
          <li key={tag.id}>{tag.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default TagList;
