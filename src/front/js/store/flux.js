const apiUrl=process.env.BACKEND_URL+"/api"
const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,			
			user: [],
			currentUser: null,
			loggedUserId:null
		},
		actions: {
			//Use getActions to call a function within a fuction
			sign_up: async (newUser) => {
				console.log(newUser)
				try {

					let result = await fetch(`${apiUrl}/sign_up`, {
						method: "POST",
						body: JSON.stringify(newUser),
						headers: {
							"Content-Type": "application/json"
						}
					})
					const data = await result.json()
					console.log("respuesta al intentar un new user:", data);
					return data
				} catch (e) {
					console.error(e)
				}
			},

			logIn: async (newLogIn) => {

				try {
					let result = await fetch(`${apiUrl}/login`, {
						method: "POST",
						body: JSON.stringify(newLogIn),
						headers: {
							"Content-Type": "application/json"
						}
					})

					const data = await result.json();
					console.log("respuesta al intentar iniciar sesión:", data);
					localStorage.setItem("token", data.token);
					setStore({ loggedUserId: data.id });
					return data;

				} catch (e) {
					console.error(e);
				}
			},

			privateRoute: async () => {
				try {

					const options = {
						method: "Get",
						headers: {
							Authorization: 'Bearer ' + localStorage.getItem("token")

						}
					};
					const response = await fetch(apiUrl + "/isAuth", options)
					console.log(response)
					const res = await response.json()
					console.log(res)
					if (response.ok) {
						setStore({ currentUser: res })
						return null
					}
					setStore({ currentUser: false })


				} catch (error) {
					console.error(error)
					setStore({ currentUser: false })

				}},

				logout: async () => {
					try {
						const actions = getActions()
						localStorage.removeItem('token');
						setStore({ loggedUserId: null});
						actions.privateRoute()
						return true;
					} catch (error) {
						console.error('Error during logout:', error);
						return false;
					}
				}

			}	
		}			
	}


export default getState;
