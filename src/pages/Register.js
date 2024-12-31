import { Link } from "react-router";
import "../style/login.css";
const Register = () => {
  // const [username, setUsername] = useState('');
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  // const [confirmPassword, setConfirmPassword] = useState('');

  // const handleRegister = (e) => {
  //   e.preventDefault();
  //   if (password !== confirmPassword) {
  //     alert('Passwords do not match!');
  //     return;
  //   }
  //   // Handle registration logic here
  //   console.log('Register submitted:', { username, email, password });
  // };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="logo">
          <h4>
            <a href="#home" id="yb">
              YB
            </a>
          </h4>
          <a href="#home" id="logo-name">
            YourBill
          </a>
        </div>
        <form onSubmit={console.log("handle form register")}>
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
              // value={"emailValue"}
              // onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              // value={"passwordValue"}
              // onChange={(e ) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              placeholder="Confirm your password"
              // value={"confirmPasswordValue"}
              // onChange={(e) => setConfirmPassword(e.target.value)}
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
