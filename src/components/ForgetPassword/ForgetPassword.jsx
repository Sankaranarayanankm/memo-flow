import React, { useState } from "react";
import "./ForgetPassword.css";
import { useHistory, Link } from "react-router-dom/";

const ForgetPassword = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const emailHandler = (event) => {
    setEmail(event.target.value);
  };

  if (error) {
    return <p>{error}</p>;
  }

  // function for sending request
  async function sendRequest() {
    try {
      setLoading(true);
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBcOFUqrqS7_9DNjlNmM_poXVGIWPClxU0
`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            requestType: "PASSWORD_RESET",
            email,
          }),
        }
      );
      if (!response.ok) {
        const error = await response.json();
        console.log(error);
        throw new Error("Failed to reset password");
      }
      const result = await response.json();
      console.log(result);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  const submitHandler = (event) => {
    event.preventDefault();
    const updatedEmail = email.replace(/[@.]/g, "");
    // console.log(updatedEmail);
    sendRequest();
  };
  return (
    <div className="forgetPassword">
      <h1>Reset Password</h1>
      <form onSubmit={submitHandler}>
        <div className="forgetPassword__input">
          <label htmlFor="email">Enter your email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={emailHandler}
          />
        </div>
        <p>
          back to
          <Link to="/login">Login page</Link>
        </p>
        <button>{loading ? "Sending request" : "Change Password"}</button>
      </form>
    </div>
  );
};

export default ForgetPassword;
