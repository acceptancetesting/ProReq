import React from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Sidebar from "./SideNav"; // Ensure this component exists
import TopNav from "./TopNav"; // Ensure this component exists

const LayoutContainer = styled.div`
  display: flex;
  height: 100vh;
`;

const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const PageContent = styled.div`
  padding: ${(props) => props.theme.spacing(3)};
  flex: 1;
  overflow-y: auto;
`;

const MainLayout: React.FC = () => {
  return (
    <LayoutContainer>
      <Sidebar />
      <Content>
        <TopNav />
        <PageContent>
          <Outlet /> {/* This renders the child route */}
        </PageContent>
      </Content>
    </LayoutContainer>
  );
};

export default MainLayout;
