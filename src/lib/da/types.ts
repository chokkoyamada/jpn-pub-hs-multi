export type SchoolId = number;
export type StudentId = string;

export interface DAStudent {
  id: StudentId;
  name: string;
  score: number;
  preferences: SchoolId[];
  economicStatus: 'high' | 'medium' | 'low';
}

export interface DASchool {
  id: SchoolId;
  name: string;
  capacity: number;
  difficulty: number;
  specialization?: string;
}

export interface MatchPolicy {
  tieBreak: 'score_then_id';
}

export type DAEventAction = 'apply' | 'hold' | 'reject' | 'accept';

export interface DAEvent {
  round: number;
  studentId: StudentId;
  schoolId: SchoolId;
  action: DAEventAction;
  reason: string;
  hasNextChoice?: boolean;
}

export interface Assignment {
  studentId: StudentId;
  schoolId: SchoolId | null;
  preferenceRank: number | null;
}

export interface DAResult {
  assignments: Assignment[];
  events: DAEvent[];
  rounds: number;
}

export interface SingleResult {
  assignments: Assignment[];
}

export interface CompareResult {
  targetStudentId: StudentId;
  single: Assignment;
  da: Assignment;
  safetyNetWorked: boolean;
}

export interface StudentScenario {
  id: string;
  label: string;
  description: string;
  targetStudentId: StudentId;
  schools: DASchool[];
  students: DAStudent[];
  singleChoices: Record<StudentId, SchoolId>;
  policy: MatchPolicy;
}
