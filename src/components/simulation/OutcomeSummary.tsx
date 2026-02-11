import React from 'react';
import Card from '@/components/ui/Card';
import ReasonBadge from './ReasonBadge';
import { Assignment, DASchool, DAStudent } from '@/lib/da/types';
import { getSchoolName } from '@/lib/da/engine';

interface OutcomeSummaryProps {
  targetStudent: DAStudent;
  schools: DASchool[];
  single: Assignment;
  da: Assignment;
}

const OutcomeSummary: React.FC<OutcomeSummaryProps> = ({ targetStudent, schools, single, da }) => {
  const gainedSafety = single.schoolId === null && da.schoolId !== null;
  const reachedHigherChoice =
    single.preferenceRank !== null && da.preferenceRank !== null && da.preferenceRank < single.preferenceRank;

  return (
    <Card accent="blue" className="space-y-3">
      <h2 className="font-heading text-xl font-bold text-slate-900">この点数だったら（前提）</h2>
      <p className="text-sm text-slate-700">
        ここでは {targetStudent.name} の得点を <strong>{targetStudent.score}</strong>{' '}
        点と仮定して、単願制とDA方式の結果を比較します。
      </p>
      <div className="rounded-md border border-slate-200 bg-slate-50 p-3">
        <p className="text-xs font-semibold text-slate-700">学校別の最低合格点（目安）</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {schools.map(school => (
            <span
              key={school.id}
              className="rounded-full border border-slate-300 bg-white px-2 py-1 text-xs text-slate-700"
            >
              {school.name}: {school.minPassingScore}点
            </span>
          ))}
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        {gainedSafety && <ReasonBadge tone="success" label="DAで全落ちリスクを回避" />}
        {reachedHigherChoice && <ReasonBadge tone="success" label="DAでより高い志望順位に到達" />}
        {!gainedSafety && !reachedHigherChoice && (
          <ReasonBadge tone="info" label="結果が同じでも挑戦の心理負荷を下げられる" />
        )}
      </div>
      <p className="text-sm text-slate-600">
        単願: {getSchoolName(schools, single.schoolId)} / DA: {getSchoolName(schools, da.schoolId)}
      </p>
    </Card>
  );
};

export default OutcomeSummary;
