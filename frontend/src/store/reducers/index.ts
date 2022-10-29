import { combineReducers } from 'redux';
import uiReducer from './ui';
import jiosReducer from './jios';
import myJiosReducer from './myJios';
import jioSearchFormReducer from './jiosSearchForm';
import gymsReducer from './gyms';
import wallsReducer from './walls';
import colorsReducer from './colors';
import messageBarReducer from './messageBar';
import myLocalBetaVideosReducer from './myLocalBetaVideos';
import redirectPathReducer from './redirectPath';

const rootReducer = combineReducers({
  ui: uiReducer,
  jios: jiosReducer,
  myJios: myJiosReducer,
  jioSearchForm: jioSearchFormReducer,
  gyms: gymsReducer,
  walls: wallsReducer,
  colors: colorsReducer,
  messageBar: messageBarReducer,
  myLocalBetaVideos: myLocalBetaVideosReducer,
  redirectPath: redirectPathReducer
});

export default rootReducer;
