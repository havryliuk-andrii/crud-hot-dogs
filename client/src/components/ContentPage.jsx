import React from 'react'
import { Route} from 'react-router-dom';

import '../css/ContentPage.module.css'
import HotDogsListContainer from './ContainerComponents/HotDogsListContainer';
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