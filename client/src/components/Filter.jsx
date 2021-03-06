import React from 'react'   
import search from '../assets/search.png';
import {NavLink} from 'react-router-dom'
import {setFiltration} from '../redux/api'
import {alphaNumeric} from '../shared/forms/validation'
import styled from 'styled-components'
import { Field, reduxForm } from 'redux-form'
import more from '../assets/more.png'
const Filter = styled.form`
    height:100%;
    align-items:center;
    position: relative;
    padding: 1% 0 1% 0;
    margin-left:4em;

    a::after{
        display: none !important;
    }
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

    .tooltip{
        position: absolute;
        left: 120%;
        top:0;
        font-size:.6rem;
        white-space: nowrap;
    }
`

const SearchBtn = styled.button`
    background-color:none;
    outline:none;
    border:none;
    background-image:${'url('+search+')'};
    background-repeat:no-repeat;
    background-color:transparent;
    background-size:contain;
    background-position:center;
    position: absolute;
    left:105%;
    bottom:10%;
    height:80%;
    padding-left:.6rem;
    cursor: pointer;
    transition: all .3s;

    &:hover{
        transform: scale(1.3);
    }
`
const Settings= styled(NavLink)`
position: absolute;
height: 80%;
bottom:10%;
left: -10%;
width:1rem;
background-color: #fff;
background-color:none;
background-image:${'url('+more+')'};
background-repeat:no-repeat;
background-color:transparent;
background-size:contain;
background-position:center;
transition : all .3s;
border:none;
&:hover{
    transform: scale(1.5);
    border:none;
}
`
const pureField = ({
    input,label,
    type,placeholder,
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
    const submitFilter = (values) =>{
        setFiltration(values.filter);
    }
    return (
        <Filter onSubmit={handleSubmit(submitFilter)}>
            <Settings to="/filter" />
            <Field 
                name="filter"
                type="text"
                component={pureField}
                placeholder="Filter"
                validate={alphaNumeric}
                warn={null}
            />
            <NavLink to="/"><SearchBtn onClick={()=>handleSubmit(submitFilter)()}/></NavLink>
        </Filter>
    )
}

export default reduxForm({form: 'FilterForm'})(_Filter);