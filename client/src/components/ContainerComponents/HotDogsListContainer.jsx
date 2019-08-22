import React,{useEffect} from 'react'
import {connect} from 'react-redux'

import HotDogsList from '../HotDogsList'
import withPreloader from '../../HOCs/WithPreloader';
import { getHotDogs, deleteHotDog, editHotDog } from '../../redux/api';
// import { setHotDogs } from '../../redux/redusers/hotDogsListPage';
// import { getHotDogs } from '../../DAL/API';


const HotDogsListContainer = (props) =>{
    useEffect(()=>{
        getHotDogs();
    })

    const deleteHandler=(id)=>{
        deleteHotDog(id);
    }

    const editHandler=(id)=>{
        // editHotDog(id);
    }

    const mstp =(state)=>({
        hotDogs:state.HotDogsListPage.hotDogs,
        deleteHandler,
        editHandler
    })

    const mstp2Preload=(state)=>({
        isFetching:state.HotDogsListPage.isFetching,
    })
    
    const MapedHotDogsList= connect(mstp2Preload)(withPreloader(connect(mstp)(HotDogsList)));
    
    return <MapedHotDogsList />; 
}


export default HotDogsListContainer