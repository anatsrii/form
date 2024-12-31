import { useState } from "react";
import "../style/login.css";
import { Link, useNavigate } from "react-router-dom";

function Password() {
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  const inputPassword = (e) => {
    console.log(e.target.value);
    setPassword(Number(e.target.value));
  };

  const checkPassword = (e) => {
    e.preventDefault();
    if (password === 1234) {
      navigate("/dashboard");
    } else {
      console.log(password);
      alert("Wrong password");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">Enter your password</h1>
        <form onSubmit={"form submited"}>
          <div className="form-group">
            {/* <label>Password</label> */}
            <input
              type="password"
              onChange={inputPassword}
              value={password}
              id="password"
              placeholder="Password"
              required
            ></input>
          </div>
          <button
            type="submit"
            className="login-button"
            onClick={checkPassword}
          >
            Next
          </button>
        </form>
        <p className="login-footer">
          <Link to={"/forgot-password"}>ลืมรหัสผ่าน ?  &#128517;</Link>
        </p>
      </div>
      <div className="login-image">
        {/* <img src={loginImage} alt="login" /> */}
      </div>
    </div>
  );
}

export default Password;
