import React from 'react'
import "./popup.css"
// import InputText from '../inputs/text/InputText'


function popup({ titel, onClose, children}) {
  return (
    <div className='popup_cover'>
        <div className="popup_box">
            <div className="popup_info">
              <p>{titel}</p>
              <button className="popup_cros_button" 
              onClick={onClose}
              >
                x
              </button>
            </div>
            <div className="popup_main">
              <div className="popup_content">
                {children}
              </div>
            </div>
        </div>
    </div>
  )
}

export default popup