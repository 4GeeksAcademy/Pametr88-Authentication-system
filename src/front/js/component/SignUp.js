import React, { useContext, useState } from "react";
import { Context } from "../store/appContext.js";
import { useNavigate, Link } from "react-router-dom";
import "../../styles/signup.css";

export const SignUp = () => {
  const { actions } = useContext(Context)
  const [name, setName] = useState("")
  const [userName, setUserName] = useState("")
  const [address, setAddress] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [city, setCity] = useState("")
  const [state, setState] = useState("")
  const [error, setError] = useState(null)
  // const [isActive, setIsActive] = useState(false)
  const navigate = useNavigate();

  const handlerCreateUser = async () => {

    try {

      if (email == "" || password == "" || name == "" || userName == "" || city == "" || state == "" || address == "") {
        return alert("all fields are requierd")
      }

      let newUser = {
        email: email,
        password: password,
        name: name,
        userName: userName,
        city: city,
        state: state,
        address: address,

      }
      const result = await actions.sign_up(newUser)
      console.log(result)
      // await actions.test()
      navigate("/demo")

    } catch (error) {
      console.log(error)
    }

  }

  return (
    <>
      <div className="container formulario mt-5">
        <div className="form-information">
          <div className="forminformation-childs">
            <h2>Create una cuenta</h2>
            <form className="form">
              <div>
                <label htmlFor="name">
                  <i className="fa-solid fa-user-pen me-3"></i>
                  <input
                    type="text"
                    id="name"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </label>
              </div>
              <div>
                <label htmlFor="userName">
                  <i className="fa-solid fa-user me-3"></i>
                  <input
                    type="text"
                    id="userName"
                    placeholder="User Name"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                  />
                </label>
              </div>
              <div>
                <label htmlFor="address">
                  <i className="fa-solid fa-location-dot me-3"></i>
                  <input
                    type="text"
                    id="address"
                    placeholder="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </label>
              </div>
              <div>
                <label htmlFor="email">
                  <i className="fa-solid fa-envelope me-3"></i>
                  <input
                    type="email"
                    id="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </label>
              </div>
              <div>
                <label htmlFor="password">
                  <i className="fa-solid fa-lock me-3"></i>
                  <input
                    type="password"
                    id="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </label>
              </div>
              <div>
                <label htmlFor="city">
                  <i className="fa-solid fa-city me-3"></i>
                  <input
                    type="city"
                    id="city"
                    placeholder="city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </label>
              </div>
              <div>
                <label htmlFor="state">
                  <i className="fa-solid fa-earth-americas me-3"></i>
                  <input
                    type="state"
                    id="state"
                    placeholder="state"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                  />
                </label>
              </div>
              {error && <p className="error-message">{error}</p>}

              <button
                className="info-buton sig-but"
                onClick={handlerCreateUser}
                type="button"
              >
                Sign Up
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;