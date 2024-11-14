// src/components/AppLayout.tsx

import React from "react";
import SideNav from "./SideNav";
import TopNav from "./TopNav";
import styled from "styled-components";

const Content = styled.div`
  margin-left: 250px;
  margin-top: 60px;
  padding: ${(props) => props.theme.spacing(2)};
`;

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => (
  <>
    <SideNav />
    <TopNav />
    <Content>{children}</Content>
  </>
);

export default AppLayout;
