import "../style/landing2.css"
import cloudIcon from "../assets/cloud.svg"
import trackingIcon from "../assets/eye_tracking.svg"
import invoiceIcon from "../assets/receipt.svg"
import securityIcon from "../assets/security.svg"
import { Link, useNavigate } from "react-router-dom";


function Landing2 () {
  const navigate = useNavigate()
  const linkToLogin = () => {
    return navigate("/login")
  }

  return (
    <div className="main">
    {/* header*/}
      <header className="header">
      <div className="logo">
        <h4><Link to={'/'} id="yb">YB</Link></h4>
        <Link to={'/'} id="logo-name">YourBill</Link>
        </div>
      <nav>
        <ul>
          <li><a href="#features">Features</a></li>
          <li><a href="#login">Login</a></li>
          <li><Link to={'/contact'}>Contact</Link></li>
        </ul>
      </nav>
    </header>

    {/* section*/}
    <div className="section-container">
      <div className="left-sectiion">
      <h1>Effortless Bill & Invoice <br/>Management Online</h1>
      <p>Create send and track your invoices with ease <br />manage your business finances seamlessly.</p>
      <button className="cta-button" onClick={linkToLogin}>Start Now</button>
      </div>
      <div className="right-section">
         {/* This section already uses the background image */}
      </div>
    </div>

    {/* feature*/}
    <section className="features" id="features">
      <h1>Why Choose YourBill ?</h1>
    <div className="card-container">
    <div className="feature card">
        <img src={invoiceIcon} alt="invoice icon" />
        <h3>Easy Invoicing</h3>
        <p>Create and send professional invoices in minutes.</p>
      </div>
      <div className="feature card">
        <img src={trackingIcon} alt="tracking icon" />
        <h3>Track Payments</h3>
        <p>Keep track of paid and overdue invoices with real-time updates.</p>
      </div>
      <div className="feature card">
        <img src={cloudIcon} alt="cloud icon" />
        <h3>Cloud-Based</h3>
        <p>Access your document anytime anywhere with cloud storage.</p>
      </div>
      <div className="feature card">
        <img src={securityIcon} alt="security icon" />
        <h3>Data Security</h3>
        <p>All your information is private</p>
      </div>
    </div>
    </section>

    {/* footer */}
    <footer className="footer">
      <p>&copy; 2024 YourBill. All Rights Reserved.</p>
    </footer>

    </div>

  );
}

export default Landing2