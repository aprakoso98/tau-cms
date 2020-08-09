import middlewares from "./middlewares";
import webReducer from './reducers';

const { createStore, applyMiddleware } = require("redux");

const store = createStore(webReducer, applyMiddleware(...middlewares))

export default store