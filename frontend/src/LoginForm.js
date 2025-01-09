import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";
import 'js-cookie'
import Cookies from "js-cookie";


function Aheader() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    mobileNumber: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError("");

    if (isLogin) {
      try {
        const response = await fetch("http://localhost:5000/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(errorText);
        }

        const data = await response.json();
        // Store user details in local storage
        localStorage.setItem("userEmail", data.user.email);
        localStorage.setItem("userData", JSON.stringify(data.user));
        Cookies.set("Verified", true);
        
        navigate("/home");
      } catch (error) {
        console.error("Error:", error);
        setLoginError("Login failed: " + error.message);
      }
    } else {
      // Registration logic
      const newErrors = {};
      if (!formData.username.trim()) newErrors.username = "Username is required.";
      if (!formData.email.trim()) newErrors.email = "Email is required.";
      if (!formData.mobileNumber || formData.mobileNumber.length !== 10)
        newErrors.mobileNumber = "Mobile number must be 10 digits.";
      if (formData.password !== formData.confirmPassword)
        newErrors.confirmPassword = "Passwords do not match.";

      if (Object.keys(newErrors).length === 0) {
        try {
          const response = await fetch("http://localhost:5000/register", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          });

          if (response.ok) {
            // Automatically log in after successful registration
            const loginResponse = await fetch("http://localhost:5000/login", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email: formData.email,
                password: formData.password,
              }),
            });

            const loginData = await loginResponse.json();
            localStorage.setItem("userEmail", loginData.user.email);
            localStorage.setItem("userData", JSON.stringify(loginData.user));

            navigate("/home");
          } else {
            const errorMessage = await response.text();
            alert("Registration failed: " + errorMessage);
          }
        } catch (error) {
          console.error("Error:", error);
          alert("An error occurred during registration.");
        }
      } else {
        setErrors(newErrors);
      }
    }
  };

  return (
    <div className="page-background">
        <div>
          <h1 className="shop-here">Shop Now</h1>
          <div className="form-container">
            <h2 id="LRForm">{isLogin ? "Login Form" : "Registration Form"}</h2>
            <form onSubmit={handleLogin}>
              {!isLogin && (
                <div className="form-group">
                  <input
                    placeholder="Full Name"
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                  />
                  {errors.username && <p className="error">{errors.username}</p>}
                </div>
              )}

              <div className="form-group">
                <input
                  placeholder="Enter your Email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
                {errors.email && <p className="error">{errors.email}</p>}
              </div>

              {!isLogin && (
                <div className="form-group">
                  <input
                    placeholder="Enter your Mobile Number"
                    type="text"
                    name="mobileNumber"
                    value={formData.mobileNumber}
                    onChange={handleInputChange}
                  />
                  {errors.mobileNumber && (
                    <p className="error">{errors.mobileNumber}</p>
                  )}
                </div>
              )}

              <div className="form-group">
                <input
                  placeholder="Password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                />
              </div>

              {!isLogin && (
                <div className="form-group">
                  <input
                    placeholder="Confirm Password"
                    type={showPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                  />
                  {errors.confirmPassword && (
                    <p className="error">{errors.confirmPassword}</p>
                  )}
                </div>
              )}

              <div>
                <input
                  type="checkbox"
                  checked={showPassword}
                  onChange={() => setShowPassword(!showPassword)}
                />
                show password
              </div>

              <button className="login-button" type="submit">
                {isLogin ? "Login" : "Register"}
              </button>
            </form>

            {isLogin && loginError && <p className="error">{loginError}</p>}

            <button onClick={() => setIsLogin(!isLogin)}>
              Switch to {isLogin ? "Register" : "Login"}
            </button>
          </div>
        </div>
    
     
    </div>
  );
}

export default Aheader;
