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
			]
		},
		actions: {
			// Use getActions to call a function within a fuction
			registro: async (newUser) => {
				try{
					const response = await fetch("https://bug-free-space-xylophone-q7qvjvgjxwwx29pxg-3001.app.github.dev/api/sign_up",{
					method: "POST",
					body: JSON.stringify(
							newUser
						),
						headers: {
							"Content-type": "application/json"
						}
					})
					
					const data = await response.json()
					console.log(data)
				
				}catch(error){
					console.log(error)
				}
			},
			
			
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			
					//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
