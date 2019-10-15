import React from 'react'

import SideBar from '../SideBar';
import {compose} from 'redux';
import { connect } from 'react-redux';
import {changeFetching} from '../../redux/redusers/hotDogsListPage';
import { resetFiltration } from '../../redux/api';


const SideBarContainer = (props) =>{

    const TempContainer =(props)=>{
    
        const readHandle=()=>{
            props.changeFetching(true);
            resetFiltration();
        };
    
        return <SideBar 
            readHandle={readHandle}
        />;
    }
    
    
    const MappedSideBar = compose(
        connect(null,{changeFetching}),
    )(TempContainer)

    return <MappedSideBar />
}

export default SideBarContainer