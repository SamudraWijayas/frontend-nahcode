import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser, reset } from '../features/AuthSlice';
import imgProfile from '../assets/img/img-background-1.png';
import FoodieLogo from '../assets/img/logo1.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token, isError, isLoading, message } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token) {
      const decodedToken = parseJwt(token); // Function to decode JWT token
      const userRole = decodedToken.role; // Assuming role is stored in token payload
      if (userRole === 'user') {
        navigate('/home');
      } else if (userRole === 'admin') {
        navigate('/dashboard');
      }
    }
  }, [token, navigate]);

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  useEffect(() => {
    return () => {
      dispatch(reset());
    };
  }, [dispatch]);

  // Function to decode JWT token (you can use a library like jwt-decode)
  const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      return null;
    }
  };

  return (
    <div>
      <div
        className="login-container"
        style={{ backgroundImage: `url(${imgProfile})` }}
      >
        <div className="login-content">
          <div className="login-image">
            <img src={FoodieLogo} alt="Foodie Logo" />
            <span>Selamat Datang Kembali</span>
          </div>
          <div className="login-form">
            <form onSubmit={handleLogin}>
              {isError && <span className="error">{message}</span>}
              <ul>
                <li>
                  <input
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </li>
                <li>
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </li>
              </ul>
              <button className="btn-daftar" type="submit" disabled={isLoading}>
                {isLoading ? 'Loading...' : 'Login'}
              </button>
              <button className="btn-google" type="button">
                <FontAwesomeIcon icon={faGoogle} className="google" />
                Daftar Dengan Google
              </button>
              <p>
                Belum punya akun? <a href="/register">Register</a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
