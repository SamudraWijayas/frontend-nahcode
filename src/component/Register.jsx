import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser, reset } from "../features/AuthSlice";
import imgProfile from "../assets/img/img-background-1.png";
import FoodieLogo from "../assets/img/logo1.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";

const Register = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    confPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [termsChecked, setTermsChecked] = useState(false);
  const [backendMessage, setBackendMessage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    // Hapus pesan error setelah 5 detik
    const timer = setTimeout(() => {
      setBackendMessage("");
    }, 5000);

    return () => clearTimeout(timer);
  }, [backendMessage]);

  const handleInput = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleCheckbox = (e) => {
    setTermsChecked(e.target.checked);
  };

  const validate = () => {
    let tempErrors = {};
    if (!values.name) tempErrors.name = "Nama diperlukan";
    if (!values.email) tempErrors.email = "Email diperlukan";
    if (!values.password) tempErrors.password = "Password diperlukan";
    if (values.password !== values.confPassword)
      tempErrors.confPassword = "Password tidak cocok";
    if (!termsChecked)
      tempErrors.terms = "Anda harus menyetujui syarat & ketentuan";
    return tempErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const tempErrors = validate();
    setErrors(tempErrors);
    if (Object.keys(tempErrors).length === 0) {
      dispatch(registerUser(values));
    }
  };

  useEffect(() => {
    if (isError) {
      setBackendMessage(message);
    } else if (isSuccess) {
      setBackendMessage(message);
      navigate("/login");
      dispatch(reset()); // Reset state setelah sukses
    }
  }, [isError, isSuccess, message, navigate, dispatch]);

  return (
    <div>
      <div className="login-container" style={{ backgroundImage: `url(${imgProfile})` }}>
        <div className="register-content">
          <div className="login-image">
            <img src={FoodieLogo} alt="Foodie Logo" />
            <span>Selamat Datang Kembali</span>
          </div>

          <div className="login-form">
            {backendMessage && (
              <div className="alert show">
                <span className="backend-message">{backendMessage}</span>
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <ul>
                <li>
                  <input
                    type="text"
                    placeholder="Nama"
                    name="name"
                    value={values.name}
                    onChange={handleInput}
                  />
                  {errors.name && <span className="error">{errors.name}</span>}
                </li>
                <li>
                  <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={values.email}
                    onChange={handleInput}
                  />
                  {errors.email && (
                    <span className="error">{errors.email}</span>
                  )}
                </li>
                <li>
                  <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={values.password}
                    onChange={handleInput}
                  />
                  {errors.password && (
                    <span className="error">{errors.password}</span>
                  )}
                </li>
                <li>
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    name="confPassword"
                    value={values.confPassword}
                    onChange={handleInput}
                  />
                  {errors.confPassword && (
                    <span className="error">{errors.confPassword}</span>
                  )}
                </li>
              </ul>
              <div className="check">
                <input
                  type="checkbox"
                  id="terms"
                  checked={termsChecked}
                  onChange={handleCheckbox}
                />
                <label htmlFor="terms">
                  Saya setuju dengan Syarat & Ketentuan Kebijakan
                </label>
              </div>
              {errors.terms && <span className="error">{errors.terms}</span>}
              <button className="btn-daftar" type="submit" disabled={isLoading}>
                {isLoading ? "Loading" : "Daftar"}
              </button>
              <p>
                Sudah mempunyai akun? <a href="/login">Masuk</a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
