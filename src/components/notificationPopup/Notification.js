import React, { useEffect } from 'react'
import "./Notification.css"
import { WARNING_ICON,SUCCESS_ICON } from '../../assets/assets'

function Notification({notification , closeNotification, duration = 3000}) {

    console.log(notification);
    const {type, message , closeBtn} = notification;

    useEffect(()=> {
        const notification_timer = setTimeout(() => {
            closeNotification();
        }, duration);

        return ()=>{
            clearTimeout(notification_timer);
        }
    },[duration,closeNotification]); // just for removing the warning

    const getNotificationIcon = (type = "warning")=>{
        switch (type) {
            case "warning":
                return WARNING_ICON
            case "success":
                return SUCCESS_ICON

            default:
                return WARNING_ICON;
        }
    }

    return (
        <div className='notifiation' style={{backgroundColor: type === 'success' ? "#567B08" : "#B62B28"}}>
            <div className='notification_content'>
                <img src={getNotificationIcon(type)} alt="[i]" className="notification_icon"/>
                <p className="notification_text">
                    {message}
                </p>
            </div>

            {closeBtn && <button 
            className='notification_cross_button' onClick={closeNotification}>
                x
            </button>}
        </div>
    )
}

export default Notification