import { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";
import "./Auth.css";

function Auth() {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => setIsLogin(!isLogin);

  return (
    <div className="auth-wrapper">
      <div className={`auth-card ${isLogin ? "login" : "signup"}`}>
        {isLogin ? <Login /> : <Signup />}
        <p className="switch-text">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <button onClick={toggleForm}>{isLogin ? "Signup" : "Login"}</button>
        </p>
      </div>
    </div>
  );
}

export default Auth;
