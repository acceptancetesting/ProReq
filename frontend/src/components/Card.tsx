// src/components/Card.tsx

import styled from "styled-components";

const Card = styled.div`
  background-color: #ffffff;
  border: 1px solid ${(props) => props.theme.colors.neutral.border};
  border-radius: 8px;
  padding: ${(props) => props.theme.spacing(2)};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export default Card;
