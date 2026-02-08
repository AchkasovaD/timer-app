import React from "react";

interface MainScreenProps {
  onStateChange: (state: string) => void;
}

export const MainScreen: React.FC<MainScreenProps> = ({ onStateChange }) => {
  const handleClick = () => {
    onStateChange("question");
  };
  return (
    <div className="Main" onClick={handleClick}>
      <p> Моей королеве </p>
    </div>
  );
};
