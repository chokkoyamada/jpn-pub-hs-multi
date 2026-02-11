'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import ProfileSelector from '@/components/simulation/ProfileSelector';
import ComparisonResult from '@/components/results/ComparisonResult';
import Button from '@/components/ui/Button';
import { getScenarioById } from '@/lib/scenarios';
import { Scenario } from '@/lib/types';

export default function SimulationPage() {
  const router = useRouter();
  const [scenario, setScenario] = useState<Scenario | null>(null);
  const [showResults, setShowResults] = useState(false);

  const handleSelectScenario = (scenarioId: string) => {
    const selectedScenario = getScenarioById(scenarioId);
    if (selectedScenario) {
      setScenario(selectedScenario);
      setShowResults(true);
    }
  };

  const handleReset = () => {
    setScenario(null);
    setShowResults(false);
  };

  const handleGoHome = () => {
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navigation */}
      <nav className="border-b border-slate-200 bg-white">
        <div className="container px-4 mx-auto flex items-center justify-between h-14">
          <Link href="/" className="font-heading text-sm md:text-lg font-bold text-slate-900 hover:text-sky-700 transition-colors shrink-0">
            <span className="hidden md:inline">DA入試シミュレーション</span>
            <span className="md:hidden">DA入試</span>
          </Link>
          <div className="flex gap-3 md:gap-4 text-xs md:text-sm">
            <Link href="/about-da" className="text-slate-600 hover:text-sky-700 transition-colors whitespace-nowrap">
              DAアルゴリズムとは
            </Link>
            <Link href="/" className="text-slate-600 hover:text-sky-700 transition-colors whitespace-nowrap">
              トップページ
            </Link>
          </div>
        </div>
      </nav>

      <div className="container px-4 py-8 mx-auto">
        <h1 className="font-heading mb-6 text-3xl font-bold text-center text-slate-900">
          公立高校入試シミュレーション
        </h1>

        {!showResults ? (
          <ProfileSelector onSelect={handleSelectScenario} />
        ) : scenario ? (
          <div className="space-y-8">
            <ComparisonResult scenario={scenario} />

            <div className="p-5 bg-sky-50 border border-sky-200 rounded-lg">
              <h3 className="font-heading mb-2 text-xl font-bold text-sky-900">
                DA方式のメリット
              </h3>
              <ul className="ml-5 space-y-2 text-sky-800 list-disc">
                <li>本当に行きたい学校を正直に志望順位に並べるだけでよい</li>
                <li>「受かりそうな学校」ではなく「行きたい学校」を選べる</li>
                <li>経済的背景に関わらず、全ての生徒が公平に挑戦できる</li>
                <li>複数の合格による空席や繰り上げ合格の混乱がない</li>
                <li>志望校の合格最低点に達していれば、必ずその学校に入れる</li>
              </ul>
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              <Button variant="outline" onClick={handleReset}>
                別のプロフィールで試す
              </Button>
              <Link href="/about-da" passHref>
                <Button variant="secondary">DAアルゴリズムについて学ぶ</Button>
              </Link>
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
    </div>
  );
}
