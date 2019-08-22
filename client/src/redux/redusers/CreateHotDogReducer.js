const CREATE_SUCCESS = "CREATE_SUCCESS";

const initState = {
    isCreatedSuccess:false,
};


const CreateHotDogReducer = (state = initState, action) => {
    switch (action.type) {

        case CREATE_SUCCESS:{
            return{
                ...state,
                isCreatedSuccess:action.flag,
            }
        }

        default: return state;
    }
}

const createSuccess =(flag)=>({
    type : CREATE_SUCCESS,
    flag
})

export default CreateHotDogReducer;
export {createSuccess};