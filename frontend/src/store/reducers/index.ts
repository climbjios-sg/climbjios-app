import { combineReducers } from 'redux';
import uiReducer from './ui';
import jiosReducer from './jios';
import myJiosReducer from './myJios';
import jioSearchFormReducer from './jiosSearchForm';
import gymsReducer from './gyms';
import authReducer from './auth';

const rootReducer = combineReducers({
  ui: uiReducer,
  jios: jiosReducer,
  myJios: myJiosReducer,
  jioSearchForm: jioSearchFormReducer,
  gyms: gymsReducer,
  auth: authReducer,
});

export default rootReducer;
