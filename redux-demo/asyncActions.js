const redux = require("redux");
const thunkMiddleware = require("redux-thunk").default;
const axios = require("axios");
const createStore = redux.legacy_createStore;
const applyMiddleware = redux.applyMiddleware;

const initialState = {
	loading: false,
	users: [],
	error: "",
};

const FETCH_USERS_REQUESTED = "FETCH_USERS_REQUESTED";
const FETCH_USERS_SUCCEEDED = "FETCH_USERS_SUCCEEDED";
const FETCH_USERS_FAILED = "FETCH_USERS_FAILED";

const fetchUsersRequest = () => {
	return {
		type: FETCH_USERS_REQUESTED,
	};
};

const fetchUsersSuccess = (users) => {
	return {
		type: FETCH_USERS_SUCCEEDED,
		payload: users,
	};
};

const fetchUsersFailure = (error) => {
	return {
		type: FETCH_USERS_FAILED,
		payload: error,
	};
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case FETCH_USERS_REQUESTED:
			return {
				...state,
				loading: true,
			};
		case FETCH_USERS_SUCCEEDED:
			return {
				loading: false,
				users: action.payload,
				error: "",
			};
		case FETCH_USERS_FAILED:
			return {
				loading: false,
				users: [],
				error: action.payload,
			};
	}
};

//action creator
const fetchUsers = () => {
	// thunk middleware ables action creator to return a function instead of an action object
	return function (dispatch) {
		// this fn doesn't have to be pure it's allowed to have side effects such as api calls
		// this fn also dispatch actions as it receives dispatch method as it's argument
		dispatch(fetchUsersRequest());
		axios
			.get("https://jsonplaceholder.typicode.com/users")
			.then((response) => {
				const users = response.data.map((user) => user.id);
				dispatch(fetchUsersSuccess(users));
			})
			.catch((error) => {
				dispatch(fetchUsersFailure(error.message));
			});
	};
};

const store = createStore(reducer, applyMiddleware(thunkMiddleware));

store.subscribe(() => {
	console.log(store.getState());
});
store.dispatch(fetchUsers());
