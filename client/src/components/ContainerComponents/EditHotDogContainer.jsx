import React from 'react'
import {connect} from 'react-redux'
import {Redirect,withRouter} from 'react-router-dom'
import EditHotDog from '../EditHotDog';

import { editSuccess } from '../../redux/redusers/EditHotDogReducer';


const EditDogsListContainer = (props) =>{
    const mstp=(state)=>({
        hotDog:state.HotDogsListPage.hotDogs?state.HotDogsListPage.hotDogs.filter(hotDog=>+hotDog.id===+props.match.params.id)[0]:null,
        isEditedSuccess:state.EditHotDogReducer.isEditedSuccess
    })

    const MappedEditHotDog =(props)=>{
        if(!props.hotDog)return <Redirect to='/' />
        if(props.isEditedSuccess) return <Redirect to='/' />
        return <EditHotDog {...props}/>
    } 

    const TempMapped = connect(mstp,{editSuccess})(withRouter(MappedEditHotDog)) 
    
    return <TempMapped />; 
}


export default EditDogsListContainer