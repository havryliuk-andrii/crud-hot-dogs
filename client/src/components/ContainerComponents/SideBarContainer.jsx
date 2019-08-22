import React from 'react'

import SideBar from '../SideBar';
import {compose} from 'redux';
import { deleteHotDog, addHotDog } from '../../redux/api';
import { connect } from 'react-redux';
import {changeFetching} from '../../redux/redusers/hotDogsListPage';


const SideBarContainer = (props) =>{

    const TempContainer =(props)=>{
        const createHandle=()=>{
            // addHotDog();
        };
    
        const readHandle=()=>{
            props.changeFetching(true);
        };
    
        const updateHandle=()=>{};
    
        const deleteHandle=()=>{
            deleteHotDog();
        };
        return <SideBar 
            createHandle={createHandle}
            readHandle={readHandle}
            updateHandle={updateHandle}
            deleteHandle={deleteHandle}
        />;
    }
    
    
    const MappedSideBar = compose(
        connect(null,{changeFetching}),
    )(TempContainer)

    return <MappedSideBar />
}

export default SideBarContainer