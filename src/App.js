import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Col, Container, Row, Spinner } from "react-bootstrap";
import { AddTaskForm } from "./components/add-task-form/AddTaskForm";
import { TaskLists } from "./components/task-lists/TaskLists";
import { NotToDoLists } from "./components/task-lists/NotToDoLists";
import { AlertDisplay } from "./components/alert/AlertDisplay";
import { deleteTask } from "./apis/taskApi";

import { fetchTaskLists } from "./components/task-lists/taskAction";

import "./App.css";

const App = () => {
	const dispatch = useDispatch();

	const { totalHrs, isLoading, status, message } = useSelector(
		state => state.task
	);

	const [indexToDeleteFromTask, setIndexToDeleteFromTask] = useState([]);

	const ttlPwK = 168;

	useEffect(() => {
		dispatch(fetchTaskLists());
	}, []);

	// on check box click on the task list
	const handleOnTaskClicked = e => {
		const { checked, value } = e.target;

		if (checked) {
			// add the index in the array
			setIndexToDeleteFromTask([...indexToDeleteFromTask, value]);
		} else {
			//remove the index from array

			const tempArg = indexToDeleteFromTask.filter(itm => itm !== value);

			setIndexToDeleteFromTask(tempArg);
		}
	};

	//delete all selected items
	const deleteOnClick = async () => {
		//call api to delete from server
		const result = await deleteTask(indexToDeleteFromTask);
	};

	return (
		<div className="wrapper text-center">
			<Container>
				<Row className="mt-5">
					<Col>
						<h1>No To Do Task List</h1>
					</Col>
				</Row>
				<hr />

				{message && (
					<AlertDisplay
						color={status === "success" ? "success" : "danger"}
						text={message}
					/>
				)}

				<AddTaskForm />
				<hr />
				{isLoading && <Spinner variant="primary" animation="border" />}

				<Row>
					<Col md="6">
						<TaskLists
							handleOnTaskClicked={handleOnTaskClicked}
							indexToDeleteFromTask={indexToDeleteFromTask}
						/>
					</Col>
					<Col md="6">
						<NotToDoLists
							handleOnBadTaskClicked={handleOnTaskClicked}
							indexToDeleteFromBadTask={indexToDeleteFromTask}
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
