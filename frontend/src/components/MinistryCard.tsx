import React from 'react';
import { useNavigate } from 'react-router-dom';

// Define an interface for the ministry prop
interface Ministry {
  name: string;
  description: string;
  logo: string;
  link: string;
}

interface MinistryCardProps {
  ministry: Ministry;
}

const MinistryCard: React.FC<MinistryCardProps> = ({ ministry }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate('/login'); // Navigate to login when clicked
  };

  return (
    <div
      onClick={handleCardClick}
      className="ministry-card bg-white shadow-md rounded-lg p-4 cursor-pointer"
    >
      <img src={ministry.logo} alt={`${ministry.name} logo`} className="w-16 h-16 mb-4" />
      <h2 className="text-xl font-bold">{ministry.name}</h2>
      <p className="text-sm text-gray-600">{ministry.description}</p>
    </div>
  );
};

export default MinistryCard;
