import React from 'react';
import { School, Scenario } from '@/lib/types';
import Card from '../ui/Card';
import SchoolCard from '../simulation/SchoolCard';

interface ComparisonResultProps {
  scenario: Scenario;
}

const ComparisonResult: React.FC<ComparisonResultProps> = ({ scenario }) => {
  const { schools, singleApplicationResult, daResult } = scenario;

  // Find the schools by ID
  const getSingleAppSchool = (): School | undefined => {
    return schools.find(school => school.id === singleApplicationResult.chosenSchoolId);
  };

  const getDASchool = (): School | undefined => {
    return schools.find(school => school.id === daResult.assignedSchoolId);
  };

  const singleAppSchool = getSingleAppSchool();
  const daSchool = getDASchool();

  // Determine outcome message for single application
  const getSingleAppOutcomeMessage = () => {
    if (!singleApplicationResult.success) {
      return singleApplicationResult.fallbackPrivate
        ? '不合格。私立高校に進学することになります。'
        : '不合格。進学先がなくなってしまいます。';
    }
    return '合格';
  };

  const singleAppOutcome = getSingleAppOutcomeMessage();

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {/* Single Application System */}
      <div>
        <h3 className="mb-3 text-xl font-bold text-gray-800">単願制の場合</h3>
        <Card variant="default" className="mb-4">
          <p className="mb-4 text-gray-700">
            単願制では、落ちるリスクを考慮して、本当の第一志望ではなく「受かりそうな学校」を選ぶことが多くなります。
          </p>

          <div className="mb-4">
            <h4 className="mb-2 font-semibold text-gray-700">あなたの選択</h4>
            {singleAppSchool && <SchoolCard school={singleAppSchool} isSelected={true} />}
          </div>

          <div>
            <h4 className="mb-2 font-semibold text-gray-700">結果</h4>
            <div
              className={`p-3 rounded-md ${!singleApplicationResult.success ? 'bg-red-100' : 'bg-green-100'}`}
            >
              <p
                className={`font-medium ${!singleApplicationResult.success ? 'text-red-700' : 'text-green-700'}`}
              >
                {singleAppOutcome}
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* DA Algorithm */}
      <div>
        <h3 className="mb-3 text-xl font-bold text-gray-800">DA方式の場合</h3>
        <Card variant="default" className="mb-4">
          <p className="mb-4 text-gray-700">
            DA方式では、本当に行きたい学校を志望順に並べるだけ。落ちても次の志望校に自動的に考慮されます。
          </p>

          <div className="mb-4">
            <h4 className="mb-2 font-semibold text-gray-700">あなたの志望順位</h4>
            <div className="space-y-2">
              {schools.slice(0, 3).map((school, index) => (
                <SchoolCard
                  key={school.id}
                  school={school}
                  rank={index + 1}
                  isAssigned={school.id === daResult.assignedSchoolId}
                />
              ))}
            </div>
          </div>

          <div>
            <h4 className="mb-2 font-semibold text-gray-700">結果</h4>
            <div className="p-3 bg-green-100 rounded-md">
              <p className="font-medium text-green-700">
                第{daResult.preferenceRank}志望の{daSchool?.name}に合格
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ComparisonResult;
