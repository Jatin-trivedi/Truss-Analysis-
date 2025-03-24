import { AppBar, Toolbar, Typography } from "@mui/material";

const Footer = () => {
  return (
    <AppBar position="static" color="primary" sx={{ top: "auto", bottom: 0 }}>
      <Toolbar>
        <Typography variant="body1" sx={{ flexGrow: 1, textAlign: "center" }}>
            This is fast and simple truss analysis tool.<br/>
           © 2025 Truss Project 
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Footer;
