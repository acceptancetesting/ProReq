import React, { PropsWithChildren } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const CardContainer = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 200px;
  height: 150px;
  border: 1px solid ${(props) => props.theme.colors.neutral.border};
  border-radius: 8px;
  text-decoration: none;
  background-color: ${(props) => props.theme.colors.neutral.lightGray};
  color: ${(props) => props.theme.colors.neutral.text};
  text-align: center;
  font-size: ${(props) => props.theme.typography.body.fontSize};
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.theme.colors.primary.projects};
    color: #fff;
  }
`;

interface CardProps {
  to: string;
}

const Card: React.FC<PropsWithChildren<CardProps>> = ({ to, children }) => {
  return <CardContainer to={to}>{children}</CardContainer>;
};

export default Card;
