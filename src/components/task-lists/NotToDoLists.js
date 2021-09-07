import React from "react";
import { Table, Button, Alert } from "react-bootstrap";
import { AlertDisplay } from "../alert/AlertDisplay";
import { useSelector, useDispatch } from "react-redux";
import { taskSwitcher } from "./taskAction";

export const NotToDoLists = ({
	handleOnBadTaskClicked,
	indexToDeleteFromBadTask,
}) => {
	const dispatch = useDispatch();
	const { badLists } = useSelector(state => state.task);
	const badHrs = badLists.reduce((subtl, item) => subtl + item.hr, 0);

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
					{badLists.map((item, i) => (
						<tr key={i}>
							<td>
								<input
									type="checkbox"
									defaultValue={item._id}
									checked={indexToDeleteFromBadTask.includes(item._id)}
									onChange={handleOnBadTaskClicked}
								/>{" "}
								<label> {item.task}</label>
							</td>
							<td>{item.hr}</td>
							<td>
								<Button
									onClick={() =>
										dispatch(
											taskSwitcher({
												id: item._id,
												todo: true,
											})
										)
									}
								>
									Mark As To Do
								</Button>
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
