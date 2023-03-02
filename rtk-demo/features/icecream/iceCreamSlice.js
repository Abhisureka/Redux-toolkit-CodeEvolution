// Slice is redux-toolkit convention
// the entire app state is split into slices and managed individually

const createSlice = require("@reduxjs/toolkit").createSlice;

const initialState = {
	numOfIceCreams: 10,
};

const iceCreamSlice = createSlice({
	name: "iceCream",
	// initialState: initialState
	initialState, // Es6 short hand specify just initial state if the key and value both are the same
	reducers: {
		// Great with redux toolkit:
		// 1. we don't have to explicitly return the new state
		// 2. we can directly mutate the state ( createSlice under the hood using immer library)
		// 3. createSlice will automatically generate action creators with the same names as reducers fn we have written
		// 4. also returns the main reducer fn which we can provide to our redux store
		ordered: (state, action) => {
			state.numOfIceCreams--;
		},
		restocked: (state, action) => {
			state.numOfIceCreams += action.payload;
		},
	},
});

module.exports = iceCreamSlice.reducer;
module.exports.iceCreamActions = iceCreamSlice.actions;
