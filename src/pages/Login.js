import { Link, useNavigate } from "react-router-dom";
import "../style/login.css";
import axios from "axios";
import { useState } from "react";


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  const checkValue = (e) => {
    console.log(e.target.value);
    setEmail(e.target.value);
    console.log(`check useSelector: ${email}`);
  };
  
  const CheckEmail =  async (e) => {
    e.preventDefault();
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(email)) {
      alert("รูปแบบของ Email ไม่ถูกต้อง");
      return;
    }
    try {
      const response = await axios.post("http://localhost:5000/api/user/search", {
        email: email,
      });
      if (response.status === 200) {
        console.log("Email found, navigating to password page");
        navigate("/password");
      } else {
        alert("ไม่พบ Email นี้ในระบบ");
      }
    } catch (error) {
      console.error("Error fetching email:", error);
      alert("เกิดข้อผิดพลาดในการตรวจสอบ Email");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="logo">
          <h4>
            <Link to={'/'} id="yb">YB</Link>
          </h4>
          <a href="#home" id="logo-name">YourBill</a>
        </div>
        <form onSubmit={CheckEmail}>
          <div className="form-group">
            <input
              type="email"
              id="email"
              value={email}
              placeholder="Enter your email"
              onChange={(e) => checkValue(e)}
              required
            />
          </div>
      
          <div className="form-group">
            {/* <label>Password</label> */}
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              id="password"
              placeholder="Password"
              required
            ></input>
          </div>
     
    
          <button type="submit" className="login-button">Next</button>
        </form>
        <div className="login-footer">
        <p className="login-footer">
          <Link to={"/forgot-password"}>ลืมรหัสผ่าน ?  &#128517;</Link>
        </p>
          <p>หรือว่ายังไม่มีบัญชีหรอ? <Link to="/register">สมัครเลย!</Link></p>
        </div>
      </div>
      <div className="login-image">
        {/* <img src={loginImage} alt="login" /> */}
      </div>
    </div>
  );
}

export default Login;
