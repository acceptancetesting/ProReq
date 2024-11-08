// src/components/Modal/Modal.tsx

import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogProps,
} from "@mui/material";

interface Props extends DialogProps {
  title: string;
  actions?: React.ReactNode;
}

const Modal: React.FC<Props> = ({ title, actions, children, ...props }) => {
  return (
    <Dialog {...props}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      {actions && <DialogActions>{actions}</DialogActions>}
    </Dialog>
  );
};

export default Modal;
