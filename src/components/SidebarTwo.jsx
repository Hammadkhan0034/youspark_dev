import React from "react";

const Sidebar = ({ step }) => {
  const steps = [
    { number: 1, name: "Name" },
    { number: 2, name: "Birthday" },
    { number: 3, name: "Gender" },
    { number: 4, name: "Location" },
    { number: 5, name: "Summary" }
  ];

  return (
    <div className="w-64 bg-gradient-to-b from-blue-800 to-blue-600 text-white p-6 shadow-lg">
      {/* <h2 className="text-2xl font-bold mb-8 text-center">Steps</h2> */}
      <ul>
        {steps.map((s) => (
          <li key={s.number} className={`mb-6 flex items-center space-x-3 ${step === s.number ? "text-yellow-300" : "text-gray-300"}`}>
            <div className={`w-8 h-8 flex items-center justify-center rounded-full border-2 ${step === s.number ? "border-yellow-300" : "border-gray-300"}`}>
              {s.number}
            </div>
            <span className={`text-lg ${step === s.number ? "font-semibold" : "font-medium"}`}>{s.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;