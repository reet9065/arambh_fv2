import AppBar from "@mui/material/AppBar";
import MenuIcon from "@mui/icons-material/Menu";
import React, { useState } from "react";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { SCHOOL_LOGO } from "../../assets/assets";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import { NavLink } from "react-router-dom";

const menuItems = [
  {
    to: "/",
    menuText: "Home",
  },
  {
    to: "/subjectclass/subject",
    menuText: "Subject - class",
  },
];

function Navbar() {
  const [anchorEl, setAnchorEl] = useState();
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar sx={{ width: "100%" }} position="sticky">
      <Toolbar sx={{ display: "flex", alignItems: "center" }}>
        <MenuIcon
          sx={{ mr: "16px", cursor: "pointer" }}
          id="app-menu-button"
          aria-controls={open ? "app-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        />
        <Menu
          id="app-menu"
          MenuListProps={{
            "aria-labelledby": "app-menu-button",
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          TransitionComponent={Fade}
        >
          {menuItems.map((menuItem, i) => {
            return (
              <MenuItem key={i} onClick={handleClose}  component={NavLink} to={menuItem.to}>
                {menuItem.menuText}
              </MenuItem>
            );
          })}
        </Menu>
        <Box>
          <img src={SCHOOL_LOGO} style={{ width: "48px" }} alt="logo" />
          <Typography></Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
