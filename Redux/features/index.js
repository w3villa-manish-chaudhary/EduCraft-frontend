import counterSlice from '../../Redux/features/counterSlice';
import { combineReducers} from '@reduxjs/toolkit';

 const rootReducer = combineReducers({
    counterSlice
  })

  export default rootReducer;

  