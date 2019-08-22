import React from 'react'
import { Route,withRouter } from 'react-router-dom';

import s from '../css/ContentPage.module.css'
import HotDogsListContainer from './ContainerComponents/HotDogsListContainer';
import CreateHotDog from './CreateHotDog';
import EditHotDog from './EditHotDog';
import EditDogsListContainer from './ContainerComponents/EditHotDogContainer';
import CreateHotDogContainer from './ContainerComponents/CreateHotDogContainer';



const ContentPage = (props) =>{
    return (
        <main>
           <Route exact path='/' render={()=><HotDogsListContainer />} />
           <Route path='/create' render={CreateHotDogContainer} />
           <Route path='/edit/:id' render={EditDogsListContainer} />
        </main>
    )   
}

export default ContentPage