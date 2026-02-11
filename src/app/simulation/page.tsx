'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import ScenarioPicker from '@/components/simulation/ScenarioPicker';
import PreferenceEditor from '@/components/simulation/PreferenceEditor';
import DAPlayback from '@/components/simulation/DAPlayback';
import OutcomeSummary from '@/components/simulation/OutcomeSummary';
import SystemComparePanel from '@/components/simulation/SystemComparePanel';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { compareSystems, getSchoolName } from '@/lib/da/engine';
import { getScenarioById, simulationScenarios } from '@/lib/da/mockData';
import { SchoolId, StudentScenario } from '@/lib/da/types';

const movePreference = (prefs: SchoolId[], index: number, direction: 'up' | 'down'): SchoolId[] => {
  const next = [...prefs];
  if (direction === 'up' && index > 0) {
    [next[index - 1], next[index]] = [next[index], next[index - 1]];
  }
  if (direction === 'down' && index < next.length - 1) {
    [next[index + 1], next[index]] = [next[index], next[index + 1]];
  }
  return next;
};

export default function SimulationPage() {
  const [selectedScenarioId, setSelectedScenarioId] = useState<string | null>(null);
  const selectedScenario = useMemo(
    () => (selectedScenarioId ? getScenarioById(selectedScenarioId) : undefined),
    [selectedScenarioId],
  );

  const initialPreferences = useMemo(() => {
    if (!selectedScenario) {
      return [];
    }
    const target = selectedScenario.students.find(s => s.id === selectedScenario.targetStudentId);
    return target ? [...target.preferences] : [];
  }, [selectedScenario]);

  const [preferences, setPreferences] = useState<SchoolId[]>([]);

  const handleSelectScenario = (scenarioId: string) => {
    const scenario = getScenarioById(scenarioId);
    if (!scenario) {
      return;
    }
    const target = scenario.students.find(s => s.id === scenario.targetStudentId);
    setSelectedScenarioId(scenarioId);
    setPreferences(target ? [...target.preferences] : []);
  };

  const preparedScenario = useMemo((): StudentScenario | null => {
    if (!selectedScenario) {
      return null;
    }

    const students = selectedScenario.students.map(student => {
      if (student.id !== selectedScenario.targetStudentId) {
        return student;
      }
      return {
        ...student,
        preferences,
      };
    });

    return {
      ...selectedScenario,
      students,
    };
  }, [preferences, selectedScenario]);

  const result = useMemo(() => {
    if (!preparedScenario) {
      return null;
    }
    return compareSystems(preparedScenario);
  }, [preparedScenario]);

  const targetStudent = useMemo(() => {
    if (!preparedScenario) {
      return null;
    }
    return preparedScenario.students.find(student => student.id === preparedScenario.targetStudentId) ?? null;
  }, [preparedScenario]);

  return (
    <div className="min-h-screen bg-slate-50">
      <nav className="border-b border-slate-200 bg-white">
        <div className="container mx-auto flex h-14 items-center justify-between px-4">
          <Link
            href="/"
            className="font-heading shrink-0 text-sm font-bold text-slate-900 transition-colors hover:text-sky-700 md:text-lg"
          >
            <span className="hidden md:inline">DA入試シミュレーション</span>
            <span className="md:hidden">DA入試</span>
          </Link>
          <div className="flex gap-3 text-xs md:gap-4 md:text-sm">
            <Link href="/about-da" className="whitespace-nowrap text-slate-600 transition-colors hover:text-sky-700">
              DAアルゴリズムとは
            </Link>
            <Link href="/" className="whitespace-nowrap text-slate-600 transition-colors hover:text-sky-700">
              トップページ
            </Link>
          </div>
        </div>
      </nav>

      <main className="container mx-auto space-y-6 px-4 py-8">
        <header className="space-y-2 text-center">
          <h1 className="font-heading text-3xl font-bold text-slate-900">公立高校入試シミュレーション</h1>
          <p className="mx-auto max-w-3xl text-sm text-slate-600 md:text-base">
            単願制とDA方式を同じ条件で比較します。志望順位を動かしても、DAでは「正直に並べる」こと自体が不利になりません。
          </p>
        </header>

        {!selectedScenario ? (
          <ScenarioPicker scenarios={simulationScenarios} onSelect={handleSelectScenario} />
        ) : !preparedScenario || !result || !targetStudent ? (
          <Card>
            <p className="text-sm text-red-700">シナリオ読み込みに失敗しました。再度お試しください。</p>
          </Card>
        ) : (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-slate-200 bg-white p-4">
              <div>
                <p className="text-sm text-slate-500">選択中のケース</p>
                <p className="font-semibold text-slate-900">{preparedScenario.label}</p>
                <p className="mt-1 text-xs text-slate-600">{preparedScenario.expectedDifference}</p>
                <p className="mt-1 text-xs text-slate-600">
                  単願の前提: あなたは
                  {' '}
                  {getSchoolName(
                    preparedScenario.schools,
                    preparedScenario.singleChoices[preparedScenario.targetStudentId],
                  )}
                  {' '}
                  のみ出願
                </p>
              </div>
              <Button variant="outline" onClick={() => setSelectedScenarioId(null)}>
                ケースを選び直す
              </Button>
            </div>

            <PreferenceEditor
              schools={preparedScenario.schools}
              preferences={preferences}
              onMove={(index, direction) => setPreferences(prev => movePreference(prev, index, direction))}
              onReset={() => setPreferences(initialPreferences)}
            />

            <SystemComparePanel
              targetStudent={targetStudent}
              schools={preparedScenario.schools}
              single={result.compare.single}
              da={result.compare.da}
            />

            <DAPlayback
              key={`${preparedScenario.id}-${preferences.join('-')}`}
              students={preparedScenario.students}
              schools={preparedScenario.schools}
              events={result.da.events}
              focusStudentId={preparedScenario.targetStudentId}
            />

            <OutcomeSummary
              targetStudent={targetStudent}
              schools={preparedScenario.schools}
              single={result.compare.single}
              da={result.compare.da}
            />
          </div>
        )}
      </main>
    </div>
  );
}
