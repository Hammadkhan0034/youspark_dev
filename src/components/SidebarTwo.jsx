import React from "react";

const Sidebar = ({ step }) => {
  const steps = [
    { number: 1, name: "Nickname" },
    { number: 2, name: "Birthday" },
    { number: 3, name: "Gender" },
    { number: 4, name: "Location" },
    { number: 5, name: "Summary" }
  ];

  return (
    <div className="w-64 bg-gradient-to-b from-[#0ABAB5] to-[#81D8D0] text-white p-6 shadow-lg hidden md:block">
      <ul>
        {steps.map((s) => (
          <li 
            key={s.number} 
            className={`mb-6 flex items-center space-x-3 ${
              step === s.number 
                ? "text-white font-bold" 
                : "text-white/70"
            }`}
          >
            <div 
              className={`w-8 h-8 flex items-center justify-center rounded-full border-2 ${
                step === s.number 
                  ? "border-white bg-[#0ABAB5]" 
                  : "border-white/70"
              }`}
            >
              {s.number}
            </div>
            <span className={`text-lg ${
              step === s.number 
                ? "font-semibold" 
                : "font-medium"
            }`}>
              {s.name}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
