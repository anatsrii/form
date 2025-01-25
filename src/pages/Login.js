import { Link, useNavigate } from "react-router-dom";
import "../style/login.css"
import { useState } from "react";

function Login() {
  const [email, setEmail] = useState()
  const navigate = useNavigate()

  const inputEmail = (e) => {
    console.log(e.target.value)
    setEmail(e.target.value)
  }
 

  const CheckEmail = (e) => {
    e.preventDefault()
    if (email === "jane.stbc@gmail.com") {
      navigate("/password")
    } else {
    console.log("Invalid email please check!")
    alert("Invalid email please check!")
    setEmail('')
    }
  }

  return (
    <div className="login-container">
    <div className="login-card">
        <div className="logo">
        <h4><Link to={'/'} id="yb">YB</Link></h4>
        <a href="#home" id="logo-name">YourBill</a>
        </div>
      <form onSubmit={"Email checked"}>
        <div className="form-group">
          {/* <label htmlFor="email">Email</label> */}
          <input
            type="email"
            id="email"
            value={email}
            placeholder="Enter your email"
            onChange={inputEmail}
            required
          />
        </div>
        {/* <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            value={console.log("value password")}
            required
          />
        </div> */}
        <button type="submit" className="login-button" onClick={CheckEmail}>Next</button>
      </form>
      <div className="login-footer">
        <p>
          ยังไม่มีบัญชีหรอ? <Link to="/register">สมัครเลย!</Link>
        </p>
        
      </div>
    </div>
    <div className="login-image">
      {/* <img src={loginImage} alt="login" /> */}
    </div>
  </div>
  );
}

export default Login;
