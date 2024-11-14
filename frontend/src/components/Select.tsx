// src/components/Card.tsx

import styled from "styled-components";

const Select = styled.select`
  padding: ${(props) => props.theme.spacing(1)};
  font-size: ${(props) => props.theme.typography.body.fontSize};
  border: 1px solid ${(props) => props.theme.colors.neutral.border};
  border-radius: 4px;
  width: 100%;
  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.colors.primary.projects};
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.2);
  }
`;

export default Select;
