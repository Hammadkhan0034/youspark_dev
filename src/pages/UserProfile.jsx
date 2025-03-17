
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import API from "../api/api";
import ImageCard from "../components/ImageCard";
import userBG from "../../src/assets/userBG.jpg"
import { setUser } from "../redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { updateUserProfile } from "../redux/userSlice";


const UserProfile = () => {

  const { user, loading, error } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    nickname: "",
    city: "",
    country: "",
    region: "",
    gender: "",
    location: "",
    birth_date: "",
  });

  const [countries, setCountries] = useState([]);
  const [regions, setRegions] = useState([]);
  const [cities, setCities] = useState([]); 
  const [userData, setUserData] = useState(null);
  // const [user, setUser] = useState(); 

  const [errors, setErrors] = useState({});
  const dispatch = useDispatch(); 
  const navigate = useNavigate();

  // Fetch all countries when component loads
  useEffect(() => {
    const fetchCountries = async () => {
      const response = await axios.get("https://restcountries.com/v3.1/all");
      const countryData = response.data.map((country) => ({
        name: country.name.common,
        code: country.cca2,
      }));
      setCountries(countryData);
    };
    fetchCountries();
  }, []);

  // Handle country change & fetch regions
  const handleCountryChange = async (e) => {
    const countryName = e.target.value;
    setFormData({ ...formData, country: countryName, region: "", city: "" }); 

    try {
      const response = await axios.post("https://countriesnow.space/api/v0.1/countries/states", {
        country: countryName
      });
      setRegions(response.data.data.states || []);
      setCities([]); 
    } catch (error) {
      console.error("Error fetching regions:", error);
    }
  };

  // Handle region change & fetch cities
  const handleRegionChange = async (e) => {
    const regionName = e.target.value;
    setFormData({ ...formData, region: regionName, city: "" });

    try {
      const response = await axios.post("https://countriesnow.space/api/v0.1/countries/state/cities", {
        country: formData.country,
        state: regionName
      });
      setCities(response.data.data || []);
    } catch (error) {
      console.error("Error fetching cities:", error);
      setCities([]);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
if (!token) {
  alert("No access token found, Please Login first")
  console.error("No access token found! Redirecting to login...");
 
}
      const res = await API.put("/users/update-profile", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      console.log("Response in the User Profile", res);



      dispatch(updateUserProfile(formData))
      .unwrap()
      .then(() => {
        navigate("/");
      })

      console.log("Form Data in UserProfile Page", formData)
      // setUserData(formData);
      navigate("/");
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
<>

<div
        className="relative w-[145%] bg-cover h-screen"
        style={{
          backgroundImage: `url(${userBG})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          opacity:"0.8"
        }}
      >


    
    {/* <div className="flex justify-center items-center min-h-screen p-7" > */}
    <div className="absolute inset-0 flex justify-center items-center">
      <div className="bg-white p-10 py-20 ml-12 mb-28 rounded-2xl h-[650px] shadow-2xl w-full max-w-2xl">

      <div className="bg-teal-600 py-4 w-full text-center mb-4 rounded-md">
  <h2 className="text-2xl font-extrabold text-white">
    User Profile
  </h2>
</div>



        {/* <h2 className="text-2xl font-extrabold text-center text-teal-800 mb-8">User Profile</h2> */}
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-2 gap-8 mb-4">
            <input
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              placeholder="First Name"
              className="w-full p-4 py-6 h-10 border rounded-lg "
            />
            <input
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              placeholder="Last Name"
              className="w-full p-4 py-6 h-9 border rounded-lg"
            />
          </div>

          <div className="grid grid-cols-2 gap-8 mb-4">
            <input
              type="text"
              name="nickname"
              value={formData.nickname}
              onChange={handleChange}
              placeholder="Nickname"
              className="w-full p-4 py-6 h-9 border rounded-lg "
            />
            <select
              className="w-full border  rounded-lg"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
            >
              <option value="">Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-8 mb-4">
            {/* Country Dropdown */}
            <select
              className="w-full border p-2 rounded-lg"
              name="country"
              value={formData.country}
              onChange={handleCountryChange}
            >
              <option value="">Select Country</option>
              {countries.map((country) => (
                <option key={country.code} value={country.name}>
                  {country.name}
                </option>
              ))}
            </select>

            {/* Region Dropdown */}
            <select
              className="w-full border p-2 rounded-lg"
              name="region"
              value={formData.region}
              onChange={handleRegionChange}
              disabled={!regions.length}
            >
              <option value="">Select Region</option>
              {regions.map((region, index) => (
                <option key={index} value={region.name}>
                  {region.name}
                </option>
              ))}
            </select>
          </div>

          {/* City Dropdown */}
          <div className="grid grid-cols-2 gap-8 mb-4">
            <select
              className="w-full border p-2 rounded-lg"
              name="city"
              value={formData.city}
              onChange={handleChange}
              disabled={!cities.length}
            >
              <option value="">Select City</option>
              {cities.map((city, index) => (
                <option key={index} value={city}>
                  {city}
                </option>
              ))}
            </select>

            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Location"
              className="w-full p-4 py-6 h-9 border rounded-lg"
            />
          </div>

          <input
            type="date"
            name="birth_date"
            value={formData.birth_date}
            onChange={handleChange}
            className="w-full p-4 py-6 h-9 border rounded-lg"
          />

          <button className="w-full bg-indigo-500 text-white font-extrabold p-2 rounded-lg">
            Update Profile
          </button>
        </form>
      </div>

      {userData && <ImageCard userData={userData} />}
    </div>
    </div>
    </>
  );
};

export default UserProfile;



