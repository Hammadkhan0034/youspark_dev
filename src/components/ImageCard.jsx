import { useSelector } from "react-redux";

const ImageCard = () => {
  const userData = useSelector((state) => state.user.user);
  console.log("UserData in Image card", userData);

  if (!userData || !userData.data) return null;

  const { first_name, last_name, nickname, city, country, gender } = userData.data;
  console.log("userData in Image Card", userData.data)

  const userInfo = [
    { label: "Full Name", value: `${first_name} ${last_name}` },
    { label: "Nickname", value: nickname || "N/A" },
    { label: "City", value: city || "N/A" },
    { label: "Country", value: country || "N/A" },
    { label: "Gender", value: gender || "N/A" },
  ];

  return (
    <div
      className="w-96  min-h-[1000px] p-6 bg-black bg-opacity-60 backdrop-blur-lg shadow-2xl rounded-2xl border border-gray-300 text-white relative z-10"
    >
      {/* Profile Image */}
      <div className="flex justify-center mb-4">
        <img
          src="https://i.pravatar.cc/100" 
          alt="Profile"
          className="w-24 h-24 rounded-full border-4 border-gray-300 shadow-lg"
        />
      </div>

      {/* Profile Title */}
      <h2 className="text-2xl font-bold text-center mb-4">{first_name}'s Profile</h2>

      {/* User Info */}
      <div className="space-y-3">
        {userInfo.map((item, index) => (
          <div key={index} className="flex justify-between border-b border-gray-400 pb-2">
            <span className="font-semibold">{item.label}:</span>
            <span>{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageCard;










