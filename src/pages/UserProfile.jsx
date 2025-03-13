import React from "react";

const UserProfile = () => {
  return (
    <div className="flex justify-center items-center p-7" >
      <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-lg">
        <h2 className="text-2xl font-extrabold text-center text-gray-800 mb-8">
          Create an Account
        </h2>
        <form className="space-y-2.5">
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="First Name"
              className="w-full p-2 py-1 h-9 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <input
              type="text"
              placeholder="Last Name"
              className="w-full p-2 py-1 h-9 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Username"
              className="w-full p-2 py-1 h-9 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full p-2 py-1 h-9 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <select className="w-full p-2 py-1 h-9 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            <input
              type="text"
              placeholder="Address"
              className="w-full p-2 py-1 h-9 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="City"
              className="w-full p-2 py-1 h-9 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <input
              type="text"
              placeholder="State"
              className="w-full p-2 py-1 h-9 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Country"
              className="w-full p-2 py-1 h-9 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <input
              type="date"
              className="w-full p-2 py-1 h-9 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-500 to-purple-700 text-white p-2 py-1 h-9 rounded-xl font-semibold text-lg shadow-lg hover:from-indigo-600 hover:to-purple-800 transition-all"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserProfile;





// import React from "react";

// const UserProfile = () => {
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