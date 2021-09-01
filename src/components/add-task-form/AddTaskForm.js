import { useState } from "react";
import { Col, Row, Form, Button } from "react-bootstrap";

const initalFormDt = {
	task: "Watching TV",
	hr: 10,
};
export const AddTaskForm = ({ handleSubmit }) => {
	const [formDt, setFormDt] = useState(initalFormDt);

	const handleOnChange = e => {
		const { name, value } = e.target; // task, hr

		setFormDt({
			...formDt,
			[name]: value,
		});
	};

	const handleOnSubmit = e => {
		e.preventDefault();

		handleSubmit(formDt);
	};

	return (
		<Form onSubmit={handleOnSubmit}>
			<Row>
				<Col xs={7}>
					<Form.Control
						name="task"
						placeholder="task"
						value={formDt.task}
						required
						onChange={handleOnChange}
					/>
				</Col>
				<Col>
					<Form.Control
						name="hr"
						value={formDt.hr}
						required
						type="number"
						placeholder="hour"
						onChange={handleOnChange}
					/>
				</Col>
				<Col>
					<Button type="submit">Add Task</Button>
				</Col>
			</Row>
		</Form>
	);
};
