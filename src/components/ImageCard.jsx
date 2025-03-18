import { useSelector } from "react-redux";
import pok2 from "../../src/assets/pok2.jpeg"

const ImageCard = () => {
  const userData = useSelector((state) => state.user.user);
  console.log("UserData in Image Card:", userData);

  if (!userData || !userData.data) return null;

  // Extract user details safely from userData.data
  const { 
    first_name, 
    last_name, 
    nickname, 
    email, 
    city, 
    country, 
    gender, 
    user_name, 
    birth_date, 
    region 
  } = userData.data;

  const userInfo = [
    { label: "Full Name", value: first_name && last_name ? `${first_name} ${last_name}` : "N/A" },
    { label: "Nickname", value: nickname || "N/A" },
    { label: "Email", value: email || "N/A" },
    { label: "Username", value: user_name || "N/A" },
    { label: "City", value: city || "N/A" },
    { label: "Region", value: region || "N/A" },
    { label: "Country", value: country || "N/A" },
    { label: "Gender", value: gender || "N/A" },
    { label: "Birth Date", value: birth_date || "N/A" },
  ];

  return (
    // <div className="w-[100%] h-auto p-6 bg-black bg-opacity-60 backdrop-blur-lg shadow-2xl rounded-2xl border border-gray-300 text-white">

    <div
            className="relative w-[100%] bg-cover px-6 border border-r-4"
            style={{
              backgroundImage: `url(${pok2})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              opacity: "0.8"
            }}
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
      <h2 className="text-xl font-bold text-center mb-2">{first_name || "User"}'s Profile</h2>
      <p className="text-center text-gray-300">@{user_name || "N/A"}</p>

      {/* User Info */}
      <div className="mt-4 space-y-2">
        {userInfo.map((item, index) => (
          <div key={index} className="flex justify-between border-b border-gray-400 pb-2 text-sm">
            <span className="font-semibold">{item.label}:</span>
            <span>{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageCard;







































































































// import { useSelector } from "react-redux";

// const ImageCard = () => {
//   const userData = useSelector((state) => state.user.user);
//   console.log("UserData in Image Card:", userData);

//   if (!userData || !userData.data) return null;

//   // Extract user details safely from userData.data
//   const { 
//     first_name, 
//     last_name, 
//     nickname, 
//     email, 
//     city, 
//     country, 
//     gender, 
//     user_name, 
//     birth_date, 
//     region 
//   } = userData.data;

//   const userInfo = [
//     { label: "Full Name", value: first_name && last_name ? `${first_name} ${last_name}` : "N/A" },
//     { label: "Nickname", value: nickname || "N/A" },
//     { label: "Email", value: email || "N/A" },
//     { label: "Username", value: user_name || "N/A" },
//     { label: "City", value: city || "N/A" },
//     { label: "Region", value: region || "N/A" },
//     { label: "Country", value: country || "N/A" },
//     { label: "Gender", value: gender || "N/A" },
//     { label: "Birth Date", value: birth_date || "N/A" },
//   ];

//   return (
//     <div className="w-[100%] h-auto p-6 bg-black bg-opacity-60 backdrop-blur-lg shadow-2xl rounded-2xl border border-gray-300 text-white">
//       {/* Profile Image */}
//       <div className="flex justify-center mb-4">
//         <img
//           src="https://i.pravatar.cc/100" 
//           alt="Profile"
//           className="w-24 h-24 rounded-full border-4 border-gray-300 shadow-lg"
//         />
//       </div>

//       {/* Profile Title */}
//       <h2 className="text-xl font-bold text-center mb-2">{first_name || "User"}'s Profile</h2>
//       <p className="text-center text-gray-300">@{user_name || "N/A"}</p>

//       {/* User Info */}
//       <div className="mt-4 space-y-2">
//         {userInfo.map((item, index) => (
//           <div key={index} className="flex justify-between border-b border-gray-400 pb-2 text-sm">
//             <span className="font-semibold">{item.label}:</span>
//             <span>{item.value}</span>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ImageCard;



