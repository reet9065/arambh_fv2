import React from 'react'
import './SubjectTag.css'

function SubjectTag({subName,subCode}) {
  return (
    <div className='Subject_tag'>
        <p className='Subject_name'>{subName}</p>
        <p className='Subject_code'>{subCode}</p>
    </div>
  )
}

export default SubjectTag