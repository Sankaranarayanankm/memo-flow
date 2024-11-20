import React, { useContext, useState } from "react";
import "./Signup.css";
import { Link } from "react-router-dom";
// import APIKEY from "../../apikey";
import { useHistory } from "react-router-dom";
const Signup = () => {
  const history = useHistory();
  const [input, setInput] = useState({
    email: "",
    password: "",
    confirm: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  if (error) {
    return <p>{error}</p>;
  }
  const changeHandler = (event) => {
    const { name, value } = event.target;
    setInput((prev) => {
      return {
        ...prev,
        [name]: value,
        id: new Date().getTime(),
      };
    });
  };
  const submitHandler = (event) => {
    event.preventDefault();
    console.log(input);
    SignupRequest();
  };

  // function to send signup request
  async function SignupRequest() {
    try {
      setLoading(true);
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBcOFUqrqS7_9DNjlNmM_poXVGIWPClxU0`,
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
        const error = await response.json();
        console.log(error);
        throw new Error("Failed to send request");
      }
      const result = await response.json();
      history.push("/login");
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={submitHandler} className="signup">
      <h1>Sign up</h1>
      <div className="signup__inputs">
        <div className="signup__email">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={input.email}
            onChange={changeHandler}
          />
        </div>
        <div className="signup__password">
          <label htmlFor="password">password</label>
          <input
            type="text"
            id="password"
            name="password"
            value={input.password}
            onChange={changeHandler}
          />
        </div>
        <div className="signup__confirm">
          <label htmlFor="confirm">confirm</label>
          <input
            type="text"
            id="confirm"
            name="confirm"
            value={input.confirm}
            onChange={changeHandler}
          />
        </div>
      </div>
      <div className="signup__button">
        <button type="submit">{loading ? "Please wait..." : "Signup"}</button>
      </div>
      <div className="signup__text">
        <p>
          click here to
          <Link to="/login"> Login </Link>
          Page
        </p>
      </div>
    </form>
  );
};

export default Signup;
