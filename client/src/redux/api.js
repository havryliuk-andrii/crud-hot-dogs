import store from './store';
import dal from '../DAL/dal';
import { setHotDogs,changeFetching , setIsNeed} from './redusers/hotDogsListPage';
import { editSuccess } from './redusers/EditHotDogReducer';
import { createSuccess } from './redusers/CreateHotDogReducer';
import { optionalFiltrationSuccess } from './redusers/OptionalFiltration';
import { setFilter,resetFilter } from './redusers/Filter';

const getHotDogs=async()=>{
    store.dispatch(changeFetching(true));
    const filter = store.getState().Filter.filter;
    if(!store.getState().HotDogsListPage.isNeed){
        const hotDogs = await dal.getHotDogs(filter).then(res=>res.data);
        store.dispatch(setHotDogs(hotDogs));
    }
    
}

const setFiltration=(filter)=>{
    store.dispatch(changeFetching(true));
    store.dispatch(setFilter(filter))
};

const resetFiltration=()=>{store.dispatch(resetFilter())};

const optionalFiltration =async(filters)=>{
    store.dispatch(changeFetching(true));
    store.dispatch(setIsNeed(true));
    store.dispatch(optionalFiltrationSuccess(true));
    const iNames=Object.keys(filters).filter(key=>key.substring(2,0)==="in");
    const iMasses=Object.keys(filters).filter(key=>key.substring(2,0)==="im");
    const counter =iNames.length;
    let tempIngredients=[];
    for(let i=0;i<counter;i++){
        tempIngredients.push({name:filters[iNames[i]],mass:filters[iMasses[i]],id:i});
    }
    const _filters={
        hotDogName:filters.hotDogName,
        countOfIngs:filters.countOfIngs,  
        minMass:filters.minMass, 
        maxMass:filters.maxMass, 
        minCost:filters.minCost, 
        maxCost:filters.maxCost, 
        ingredients:tempIngredients
    };
    const hotDogs = await dal.filterHotDog(_filters).then(res=>res.data);
    store.dispatch(setHotDogs(hotDogs));
    store.dispatch(setIsNeed(false));
    store.dispatch(optionalFiltrationSuccess(false));
}

const addHotDog=async(hdInfo,hdImg)=>{
    const hotDogInfo = vals2JSON(hdInfo)
    store.dispatch(changeFetching(true));
    store.dispatch(createSuccess(true));
    await dal.addHotDog(hotDogInfo,hdImg);
    getHotDogs();
    store.dispatch(createSuccess(false));
}

const deleteHotDog = async(id)=>{
    store.dispatch(changeFetching(true));
    await dal.deleteHotDog(id);
    getHotDogs();
}

const editHotDog = async(hdInfo,hdImg,id)=>{
    console.log("hdInfo")
    console.log(hdInfo)
    let editedHotDog = vals2JSON(hdInfo,id)
    store.dispatch(changeFetching(true));
    store.dispatch(editSuccess(true));
    await dal.editHotDog(editedHotDog,hdImg,id);
    getHotDogs();
    store.dispatch(editSuccess(false));
}

const vals2JSON = (values,id)=>{
    let hotDog = {};
    hotDog.name = values.hotDogName;
    hotDog.description = values.description;
    hotDog.image = values.image;
    hotDog.src = values.src;
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

export {
    getHotDogs, addHotDog, deleteHotDog,
    editHotDog, setFiltration, resetFiltration,
    optionalFiltration
};
