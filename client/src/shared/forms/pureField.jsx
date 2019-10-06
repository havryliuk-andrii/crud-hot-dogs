import React from 'react'
import TooltipInput from './TooltipInput';

const pureField = ({
    input,
    label,
    type,
    placeholder,
    meta: { touched, error, warning }
  }) => (
    <div>
  
      <label>{label}</label>
      <TooltipInput>
        <input {...input} placeholder={placeholder} type={type} />
          {touched &&
            ((error && <div className="tooltip"><span>{error}</span></div>) ||
              (warning && <div className="tooltip"><span>{warning}</span></div>))}
      </TooltipInput>
  
    </div>
)

export default pureField; 