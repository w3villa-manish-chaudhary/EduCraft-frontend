import counterSlice from '../../Redux/features/counterSlice';
import userSlice from '../../Redux/features/userSlice';


import { combineReducers} from '@reduxjs/toolkit';

 const rootReducer = combineReducers({
    counterSlice,
    userSlice
  })

  export default rootReducer;

  