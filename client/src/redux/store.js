import { createStore,combineReducers } from 'redux'
import {reducer as formReducer} from 'redux-form';

import HotDogsListPage from './redusers/hotDogsListPage';
import SideBar from './redusers/SideBarReduser';
import EditHotDogReducer from './redusers/EditHotDogReducer';
import CreateHotDogReducer from './redusers/CreateHotDogReducer';
import Filter from './redusers/Filter';
import OptionalFiltrationReduser from "./redusers/OptionalFiltration";

const redusers = combineReducers({
    HotDogsListPage,
    SideBar,
    Filter,
    EditHotDogReducer,
    CreateHotDogReducer,
    OptionalFiltrationReduser,
    form: formReducer
})

const store = createStore(redusers)
window.store = store;

export default store;