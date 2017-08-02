import { createStore, applyMiddleware, combineReducers, compose} from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReduces from './reducers/index';
import { sessionReducer } from 'redux-react-session';

// Store
const store = createStore(
    rootReduces,
    compose(applyMiddleware(thunkMiddleware))
);

export default store;