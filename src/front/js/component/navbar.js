import React, { useContext } from 'react';
import { Context } from '../store/appContext';
import { Link, useNavigate } from "react-router-dom";
import "../../styles/navbar.css"

export const Navbar = () => {
	const navigate = useNavigate();
	const {store,actions} = useContext(Context)
	const handleLogout = async () => {
		try {
			const success = await actions.logout(); // Asegúrate de que la función logout esté disponible en tus acciones

			if (success) {
				navigate('/');
			} else {
				console.error('No se pudo cerrar sesión.');
			}
		} catch (error) {
			console.error('Error durante el cierre de sesión:', error);
		}
	};
	return (
		<nav className="navbar fondo">
			<div className="container raw">
				
				{store.currentUser ?
				<div className="col-2">
					<button className="btn btn-primary" onClick={handleLogout}>Log-out</button>
				</div>
				:
				<div>
					<div className="col-2">
					<Link to="/signUp" className="decoration">
						<button className="btn btn-primary">Registrate</button>
					</Link>
					</div>
					<div className="col-2">
					<Link to="/demo">
						<button className="btn btn-primary">Logueate</button>
					</Link>
					</div>
				</div>
				}				
			</div>
		</nav>
	);
};
