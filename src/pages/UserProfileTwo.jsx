import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import API from "../api/api";
import userBG from "../../src/assets/userBG.jpg";
import { useDispatch, useSelector } from "react-redux";
import { updateUserProfile } from "../redux/userSlice";
import Sidebar from "../components/SidebarTwo";
import DefaultImg from "../assets/default.png"


const MultiStepForm = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    first_name: "", // Add first name
    last_name: "",  // Add last name
    nickname: user?.nickname || "",
    birth_date: "",
    gender: "",
    country: "",
    region: "",
    city: "",
    location: '',
  });


  const [countries, setCountries] = useState([]);
  const [regions, setRegions] = useState([]);
  const [cities, setCities] = useState([]);
  const [profileImage, setProfileImage] = useState(null);

  // Load data from local storage when component mounts
  useEffect(() => {
    const savedFormData = localStorage.getItem("formData");
    if (savedFormData) {
      setFormData(JSON.parse(savedFormData));
    }
  }, []);

  // Save data to local storage whenever formData changes
  useEffect(() => {
    localStorage.setItem("formData", JSON.stringify(formData));
  }, [formData]);

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      const countryData = response.data.map((country) => ({
        name: country.name.common,
        code: country.cca2,
      }));
      setCountries(countryData);
    });
  }, []);

  const handleChange = (e) => {
    const newFormData = { ...formData, [e.target.name]: e.target.value };
    setFormData(newFormData);
  };

  const handleCountryChange = async (e) => {
    const countryName = e.target.value;
    const newFormData = { ...formData, country: countryName, region: "", city: "" };
    setFormData(newFormData);
    const response = await axios.post("https://countriesnow.space/api/v0.1/countries/states", { country: countryName });
    setRegions(response.data.data.states || []);
    setCities([]);
  };

  const handleRegionChange = async (e) => {
    const regionName = e.target.value;
    const newFormData = { ...formData, region: regionName, city: "" };
    setFormData(newFormData);
    const response = await axios.post("https://countriesnow.space/api/v0.1/countries/state/cities", {
      country: formData.country,
      state: regionName,
    });
    setCities(response.data.data || []);
  };

  const handleSubmit = async () => {
    try {
      console.log("Form data Before API call", formData);
      const response = await API.put("/users/update-profile", formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` },
      });
      console.log("API Response:", response);
      dispatch(updateUserProfile(formData));
      navigate("/home");
    } catch (error) {
      console.error("Error updating profile:", error.response ? error.response.data : error);
    }

  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  return (
    <div
      className="relative w-full min-h-screen bg-cover bg-center bg-blue-300 flex items-center justify-center"
      style={{
        width: "100vw",
        height: "100vh",
        opacity: "0.9"
      }}
    >
      <div className="flex bg-white bg-opacity-90 rounded-lg shadow-2xl overflow-hidden" style={{ width: "50%" }}>
        <Sidebar step={step} />
        <div className="p-8 flex-1">
          {step === 1 && (
            <div>
              <h2 className="text-2xl font-bold mb-6 text-blue-800">Profile Image</h2>

              <div className="relative w-32 h-32 mx-auto mb-6">
                {/* Image Container */}
                <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-blue-200">
                  <img
                    src={profileImage || DefaultImg} // Default image path
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Pencil Icon */}
                <label htmlFor="profileImage" className="absolute bottom-0 right-0 bg-blue-500 p-2 rounded-full cursor-pointer hover:bg-blue-600">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
                  </svg>
                </label>

                {/* Hidden File Input */}
                <input
                  type="file"
                  id="profileImage"
                  name="profileImage"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </div>

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-6">
                <button onClick={handleBack} className="bg-gray-500 text-white p-2 rounded-lg w-24 hover:bg-gray-600">Back</button>
                <button onClick={() => setStep(2)} className="bg-blue-500 text-white p-2 rounded-lg w-24 hover:bg-blue-600">Next</button>
              </div>
            </div>
          )}
          {step === 2 && (
            <div>
              <h2 className="text-2xl font-bold mb-6 text-blue-800">Personal Information</h2>

              <input
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                placeholder="First Name"
                className="border-2 border-blue-200 p-3 w-full rounded-lg focus:border-blue-500 focus:outline-none"
              />
              <input
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                placeholder="Last Name"
                className="border-2 border-blue-200 p-3 w-full rounded-lg focus:border-blue-500 focus:outline-none"
              />

              <input
                type="text"
                name="nickname"
                value={formData.nickname}
                onChange={handleChange}
                placeholder="Nickname"
                className="border-2 border-blue-200 p-3 w-full rounded-lg focus:border-blue-500 focus:outline-none"
              />
              <div className="flex justify-between mt-6">
                <button onClick={handleBack} className="bg-gray-500 text-white p-2 rounded-lg w-24 hover:bg-gray-600">Back</button>
                <button onClick={() => setStep(3)} className="bg-blue-500 text-white p-2 rounded-lg w-24 hover:bg-blue-600">Next</button>
              </div>
            </div>
          )}
          {step === 3 && (
            <div>
              <h2 className="text-2xl font-bold mb-6 text-blue-800">Birthday</h2>
              <input type="date" name="birth_date" value={formData.birth_date} onChange={handleChange} className="border-2 border-blue-200 p-3 w-full rounded-lg focus:border-blue-500 focus:outline-none" />
              <div className="flex justify-between mt-6">
                <button onClick={handleBack} className="bg-gray-500 text-white p-2 rounded-lg w-24 hover:bg-gray-600">Back</button>
                <button onClick={() => setStep(4)} className="bg-blue-500 text-white p-2 rounded-lg w-24 hover:bg-blue-600">Next</button>
              </div>
            </div>
          )}
          {step === 4 && (
            <div>
              <h2 className="text-2xl font-bold mb-6 text-blue-800">Gender</h2>
              <div className="mb-6">
                <select
                  value={formData.gender || ""}
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                  className="border-2 border-blue-200 p-3 w-full rounded-lg focus:border-blue-500 focus:outline-none mb-4"
                >
                  <option value="" disabled>Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Non-Binary">Non-Binary</option>
                </select>
              </div>
              <div className="flex justify-between mt-6">
                <button onClick={handleBack} className="bg-gray-500 text-white p-2 rounded-lg w-24 hover:bg-gray-600">Back</button>
                <button onClick={() => setStep(5)} className="bg-blue-500 text-white p-2 rounded-lg w-24 hover:bg-blue-600" disabled={!formData.gender}>Next</button>
              </div>
            </div>
          )}
          {step === 5 && (
            <div>
              <h2 className="text-2xl font-bold mb-6 text-blue-800">Location</h2>
              <select name="country" value={formData.country} onChange={handleCountryChange} className="border-2 border-blue-200 p-3 w-full rounded-lg focus:border-blue-500 focus:outline-none mb-4">
                <option value="">Select Country</option>
                {countries.map((c) => (<option key={c.code} value={c.name}>{c.name}</option>))}
              </select>
              <select name="region" value={formData.region} onChange={handleRegionChange} className="border-2 border-blue-200 p-3 w-full rounded-lg focus:border-blue-500 focus:outline-none mb-4" disabled={!regions.length}>
                <option value="">Select Region</option>
                {regions.map((r, i) => (<option key={i} value={r.name}>{r.name}</option>))}
              </select>
              <select name="city" value={formData.city} onChange={handleChange} className="border-2 border-blue-200 p-3 w-full rounded-lg focus:border-blue-500 focus:outline-none" disabled={!cities.length}>
                <option value="">Select City</option>
                {cities.map((c, i) => (<option key={i} value={c}>{c}</option>))}
              </select>

              <input className="border-2 border-blue-200 p-3 mt-4 w-full rounded-lg focus:border-blue-500 focus:outline-none"
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Location"
              />

              <div className="flex justify-between mt-6">
                <button onClick={handleBack} className="bg-gray-500 text-white p-2 rounded-lg w-24 hover:bg-gray-600">Back</button>
                <button onClick={() => setStep(6)} className="bg-blue-500 text-white p-2 rounded-lg w-24 hover:bg-blue-600">Next</button>
              </div>
            </div>
          )}
          {step === 6 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold mb-6 text-blue-800">Summary</h2>
              <p className="mb-4"><strong>First Name:</strong> {formData.first_name}</p>
              <p className="mb-4"><strong>Last Name:</strong> {formData.last_name}</p>
              <p className="mb-4"><strong>Nickname:</strong> {formData.nickname}</p>
              <p className="mb-4"><strong>Birth Date:</strong> {formData.birth_date}</p>
              <p className="mb-4"><strong>Gender:</strong> {formData.gender}</p>
              <p className="mb-6"><strong>Location:</strong> {formData.city}, {formData.region}, {formData.country}</p>
              <div className="flex justify-between">
                <button onClick={handleBack} className="bg-gray-500 text-white p-2 rounded-lg w-24 hover:bg-gray-600">Back</button>
                <button onClick={handleSubmit} className="bg-green-500 text-white p-2 rounded-lg w-24 hover:bg-green-600">Submit</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MultiStepForm;