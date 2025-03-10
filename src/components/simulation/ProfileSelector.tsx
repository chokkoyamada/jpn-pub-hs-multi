import React from 'react';
import { scenarios } from '@/lib/scenarios';
import Card from '../ui/Card';
import Button from '../ui/Button';

interface ProfileSelectorProps {
  onSelect: (scenarioId: string) => void;
}

const ProfileSelector: React.FC<ProfileSelectorProps> = ({ onSelect }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">あなたはどんな生徒ですか？</h2>
      <p className="text-gray-600">
        以下のプロフィールから、あなたに最も近いものを選んでください。
        このプロフィールに基づいて、単願制とDA方式の結果を比較します。
      </p>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {scenarios.map(scenario => (
          <Card
            key={scenario.id}
            className="transition-all hover:shadow-lg"
            onClick={() => onSelect(scenario.id)}
          >
            <h3 className="mb-2 text-lg font-semibold text-gray-800">
              {scenario.studentProfile.label}
            </h3>
            <p className="mb-4 text-gray-600">{scenario.studentProfile.description}</p>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="mr-2 text-sm text-gray-500">成績:</span>
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => {
                    // Convert percentile to stars (0-5)
                    const stars = Math.round(scenario.studentProfile.scorePercentile / 20);
                    return (
                      <span
                        key={i}
                        className={`text-xl ${i < stars ? 'text-yellow-500' : 'text-gray-300'}`}
                      >
                        ★
                      </span>
                    );
                  })}
                </div>
              </div>

              <div className="text-sm">
                {scenario.studentProfile.economicStatus === 'low' && (
                  <span className="px-2 py-1 text-white bg-orange-500 rounded-full">
                    経済的制約あり
                  </span>
                )}
                {scenario.studentProfile.economicStatus === 'medium' && (
                  <span className="px-2 py-1 text-white bg-blue-500 rounded-full">
                    経済的に余裕あり
                  </span>
                )}
                {scenario.studentProfile.economicStatus === 'high' && (
                  <span className="px-2 py-1 text-white bg-green-500 rounded-full">
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
