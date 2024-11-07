// src/pages/Dashboard.tsx

import React from "react";
import { AppBar, Toolbar, Typography, Container } from "@mui/material";

const Dashboard: React.FC = () => {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">ProReq Dashboard</Typography>
        </Toolbar>
      </AppBar>
      <Container>
        <Typography variant="h4" gutterBottom>
          Welcome to ProReq
        </Typography>
        {/* Add dashboard content here */}
      </Container>
    </>
  );
};

export default Dashboard;
