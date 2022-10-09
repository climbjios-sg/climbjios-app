import { combineReducers } from 'redux';
import uiReducer from './ui';
import jiosReducer from './jios';
import myJiosReducer from './myJios';
import jioSearchFormReducer from './jioSearchForm';
import gymsReducer from './gyms';

const rootReducer = combineReducers({
  ui: uiReducer,
  jios: jiosReducer,
  myJios: myJiosReducer,
  jioSearchForm: jioSearchFormReducer,
  gyms: gymsReducer,
});

export default rootReducer;
