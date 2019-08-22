const DATA_IS_FETHING = "DATA_IS_FETHING";
const DATA_FETCHED = "DATA_FETCHED";

const initState = {
    isFetching:false
};


const SideBarReducer = (state = initState, action) => {
    switch (action.type) {

        case DATA_IS_FETHING:{
            return{
                ...state,
                isFetching:true,
            }
        }

        case DATA_FETCHED:{
            return{
                ...state,
                isFetching:false
            }
        }

        default: return state;
    }
}

const dataIsFetching =()=>({
    type : DATA_IS_FETHING,
})
const dataFetched =()=>({
    type : DATA_FETCHED,
})

export default SideBarReducer;
export {dataIsFetching, dataFetched};