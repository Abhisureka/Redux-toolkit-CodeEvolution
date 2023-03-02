const redux = require("redux");
const createStore = redux.legacy_createStore;
const produce = require("immer").produce;

const initialState = {
	name: "Vishwas",
	address: {
		street: "123 Main St",
		city: "Boston",
		state: "MA",
	},
};

const STREET_UPDATED = "STREET_UPDATED";

const updateStreet = (street) => {
	return {
		type: STREET_UPDATED,
		payload: street,
	};
};

const reducer = (state = initialState, action) => {
	//Shopkeeper
	// pure fn that accepts state and action as arguments and returns the next state
	switch (action.type) {
		case STREET_UPDATED:
			// never mutate the state and always return a new object that resembles the next state
			// return {
			// 	// first make a copy of the state object and then only update the no. of cakes
			// 	...state,
			// 	address: {
			// 		...state.address,
			// 		street: action.payload,
			// 	},
			// };
			return produce(state, (draft) => {
				// fn receives draft copy of the state
				// immer library updates state as if the state is mutable
				// we are updating proprty directly but under the hood immer translates the code like something we have above
				draft.address.street = action.payload;
			});

		default:
			return state;
	}
};

const store = createStore(reducer);
console.log("Initial state", store.getState());

const unsubscribe = store.subscribe(() =>
	console.log("Updated state", store.getState())
);

store.dispatch(updateStreet("456 Main St"));

unsubscribe();
