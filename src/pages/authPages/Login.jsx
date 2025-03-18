import React, { useState } from "react";
import loginImg from "../../../src/assets/login.jpg"
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/userSlice.js";
import API from "../../api/api.js";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await API.post("/sign-in", formData);
      const userData = response.data.data;

      // Store access and refresh tokens in local storage
      localStorage.setItem("access_token", userData.access_token);
      localStorage.setItem("refresh_token", userData.refresh_token);

      // Dispatch user details to Redux store
      dispatch(
        setUser({
          id: userData.id,
          firstName: userData.first_name,
          lastName: userData.last_name,
          email: userData.email,
          username: userData.user_name,
          nickname: userData.nickname,
          city: userData.city,
          country: userData.country,
          region: userData.region,
          birthDate: userData.birth_date,
          gender: userData.gender,
          location: userData.location,
          profileUpdated: userData.profile_updated,
        })
      );

      console.log("Login Successful:", userData);

      // Navigate to home page after successful login
      navigate("/");
    } catch (error) {
      console.error("Login error:", error);
      setError(error.response?.data?.message || "Invalid credentials");
    }
  };

  return (
    <>
    <div
                className="relative w-[143%] bg-cover h-screen"
                style={{
                  backgroundImage: `url(${loginImg})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  opacity:"0.8"
                }}
              >
    <div className="absloute inset-0 flex justify-center items-center ">
      <div className="w-full h-[430px] mt-52 max-w-md bg-slate-300 p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center text-teal-800 mb-8">
          Login
        </h2>

        {error && <p className="text-red-600 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>

        <p className="mt-6 text-center text-gray-600">
          Don't have an account?{" "}
          <a href="/signup" className="text-blue-600 hover:underline">
            Sign Up
          </a>
        </p>
      </div>
    </div>
    </div>
    </>
  );
};

export default Login;
