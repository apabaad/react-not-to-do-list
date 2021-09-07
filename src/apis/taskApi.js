import axios from "axios";

const rootAPI = "http://localhost:8000/api/v1/";

// adding data in the database
export const postTask = async newTaks => {
	try {
		const { data } = await axios.post(rootAPI, newTaks);

		return data;
	} catch (error) {
		return {
			status: "error",
			message: error.message,
		};
	}
};

//fetch all data from server

export const fetchAllTask = async () => {
	try {
		const { data } = await axios.get(rootAPI);

		return data;
	} catch (error) {
		return {
			status: "error",
			message: error.message,
		};
	}
};

//delete items
export const deleteTask = async ids => {
	try {
		const { data } = await axios.delete(rootAPI, { data: ids });
		console.log(data);
		return data;
	} catch (error) {
		return {
			status: "error",
			message: error.message,
		};
	}
};

//update items
export const updateTask = async obj => {
	try {
		const { data } = await axios.patch(rootAPI, obj);
		console.log(data);
		return data;
	} catch (error) {
		return {
			status: "error",
			message: error.message,
		};
	}
};
