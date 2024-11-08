// src/components/Input/Input.tsx

import React from "react";
import { TextField } from "@mui/material";
import { TextFieldProps } from "@mui/material/TextField";

type Props = TextFieldProps & {
  // You can add custom props here if needed
};

const Input: React.FC<Props> = (props) => {
  return <TextField variant="outlined" fullWidth {...props} />;
};

export default Input;
