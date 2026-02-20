import React, { useMemo } from 'react';
import Card from '@/components/ui/Card';
import { Assignment, DAStudent, StudentScenario } from '@/lib/da/types';
import { runSingleApplication, getSchoolName } from '@/lib/da/engine';

interface DilemmaExplainerProps {
  targetStudent: DAStudent;
  scenario: StudentScenario;
  singleResult: Assignment;
  daResult: Assignment;
}

const OutcomeRow = ({ admitted, label }: { admitted: boolean; label: string }) => (
  <div
    className={`rounded-md p-2 text-sm font-semibold ${
      admitted ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
    }`}
  >
    {admitted ? '✅' : '❌'} {label}
  </div>
);

const DilemmaExplainer: React.FC<DilemmaExplainerProps> = ({
  targetStudent,
  scenario,
  singleResult,
  daResult,
}) => {
  const challengeSchoolId = scenario.singleChoices[targetStudent.id];
  const safetySchoolId = targetStudent.preferences.find(id => id !== challengeSchoolId);

  const counterFactualResult = useMemo(() => {
    if (safetySchoolId === undefined) return null;
    const overrides = { ...scenario.singleChoices, [targetStudent.id]: safetySchoolId };
    const result = runSingleApplication(scenario.students, scenario.schools, overrides, scenario.policy);
    return result.assignments.find(a => a.studentId === targetStudent.id) ?? null;
  }, [targetStudent, scenario, safetySchoolId]);

  const challengeSchool = scenario.schools.find(s => s.id === challengeSchoolId);
  const safetySchool = scenario.schools.find(s => s.id === safetySchoolId);

  if (!challengeSchool || !safetySchool) return null;

  // 挑戦校への出願者数（単願制での競争率）
  const competitorCount = Object.values(scenario.singleChoices).filter(
    id => id === challengeSchoolId,
  ).length;
  const odds = `定員${challengeSchool.capacity}人に${competitorCount}人が出願`;

  return (
    <Card className="space-y-4">
      <div>
        <h2 className="font-heading text-xl font-bold text-slate-900">単願制が強いる「二択のジレンマ」</h2>
        <p className="mt-1 text-sm text-slate-600">
          単願制では<strong>1校のみ</strong>出願します。あなたには次の2択があります。
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {/* 選択A：挑戦 */}
        <div className="space-y-2 rounded-lg border-2 border-amber-300 bg-amber-50 p-4">
          <p className="text-xs font-bold uppercase tracking-wide text-amber-700">選択 A ─ 挑戦</p>
          <p className="font-semibold text-slate-900">{challengeSchool.name}に出願</p>
          <p className="text-xs text-slate-500">{odds}（合格は不確実）</p>
          <OutcomeRow
            admitted={singleResult.schoolId !== null}
            label={
              singleResult.schoolId !== null
                ? `${getSchoolName(scenario.schools, singleResult.schoolId)}に合格`
                : '不合格 ── 安全網なし'
            }
          />
        </div>

        {/* 選択B：安全策 */}
        <div className="space-y-2 rounded-lg border-2 border-sky-300 bg-sky-50 p-4">
          <p className="text-xs font-bold uppercase tracking-wide text-sky-700">選択 B ─ 安全策</p>
          <p className="font-semibold text-slate-900">{safetySchool.name}に出願</p>
          <p className="text-xs text-slate-500">合格確実・ただし第一志望を諦める</p>
          <OutcomeRow
            admitted={counterFactualResult?.schoolId != null}
            label={
              counterFactualResult?.schoolId != null
                ? `${getSchoolName(scenario.schools, counterFactualResult.schoolId)}に合格（でも夢を諦めた）`
                : '不合格'
            }
          />
        </div>
      </div>

      {/* DA の解決 */}
      <div className="space-y-2 rounded-lg border-2 border-emerald-400 bg-emerald-50 p-4">
        <p className="text-sm font-bold text-emerald-800">DA方式ならこのジレンマが消えます</p>
        <p className="text-sm text-slate-700">
          {challengeSchool.name} → {safetySchool.name} の順に希望を出すだけ。
          {challengeSchool.name}が不合格でも自動で{safetySchool.name}へスライドするので、
          <strong>挑戦と安全を同時に</strong>確保できます。
        </p>
        <OutcomeRow
          admitted={daResult.schoolId !== null}
          label={
            daResult.schoolId !== null
              ? `${getSchoolName(scenario.schools, daResult.schoolId)}に合格（安全網が機能）`
              : '割り当てなし'
          }
        />
      </div>
    </Card>
  );
};

export default DilemmaExplainer;
