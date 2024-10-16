import React from 'react'

function InputText({name,label,helping_text,required ,onChange,value}) {

  return (
    <div className='input_text'>
        <div className="label_required">
            <label htmlFor="input_type_text"> {label} </label>
            {required && <p>*</p>}
        </div>
        <input 
            type="text" 
            name={name} 
            id="input_type_text" 
            onChange={(e)=> onChange(e)}
            value={value || ""}
            required={required ? required : false}
        />

        {helping_text && <p className="helper_text info">don't leave empty</p>}
        
    </div>
  )
}

export default InputText