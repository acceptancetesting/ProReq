// src/components/CommentList.tsx

import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axios";

interface Comment {
  id: number;
  content: string;
  // Include other comment fields as needed
}

interface CommentListProps {
  requirementId: number;
}

const CommentList: React.FC<CommentListProps> = ({ requirementId }) => {
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axiosInstance.get(
          `/comments?requirementId=${requirementId}`
        );
        setComments(response.data);
      } catch (err) {
        console.error("Failed to fetch comments", err);
      }
    };

    fetchComments();
  }, [requirementId]);

  return (
    <div>
      <h3>Comments</h3>
      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>{comment.content}</li>
        ))}
      </ul>
    </div>
  );
};

export default CommentList;
