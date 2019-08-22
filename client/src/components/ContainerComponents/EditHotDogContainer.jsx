import React,{useEffect,useState} from 'react'
import {connect} from 'react-redux'
import {Redirect,withRouter} from 'react-router-dom'
import HotDogsList from '../HotDogsList'
import withPreloader from '../../HOCs/WithPreloader';
import { getHotDog } from '../../redux/api';
import EditHotDog from '../EditHotDog';
import { compose } from 'redux';
import { editSuccess } from '../../redux/redusers/EditHotDogReducer';
// import { getHotDogs } from '../../DAL/API';


const EditDogsListContainer = (props) =>{
    const mstp=(state)=>({
        hotDog:state.HotDogsListPage.hotDogs?state.HotDogsListPage.hotDogs.filter(hotDog=>hotDog.id==props.match.params.id)[0]:null,
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