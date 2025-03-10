import { Scenario, School } from '../types';

// Define some schools for our scenarios
const schools: School[] = [
  {
    id: 1,
    name: '東高校',
    capacity: 100,
    difficulty: 90, // Very difficult
    specialization: '総合'
  },
  {
    id: 2,
    name: '西高校',
    capacity: 120,
    difficulty: 80,
    specialization: '理系'
  },
  {
    id: 3,
    name: '南高校',
    capacity: 150,
    difficulty: 70,
    specialization: '文系'
  },
  {
    id: 4,
    name: '北高校',
    capacity: 180,
    difficulty: 60,
    specialization: '総合'
  },
  {
    id: 5,
    name: '中央高校',
    capacity: 200,
    difficulty: 50,
    specialization: '総合'
  }
];

// Define scenarios for different student profiles
export const scenarios: Scenario[] = [
  // Scenario 1: High-performing student with low economic status
  {
    id: 'high-score-low-economy',
    studentProfile: {
      id: 'profile1',
      label: '成績優秀・経済的制約あり',
      description: '成績は優秀ですが、経済的な理由で私立高校は選択肢にありません。',
      economicStatus: 'low',
      scorePercentile: 85
    },
    schools,
    singleApplicationResult: {
      chosenSchoolId: 2, // Would choose the second best school to be safe
      success: true,
      fallbackPrivate: false
    },
    daResult: {
      assignedSchoolId: 1, // Gets into the top school
      preferenceRank: 1
    }
  },

  // Scenario 2: Medium-performing student with medium economic status
  {
    id: 'medium-score-medium-economy',
    studentProfile: {
      id: 'profile2',
      label: '成績中程度・経済的に余裕あり',
      description: '成績は中程度で、私立高校も選択肢に入れることができます。',
      economicStatus: 'medium',
      scorePercentile: 65
    },
    schools,
    singleApplicationResult: {
      chosenSchoolId: 4, // Would choose a safer school
      success: true,
      fallbackPrivate: false
    },
    daResult: {
      assignedSchoolId: 3, // Gets into a better school
      preferenceRank: 3
    }
  },

  // Scenario 3: Student with location/commute preferences
  {
    id: 'location-preference',
    studentProfile: {
      id: 'profile3',
      label: '通学距離重視・成績中程度',
      description: '自宅から近い高校や通学しやすい高校を優先したいと考えています。',
      economicStatus: 'medium',
      scorePercentile: 55
    },
    schools,
    singleApplicationResult: {
      chosenSchoolId: 5, // Would choose a very safe school
      success: true,
      fallbackPrivate: false
    },
    daResult: {
      assignedSchoolId: 3, // Gets into a school with better location
      preferenceRank: 3
    }
  },

  // Scenario 4: Student who would fail in single application
  {
    id: 'ambitious-low-economy',
    studentProfile: {
      id: 'profile4',
      label: '挑戦志向・経済的制約あり',
      description: '難関校を目指していますが、経済的な理由で私立高校は選択肢にありません。',
      economicStatus: 'low',
      scorePercentile: 75
    },
    schools,
    singleApplicationResult: {
      chosenSchoolId: 1, // Would ambitiously choose the top school
      success: false, // But would fail
      fallbackPrivate: false // Cannot go to private
    },
    daResult: {
      assignedSchoolId: 2, // Gets into their second choice
      preferenceRank: 2
    }
  }
];

// Function to get a scenario by ID
export const getScenarioById = (id: string): Scenario | undefined => {
  return scenarios.find(scenario => scenario.id === id);
};
