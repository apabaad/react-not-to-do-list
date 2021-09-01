import React from "react";
import { Table, Button, Alert } from "react-bootstrap";
import { AlertDisplay } from "../alert/AlertDisplay";

export const NotToDoLists = ({
	badTasks,
	markAsTaskList,
	badHrs,
	handleOnBadTaskClicked,
	indexToDeleteFromBadTask,
}) => {
	return (
		<div>
			<h2>Bad Task Lists</h2>
			<Table striped bordered hover size="sm">
				<thead>
					<tr>
						<th>Tasks</th>
						<th>Hours</th>
						<th>Action</th>
					</tr>
				</thead>
				<tbody>
					{badTasks.map((item, i) => (
						<tr key={i}>
							<td>
								<input
									type="checkbox"
									defaultValue={i}
									checked={indexToDeleteFromBadTask.includes(i)}
									onChange={handleOnBadTaskClicked}
								/>{" "}
								<label> {item.task}</label>
							</td>
							<td>{item.hr}</td>
							<td>
								<Button onClick={() => markAsTaskList(i)}>Mark As To Do</Button>
							</td>
						</tr>
					))}
				</tbody>
			</Table>
			<AlertDisplay
				color="danger"
				text={`You could have saved = ${badHrs}hr/wk`}
			/>
		</div>
	);
};
