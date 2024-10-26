import React from 'react';
import { NavLink } from 'react-router-dom';
import "./MenuTab.css";

function MenuTab({NavLinkPath,menuText}) {
  return (
    <NavLink to={NavLinkPath} className="menuTab"> 
        {menuText}
    </NavLink>
  )
}

export default MenuTab