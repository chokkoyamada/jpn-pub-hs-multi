'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import ProfileSelector from '@/components/simulation/ProfileSelector';
import ComparisonResult from '@/components/results/ComparisonResult';
import Button from '@/components/ui/Button';
import { getScenarioById } from '@/lib/scenarios';
import { Scenario } from '@/lib/types';

export default function SimulationPage() {
  const router = useRouter();
  const [scenario, setScenario] = useState<Scenario | null>(null);
  const [showResults, setShowResults] = useState(false);

  // Handle scenario selection
  const handleSelectScenario = (scenarioId: string) => {
    const selectedScenario = getScenarioById(scenarioId);
    if (selectedScenario) {
      setScenario(selectedScenario);
      setShowResults(true);
    }
  };

  // Reset the simulation
  const handleReset = () => {
    setScenario(null);
    setShowResults(false);
  };

  // Go back to home
  const handleGoHome = () => {
    router.push('/');
  };

  return (
    <div className="container px-4 py-8 mx-auto">
      <h1 className="mb-6 text-3xl font-bold text-center text-gray-900">
        公立高校入試シミュレーション
      </h1>

      {!showResults ? (
        <ProfileSelector onSelect={handleSelectScenario} />
      ) : scenario ? (
        <div className="space-y-8">
          <ComparisonResult scenario={scenario} />

          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h3 className="mb-2 text-xl font-bold text-blue-800">DA方式のメリット</h3>
            <ul className="ml-5 space-y-2 text-blue-700 list-disc">
              <li>本当に行きたい学校を正直に志望順位に並べるだけでよい</li>
              <li>「受かりそうな学校」ではなく「行きたい学校」を選べる</li>
              <li>経済的背景に関わらず、全ての生徒が公平に挑戦できる</li>
              <li>複数の合格による空席や繰り上げ合格の混乱がない</li>
              <li>志望校の合格最低点に達していれば、必ずその学校に入れる</li>
            </ul>
          </div>

          <div className="flex justify-center space-x-4">
            <Button variant="outline" onClick={handleReset}>
              別のプロフィールで試す
            </Button>
            <Button variant="primary" onClick={handleGoHome}>
              トップページに戻る
            </Button>
          </div>
        </div>
      ) : (
        <div className="p-4 text-center text-red-500">
          シナリオの読み込みに失敗しました。もう一度お試しください。
        </div>
      )}
    </div>
  );
}
