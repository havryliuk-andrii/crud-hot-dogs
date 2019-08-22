// // const CHANGE_FETCHING = "CHANGE_FETCHING";
// const REDIRECT_TO_LIST = "REDIRECT_TO_LIST";

// const initState = {
//     isFetching:false,
//     redirectToList:false
// };


// const ContentReduser = (state = initState, action) => {
//     switch (action.type) {

//         case CHANGE_FETCHING:{
//             return{
//                 ...state,
//                 isFetching:action.isFetching,
//             }
//         }

//         case REDIRECT_TO_LIST:{
//             return{
//                 ...state,
//                 redirectToList:action.flag,
//             }
//         }

//         default: return state;
//     }
// }

// const changeFetching =(isFetching)=>({
//     type : CHANGE_FETCHING,
//     isFetching
// })
// const redirectToList =(flag)=>({
//     type : REDIRECT_TO_LIST,
//     flag
// })

// export default ContentReduser;
// export {changeFetching, redirectToList};