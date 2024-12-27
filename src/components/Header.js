import React from "react";

function Header() {
  return (
    <header className="header">
      <div className="logo">Your Bill</div>
      <nav>
        <ul>
          <li><a href="#features">Features</a></li>
          <li><a href="#login">Login</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
