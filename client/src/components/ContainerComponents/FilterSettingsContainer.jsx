import React from 'react'
import FilterSettings from '../FilterSettings';
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

const FilterSettingsContainer = (props) =>{
        
        const ComponentA =(props)=>{
            console.log("ComponentA")
            if(props.isOptionalFiltrationSuccess) return <Redirect to="/" />
            return <FilterSettings {...props}/>
        }

        const mstp = (state)=>({
            isOptionalFiltrationSuccess:state.OptionalFiltrationReduser.isOptionalFiltrationSuccess
        })

        const RedirectedComponentA = connect(mstp,{})(ComponentA);

    return <RedirectedComponentA />
}

export default FilterSettingsContainer