import React from 'react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { DASchool, SchoolId } from '@/lib/da/types';

interface PreferenceEditorProps {
  schools: DASchool[];
  preferences: SchoolId[];
  onMove: (index: number, direction: 'up' | 'down') => void;
  onReset: () => void;
}

const PreferenceEditor: React.FC<PreferenceEditorProps> = ({
  schools,
  preferences,
  onMove,
  onReset,
}) => {
  const schoolMap = new Map(schools.map(school => [school.id, school]));

  return (
    <Card className="space-y-4" accent="blue">
      <div className="flex items-center justify-between gap-2">
        <h2 className="font-heading text-xl font-bold text-slate-900">志望順位を調整</h2>
        <Button variant="outline" size="sm" onClick={onReset}>
          初期順位に戻す
        </Button>
      </div>
      <p className="text-sm text-slate-600">
        DA方式では、行きたい順に並べることが最適です。順位を入れ替えて結果の変化を確認してください。
      </p>

      <ol className="space-y-2">
        {preferences.map((schoolId, index) => {
          const school = schoolMap.get(schoolId);
          if (!school) {
            return null;
          }

          return (
            <li
              key={`${schoolId}-${index}`}
              className="flex items-center justify-between rounded-lg border border-slate-200 bg-white p-3"
            >
              <div className="flex items-center gap-3">
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-sky-700 text-sm font-bold text-white">
                  {index + 1}
                </span>
                <div>
                  <p className="font-medium text-slate-900">{school.name}</p>
                  <p className="text-xs text-slate-500">難易度 {school.difficulty} / 定員 {school.capacity}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onMove(index, 'up')}
                  disabled={index === 0}
                >
                  ↑
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onMove(index, 'down')}
                  disabled={index === preferences.length - 1}
                >
                  ↓
                </Button>
              </div>
            </li>
          );
        })}
      </ol>
    </Card>
  );
};

export default PreferenceEditor;
