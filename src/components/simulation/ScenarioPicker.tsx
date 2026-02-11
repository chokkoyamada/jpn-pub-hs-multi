import React from 'react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { StudentScenario } from '@/lib/da/types';

interface ScenarioPickerProps {
  scenarios: StudentScenario[];
  onSelect: (scenarioId: string) => void;
}

const ScenarioPicker: React.FC<ScenarioPickerProps> = ({ scenarios, onSelect }) => {
  return (
    <div className="space-y-5">
      <div className="space-y-2">
        <h2 className="font-heading text-2xl font-bold text-slate-900">あなたに近いケースを選択</h2>
        <p className="text-sm text-slate-600">
          まずはケースを選び、次に志望順位を動かしながら単願制とDA方式を比較してください。
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {scenarios.map(scenario => (
          <Card key={scenario.id} className="space-y-3 border border-slate-200" accent="blue">
            <h3 className="text-base font-semibold text-slate-900">{scenario.label}</h3>
            <p className="text-sm text-slate-600">{scenario.description}</p>
            <p className="rounded-md bg-sky-50 px-3 py-2 text-xs text-sky-800">
              想定差分: {scenario.expectedDifference}
            </p>
            <Button variant="primary" size="sm" onClick={() => onSelect(scenario.id)}>
              このケースで始める
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ScenarioPicker;
