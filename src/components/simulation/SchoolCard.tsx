import React from 'react';
import { School } from '@/lib/types';
import Card from '../ui/Card';

interface SchoolCardProps {
  school: School;
  rank?: number;
  isAssigned?: boolean;
  isSelected?: boolean;
  onClick?: () => void;
}

const SchoolCard: React.FC<SchoolCardProps> = ({
  school,
  rank,
  isAssigned = false,
  isSelected = false,
  onClick,
}) => {
  // Determine difficulty level text and color
  const getDifficultyInfo = (difficulty: number) => {
    if (difficulty >= 80) {
      return { text: '難関', color: 'text-red-600' };
    } else if (difficulty >= 60) {
      return { text: '中堅上位', color: 'text-orange-500' };
    } else if (difficulty >= 40) {
      return { text: '中堅', color: 'text-yellow-600' };
    } else {
      return { text: '標準', color: 'text-green-600' };
    }
  };

  const difficultyInfo = getDifficultyInfo(school.difficulty);

  // Determine card variant based on assignment status
  const cardVariant = isAssigned ? 'success' : 'default';

  // Determine border style based on selection status
  const borderStyle = isSelected
    ? 'border-2 border-blue-500'
    : isAssigned
      ? 'border-2 border-green-500'
      : '';

  return (
    <Card
      variant={cardVariant}
      className={`cursor-pointer transition-all hover:shadow-lg ${borderStyle}`}
      onClick={onClick}
    >
      <div className="flex items-center justify-between">
        {rank && (
          <div className="flex items-center justify-center w-8 h-8 mr-3 text-white bg-blue-600 rounded-full">
            {rank}
          </div>
        )}
        <div className="flex-1">
          <h3 className="text-lg font-semibold">{school.name}</h3>
          <div className="flex items-center mt-1 space-x-2 text-sm">
            <span className={difficultyInfo.color}>{difficultyInfo.text}</span>
            <span className="text-gray-500">|</span>
            <span className="text-gray-600">{school.specialization}</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default SchoolCard;
