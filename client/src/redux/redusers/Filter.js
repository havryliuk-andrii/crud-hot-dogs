const SET_FILTER = "SET_FILTER";
const RESET_FILTER = "RESET_FILTER";

const initState = {
    filter:null
};


const Filter = (state = initState, action) => {
    switch (action.type) {

        case SET_FILTER:{
            return{
                ...state,
                filter:action.filter
            }
        }

        case RESET_FILTER:{
            return{
                ...state,
                filter:null
            }
        }

        default: return state;
    }
}

const setFilter=(filter)=>({
    type : SET_FILTER,
    filter
})

const resetFilter=()=>({
    type : RESET_FILTER,
})


export default Filter;
export {setFilter,resetFilter};