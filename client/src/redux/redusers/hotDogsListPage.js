const CHANGE_FETCHING = "CHANGE_FETCHING";
const SET_HOT_DOGS = "SET_HOT_DOGS";
const SET_IS_NEED = "SET_IS_NEED";

const initState = {
    isFetching:false,
    hotDogs:null,
    isNeed:false
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

        case SET_IS_NEED:{
            return{
                ...state,
                isNeed:action.flag
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
const setIsNeed =(flag)=>({
    type : SET_IS_NEED,
    flag
})

export default HotDogsListPage;
export {changeFetching, setHotDogs, setIsNeed};