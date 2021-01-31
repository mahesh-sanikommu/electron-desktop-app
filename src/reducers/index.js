import { combineReducers } from 'redux';
import spiderReducer from './spiderReducer';

export default combineReducers({
  data: spiderReducer
});
