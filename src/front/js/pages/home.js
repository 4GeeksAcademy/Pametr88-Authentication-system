import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

export const Home = () => {
	const { store, actions } = useContext(Context);
	const [name, setName] = useState("")
	const [userName, setUserName] = useState("")
	const [address, setAddress] = useState("")
	const [email, setEmail] = useState("")
	const [password, setPasword] = useState("")
	const [city, setCity] = useState("")
	const [state, setState] = useState("")
	const [date, setDate] = useState("")
	const [isActive, setIsActive] = useState(false)

	const navigate = useNavigate()
	useEffect(() => {
		// actions.getUser()
	},[])

	const crearNuevoUsuario = async () => {
		try {

			let newUser = {
				name: name,
				userName: userName,
				address: address,
				email: email,
				password: password,
				city: city,
				state: state,
				// date: date
			}
			await actions.sign(newUser)
			//await actions.test()
			//navigate("/demo")

		} catch (error) {
			console.log(error)
		}
	}
	return (
		<div className="container">
			<form className="row g-3">
				<div className="col-12">
					<label className="form-label">Name</label>
					<input type="text" className="form-control" value={name} onChange={(e)=>setName(e.target.value)}/>
				</div>
				<div className="col-12">
					<label className="form-label">User-Name</label>
					<input type="text" className="form-control" value={userName} onChange={(e)=>setUserName(e.target.value)}/>
				</div>
				<div className="col-12">
					<label className="form-label">Address</label>
					<input type="text" className="form-control" id="inputAddress" placeholder="1234 Main St" value={address} onChange={(e)=>setAddress(e.target.value)}/>
				</div>
				<div className="col-md-6">
					<label className="form-label">Email</label>
					<input type="email" className="form-control" id="inputEmail4" value={email} onChange={(e)=>setEmail(e.target.value)}/>
				</div>
				<div className="col-md-6">
					<label className="form-label">Password</label>
					<input type="password" className="form-control" id="inputPassword4" value={password} onChange={(e)=>setPasword(e.target.value)}/>
				</div>
				<div className="col-md-6">
					<label className="form-label">City</label>
					<input type="text" className="form-control" id="inputCity" value={city} onChange={(e)=>setCity(e.target.value)}/>
				</div>
				<div className="col-md-6">
					<label className="form-label">State</label>
					<input type="text" className="form-control" id="inputState" value={state} onChange={(e)=>setState(e.target.value)}/>
				</div>
				{/* <div className="col-md-4">
					<label className="form-label">Date of birth</label>
					<input type="date" className="form-control" value={date} onChange={(e)=>setDate(e.target.value)}/>
				</div> */}
				<div className="col-12">
					<div className="form-check">
					<input className="form-check-input" type="checkbox" id="gridCheck" value={isActive} onChange={(e)=>setIsActive(e.target.value)}/>
					<label className="form-check-label">
						Is Active
					</label>
					</div>
				</div>
				<div className="col-12">
					<button type="submit" className="btn btn-primary" onClick={crearNuevoUsuario}>Sign in</button>
				</div>
			</form>
		</div>
	);
};
