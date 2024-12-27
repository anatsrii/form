import React from "react";

function Features() {
  return (
    <section className="features" id="features">
      <h2>Why Choose Our Platform?</h2>
      <div className="feature">
        <h3>Automated Billing</h3>
        <p>Automatically generate recurring invoices based on your billing cycle.</p>
      </div>
      <div className="feature">
        <h3>Track Payments</h3>
        <p>Keep track of paid, pending, and overdue invoices with real-time updates.</p>
      </div>
      <div className="feature">
        <h3>Cloud-Based</h3>
        <p>Access your bills and invoices anytime, anywhere with secure cloud storage.</p>
      </div>
      <div className="feature">
        <h3>Data Security</h3>
        <p>All your information is encrypted and safely stored.</p>
      </div>
    </section>
  );
}

export default Features;
