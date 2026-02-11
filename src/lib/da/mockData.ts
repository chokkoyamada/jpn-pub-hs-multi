import { StudentScenario } from './types';

const schools = [
  { id: 1, name: '東高校', capacity: 1, difficulty: 85, specialization: '総合' },
  { id: 2, name: '西高校', capacity: 2, difficulty: 72, specialization: '理数' },
  { id: 3, name: '南高校', capacity: 2, difficulty: 63, specialization: '国際' },
  { id: 4, name: '北高校', capacity: 2, difficulty: 55, specialization: '総合' },
];

export const simulationScenarios: StudentScenario[] = [
  {
    id: 'ambitious-low-economy',
    label: '挑戦したいが全落ちが怖い',
    description:
      '第一志望は難しいが、本音では挑戦したい。単願では不合格時のリスクが大きく、出願戦略に迷っているケースです。',
    expectedDifference: '単願: 不合格 / DA: 第2志望に合格（安全網が効く）',
    targetStudentId: 'you',
    schools,
    policy: { tieBreak: 'score_then_id' },
    students: [
      { id: 'you', name: 'あなた', score: 76, preferences: [1, 2, 3, 4], economicStatus: 'low' },
      { id: 'a', name: '受験生A', score: 84, preferences: [1, 2, 3, 4], economicStatus: 'medium' },
      { id: 'b', name: '受験生B', score: 79, preferences: [2, 1, 3, 4], economicStatus: 'medium' },
      { id: 'c', name: '受験生C', score: 73, preferences: [2, 3, 4, 1], economicStatus: 'medium' },
      { id: 'd', name: '受験生D', score: 70, preferences: [3, 2, 4, 1], economicStatus: 'high' },
      { id: 'e', name: '受験生E', score: 68, preferences: [3, 4, 2, 1], economicStatus: 'medium' },
      { id: 'f', name: '受験生F', score: 62, preferences: [4, 3, 2, 1], economicStatus: 'medium' },
    ],
    singleChoices: {
      you: 1,
      a: 1,
      b: 2,
      c: 2,
      d: 3,
      e: 3,
      f: 4,
    },
  },
  {
    id: 'safe-choice-regret',
    label: '安全校に下げるか悩む',
    description:
      '単願では安全校に下げると合格しやすい一方、挑戦を諦めた後悔が残る。DAなら第一志望に挑戦しつつ安全網を持てるケースです。',
    expectedDifference: '単願: 第3志望に合格 / DA: 第1志望に合格（挑戦機会が増える）',
    targetStudentId: 'you',
    schools,
    policy: { tieBreak: 'score_then_id' },
    students: [
      { id: 'you', name: 'あなた', score: 74, preferences: [2, 1, 3, 4], economicStatus: 'medium' },
      { id: 'a', name: '受験生A', score: 86, preferences: [1, 2, 3, 4], economicStatus: 'high' },
      { id: 'b', name: '受験生B', score: 79, preferences: [2, 1, 3, 4], economicStatus: 'medium' },
      { id: 'c', name: '受験生C', score: 73, preferences: [2, 3, 4, 1], economicStatus: 'medium' },
      { id: 'd', name: '受験生D', score: 70, preferences: [3, 2, 4, 1], economicStatus: 'low' },
      { id: 'e', name: '受験生E', score: 67, preferences: [3, 4, 2, 1], economicStatus: 'medium' },
      { id: 'f', name: '受験生F', score: 61, preferences: [4, 3, 2, 1], economicStatus: 'low' },
    ],
    singleChoices: {
      you: 3,
      a: 1,
      b: 2,
      c: 2,
      d: 3,
      e: 3,
      f: 4,
    },
  },
  {
    id: 'commute-priority',
    label: '通学と学力のバランス重視',
    description:
      '通学しやすい学校を優先したいが、成績に見合う挑戦も捨てたくない。志望順位の微調整が結果にどう効くかを確認できます。',
    expectedDifference: '単願: 第3〜4志望 / DA: 第2志望（順位調整の効果が見える）',
    targetStudentId: 'you',
    schools,
    policy: { tieBreak: 'score_then_id' },
    students: [
      { id: 'you', name: 'あなた', score: 69, preferences: [3, 2, 4, 1], economicStatus: 'medium' },
      { id: 'a', name: '受験生A', score: 83, preferences: [1, 2, 3, 4], economicStatus: 'medium' },
      { id: 'b', name: '受験生B', score: 78, preferences: [2, 1, 3, 4], economicStatus: 'medium' },
      { id: 'c', name: '受験生C', score: 74, preferences: [3, 2, 4, 1], economicStatus: 'high' },
      { id: 'd', name: '受験生D', score: 71, preferences: [3, 2, 4, 1], economicStatus: 'medium' },
      { id: 'e', name: '受験生E', score: 66, preferences: [4, 3, 2, 1], economicStatus: 'low' },
      { id: 'f', name: '受験生F', score: 63, preferences: [4, 3, 2, 1], economicStatus: 'medium' },
    ],
    singleChoices: {
      you: 4,
      a: 1,
      b: 2,
      c: 3,
      d: 3,
      e: 4,
      f: 4,
    },
  },
];

export const getScenarioById = (scenarioId: string): StudentScenario | undefined =>
  simulationScenarios.find(scenario => scenario.id === scenarioId);
