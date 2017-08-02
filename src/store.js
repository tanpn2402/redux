import { createStore, applyMiddleware, compose} from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReduces from './reducers/index';

// Store
const store = createStore(
    rootReduces,
    compose(applyMiddleware(thunkMiddleware))
);

export default store;