import { createStore,combineReducers } from 'redux'
import {reducer as formReducer} from 'redux-form';

import HotDogsListPage from './redusers/hotDogsListPage';
import SideBar from './redusers/SideBarReduser';
import EditHotDogReducer from './redusers/EditHotDogReducer';
import CreateHotDogReducer from './redusers/CreateHotDogReducer';


const redusers = combineReducers({
    HotDogsListPage,
    SideBar,
    EditHotDogReducer,
    CreateHotDogReducer,
    form: formReducer
})

const store = createStore(redusers)
window.store = store;

export default store;