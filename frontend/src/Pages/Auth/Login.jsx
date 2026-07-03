import "./Login.css";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";

// apni image ka path change kar lena
import loginImage from "../../assets/login.png";

const Login = () => {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [formData, setFormData] = useState({
    emailOrMobile: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  // ==========================
  // HANDLE INPUT CHANGE
  // ==========================

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // ==========================
  // HANDLE LOGIN
  // ==========================

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const payload = {
        password: formData.password,
      };

      if (formData.emailOrMobile.includes("@")) {
        payload.email = formData.emailOrMobile.trim().toLowerCase();
      } else {
        payload.mobileNumber = formData.emailOrMobile.trim();
      }

      const data = await login(payload);

      toast.success(data.message);

      navigate("/dashboard");
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
        "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="loginContainer">

      <div className="loginCard">

        <div className="loginLeft">
          <img
            src={loginImage}
            alt="Login"
          />
        </div>

        <form
          className="loginForm"
          onSubmit={handleSubmit}
        >
          <h1>Login</h1>

          <p>Welcome Back 👋</p>

          <div className="formGroup">
            <label>Email or Mobile Number</label>

            <input
              type="text"
              name="emailOrMobile"
              placeholder="Enter Email or Mobile Number"
              value={formData.emailOrMobile}
              onChange={handleChange}
              required
            />
          </div>

          <div className="formGroup">
            <label>Password</label>

            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
          >
            {loading ? "Logging In..." : "Login"}
          </button>

          <p className="signupText">
            Don't have an account?{" "}
            <Link to="/signup">
              Signup
            </Link>
          </p>

        </form>

      </div>

    </div>
  );
};

export default Login;