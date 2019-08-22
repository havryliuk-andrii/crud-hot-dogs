const EDIT_SUCCESS = "EDIT_SUCCESS";

const initState = {
    isEditedSuccess:false,
};


const EditReduser = (state = initState, action) => {
    switch (action.type) {

        case EDIT_SUCCESS:{
            return{
                ...state,
                isEditedSuccess:action.flag,
            }
        }

        default: return state;
    }
}

const editSuccess =(flag)=>({
    type : EDIT_SUCCESS,
    flag
})

export default EditReduser;
export {editSuccess};