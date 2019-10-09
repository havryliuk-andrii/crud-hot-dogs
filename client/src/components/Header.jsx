import React from 'react'
import styled from 'styled-components'
import { Field, reduxForm } from 'redux-form'
import '../css/Header.module.css'
import search from '../assets/search.png';

const Filter = styled.form`
height:100%;
display:grid;
align-items:center;
position: relative;
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
    const { handleSubmit, submitting } = props;
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
            <SearchBtn />
        </Filter>
    )
}
const SearchBtn = styled.button`
background-color:none;
outline:none;
border:none;
    /* background-image:${'url('+search+')'}; */
    background-repeat:no-repeat;
    background-size:contain;
    position: absolute;
    left:100%;
    bottom:27%;
    height:46%;
    padding-left:.6rem;
    cursor: pointer;
`
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