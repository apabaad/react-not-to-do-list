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
		console.log(data);
		return data;
	} catch (error) {
		return {
			status: "error",
			message: error.message,
		};
	}
};
