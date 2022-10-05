import { combineReducers } from 'redux';
import jiosReducer from './jios';

const rootReducer = combineReducers({
  jios: jiosReducer,
});

export default rootReducer;
