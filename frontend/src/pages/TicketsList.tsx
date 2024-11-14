// src/pages/TicketsList.tsx

import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axiosInstance from "../api/axios";
import Card from "../components/Card";
import Button from "../components/Button";
import styled from "styled-components";
import { FaPlus } from "react-icons/fa";

const TicketsContainer = styled.div`
  margin-top: ${(props) => props.theme.spacing(2)};
`;

const TicketCard = styled(Card)`
  margin-bottom: ${(props) => props.theme.spacing(2)};
  border-left: 4px solid ${(props) => props.theme.colors.primary.tickets};
`;

const TicketTitle = styled.h2`
  font-size: ${(props) => props.theme.typography.h2.fontSize};
  color: ${(props) => props.theme.colors.primary.tickets};
`;

const AddTicketButton = styled(Button)`
  margin-bottom: ${(props) => props.theme.spacing(2)};
`;

interface Ticket {
  id: number;
  title: string;
  priority: string;
  status: string;
}

const TicketsList: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const [tickets, setTickets] = useState<Ticket[]>([]);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await axiosInstance.get(
          `/projects/${projectId}/tickets`
        );
        setTickets(response.data);
      } catch (err) {
        console.error("Failed to fetch tickets", err);
      }
    };

    fetchTickets();
  }, [projectId]);

  return (
    <TicketsContainer>
      <AddTicketButton
        primary
        space="tickets"
        size="medium"
        as={Link}
        to={`/projects/${projectId}/tickets/create`}
      >
        <FaPlus /> Add Ticket
      </AddTicketButton>
      {tickets.map((ticket) => (
        <TicketCard key={ticket.id}>
          <TicketTitle>{ticket.title}</TicketTitle>
          <p>Priority: {ticket.priority}</p>
          <p>Status: {ticket.status}</p>
          <Button
            as={Link}
            to={`/projects/${projectId}/tickets/${ticket.id}`}
            space="tickets"
          >
            View Details
          </Button>
        </TicketCard>
      ))}
    </TicketsContainer>
  );
};

export default TicketsList;
