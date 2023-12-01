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
			registro: async (name, userName, address, email, password, city, state, dateOfBirth, isActive) => {
				try{
					const response = await fetch("https://bug-free-space-xylophone-q7qvjvgjxwwx29pxg-3001.app.github.dev/api/sign_up",{
					method: "POST",
					body: JSON.stringify({
							name: name,
							userName: userName,
							address: address,
							email: email,
							password: password,
							city: city,
							state: state,
							dateOfBirth: dateOfBirth,
							isActive: isActive
						}),
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
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
