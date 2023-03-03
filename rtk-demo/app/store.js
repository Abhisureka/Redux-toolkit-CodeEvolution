const configureStore = require("@reduxjs/toolkit").configureStore;
const reduxLogger = require("redux-logger");
const cakeReducer = require("../features/cake/cakeSlice");
const iceCreamReducer = require("../features/icecream/iceCreamSlice");
const userReducer = require("../features/user/userSlice");

const logger = reduxLogger.createLogger();

const store = configureStore({
	// configureStore handles combineReducers under the hood
	reducer: {
		cake: cakeReducer,
		iceCream: iceCreamReducer,
		user: userReducer,
	},
	// bydefault the configureStore fn add some middleware to redux store setup automatically
	// so to the list of default middleware we append logger middleware (getDefaultMiddleware().concat(logger))
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
	// createAsyncThunk under the hood uses redux thunk library thus
	// redux thunk applied as a middleware to the store under the hood, everyhting is abstracted
});

module.exports = store;
