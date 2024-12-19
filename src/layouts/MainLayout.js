import React from "react";
import { Outlet, Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";

function MainLayout() {
  return (
    <div>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            NHL Stats App
          </Typography>
          <Box>
            <Button color="inherit" component={Link} to="/">
              Player Comparison
            </Button>
            <Button color="inherit" component={Link} to="/rivalry">
              Rivalry Checker
            </Button>
            <Button color="inherit" component={Link} to="/draft">
              Draft Comparison
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout;
