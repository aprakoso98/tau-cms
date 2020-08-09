import reducerUi from './ui';
import reducerWeb from './web';

const { combineReducers } = require("redux");

const webReducer = combineReducers({
	Web: reducerWeb,
	UI: reducerUi
})

export default webReducer