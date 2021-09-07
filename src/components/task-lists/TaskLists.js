import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Table, Button } from "react-bootstrap";
import { taskSwitcher } from "./taskAction";

export const TaskLists = ({ handleOnTaskClicked, indexToDeleteFromTask }) => {
	const dispatch = useDispatch();
	const { taskLists } = useSelector(state => state.task);

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
					{taskLists.map((item, i) => (
						<tr key={i}>
							<td>
								<input
									type="checkbox"
									defaultValue={item._id}
									// checked={true}
									checked={indexToDeleteFromTask.includes(item._id)}
									onChange={handleOnTaskClicked}
								/>{" "}
								<label> {item.task}</label>
							</td>
							<td>{item.hr}</td>
							<td>
								<Button
									onClick={() =>
										dispatch(taskSwitcher({ id: item._id, todo: false }))
									}
								>
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
