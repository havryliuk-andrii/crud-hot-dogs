import * as Axios from "axios";

//to get json arr of hotDogs 
const dal ={

    getHotDogs:(filter)=>{
        return Axios.get(`/api/getHotDogs?filter=${filter}`);
    },

    addHotDog:(hdInfo,hdImg)=>{
        console.log(hdInfo)
        console.log(hdImg)
        const fd = new FormData();
        fd.append("hdInfo",JSON.stringify(hdInfo));
        fd.append("hdimg",hdImg);
        return Axios.post('/api/addHotDog',  fd);
    },

    filterHotDog:(filters)=>{
        return Axios.put('/api/getFilteredHotDogs',  filters);
    },

    deleteHotDog:(id)=>{
        return Axios.delete(`/api/deleteHotDog?id=${id}`,);
    },

    editHotDog:(hdInfo,hdImg,id)=>{
        const fd = new FormData();
        fd.append("hdInfo",JSON.stringify(hdInfo));
        fd.append("hdimg",hdImg);
        return Axios.put(`/api/editHotDog?id=${id}`,fd);
    }

}


export default dal;
