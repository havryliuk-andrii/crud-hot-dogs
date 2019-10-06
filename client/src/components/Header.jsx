import React from 'react'
import styled from 'styled-components'
import { Field, reduxForm } from 'redux-form'
import TooltipInput from '../shared/forms/TooltipInput';
import '../css/Header.module.css'
import {colors,lightenDarken} from '../shared/styles/styled';


const Filter = styled.form`
height:100%;
padding: 1% 0 1% 0;
margin-left:4em;
`;
const FilterInput = styled.input`
background: #232C49;
height:100%;
color:white;
`
const FieldWrap = styled.div`
height:100%;
`
const ToolTiped = styled.div`
height:100%;
display:grid;
`
const pureField = ({
input,
label,
type,
placeholder,
meta: { touched, error, warning }
}) => {
    
return(
<FieldWrap>

<label>{label}</label>
<ToolTiped>
<FilterInput {...input} placeholder={placeholder} type={type} />
  {touched &&
    ((error && <div className="tooltip"><span>{error}</span></div>) ||
      (warning && <div className="tooltip"><span>{warning}</span></div>))}
</ToolTiped>

</FieldWrap>
)
}


const _Filter = (props)=>{
    const { handleSubmit, pristine, reset, submitting } = props;
    const submitFilter = () =>{
        //api get filtered hotdogs
    }
    return (
        <Filter onSubmit={handleSubmit(submitFilter)}>
            <Field 
                name="filter"
                type="text"
                component={pureField}
                placeholder="Filter"
                validate={null}
                warn={null}
            />
        </Filter>
    )
}
const FilterForm = reduxForm({form: 'FilterForm'})(_Filter);
const Header = (props) =>{
    return (
        <header>
            <div id="logo">
                CRUD-HOT-DOGS
            </div>
            <FilterForm />
        </header>
    )
}

export default Header