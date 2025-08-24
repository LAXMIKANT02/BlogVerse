import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "./Navbar.css";

function Navbar() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  useEffect(() => {
    const handleStorageChange = () => {
      setToken(localStorage.getItem("token"));
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="logo">🌌 BlogVerse</Link>
        <div className="nav-links">
          <Link to="/"> 🏠 Home</Link>
          {token ? (
            <>
              <Link to="/create">✏️ Create Post</Link>
              <button className="logout-btn" onClick={handleLogout}> 🚪 Logout</button>
            </>
          ) : (
            <>
              <Link to="/login">🔑 Login</Link>
              <Link to="/signup">🔐 Signup</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
