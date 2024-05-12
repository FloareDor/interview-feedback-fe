import React from 'react';

interface RatingStarsProps {
  rating: number;
}

const RatingStars: React.FC<RatingStarsProps> = ({ rating }) => {
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= rating; i++) {
      stars.push(
        <span
          key={i}
          className={`text-yellow-500 ${i > rating ? 'text-gray-300' : ''}`}
        >
          &#9733;
        </span>
      );
    }
    return stars;
  };

  return <div className="flex items-center">{renderStars()}</div>;
};

export default RatingStars;