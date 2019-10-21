const OPTIONAL_FILTRATION_SUCCESS = "OPTIONAL_FILTRATION/OPTIONAL_FILTRATION_SUCCESS";

const initState = {
    isOptionalFiltrationSuccess:false,
};


const OptionalFiltrationReduser = (state = initState, action) => {
    switch (action.type) {

        case OPTIONAL_FILTRATION_SUCCESS:{
            return{
                ...state,
                isOptionalFiltrationSuccess:action.flag,
            }
        }

        default: return state;
    }
}

const optionalFiltrationSuccess =(flag)=>({
    type : OPTIONAL_FILTRATION_SUCCESS,
    flag
})

export default OptionalFiltrationReduser;
export {optionalFiltrationSuccess};