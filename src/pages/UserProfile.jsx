import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import API from "../api/api";

const UserProfile = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    nickname: "",
    region: "",
    city: "",
    country:"",
    gender:"",
    location:"",
    birth_date: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Form validation
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      if (!formData[key]) {
        newErrors[key] = `${key.replace("_", " ")} is required`;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const token = localStorage.getItem("access_token");
      console.log("Token in userProfile is", token);




      const res = await API.put("/users/update-profile",
        formData,
        {
          headers: {
            Authorization: `Bearer${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Profile updated successfully:", res.data);

      // // Store updated user data in local storage
      // localStorage.setItem("user", JSON.stringify(res.data.user));

      // Navigate to home page after successful update
      navigate("/");
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="flex justify-center items-center p-7">
      <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-lg">
        <h2 className="text-2xl font-extrabold text-center text-gray-800 mb-8">
          Update Profile
        </h2>
        <form onSubmit={handleSubmit} className="space-y-2.5">
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              placeholder="First Name"
              className="w-full p-2 py-1 h-9 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <input
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              placeholder="Last Name"
              className="w-full p-2 py-1 h-9 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="nickname"
              value={formData.nickname}
              onChange={handleChange}
              placeholder="Nickname"
              className="w-full p-2 py-1 h-9 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <input
              type="text"
              name="region"
              value={formData.region}
              onChange={handleChange}
              placeholder="Region"
              className="w-full p-2 py-1 h-9 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
  <select
    name="gender"
    value={formData.gender}
    onChange={handleChange}
    className="w-full p-2 py-1 h-9 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
  >
    <option value="" disabled>Select Gender</option>
    <option value="male">Male</option>
    <option value="female">Female</option>
  </select>

  <input
    type="text"
    name="location"
    value={formData.location}
    onChange={handleChange}
    placeholder="Location"
    className="w-full p-2 py-1 h-9 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
  />
</div>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="City"
              className="w-full p-2 py-1 h-9 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <input
              type="date"
              name="birth_date"
              value={formData.birth_date}
              onChange={handleChange}
              className="w-full p-2 py-1 h-9 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>



          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
              placeholder="Country"
              className="w-full p-2 py-1 h-9 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            
          </div>


          <button
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-500 to-purple-700 text-white p-2 py-1 h-9 rounded-xl font-semibold text-lg shadow-lg hover:from-indigo-600 hover:to-purple-800 transition-all"
          >
            Update Profile
          </button>
          {Object.keys(errors).map((key) => (
            <p key={key} className="text-red-500 text-sm">{errors[key]}</p>
          ))}
        </form>
      </div>
    </div>
  );
};

export default UserProfile;

//   return (
//     <div className="flex justify-center items-center p-6">
//       <div className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-lg">
//         <h2 className="text-2xl font-extrabold text-center text-gray-800 mb-8">
//           Create an Account
//         </h2>
//         <form className="space-y-2.5">
//           <div className="grid grid-cols-2 gap-4">
//             <input
//               type="text"
//               placeholder="First Name"
//               className="w-full p-2 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//             />
//             <input
//               type="text"
//               placeholder="Last Name"
//               className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//             />
//           </div>
//           <div className="grid grid-cols-2 gap-4">
//             <input 
//               type="text" 
//               placeholder="Username" 
//               className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" 
//             />
//             <input 
//               type="email" 
//               placeholder="Email" 
//               className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" 
//             />
//           </div>
//           <div className="grid grid-cols-2 gap-4">
//             <select className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
//               <option value="">Select Gender</option>
//               <option value="male">Male</option>
//               <option value="female">Female</option>
//               <option value="other">Other</option>
//             </select>
//             <input 
//               type="text" 
//               placeholder="Address" 
//               className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" 
//             />
//           </div>
//           <div className="grid grid-cols-2 gap-4">
//             <input 
//               type="text" 
//               placeholder="City" 
//               className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" 
//             />
//             <input 
//               type="text" 
//               placeholder="State" 
//               className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" 
//             />
//           </div>
//           <div className="grid grid-cols-2 gap-4">
//             <input 
//               type="text" 
//               placeholder="Country" 
//               className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" 
//             />
//             <input 
//               type="date" 
//               className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" 
//             />
//           </div>
//           <button
//             type="submit"
//             className="w-full bg-gradient-to-r from-indigo-500 to-purple-700 text-white py-3 rounded-xl font-semibold text-lg shadow-lg hover:from-indigo-600 hover:to-purple-800 transition-all"
//           >
//             Sign Up
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default UserProfile;