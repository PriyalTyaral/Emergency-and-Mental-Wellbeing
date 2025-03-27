import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

const Login = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // No need to store the response if you're not using it
      await axios.post('http://localhost:8080/api/users/login', credentials);
      alert('Login successful!');
      navigate('/home'); // Redirect to Home page
    } catch (error) {
      alert(error.response?.data || 'Wrong email or password!');
      console.error('Login Error:', error);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} autoComplete="off">
        <input type="email" name="email" placeholder="Email" required onChange={handleChange} />
        <input type="password" name="password" placeholder="Password" required onChange={handleChange} />
        <button type="submit">Login</button>
      </form>
      <p>Don&apos;t have an account? <a onClick={() => navigate('/')}>Sign Up</a></p>
    </div>
  );
};

export default Login;
