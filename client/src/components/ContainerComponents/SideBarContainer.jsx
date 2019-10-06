import React from 'react'

import SideBar from '../SideBar';
import {compose} from 'redux';
import { connect } from 'react-redux';
import {changeFetching} from '../../redux/redusers/hotDogsListPage';


const SideBarContainer = (props) =>{

    const TempContainer =(props)=>{
    
        const readHandle=()=>{
            props.changeFetching(true);
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