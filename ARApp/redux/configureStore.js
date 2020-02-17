import { createStore, combineReducers } from 'redux';
import { consoleReducer } from './reducers';

const rootReducer = combineReducers(
    { logs: consoleReducer }
);

const configureStore = () => createStore(rootReducer);
export default configureStore;