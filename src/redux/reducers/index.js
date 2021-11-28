import { combineReducers } from 'redux'
import user from './user'

// const Reducers= combineReducers({
//     userState:user
// })
// export default Reducers

// const persistConfig = {
//     key: "root",
//     storage: AsyncStorage,
//     timeout: null,
//     // blacklist: ['errorMsg']
    
//   };

const Reducers= combineReducers({
    userState:user
})
export default Reducers