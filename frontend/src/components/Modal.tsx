// src/components/Modal.tsx

import React from "react";
import styled from "styled-components";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContainer = styled.div`
  background-color: #ffffff;
  border-radius: 8px;
  padding: ${(props) => props.theme.spacing(3)};
  max-width: 500px;
  width: 100%;
`;

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ children, onClose }) => (
  <Overlay onClick={onClose}>
    <ModalContainer onClick={(e) => e.stopPropagation()}>
      {children}
    </ModalContainer>
  </Overlay>
);

export default Modal;
