import store from './store';
import dal from '../DAL/dal';
import { setHotDogs,changeFetching } from './redusers/hotDogsListPage';
import { editSuccess } from './redusers/EditHotDogReducer';
import { createSuccess } from './redusers/CreateHotDogReducer';
import { setFilter,resetFilter } from './redusers/Filter';

const getHotDogs=async()=>{
    store.dispatch(changeFetching(true));
    const filter = store.getState().Filter.filter;
    const hotDogs = await dal.getHotDogs(filter).then(res=>res.data);
    store.dispatch(setHotDogs(hotDogs));
}

const setFiltration=(filter)=>{
    store.dispatch(changeFetching(true));
    store.dispatch(setFilter(filter))
};

const resetFiltration=()=>{store.dispatch(resetFilter())};

const addHotDog=async(values)=>{
    const hotDog = vals2JSON(values)
    store.dispatch(changeFetching(true));
    store.dispatch(createSuccess(true));
    await dal.addHotDog(hotDog);
    getHotDogs();
    store.dispatch(createSuccess(false));
}

const deleteHotDog = async(id)=>{
    store.dispatch(changeFetching(true));
    await dal.deleteHotDog(id);
    getHotDogs();
}

const editHotDog = async(values,id)=>{
    let editedHotDog = vals2JSON(values,id)
    store.dispatch(changeFetching(true));
    store.dispatch(editSuccess(true));
    await dal.editHotDog(editedHotDog,id);
    getHotDogs();
    store.dispatch(editSuccess(false));
}

const vals2JSON = (values,id)=>{
    let hotDog = {};
    hotDog.name = values.hotDogName;
    hotDog.description = values.description;
    const iNames=Object.keys(values).filter(key=>key.substring(2,0)==="in");
    const iMasses=Object.keys(values).filter(key=>key.substring(2,0)==="im");
    const counter =iNames.length;
    let tempIngredients=[];
    for(let i=0;i<counter;i++){
        tempIngredients.push({name:values[iNames[i]],mass:values[iMasses[i]],id:i});
    }
    hotDog.ingredients=tempIngredients;
    const mass = tempIngredients.map(ing=>ing.mass).reduce((acumulator,currVal)=>+acumulator + +currVal);
    hotDog.mass=mass;
    hotDog.cost=mass*2;
    if(id)hotDog.id=id;
    return hotDog;
}

export {getHotDogs,addHotDog,deleteHotDog,editHotDog,setFiltration,resetFiltration};
