import { combineReducers } from 'redux';
import jiosReducer from './jios';
import myJiosReducer from './myJios';

const rootReducer = combineReducers({
  jios: jiosReducer,
  my_jios: myJiosReducer,
});

export default rootReducer;
