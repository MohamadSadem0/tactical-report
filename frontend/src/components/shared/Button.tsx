import React from "react";

type ButtonProps = {
  label: string;
  onClick?: () => void; 
  type?: "button" | "submit"; 
};

const Button: React.FC<ButtonProps> = ({ label, onClick, type = "button" }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className="w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600"
    >
      {label}
    </button>
  );
};

export default Button;
