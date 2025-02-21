import { Link } from "react-router";
import "../style/login.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  const registerHandler = async (e) => {
    e.preventDefault();
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(email)) {
      alert("รูปแบบของ Email ไม่ถูกต้อง");
      return;
    }
    if (password.length < 8) {
      alert("Password ต้องมีความยาวอย่างน้อย 8 ตัวอักษร");
      return;
    }
    if (password !== confirmPassword) {
      alert("Password and Confirm password do not match");
      return;
    }
    try {
      const response = await axios.post("http://localhost:5000/api/user/register", {
        email: email,
        password: password,
        role: "user",
      });

      if (response.status === 201) {
        navigate("/login");
        alert("ลงทะเบียนสำเร็จ");
      }

      
    } catch (error) {
      console.error(error);
      alert("ลงทะเบียนไม่สำเร็จ");
    }
  }


  return (
    <div className="login-container">
      <div className="login-card">
        <div className="logo">
          <h4>
            <Link to={'/'} id="yb">
              YB
            </Link>
          </h4>
          <a href="#home" id="logo-name">
            YourBill
          </a>
        </div>
        <form onSubmit={(e) => registerHandler}>
          {/* <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                placeholder="Enter your username"
                value={"usernameValue"}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div> */}
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e ) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-button">
            Register
          </button>
        </form>
        <div className="login-footer">
          <p>
            มีบัญชีอยู่แล้วหรอ? <Link to={"/login"}>Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
