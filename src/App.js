import { useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { AddTaskForm } from "./components/add-task-form/AddTaskForm";
import { TaskLists } from "./components/task-lists/TaskLists";
import { NotToDoLists } from "./components/task-lists/NotToDoLists";
import { AlertDisplay } from "./components/alert/AlertDisplay";

import "./App.css";

const App = () => {
	const [tasks, setTasks] = useState([]);
	const [badTasks, setBadTask] = useState([]);
	const [hrsError, setHrsError] = useState(false);
	const [indexToDeleteFromTask, setIndexToDeleteFromTask] = useState([]);
	const [indexToDeleteFromBadTask, setIndexToDeleteFromBadTask] = useState([]);

	const taskHrs = tasks.reduce((subttl, item) => subttl + +item.hr, 0);
	const badHrs = badTasks.reduce((sbuttl, item) => sbuttl + +item.hr, 0);
	const totalHrs = taskHrs + badHrs;
	const ttlPwK = 168;

	const handleOnSubmit = data => {
		if (totalHrs + +data.hr > ttlPwK) {
			setHrsError(true);
			return;
		}
		setTasks([...tasks, data]);

		//send the data to the server
	};

	// mark task list to bad task list
	const markAsBadList = i => {
		//1. take the selected item out and put in the bad array
		const selectedItem = tasks[i];
		setBadTask([...badTasks, selectedItem]);

		//2. remove the item form the task array and update the array
		const tempArg = tasks.filter((item, index) => index !== i);
		setTasks(tempArg);

		// const tempArg = [...tasks];
		// tempArg.splice(i, 1);
		// setTasks(tempArg);
	};

	const markAsTaskList = i => {
		//1. take the selected item out of bad array and put in the task array
		const selectedItem = badTasks[i];
		setTasks([...tasks, selectedItem]);

		//2. remove the item form the bad task array and update the bad array

		const tempArg = badTasks.filter((item, index) => index !== i);
		setBadTask(tempArg);
	};

	// on check box click on the task list
	const handleOnTaskClicked = e => {
		const { checked, value } = e.target;

		if (checked) {
			// add the index in the array
			setIndexToDeleteFromTask([...indexToDeleteFromTask, +value]);
		} else {
			//remove the index from array

			const tempArg = indexToDeleteFromTask.filter(itm => itm !== +value);

			setIndexToDeleteFromTask(tempArg);
		}
	};

	// on check box click on the bad task list
	const handleOnBadTaskClicked = e => {
		const { checked, value } = e.target;

		if (checked) {
			// add the index in the array
			setIndexToDeleteFromBadTask([...indexToDeleteFromBadTask, +value]);
		} else {
			//remove the index from array
			const tempArg = indexToDeleteFromBadTask.filter(itm => itm !== +value);
			setIndexToDeleteFromBadTask(tempArg);
		}
	};

	const deleteFromTask = () => {
		const tempArg = tasks.filter(
			(item, i) => !indexToDeleteFromTask.includes(i)
		);
		setTasks(tempArg);
		setIndexToDeleteFromTask([]);
	};

	const deleteFromBadTask = () => {
		const tempArg = badTasks.filter(
			(item, i) => !indexToDeleteFromBadTask.includes(i)
		);
		setBadTask(tempArg);
		setIndexToDeleteFromBadTask([]);
	};

	//delete all selected items
	const deleteOnClick = () => {
		deleteFromTask();
		deleteFromBadTask();
	};

	console.log(indexToDeleteFromBadTask);

	return (
		<div className="wrapper text-center">
			<Container>
				<Row className="mt-5">
					<Col>
						<h1>No To Do Task List</h1>
					</Col>
				</Row>
				<hr />
				{hrsError && (
					<AlertDisplay
						color="danger"
						text={`You do not have enough hours left this week to allocate this task`}
					/>
				)}

				<AddTaskForm handleSubmit={handleOnSubmit} />
				<hr />
				<Row>
					<Col md="6">
						<TaskLists
							tasks={tasks}
							markAsBadList={markAsBadList}
							handleOnTaskClicked={handleOnTaskClicked}
							indexToDeleteFromTask={indexToDeleteFromTask}
						/>
					</Col>
					<Col md="6">
						<NotToDoLists
							badTasks={badTasks}
							markAsTaskList={markAsTaskList}
							badHrs={badHrs}
							handleOnBadTaskClicked={handleOnBadTaskClicked}
							indexToDeleteFromBadTask={indexToDeleteFromBadTask}
						/>
					</Col>
				</Row>

				<Row>
					<Col>
						<div className="d-grid gap-2 mb-2 ">
							<Button
								onClick={deleteOnClick}
								variant="danger"
								className="btn-block"
							>
								Delete
							</Button>
						</div>
					</Col>
				</Row>
				<Row>
					<Col>
						<AlertDisplay
							color="info"
							text={`Total hours allocated = ${totalHrs}hrs/wk`}
						/>
					</Col>
				</Row>
			</Container>
		</div>
	);
};

export default App;
