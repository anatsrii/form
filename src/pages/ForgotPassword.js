import { useState } from "react";
import "../style/login.css";
import { Link} from "react-router-dom";

function ForgotPassword() {
  const [email, setEmail] = useState();
  // const navigate = useNavigate();

  const inputEmail = (e) => {
    console.log(e.target.value);
    setEmail(e.target.value);
  };

  const checkEmail = (e) => {
    e.preventDefault();
    console.log(
      "if email is correct, alert and settime out for 10 seconds to redirect to login page"
    );
    alert("Email sent");
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">Enter your email</h1>
        <form onSubmit={"form submited"}>
          <div className="form-group">
            {/* <label>Email</label> */}
            <input
              type="email"
              onChange={inputEmail}
              value={email}
              id="email"
              placeholder="Enter your email"
              required
            ></input>
          </div>
          <button type="submit" className="login-button" onClick={checkEmail}>
            Submit
          </button>
        </form>
        <p className="login-footer">
          <Link to={"/register"}>ยังไม่มีบัญชีหรอ ?</Link>
        </p>
      </div>
      
    </div>
  );
}

export default ForgotPassword;
