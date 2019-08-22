import React from 'react'
import s from '../css/Field.module.css'

const simpleField =(props)=>{
    const { input, className, placeholder, type, meta: { touched, error, warning } } = props;

    return (
        <div className={`${s.inputWrapper}${className?" "+className:''}`}>
            <input {...input} placeholder={placeholder} type={type} />
            {touched&&(error && <span>{error}</span>)}
        </div>
    )
}

export{simpleField};