import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	taskLists: [],
	badLists: [],
	status: "",
	message: "",
	isLoading: false,
	totalHrs: 0,
};

const taskSlice = createSlice({
	name: "taskList",
	initialState,
	reducers: {
		//there will be list of function to update the state values
		requestPending: state => {
			state.isLoading = true;
		},

		updateTaskSuccess: (state, { payload: { status, message } }) => {
			state.isLoading = false;
			state.status = status;
			state.message = message;
		},

		fetchTasksListSuccess: (state, { payload }) => {
			const { status, message, result } = payload;
			state.totalHrs = result
				? result.reduce((subttl, item) => subttl + +item.hr, 0)
				: 0;
			state.isLoading = false;
			// state.status = status;
			// state.message = message;
			if (result) {
				state.taskLists = result.filter(item => item.todo);
				state.badLists = result.filter(item => !item.todo);
			}
		},
		requestFail: (state, { payload }) => {
			const { status, message } = payload;
			state.isLoading = false;
			state.status = status;
			state.message = message;
		},
	},
});

const { reducer, actions } = taskSlice;

export const {
	requestPending,
	fetchTasksListSuccess,
	updateTaskSuccess,
	requestFail,
} = actions;

export default reducer;
