import React from 'react'
import {NavLink } from 'react-router-dom';
import "./SubNav.css";

function SubNav({to,text}) {
  return (
    <NavLink className='sub_nav_tab' to={to}> 
        {text} 
    </NavLink>
  )
}

export default SubNav