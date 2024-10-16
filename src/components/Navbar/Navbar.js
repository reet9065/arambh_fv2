import React from 'react'
import "./Navbar.css"
import { SCHOOL_LOGO , MENU_OPEN_ICON, BOTTOM_POINTING_UNION } from '../../assets/assets'


function Navbar() {
  return (
    <div className='Navbar'>
      <div className="menu">
        <img src={MENU_OPEN_ICON} alt="logo" />
      </div>
      <div className="logo_name">
        <img src={SCHOOL_LOGO} alt="logo" className="logo" />
        <p className='name'>Aarambh Public School</p>
      </div>
      <div className="profile_menu">
          <div className="profile">
            <img src={SCHOOL_LOGO} alt="profile"/>
          </div>
          <img src={BOTTOM_POINTING_UNION} alt="" className="drop_down_menu" />
      </div>
    </div>
  )
}

export default Navbar