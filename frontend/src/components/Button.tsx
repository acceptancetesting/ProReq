// src/components/Button.tsx

import styled from "styled-components";

interface ButtonProps {
  primary?: boolean;
  space?: "projects" | "requirements" | "tickets" | "tests";
  size?: "large" | "medium" | "small";
  disabled?: boolean;
}

const Button = styled.button<ButtonProps>`
  background-color: ${(props) =>
    props.primary
      ? props.theme.colors.primary[props.space || "projects"]
      : "#FFFFFF"};
  color: ${(props) =>
    props.primary
      ? "#FFFFFF"
      : props.theme.colors.primary[props.space || "projects"]};
  border: 1px solid
    ${(props) => props.theme.colors.primary[props.space || "projects"]};
  padding: ${(props) => {
    switch (props.size) {
      case "large":
        return props.theme.spacing(2);
      case "small":
        return props.theme.spacing(1);
      default:
        return props.theme.spacing(1.5);
    }
  }};
  font-size: ${(props) => {
    switch (props.size) {
      case "large":
        return "18px";
      case "small":
        return "14px";
      default:
        return "16px";
    }
  }};
  cursor: pointer;
  border-radius: 4px;
  font-weight: 600;
  &:hover {
    background-color: ${(props) =>
      props.primary
        ? props.theme.colors.primary[props.space || "projects"]
        : props.theme.colors.neutral.lightGray};
  }
  &:disabled {
    background-color: ${(props) => props.theme.colors.neutral.border};
    color: ${(props) => props.theme.colors.neutral.text};
    cursor: not-allowed;
  }
`;

export default Button;
