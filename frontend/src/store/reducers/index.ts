import { combineReducers } from 'redux';
import jiosReducer from './jios';
import myJiosReducer from './myJios';

const rootReducer = combineReducers({
  jios: jiosReducer,
  myJios: myJiosReducer,
});

export default rootReducer;
