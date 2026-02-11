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
  const getDifficultyInfo = (difficulty: number) => {
    if (difficulty >= 80) {
      return {
        text: '偏差値75以上・最難関',
        textColor: 'text-red-800',
        bgColor: 'bg-red-100',
        borderColor: 'border-red-200',
      };
    } else if (difficulty >= 60) {
      return {
        text: '偏差値65-74・難関',
        textColor: 'text-orange-800',
        bgColor: 'bg-orange-100',
        borderColor: 'border-orange-200',
      };
    } else if (difficulty >= 40) {
      return {
        text: '偏差値55-64・中堅',
        textColor: 'text-amber-800',
        bgColor: 'bg-amber-100',
        borderColor: 'border-amber-200',
      };
    } else {
      return {
        text: '偏差値54以下・標準',
        textColor: 'text-green-800',
        bgColor: 'bg-green-100',
        borderColor: 'border-green-200',
      };
    }
  };

  const difficultyInfo = getDifficultyInfo(school.difficulty);

  const cardVariant = isAssigned ? 'success' : 'default';

  const borderStyle = isAssigned
    ? 'ring-2 ring-green-500 ring-offset-1'
    : isSelected
      ? 'ring-2 ring-sky-500 ring-offset-1'
      : '';

  const assignedBg = isAssigned ? 'bg-green-50' : '';

  return (
    <Card
      variant={cardVariant}
      className={`transition-all ${borderStyle} ${assignedBg}`}
      onClick={onClick}
    >
      <div className="flex items-center justify-between">
        {rank && (
          <div className="flex items-center justify-center w-8 h-8 mr-3 text-white bg-sky-700 rounded-full text-sm font-bold shrink-0">
            {rank}
          </div>
        )}
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-slate-900">{school.name}</h3>
          <div className="flex items-center mt-1 text-sm">
            <span
              className={`px-2 py-0.5 rounded-full ${difficultyInfo.textColor} ${difficultyInfo.bgColor} border ${difficultyInfo.borderColor} font-medium text-xs`}
            >
              {difficultyInfo.text}
            </span>
          </div>
        </div>
        {isAssigned && (
          <div className="ml-2 shrink-0">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-green-600">
              <circle cx="12" cy="12" r="10" fill="currentColor" opacity="0.15" />
              <path
                d="M8 12l3 3 5-5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        )}
      </div>
    </Card>
  );
};

export default SchoolCard;
