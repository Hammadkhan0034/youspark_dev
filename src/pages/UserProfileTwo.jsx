import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import API from "../api/api";
import { useDispatch, useSelector } from "react-redux";
import { updateUserProfile } from "../redux/userSlice";
import Sidebar from "../components/SidebarTwo";

const MultiStepForm = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    nickname: user?.nickname || "",
    birth_date: "",
    gender: "",
    country: "",
    region: "",
    city: "",
    
  });

  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState(null);
  const [countries, setCountries] = useState([]);
  const [regions, setRegions] = useState([]);
  const [cities, setCities] = useState([]);

  // Load data from local storage when component mounts
  useEffect(() => {
    const savedFormData = localStorage.getItem("multiStepFormData");
    if (savedFormData) {
      setFormData(JSON.parse(savedFormData));
    }

    // Load countries
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      const countryData = response.data
        .map((country) => ({
          name: country.name.common,
          code: country.cca2,
        }))
        .sort((a, b) => a.name.localeCompare(b.name));
      setCountries(countryData);
    });
  }, []);

  // Save data to local storage whenever formData changes
  useEffect(() => {
    localStorage.setItem("multiStepFormData", JSON.stringify(formData));
  }, [formData]);

  const validateNickname = (nickname) => {
    if (!nickname || nickname.trim() === "") {
      return "Nickname is required";
    }
    if (nickname.length < 3) {
      return "Nickname must be at least 3 characters";
    }
    return null;
  };

  const validateBirthDate = (birthDate) => {
    if (!birthDate) {
      return "Birth date is required";
    }
    
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    
    if (age < 16) {
      return "You must be at least 16 years old";
    }
    return null;
  };

  const validateLocation = () => {
    if (!formData.country) return "Please select a country";
    if (!formData.region) return "Please select a region/state";
    if (!formData.city) return "Please select a city";
    return null;
  };

  const handleNext = () => {
    let error = null;
    
    switch (step) {
      case 1:
        error = validateNickname(formData.nickname);
        if (error) {
          setErrors({ nickname: error });
          return;
        }
        break;
      case 2:
        error = validateBirthDate(formData.birth_date);
        if (error) {
          setErrors({ birth_date: error });
          return;
        }
        break;
      case 3:
        if (!formData.gender) {
          setErrors({ gender: "Gender is required" });
          return;
        }
        break;
      case 4:
        error = validateLocation();
        if (error) {
          setErrors({ location: error });
          return;
        }
        break;
    }
    
    setErrors({});
    setStep(step + 1);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCountryChange = async (e) => {
    const countryName = e.target.value;
    setFormData(prev => ({ ...prev, country: countryName, region: "", city: "" }));
    
    try {
      const response = await axios.post(
        "https://countriesnow.space/api/v0.1/countries/states", 
        { country: countryName }
      );
      setRegions(response.data.data?.states || []);
      setCities([]);
    } catch (error) {
      console.error("Failed to fetch regions:", error);
      setRegions([]);
      setCities([]);
    }
  };

  const handleRegionChange = async (e) => {
    const regionName = e.target.value;
    setFormData(prev => ({ ...prev, region: regionName, city: "" }));
    
    try {
      const response = await axios.post(
        "https://countriesnow.space/api/v0.1/countries/state/cities",
        { country: formData.country, state: regionName }
      );
      setCities(response.data.data || []);
    } catch (error) {
      console.error("Failed to fetch cities:", error);
      setCities([]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError(null);

    try {
      const token = localStorage.getItem("access_token");
      if (!token) {
        navigate("/signin-socials");
        return;
      }

      // Final validation before submission
      const locationError = validateLocation();
      if (locationError) {
        setErrors({ location: locationError });
        setStep(4); // Return to location step if invalid
        return;
      }

      const result = await dispatch(
        updateUserProfile({ ...formData, profile_completed: true })
      ).unwrap();

      if (result.data) {
        navigate("/home", { replace: true });
        localStorage.removeItem("multiStepFormData");
      }
    } catch (error) {
      console.error("Profile update failed:", error);
      setSubmitError(
        error.message || "Failed to update profile. Please try again."
      );
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  return (
    <div className="min-h-screen bg-[#81D8D0] flex items-center justify-center p-4">
      <div className="flex bg-white bg-opacity-90 rounded-lg shadow-2xl overflow-hidden w-full max-w-4xl">
        <Sidebar step={step} />
        <div className="p-8 flex-1">
          {submitError && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
              {submitError}
            </div>
          )}

          {/* Step 1: Nickname */}
          {step === 1 && (
            <div>
              <h2 className="text-2xl font-bold mb-6 text-[#0ABAB5]">Nickname</h2>
              <input
                type="text"
                name="nickname"
                value={formData.nickname}
                onChange={handleChange}
                placeholder="Enter your nickname"
                className="border-2 border-[#81D8D0] p-3 w-full rounded-lg focus:border-[#0ABAB5] focus:outline-none"
              />
              {errors.nickname && (
                <p className="text-red-500 mt-2">{errors.nickname}</p>
              )}
              <div className="flex justify-end mt-6">
                <button 
                  onClick={handleNext} 
                  className="bg-[#0ABAB5] text-white p-2 rounded-lg w-24 hover:bg-[#81D8D0] transition"
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Birthday */}
          {step === 2 && (
            <div>
              <h2 className="text-2xl font-bold mb-6 text-[#0ABAB5]">Birthday</h2>
              <input 
                type="date" 
                name="birth_date" 
                value={formData.birth_date} 
                onChange={handleChange} 
                className="border-2 border-[#81D8D0] p-3 w-full rounded-lg focus:border-[#0ABAB5] focus:outline-none" 
              />
              {errors.birth_date && (
                <p className="text-red-500 mt-2">{errors.birth_date}</p>
              )}
              <div className="flex justify-between mt-6">
                <button 
                  onClick={handleBack} 
                  className="bg-gray-500 text-white p-2 rounded-lg w-24 hover:bg-gray-600"
                >
                  Back
                </button>
                <button 
                  onClick={handleNext} 
                  className="bg-[#0ABAB5] text-white p-2 rounded-lg w-24 hover:bg-[#81D8D0] transition"
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Gender */}
          {step === 3 && (
            <div>
              <h2 className="text-2xl font-bold mb-6 text-[#0ABAB5]">Gender</h2>
              <select
                name="gender"
                value={formData.gender || ""}
                onChange={handleChange}
                className="border-2 border-[#81D8D0] p-3 w-full rounded-lg focus:border-[#0ABAB5] focus:outline-none mb-4"
              >
                <option value="" disabled>Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              {errors.gender && (
                <p className="text-red-500 mt-2">{errors.gender}</p>
              )}
              <div className="flex justify-between mt-6">
                <button 
                  onClick={handleBack} 
                  className="bg-gray-500 text-white p-2 rounded-lg w-24 hover:bg-gray-600"
                >
                  Back
                </button>
                <button 
                  onClick={handleNext} 
                  className="bg-[#0ABAB5] text-white p-2 rounded-lg w-24 hover:bg-[#81D8D0] transition"
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Location */}
          {step === 4 && (
            <div>
              <h2 className="text-2xl font-bold mb-6 text-[#0ABAB5]">Location</h2>
              {errors.location && (
                <p className="text-red-500 mb-4">{errors.location}</p>
              )}
              
              <select 
                name="country" 
                value={formData.country} 
                onChange={handleCountryChange} 
                className="border-2 border-[#81D8D0] p-3 w-full rounded-lg focus:border-[#0ABAB5] focus:outline-none mb-4"
              >
                <option value="">Select Country</option>
                {countries.map((c) => (
                  <option key={c.code} value={c.name}>{c.name}</option>
                ))}
              </select>
              
              <select 
                name="region" 
                value={formData.region} 
                onChange={handleRegionChange} 
                className="border-2 border-[#81D8D0] p-3 w-full rounded-lg focus:border-[#0ABAB5] focus:outline-none mb-4" 
                disabled={!formData.country}
              >
                <option value="">Select Region/State</option>
                {regions.map((r, i) => (
                  <option key={i} value={r.name}>{r.name}</option>
                ))}
              </select>
              
              <select 
                name="city" 
                value={formData.city} 
                onChange={handleChange} 
                className="border-2 border-[#81D8D0] p-3 w-full rounded-lg focus:border-[#0ABAB5] focus:outline-none" 
                disabled={!formData.region}
              >
                <option value="">Select City</option>
                {cities.map((c, i) => (
                  <option key={i} value={c}>{c}</option>
                ))}
              </select>
              
              <div className="flex justify-between mt-6">
                <button 
                  onClick={handleBack} 
                  className="bg-gray-500 text-white p-2 rounded-lg w-24 hover:bg-gray-600"
                >
                  Back
                </button>
                <button 
                  onClick={handleNext} 
                  className="bg-[#0ABAB5] text-white p-2 rounded-lg w-24 hover:bg-[#81D8D0] transition"
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {/* Step 5: Summary */}
          {step === 5 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold mb-6 text-[#0ABAB5]">Profile Summary</h2>
              <div className="space-y-2">
                <p><strong>Nickname:</strong> {formData.nickname}</p>
                <p><strong>Birth Date:</strong> {new Date(formData.birth_date).toLocaleDateString()}</p>
                <p><strong>Gender:</strong> {formData.gender}</p>
                <p><strong>Location:</strong> {[formData.city, formData.region, formData.country].filter(Boolean).join(", ")}</p>
              </div>
              
              <div className="flex justify-between mt-8">
                <button 
                  onClick={handleBack} 
                  className="bg-gray-500 text-white p-2 rounded-lg w-24 hover:bg-gray-600"
                >
                  Back
                </button>
                <button 
                  onClick={handleSubmit} 
                  className="bg-green-500 text-white p-2 rounded-lg w-24 hover:bg-green-600"
                >
                  Submit
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MultiStepForm;
