import axios from 'axios';
import React, { useState } from 'react';

const Login = ({ setLoggedIn }) => {
  const [uname, setUname] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async () => {
    try {
      const res = await axios.post('https://news-app-api-pi.vercel.app/api/admin/login', {
        uname,
        password,
      });

      if (res.status === 201) {
        alert('Login successfully');
        const token = res.data.token;
        localStorage.setItem('token', token); // ✅ Save token
        setLoggedIn(true); // ✅ Update state
      }
    } catch (error) {
      alert(error.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div>
      <label>User Name</label>
      <input
        type="text"
        name="username"
        value={uname}
        onChange={(e) => setUname(e.target.value)}
      />
      <label>Password</label>
      <input
        type="password"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit" onClick={handleSubmit}>
        Login
      </button>
    </div>
  );
};

export default Login;
