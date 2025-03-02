import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="container text-center mt-5">
      <h1>Welcome to Notes App</h1>
      <p className="lead">Organize your Notes Application.</p>
      <div className="mt-4">
        <Link to="/login" className="btn btn-primary me-3">Login</Link>
        <Link to="/register" className="btn btn-success">Register</Link>
      </div>
    </div>
  );
};

export default Home;
