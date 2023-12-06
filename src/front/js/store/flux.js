const apiUrl=process.env.BACKEND_URL+"/api"
const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],
			user: []
		},
		actions: {
			//Use getActions to call a function within a fuction
			sign: async (newUser) => {
				
					const response = await fetch(apiUrl+"/sign_up", {
						method: "POST",
						body: JSON.stringify(
							newUser
						),
						headers: {
							"Content-Type": "application/json"
						}
					})

					if (!response.ok) {
						throw new Error("Error with the request");
					}
	
					const data = await response.json();
					alert("usuario registrado")
					console.log("respuesta al intentar un new user:", data);
			
			}
			// getUser: () => {
			// 	fetch("https://bug-free-space-xylophone-q7qvjvgjxwwx29pxg-3001.app.github.dev/api/user")
			// 		.then(response => {
			// 			// Verifica si la respuesta fue exitosa (código 200)
			// 			if (!response.ok) {
			// 				throw new Error(`Error: ${response.status} - ${response.statusText}`);
			// 			}
			// 			// Devuelve los datos en formato JSON
			// 			return response.json();
			// 		})
			// 		.then(data => {
			// 			// Maneja los datos (en este caso, los usuarios serializados)
			// 			console.log(data);
			// 		})
			// 		.catch(error => {
			// 			// Maneja cualquier error de la solicitud
			// 			console.error(error);
			// 		});
			// },

			// getMessage: async () => {
			// 	try{
			// 		// fetching data from the backend
			// 		const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
			// 		const data = await resp.json()
			// 		setStore({ message: data.message })
			// 		// don't forget to return something, that is how the async resolves
			// 		return data;
			// 	}catch(error){
			// 		console.log("Error loading message from backend", error)
			// 	}

			// 		//reset the global store
			// 	//setStore({ demo: demo });
			//}
		}
	};
};

export default getState;
