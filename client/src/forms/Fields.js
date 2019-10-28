import React from 'react'
import {Field} from 'redux-form'
import s from '../css/Field.module.css'

const simpleField =(props)=>{
    const { input, className, placeholder, type, meta: { touched, error} } = props;

    return (
        <div className={`${s.inputWrapper}${className?" "+className:''}`}>
            <input {...input} placeholder={placeholder} type={type} />
            {touched&&(error && <span>{error}</span>)}
        </div>
    )
}

const createSimpleField = (name, type, placeholder, validateArr, classNames)=>{
    return <Field 
      className ={classNames}
      name={name}
      component={simpleField}
      type={type}
      placeholder={placeholder}
      validate={validateArr}
    />
}

const UploadFile = ({ input: {value: omitValue, ...inputProps }, meta: omitMeta, ...props }) => (
    <input type='file' {...inputProps} {...props} />
);

export{simpleField, createSimpleField,UploadFile};