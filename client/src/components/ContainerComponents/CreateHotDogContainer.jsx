import React from 'react'
import CreateHotDog from '../CreateHotDog';
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

const CreateHotDogContainer = (props) =>{

    const mstp=(state)=>({isCreatedSuccess:state.CreateHotDogReducer.isCreatedSuccess})
    const RediretedCreateHotDog=(props)=>{
        if(props.isCreatedSuccess)return <Redirect to='/'/>
        return <CreateHotDog />
    }
    const MappedCreateHotDog = connect(mstp,{})(RediretedCreateHotDog);

    return <MappedCreateHotDog />
}

export default CreateHotDogContainer