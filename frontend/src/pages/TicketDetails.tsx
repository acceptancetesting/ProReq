// src/pages/TicketDetails.tsx

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../api/axios";
import AppLayout from "../components/AppLayout";
import Card from "../components/Card";
import styled from "styled-components";
import Button from "../components/Button";
import Breadcrumbs from "../components/Breadcrumbs";

const TicketHeader = styled.h1`
  font-size: ${(props) => props.theme.typography.h1.fontSize};
  color: ${(props) => props.theme.colors.primary.tickets};
`;

const TicketDetailsCard = styled(Card)`
  margin-bottom: ${(props) => props.theme.spacing(2)};
`;

const EditButton = styled(Button)`
  margin-right: ${(props) => props.theme.spacing(1)};
`;

interface Ticket {
  id: number;
  title: string;
  description: string;
  priority: string;
  status: string;
}

const TicketDetails: React.FC = () => {
  const { projectId, ticketId } = useParams<{
    projectId: string;
    ticketId: string;
  }>();
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const response = await axiosInstance.get(
          `/projects/${projectId}/tickets/${ticketId}`
        );
        setTicket(response.data);
      } catch (err) {
        console.error("Failed to fetch ticket", err);
      }
    };

    fetchTicket();
  }, [ticketId]);

  if (!ticket) return <div>Loading...</div>;

  return (
    <AppLayout>
      <Breadcrumbs />
      <TicketHeader>{ticket.title}</TicketHeader>
      <TicketDetailsCard to={`/projects/${projectId}/tickets/${ticketId}`}>
        <p>
          <strong>Priority:</strong> {ticket.priority}
        </p>
      </TicketDetailsCard>
    </AppLayout>
  );
};

export default TicketDetails;
