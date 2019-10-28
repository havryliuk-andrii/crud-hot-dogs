import React from 'react'
import TooltipInput from './TooltipInput';
import {Field} from 'redux-form'

const pureField = ({input, label,type,
    placeholder, meta: { touched, error, warning }
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

const createPureField = (name, type, placeholder, validateArr, classNames)=>{
  return <Field 
    className ={classNames}
    name={name}
    component={pureField}
    type={type}
    placeholder={placeholder}
    validate={validateArr}
  />
}


export default pureField; 
export {createPureField} 
