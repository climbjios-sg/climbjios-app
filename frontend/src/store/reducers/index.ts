import { combineReducers } from 'redux';
import uiReducer from './ui';
import jiosReducer from './jios';
import myJiosReducer from './myJios';
import jioSearchFormReducer from './jiosSearchForm';
import gymsReducer from './gyms';
import wallsReducer from './walls';
import colorsReducer from './colors';

const rootReducer = combineReducers({
  ui: uiReducer,
  jios: jiosReducer,
  myJios: myJiosReducer,
  jioSearchForm: jioSearchFormReducer,
  gyms: gymsReducer,
  walls: wallsReducer,
  colors: colorsReducer,
});

export default rootReducer;
