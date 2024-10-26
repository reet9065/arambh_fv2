import React, { useState } from 'react'
import "./Navbar.css"
import { SCHOOL_LOGO , MENU_OPEN_ICON, BOTTOM_POINTING_UNION, MENU_CLOSE_ICON } from '../../assets/assets'
import MenuTab from '../menuTab/MenuTab'

const Menu = [
  {
    NavLinkPath:'/',
    menuText:'Home'
  },
  {
    NavLinkPath:'/subjectclass/subject',
    menuText:'Subject - Class'
  },
]


function Navbar() {

  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className='Navbar'>
      <div className="menu">
        <img src={showMenu ? MENU_CLOSE_ICON : MENU_OPEN_ICON} alt="logo" 
        onClick={() => setShowMenu(!showMenu)}/>
        {showMenu && <div className="menuItemsContainer">
          {Menu.map((menuItem)=> {
            return (<MenuTab NavLinkPath={menuItem.NavLinkPath} menuText={menuItem.menuText}/>);
          })}
        </div>}
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