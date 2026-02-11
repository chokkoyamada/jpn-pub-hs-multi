import React from 'react';
import Card from '@/components/ui/Card';
import ReasonBadge from './ReasonBadge';
import { Assignment, DASchool, DAStudent } from '@/lib/da/types';
import { getSchoolName } from '@/lib/da/engine';

interface SystemComparePanelProps {
  targetStudent: DAStudent;
  schools: DASchool[];
  single: Assignment;
  da: Assignment;
}

const formatOutcome = (assignment: Assignment, schools: DASchool[]): string => {
  if (assignment.schoolId === null) {
    return '割り当てなし';
  }
  const schoolName = getSchoolName(schools, assignment.schoolId);
  return `第${assignment.preferenceRank}志望の${schoolName}`;
};

const SystemComparePanel: React.FC<SystemComparePanelProps> = ({ targetStudent, schools, single, da }) => {
  const singleMissed = single.schoolId === null;

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <Card accent="red" className="space-y-3">
        <h3 className="font-heading text-lg font-bold text-slate-900">単願制</h3>
        <p className="text-sm text-slate-600">1校のみ出願。外れた場合は次志望に自動で進めません。</p>
        <p className="font-semibold text-slate-900">結果: {formatOutcome(single, schools)}</p>
        {singleMissed ? (
          <ReasonBadge tone="danger" label="不合格時の安全網がない" />
        ) : (
          <ReasonBadge tone="warning" label="安全校を選ぶほど挑戦機会が減る" />
        )}
      </Card>

      <Card accent="green" className="space-y-3">
        <h3 className="font-heading text-lg font-bold text-slate-900">DA方式</h3>
        <p className="text-sm text-slate-600">本音の順位で出願。落ちても次志望へ自動スライドされます。</p>
        <p className="font-semibold text-slate-900">結果: {formatOutcome(da, schools)}</p>
        <ReasonBadge tone="success" label={`${targetStudent.name}は正直な順位で評価された`} />
      </Card>
    </div>
  );
};

export default SystemComparePanel;
