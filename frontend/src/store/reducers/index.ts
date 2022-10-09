import { combineReducers } from 'redux';
import uiReducer from './ui';
import jiosReducer from './jios';
import myJiosReducer from './myJios';
import jioSearchFormReducer from './jioSearchForm';

const rootReducer = combineReducers({
  ui: uiReducer,
  jios: jiosReducer,
  myJios: myJiosReducer,
  jioSearchForm: jioSearchFormReducer
});

export default rootReducer;
