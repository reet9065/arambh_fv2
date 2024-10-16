import React from 'react'
import "./Loading.css"
import { LOADING_GIF } from '../../assets/assets'

function Loading() {
  return (
    <div className='loading_cover'>
        <div className="loading_box">
            <img src={LOADING_GIF} alt="Loading..." />
        </div>
    </div>
  )
}

export default Loading