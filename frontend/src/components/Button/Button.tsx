// src/components/Button/Button.tsx

import React from "react";
import { Button as MUIButton, ButtonProps } from "@mui/material";

interface Props extends ButtonProps {
  // Add any custom props if needed
}

const Button: React.FC<Props> = ({ children, ...props }) => {
  return (
    <MUIButton variant="contained" color="primary" {...props}>
      {children}
    </MUIButton>
  );
};

export default Button;
