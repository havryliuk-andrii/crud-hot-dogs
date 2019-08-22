import * as Axios from "axios";

//to get json arr of hotDogs 
const dal ={

    getHotDogs:()=>{
        return Axios.get('/api/getHotDogs');
    },

    addHotDog:(hotDog)=>{
        return Axios.post('/api/addHotDog',  hotDog);
    },

    deleteHotDog:(id)=>{
        return Axios.delete(`/api/deleteHotDog?id=${id}`,);
    },

    editHotDog:(editedHotDog,id)=>{
        return Axios.put(`/api/editHotDog?id=${id}`,editedHotDog);
    }

}


export default dal;
