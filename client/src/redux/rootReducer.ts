import { combineReducers } from 'redux';
import authReducer from '../page/Auth/reducer/reducerAuth';
import { reducerClients } from '../page/ClientsList/reducer/reducerClients';

const rootReducer = combineReducers({
  auth: authReducer,
  clients: reducerClients,
});

export default rootReducer;
