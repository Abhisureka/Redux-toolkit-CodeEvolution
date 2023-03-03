const redux = require("redux"); // can't use es6 import as this is a js app
const createStore = redux.legacy_createStore;
// const bindActionCreators = redux.bindActionCreators;
const combineReducers = redux.combineReducers;
const applyMiddleware = redux.applyMiddleware;
const reduxLogger = require("redux-logger");
const logger = reduxLogger.createLogger();

const CAKE_ORDERED = "CAKE_ORDERED";
const CAKE_RESTOCKED = "CAKE_RESTOCKED";
const ICECREAM_ORDERED = "ICECREAM_ORDERED";
const ICECREAM_RESTOCKED = "ICECREAM_RESTOCKED";
// actionCreator : a function that returns an action object.

function orderCake(qty = 1) {
	return {
		type: CAKE_ORDERED, // action is an object with type property
		payload: qty,
	};
}

function restockCake(qty) {
	return {
		type: CAKE_RESTOCKED, // action is an object with type property
		payload: qty,
	};
}

function orderIceCream(qty = 1) {
	return {
		type: ICECREAM_ORDERED, // action is an object with type property
		payload: qty,
	};
}

function restockIceCream(qty) {
	return {
		type: ICECREAM_RESTOCKED, // action is an object with type property
		payload: qty,
	};
}

// const initialState = {
// 	numOfCakes: 10,
// 	numOfIceCreams: 10,
// 	// anotherProperty: 0,
// };/

const initialCakeState = {
	numOfCakes: 10,
};

const initialICeCreamState = {
	numOfIceCreams: 10,
};

// (previousState, action) => newState

const cakeReducer = (state = initialCakeState, action) => {
	//Shopkeeper
	// pure fn that accepts state and action as arguments and returns the next state
	switch (action.type) {
		case CAKE_ORDERED:
			// never mutate the state and always return a new object that resembles the next state
			return {
				// first make a copy of the state object and then only update the no. of cakes
				...state,
				numOfCakes: state.numOfCakes - action.payload,
			};

		case CAKE_RESTOCKED:
			return {
				// first make a copy of the state object and then only update the no. of cakes
				...state,
				numOfCakes: state.numOfCakes + action.payload,
			};
		default:
			return state;
	}
};

const iceCreamReducer = (state = initialICeCreamState, action) => {
	//Shopkeeper
	// pure fn that accepts state and action as arguments and returns the next state
	switch (action.type) {
		case ICECREAM_ORDERED:
			return {
				// first make a copy of the state object and then only update the no. of cakes
				...state,
				numOfIceCreams: state.numOfIceCreams - action.payload,
			};
		case ICECREAM_RESTOCKED:
			return {
				// first make a copy of the state object and then only update the no. of cakes
				...state,
				numOfIceCreams: state.numOfIceCreams + action.payload,
			};

		// even though we have separate reducers, when we dispatch an action both reducers receive that action
		// one of them acts on it whereas other just ignores it.

		// each reducer can update only it's portion of application state however it can respond to any action
		// dispatched in the application but not in REDUX TOOLKIT

		// in REDUX TOOLKIT by default reducers from one createSlice will only respond to the action types generated
		// by the same slice.

		case CAKE_ORDERED: // giving free iceCream along with cake
			return {
				// first make a copy of the state object and then only update the no. of cakes
				...state,
				numOfIceCreams: state.numOfIceCreams - 1,
			};
		default:
			return state;
	}
};
// when we dispach an action both(all) the reducers receive that action one of them acts on action others ignores it...
const rootReducer = combineReducers({
	cake: cakeReducer,
	iceCream: iceCreamReducer,
});
// when app grows in size we can split the reducers into seprate files
// keep them completly independent and managing different features

// reducer fn has initialState of the app
// this is required for the store to make state transitions based on the actions received.
// store responsibility no. 1 : Holding the app state
const store = createStore(rootReducer, applyMiddleware(logger));

// store responsibility no. 2 : Allow access to state via getState()
console.log("Initial state", store.getState());

// store responsibility no. 4 : Registers listeners via subscribe(listener)
const unsubscribe = store.subscribe(
	//anytime store updates this gets logged
	// () => console.log("Updated state", store.getState())
	() => {} // logger middleware will handle logging
);

// store responsibility no. 3 : Allows state to be updated via dispatch(action)
store.dispatch(orderCake(1));
store.dispatch(orderCake(2));
store.dispatch(restockCake(10));
store.dispatch(orderCake());
store.dispatch(orderIceCream());
store.dispatch(restockIceCream(5));

// const actions = bindActionCreators({ orderCake, restockCake }, store.dispatch);
// actions.orderCake(1);
// actions.orderCake(2);
// actions.restockCake(10);
// actions.orderCake();

// store responsibility no. 5 : handles unregisterng of listeners via the function returned by subscribe(listener)
unsubscribe();
store.dispatch(orderCake(3)); // this will not work as we have already unsubscribed from the store

// Redux pattern :
/*
1. create a store : line no 39
2. declare intial state and reducer : line no 15,22
3. define action and actionCreator : line no 8,9
4. subscribe to the store : line no 45
5. dispatch actions to update the store : line no 50,51,52
6. finally unsubscribe to the changes : line no 55
*/
