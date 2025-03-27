import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './SignUp.css';

const SignUp = () => {
  const [user, setUser] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/api/users/signup', user);

      alert('User registered successfully!');
      navigate('/login'); // Redirect to Login page
    } catch (error) {
      alert(error.response?.data || 'Something went wrong!');
      console.error('Signup Error:', error);
    }
  };

  return (
    <div className="signup-container">
      <h2>Mental Health Awareness</h2>
      <h3>Sign Up</h3>
      <form onSubmit={handleSubmit} autoComplete="off">
        <input type="text" name="name" placeholder="Name" required onChange={handleChange} />
        <input type="email" name="email" placeholder="Email" required onChange={handleChange} />
        <input type="password" name="password" placeholder="Password" required onChange={handleChange} />
        <button type="submit">Sign Up</button>
      </form>
      <p>Already have an account? <a onClick={() => navigate('/login')}>Login</a></p>
    </div>
  );
};

export default SignUp;
