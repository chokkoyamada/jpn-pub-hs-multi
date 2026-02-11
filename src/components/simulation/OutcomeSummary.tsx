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
      <h2 className="font-heading text-xl font-bold text-slate-900">あなた向け結果サマリー</h2>
      <p className="text-sm text-slate-700">
        {targetStudent.name}の得点は <strong>{targetStudent.score}</strong> 点です。DAでは順位を正直に出しても不利になりません。
      </p>
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
