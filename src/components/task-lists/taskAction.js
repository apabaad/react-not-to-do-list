import {
	requestPending,
	updateTaskSuccess,
	fetchTasksListSuccess,
	requestFail,
} from "./taskSlice";
import { fetchAllTask, postTask, updateTask } from "../../apis/taskApi";

//fetching all the tasks from server
export const fetchTaskLists = () => async dispatch => {
	dispatch(requestPending());

	const data = await fetchAllTask();
	console.log(data);

	data.status === "success"
		? dispatch(fetchTasksListSuccess(data))
		: dispatch(requestFail(data));
};

//add new task in the database
export const addTask = newTask => async dispatch => {
	dispatch(requestPending());

	const data = await postTask(newTask);
	console.log(data);

	if (data.status === "success") {
		dispatch(updateTaskSuccess(data));
		dispatch(fetchTaskLists());
	} else {
		dispatch(requestFail(data));
	}
};

//switch task between do or not to do
export const taskSwitcher = obj => async dispatch => {
	dispatch(requestPending());
	const data = await updateTask(obj);

	if (data.status === "success") {
		dispatch(updateTaskSuccess(data));
		dispatch(fetchTaskLists());
	} else {
		dispatch(requestFail(data));
	}
};
