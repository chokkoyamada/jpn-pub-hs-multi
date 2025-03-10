// Types for the DA algorithm simulation

// Student type
export interface Student {
  id: number;
  name: string;
  score: number; // Test score
  preferences: number[]; // School IDs in order of preference
  economicStatus: 'high' | 'medium' | 'low'; // Economic status affecting private school options
}

// School type
export interface School {
  id: number;
  name: string;
  capacity: number;
  difficulty: number; // Difficulty level (higher means more difficult)
  specialization?: string; // Optional specialization (e.g., "science", "arts")
}

// Simulation result for a single student
export interface StudentResult {
  studentId: number;
  assignedSchoolId: number | null;
  preferenceRank: number | null; // Which preference was satisfied (1 for first choice, etc.)
  satisfied: boolean; // Whether the student is satisfied with the result
}

// Overall simulation result
export interface SimulationResult {
  studentResults: StudentResult[];
  overallSatisfaction: number; // Percentage of students satisfied
  averagePreferenceRank: number; // Average preference rank achieved
}

// Student profile for the simulation
export interface StudentProfile {
  id: string;
  label: string;
  description: string;
  economicStatus: 'high' | 'medium' | 'low';
  scorePercentile: number; // Score percentile (0-100)
}

// Scenario for the simulation
export interface Scenario {
  id: string;
  studentProfile: StudentProfile;
  schools: School[];
  // Pre-calculated results for both systems
  singleApplicationResult: {
    chosenSchoolId: number; // The school the student would choose in single application
    success: boolean; // Whether they would succeed
    fallbackPrivate: boolean; // Whether they would need to fall back to private
  };
  daResult: {
    assignedSchoolId: number;
    preferenceRank: number;
  };
}
