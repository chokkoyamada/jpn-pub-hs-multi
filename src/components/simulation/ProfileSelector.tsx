import React from 'react';
import { scenarios } from '@/lib/scenarios';
import Card from '../ui/Card';
import Button from '../ui/Button';

interface ProfileSelectorProps {
  onSelect: (scenarioId: string) => void;
}

const StarIcon: React.FC<{ filled: boolean }> = ({ filled }) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill={filled ? '#eab308' : 'none'}
    stroke={filled ? '#eab308' : '#d1d5db'}
    strokeWidth="1.5"
    className="inline-block"
  >
    <path d="M10 1.5l2.47 5.01 5.53.8-4 3.9.94 5.49L10 14.26 5.06 16.7 6 11.21l-4-3.9 5.53-.8z" />
  </svg>
);

const ProfileSelector: React.FC<ProfileSelectorProps> = ({ onSelect }) => {
  return (
    <div className="space-y-6">
      <h2 className="font-heading text-2xl font-bold text-slate-900">
        あなたはどんな生徒ですか？
      </h2>
      <p className="text-slate-600">
        以下のプロフィールから、あなたに最も近いものを選んでください。
        このプロフィールに基づいて、単願制とDA方式の結果を比較します。
      </p>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {scenarios.map(scenario => (
          <Card
            key={scenario.id}
            className="transition-all hover:shadow-lg hover:-translate-y-0.5"
            onClick={() => onSelect(scenario.id)}
          >
            <h3 className="mb-2 text-lg font-semibold text-slate-800">
              {scenario.studentProfile.label}
            </h3>
            <p className="mb-4 text-slate-600">{scenario.studentProfile.description}</p>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="mr-2 text-sm text-slate-500">成績:</span>
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => {
                    const stars = Math.round(scenario.studentProfile.scorePercentile / 20);
                    return <StarIcon key={i} filled={i < stars} />;
                  })}
                </div>
              </div>

              <div className="text-sm">
                {scenario.studentProfile.economicStatus === 'low' && (
                  <span className="px-2.5 py-1 text-red-800 bg-red-100 rounded-full font-medium text-xs">
                    経済的制約あり
                  </span>
                )}
                {scenario.studentProfile.economicStatus === 'medium' && (
                  <span className="px-2.5 py-1 text-sky-800 bg-sky-100 rounded-full font-medium text-xs">
                    経済的に余裕あり
                  </span>
                )}
                {scenario.studentProfile.economicStatus === 'high' && (
                  <span className="px-2.5 py-1 text-green-800 bg-green-100 rounded-full font-medium text-xs">
                    経済的に十分
                  </span>
                )}
              </div>
            </div>

            <div className="mt-4 text-right">
              <Button variant="primary" size="sm" onClick={() => onSelect(scenario.id)}>
                このプロフィールで試す
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProfileSelector;
