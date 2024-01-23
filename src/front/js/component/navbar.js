import React, { useContext } from 'react';
import { Context } from '../store/appContext';
import { Link, useNavigate } from "react-router-dom";
import "../../styles/navbar.css"

export const Navbar = () => {
	const navigate = useNavigate();
	const { store, actions } = useContext(Context)
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
			<div className="container d-flex justify-content-end">

				{!store.currentUser ?
					<div className="d-flex">
						<div className="me-3">
							<Link to="/signUp" className="decoration">
								<button className="btn boton">Registrate</button>
							</Link>
						</div>
						<div className="">
							<Link to="/demo">
								<button className="btn boton">Logueate</button>
							</Link>
						</div>
					</div>

					:

					<div className="">
						<button className="btn boton" onClick={handleLogout}>Log-out</button>
					</div>
				}
			</div>
		</nav>
	);
};
