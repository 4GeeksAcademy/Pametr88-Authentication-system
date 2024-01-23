import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate, Link } from "react-router-dom";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

export const Home = () => {
	const{store,actions}=useContext(Context)
	return (
		<>

			{store.currentUser ?

				<div className="jumbotron">
					<h2 className="tittl">Bienvenido {store.currentUser.name}</h2>
					
					<hr className="my-4" />
				</div>

				:
				<div>
					<h2 className="tittl">Ingresa a nuestra app</h2>
				</div>

			}

		</>
	);
};
