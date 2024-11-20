import React, { useContext, useState } from "react";
import "./Login.css";
import { Link } from "react-router-dom";
import APIKEY from "../../APIKEY.JSX";
import { authContext } from "../../context/authContext";
import { useHistory } from "react-router-dom";

const Login = () => {
  const history = useHistory();
  const authctx = useContext(authContext);
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const changeHandler = (event) => {
    const { value, name } = event.target;
    setInput((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  function submitHandler(event) {
    event.preventDefault();
    console.log(input);
    LoginRequest();
  }
  // function to send login request
  async function LoginRequest() {
    setLoading(true);
    try {
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${APIKEY}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: input.email,
            password: input.password,
            returnSecureToken: true,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to login");
      }
      const result = await response.json();
      authctx.login(result.idToken);
      localStorage.setItem("token", result.idToken);
      history.push("/");
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }
  return (
    <form onSubmit={submitHandler} className="login">
      <h1>Login</h1>
      <div className="login__inputs">
        <div className="login__email">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={input.email}
            onChange={changeHandler}
          />
        </div>
        <div className="login__password">
          <label htmlFor="password">password</label>
          <input
            type="text"
            name="password"
            id="password"
            value={input.password}
            onChange={changeHandler}
          />
        </div>
      </div>
      <div className="login__button">
        <button type="submit">{loading ? "Please wait" : "Login"}</button>
      </div>
      <div className="login__text">
        <p>
          <Link to="/forgetpassword">Forget Password?</Link>
        </p>
        <p>
          click here to
          <Link to="/signup"> Sign up </Link>
          page
        </p>
      </div>
    </form>
  );
};

export default Login;
