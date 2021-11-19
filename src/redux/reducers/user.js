// import { USER_STATE_CHANGE } from "../constants";

const initalState={
    currentUser:null
}

export default user = (state = initalState, action) =>{
    // console.log('action',action)
    switch(action.type){
        case 'USER_STATE_CHANGE':
            return{
                ...state,
                currentUser:action.currentUser
            }
            default:
                return state
    }
}