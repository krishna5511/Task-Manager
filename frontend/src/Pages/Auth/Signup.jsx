import "./Signup.css";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { signup } from "../../services/auth.api";
import signupImage from "../../assets/signup.png";

const Signup = () => {

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobileNumber: "",
    password: "",
  });

  // ==========================
  // HANDLE INPUT
  // ==========================

  const handleChange = (e) => {

    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

  };

  // ==========================
  // HANDLE SUBMIT
  // ==========================

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      const payload = {

        name: formData.name,

        email: formData.email.trim().toLowerCase(),

        mobileNumber: formData.mobileNumber,

        password: formData.password,

      };

      const response = await signup(payload);

      toast.success(response.message);

      navigate("/login");

    } catch (err) {

      toast.error(
        err.response?.data?.message ||
        "Signup Failed"
      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="signupContainer">

      <div className="signupCard">

        <div className="signupLeft">

          <img
            src={signupImage}
            alt="Signup Illustration"
          />

        </div>

        <form
          className="signupForm"
          onSubmit={handleSubmit}
        >

          <h1>Create Account</h1>

          <p>Welcome 👋</p>

          <div className="formGroup">

            <label>Name</label>

            <input
              type="text"
              name="name"
              placeholder="Enter Name"
              value={formData.name}
              onChange={handleChange}
              required
            />

          </div>

          <div className="formGroup">

            <label>Email</label>

            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              value={formData.email}
              onChange={handleChange}
              required
            />

          </div>

          <div className="formGroup">

            <label>Mobile Number</label>

            <input
              type="text"
              name="mobileNumber"
              placeholder="Enter Mobile Number"
              value={formData.mobileNumber}
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

            {loading
              ? "Creating Account..."
              : "Create Account"}

          </button>

          <p className="loginText">

            Already have an account?{" "}

            <Link to="/login">

              Login

            </Link>

          </p>

        </form>

      </div>

    </div>

  );

};

export default Signup;