import React from 'react';
import '../stylesheets/app.css';
import SignIn from "../components/SignIn.js";

function Login() {
  return (
    <div className="hero">
      <SignIn />
      <div className="g-signin2" data-onsuccess="onSignIn" src="https://apis.google.com/js/platform.js"></div>

          {/* Google oAuth */}

          <div className="g-signin2" data-onsuccess="onSignIn" src="https://apis.google.com/js/platform.js" />

          {/* Google oAuth */}
    </div>
  )
}

export default Login;