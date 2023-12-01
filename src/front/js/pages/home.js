import React, { useContext, useState } from "react";
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
	const [dateOfBirth, setdateOfBirth] = useState("")
	const [isActive, setIsActive] = useState(false)

	const navigate = useNavigate()

	const handlerSignUp = (e) => {
		e.preventDefault()
		actions.registro(name, userName, address, email, password, city, state, dateOfBirth, isActive)
		navigate("/demo")
		setName ("")
		setUserName ("")
		setAddress ("")
		setEmail ("")
		setPasword ("")
		setCity ("")
		setState ("")
		setdateOfBirth ("")
		setIsActive ("")
	}
	return (
		<div className="container">
			<form className="row g-3">
				<div className="col-12">
					<label className="form-label">Name</label>
					<input type="text" className="form-control" id="inputAddress" value={name} onChange={(e)=>setName(e.target.value)}/>
				</div>
				<div className="col-12">
					<label className="form-label">User-Name</label>
					<input type="text" className="form-control" id="inputAddress" value={userName} onChange={(e)=>setUserName(e.target.value)}/>
				</div>
				<div className="col-12">
					<label for="inputAddress" className="form-label">Address</label>
					<input type="text" className="form-control" id="inputAddress" placeholder="1234 Main St" value={address} onChange={(e)=>setAddress(e.target.value)}/>
				</div>
				<div className="col-md-6">
					<label for="inputEmail4" className="form-label">Email</label>
					<input type="email" className="form-control" id="inputEmail4" value={email} onChange={(e)=>setEmail(e.target.value)}/>
				</div>
				<div className="col-md-6">
					<label for="inputPassword4" className="form-label">Password</label>
					<input type="password" className="form-control" id="inputPassword4" value={password} onChange={(e)=>setPasword(e.target.value)}/>
				</div>
				<div className="col-md-4">
					<label for="inputCity" className="form-label">City</label>
					<input type="text" className="form-control" id="inputCity" value={city} onChange={(e)=>setCity(e.target.value)}/>
				</div>
				<div className="col-md-4">
					<label for="inputState" className="form-label">State</label>
					<input type="text" className="form-control" id="inputCity" value={state} onChange={(e)=>setState(e.target.value)}/>
				</div>
				<div className="col-md-4">
					<label className="form-label">Date of birth</label>
					<input type="date" className="form-control" value={dateOfBirth} onChange={(e)=>setdateOfBirth(e.target.value)}/>
				</div>
				<div className="col-12">
					<div className="form-check">
					<input className="form-check-input" type="checkbox" id="gridCheck" value={isActive} onChange={(e)=>setIsActive(e.target.value)}/>
					<label className="form-check-label" for="gridCheck">
						Is Active
					</label>
					</div>
				</div>
				<div className="col-12">
					<button type="submit" className="btn btn-primary" onClick={(e)=>handlerSignUp(e)}>Sign in</button>
				</div>
			</form>
		</div>
	);
};
