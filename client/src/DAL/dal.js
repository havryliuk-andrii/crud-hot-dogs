import * as Axios from "axios";

//to get json arr of hotDogs 
const dal ={

    getHotDogs:(filter)=>{
        return Axios.get(`/api/getHotDogs?filter=${filter}`);
    },

    addHotDog:(hotDog)=>{
        return Axios.post('/api/addHotDog',  hotDog);
    },

    filterHotDog:(filters)=>{
        return Axios.put('/api/getFilteredHotDogs',  filters);
    },

    deleteHotDog:(id)=>{
        return Axios.delete(`/api/deleteHotDog?id=${id}`,);
    },

    editHotDog:(editedHotDog,id)=>{
        return Axios.put(`/api/editHotDog?id=${id}`,editedHotDog);
    }

}


export default dal;
