import React from "react";
import { Table, Button } from "react-bootstrap";

export const TaskLists = ({
	tasks,
	markAsBadList,
	handleOnTaskClicked,
	indexToDeleteFromTask,
}) => {
	return (
		<div>
			<h2>Task Lists</h2>
			<Table striped bordered hover size="sm">
				<thead>
					<tr>
						<th>Tasks</th>
						<th>Hours</th>
						<th>Action</th>
					</tr>
				</thead>
				<tbody>
					{tasks.map((item, i) => (
						<tr key={i}>
							<td>
								<input
									type="checkbox"
									defaultValue={i}
									// checked={true}
									checked={indexToDeleteFromTask.includes(i)}
									onChange={handleOnTaskClicked}
								/>{" "}
								<label> {item.task}</label>
							</td>
							<td>{item.hr}</td>
							<td>
								<Button onClick={() => markAsBadList(i)}>
									Mark As Not To Do
								</Button>
							</td>
						</tr>
					))}
				</tbody>
			</Table>
		</div>
	);
};
