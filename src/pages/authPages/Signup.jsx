import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import signupImg from "../../../src/assets/signupImg.jpg";
import API from "../../api/api.js"; // Import API instance

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    user_name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

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
    setSuccessMessage("");

    try {
      const res = await API.post("/sign-up", formData);
      console.log("Signup Success:", res.data);

      setSuccessMessage("Signup successful! Redirecting to login...");

      // Navigate to Login Page After Signup
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      console.error("Signup Error:", error);
      setError(error.response?.data?.message || "Signup failed. Please try again.");
    }
  };

  return (
    <>
    <div
            className="relative w-[143%] bg-cover h-screen"
            style={{
              backgroundImage: `url(${signupImg})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              opacity:"0.8"
            }}
          >
    <div className="absolute inset-0 flex justify-center items-center">
      <div className="w-full max-w-md h-[430px]  bg-slate-300 p-6 rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-center text-teal-800 mb-8">
          Signup
        </h2>

        {error && <p className="text-red-600 text-center mb-4">{error}</p>}
        {successMessage && <p className="text-green-600 text-center mb-4">{successMessage}</p>}

        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <input
              type="text"
              name="user_name"
              value={formData.user_name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your username"
              required
            />
          </div>
          <div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
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
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Signup
          </button>
        </form>

        <p className="mt-4 text-center text-gray-600">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
    </div>
    </>
  );
};

export default Signup;
































// import axios from "axios";
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const Signup = () => {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     username: "",
//     email: "",
//     password: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await axios.post("http://localhost:4000/api/sign-up", formData);
//       console.log("Signup Success:", res.data);

//       // Navigate to Login Page After Signup
//       navigate("/login");
//     } catch (error) {
//       console.error("Signup Error:", error);
//     }
//   };

//   return (
//     <div className="flex justify-center items-center z-50 mt-20">
//       <div className="w-full max-w-md bg-slate-300 p-6 rounded-lg shadow-lg">
//         <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">
//           Signup
//         </h2>

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <input
//               type="text"
//               name="username"
//               value={formData.username}
//               onChange={handleChange}
//               className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//               placeholder="Enter your username"
//             />
//           </div>
//           <div>
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//               placeholder="Enter your email"
//             />
//           </div>
//           <div>
//             <input
//               type="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//               placeholder="Enter your password"
//             />
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
//           >
//             Signup
//           </button>
//         </form>

//         <p className="mt-4 text-center text-gray-600">
//           Already have an account?{" "}
//           <a href="/login" className="text-blue-600 hover:underline">
//             Login
//           </a>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Signup;




