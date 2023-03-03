// Slice is redux-toolkit convention
// the entire app state is split into slices and managed individually

import {createSlice} from ("@reduxjs/toolkit")

const initialState = {
	numOfCakes: 10,
};

const cakeSlice = createSlice({
	name: "cake",
	// initialState: initialState
	initialState, // Es6 short hand specify just initial state if the key and value both are the same
	reducers: {
		// Great with redux toolkit:
		// 1. we don't have to explicitly return the new state
		// 2. we can directly mutate the state ( createSlice under the hood using immer library)
		// 3. createSlice will automatically generate action creators with the same names as reducers fn we have written
		// 4. also returns the main reducer fn which we can provide to our redux store
		// action { type: 'name/reducerKey', payload: undefined }
		// action { type: 'cake/ordered', payload: undefined }

		ordered: (state, action) => {
			state.numOfCakes--;
		},
		restocked: (state, action) => {
			state.numOfCakes += action.payload;
		},
	},
});

export default cakeSlice.reducer;
export const { ordered, restocked} = cakeSlice.actions;

// import("./math").then(math => {
// 	console.log(math.add(16,26));
// })

// const OtherComponent = React.lazy(() => import('./Othercomponent'))

// <>
// <Suspense fallback={<div>Loading...</div>}>
// <OtherComponent />
// </Suspense>
// </>
