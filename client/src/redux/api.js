import store from './store';
import dal from '../DAL/dal';
import { setHotDogs,changeFetching } from './redusers/hotDogsListPage';
import { editSuccess } from './redusers/EditHotDogReducer';
import { createSuccess } from './redusers/CreateHotDogReducer';

const getHotDogs=async()=>{
    store.dispatch(changeFetching(true));
    const hotDogs = await dal.getHotDogs().then(res=>res.data);
    store.dispatch(setHotDogs(hotDogs));
}

const addHotDog=async(values)=>{
    const hotDog = vals2JSON(values)
    store.dispatch(changeFetching(true));
    store.dispatch(createSuccess(true));
    const postRes = await dal.addHotDog(hotDog);
    getHotDogs();
    store.dispatch(createSuccess(false));
}

const deleteHotDog = async(id)=>{
    store.dispatch(changeFetching(true));
    const postRes = await dal.deleteHotDog(id);
    getHotDogs();
}

const editHotDog = async(values,id)=>{
    let editedHotDog = vals2JSON(values,id)
    store.dispatch(changeFetching(true));
    store.dispatch(editSuccess(true));
    const postRes = await dal.editHotDog(editedHotDog,id);
    getHotDogs();
    store.dispatch(editSuccess(false));
}

const vals2JSON = (values,id)=>{
    let hotDog = {};
    hotDog.name = values.hotDogName;
    hotDog.description = values.description;
    const iNames=Object.keys(values).filter(key=>key.substring(2,0)=="in");
    const iMasses=Object.keys(values).filter(key=>key.substring(2,0)=="im");
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
// const getHotDog=(id)=>{
//     // return id?id>0?store.getState().HotDogsListPage.hotDogs.filter(hotDog=>hotDog.id===id)[0]:{}:{};
//     const hotDogs = store.getState().HotDogsListPage.hotDogs;
//     const hotDog = hotDogs?store.getState().HotDogsListPage.hotDogs.filter(hotDog=>hotDog.id==id)[0]:null;
//     console.log(hotDog); 
//     return hotDog;
// }

export {getHotDogs,addHotDog,deleteHotDog,editHotDog};
