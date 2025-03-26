import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import pok2 from "../../src/assets/poki3.jpeg";

const ImageCard = () => {
  const userData = useSelector((state) => state.user.user);
  const [localFormData, setLocalFormData] = useState(null);

  // Retrieve form data from local storage when the component mounts
  useEffect(() => {
    const savedFormData = localStorage.getItem("userProfileFormData");
    if (savedFormData) {
      setLocalFormData(JSON.parse(savedFormData));
    }
  }, []);

  // Safely extract user details from Redux or local storage
  const userDetails = userData?.data || {};
  const formDetails = localFormData || {};

  // Merge Redux data and local storage data
  const {
    first_name = formDetails.first_name || "N/A",
    last_name = formDetails.last_name || "N/A",
    nickname = formDetails.nickname || "N/A",
    email = userDetails.email || "N/A",
    city = formDetails.city || "N/A",
    country = formDetails.country || "N/A",
    gender = formDetails.gender || "N/A",
    user_name = userDetails.user_name || "N/A",
    birth_date = formDetails.birth_date || "N/A",
    region = formDetails.region || "N/A",
  } = userDetails;

  // Dummy description
  const description = "A passionate explorer of the digital world, always ready to catch new opportunities and level up in life!";

  return (
    <div
     className="relative w-[300px] h-[400px] bg-cover bg-center rounded-lg shadow-2xl overflow-hidden border-4 border-yellow-400 transform transition-transform hover:scale-105"
      style={{
        backgroundImage: `url(${pok2})`,
      }}
    >
      {/* Black Opacity Overlay for Text */}
      <div className="absolute inset-0 bg-black bg-opacity-50 p-6 flex flex-col justify-between text-white">
        {/* Profile Title */}
        <div className="text-center bg-black bg-opacity-30 p-4 rounded-lg">
          <h2 className="text-2xl font-bold mb-1">{nickname || "User"}</h2>
          <p className="text-sm text-yellow-300">@{first_name || "N/A"}</p>
        </div>

        {/* Description */}
        <div className="text-center bg-black bg-opacity-30 p-4 rounded-lg">
          <p className="text-sm italic text-gray-200">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default ImageCard;
