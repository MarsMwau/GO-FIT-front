import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignupLogin.css';

const SignupLogin = () => {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [user, setUser] = useState({
    user_name: '',
    email: '',
    age: '',
    height: '',
    weight: '',
  });

  const navigate = useNavigate(); // Use the useNavigate hook

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignup = (e) => {
    e.preventDefault();

    // Perform signup logic
    // Example: Send a POST request to your backend API
    fetch('http://localhost:9292/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle success or error response from the backend
        console.log(data);
        navigate('/Dashboard'); // Redirect to the dashboard after successful signup
      })
      .catch((error) => {
        // Handle network or other errors
        console.error(error);
      });
  };

  const handleLogin = (e) => {
    e.preventDefault();

    // Perform login logic
    // Example: Send a POST request to your backend API
    fetch('http://localhost:9292/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle success or error response from the backend
        console.log(data);
        if (data.success) {
          // Redirect to the dashboard
          navigate('/Dashboard');
        } else {
          // Handle login error
        }
      })
      .catch((error) => {
        // Handle network or other errors
        console.error(error);
      });
  };

  return (
    <div className="signup-login-container">
      <h1>{showLoginForm ? 'Login' : 'Signup'}</h1>
      {showLoginForm ? (
        <form onSubmit={handleLogin}>
          {/* Login form fields */}
          <label>
            Email:
            <input type="email" name="email" value={user.email} onChange={handleChange} />
          </label>
          <br />
          <br />
          <button type="submit">Login</button>
          <br />
          <p>
            Don't have an account?{' '}
            <button type="button" onClick={() => setShowLoginForm(false)}>
              Signup here
            </button>
          </p>
        </form>
      ) : (
        <form onSubmit={handleSignup}>
          {/* Signup form fields */}
          <label>
            Username:
            <input type="text" name="user_name" value={user.user_name} onChange={handleChange} />
          </label>
          <br />
          <label>
            Email:
            <input type="email" name="email" value={user.email} onChange={handleChange} />
          </label>
          <br />
          <label>
            Age:
            <input type="number" name="age" value={user.age} onChange={handleChange} />
          </label>
          <br />
          <label>
            Height:
            <input type="number" name="height" value={user.height} onChange={handleChange} />
          </label>
          <br />
          <label>
            Weight:
            <input type="number" name="weight" value={user.weight} onChange={handleChange} />
          </label>
          <br />
          <button type="submit">Signup</button>
          <br />
          <p>
            Already have an account?{' '}
            <button type="button" onClick={() => setShowLoginForm(true)}>
              Login here
            </button>
          </p>
        </form>
      )}
    </div>
  );
};

export default SignupLogin;
