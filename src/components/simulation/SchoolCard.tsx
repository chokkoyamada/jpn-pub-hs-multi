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
      return {
        text: '偏差値75以上・最難関',
        textColor: 'text-red-700',
        bgColor: 'bg-red-100'
      };
    } else if (difficulty >= 60) {
      return {
        text: '偏差値65-74・難関',
        textColor: 'text-orange-700',
        bgColor: 'bg-orange-100'
      };
    } else if (difficulty >= 40) {
      return {
        text: '偏差値55-64・中堅',
        textColor: 'text-yellow-700',
        bgColor: 'bg-yellow-100'
      };
    } else {
      return {
        text: '偏差値54以下・標準',
        textColor: 'text-green-700',
        bgColor: 'bg-green-100'
      };
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
          <div className="flex items-center mt-1 text-sm">
            <span className={`px-2 py-0.5 rounded-full ${difficultyInfo.textColor} ${difficultyInfo.bgColor} font-medium`}>
              {difficultyInfo.text}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default SchoolCard;
