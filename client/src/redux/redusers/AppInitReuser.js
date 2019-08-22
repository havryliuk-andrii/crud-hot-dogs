const CHANGE_FETCHING = "CHANGE_FETCHING";
const SET_HOT_DOGS = "SET_HOT_DOGS";

const initState = {
    initialized:false
};


const HotDogsListPage = (state = initState, action) => {
    switch (action.type) {

        case CHANGE_FETCHING:{
            return{
                ...state,
                isFetching:action.isFetching,
            }
        }

        case SET_HOT_DOGS:{
            return{
                ...state,
                hotDogs:action.hotDogs,
                isFetching:false
            }
        }

        default: return state;
    }
}

const changeFetching =(isFetching)=>({
    type : CHANGE_FETCHING,
    isFetching
})
const setHotDogs =(hotDogs)=>({
    type : SET_HOT_DOGS,
    hotDogs
})

export default HotDogsListPage;
export {changeFetching, setHotDogs};