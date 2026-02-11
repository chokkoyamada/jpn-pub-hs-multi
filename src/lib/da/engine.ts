import {
  Assignment,
  CompareResult,
  DAEvent,
  DAResult,
  DASchool,
  DAStudent,
  MatchPolicy,
  SchoolId,
  SingleResult,
  StudentId,
  StudentScenario,
} from './types';

const byScoreThenId = (a: DAStudent, b: DAStudent): number => {
  if (a.score !== b.score) {
    return b.score - a.score;
  }
  return a.id.localeCompare(b.id);
};

const getRank = (student: DAStudent, schoolId: SchoolId): number | null => {
  const idx = student.preferences.indexOf(schoolId);
  return idx >= 0 ? idx + 1 : null;
};

const makeAssignment = (
  student: DAStudent,
  schoolId: SchoolId | null,
): Assignment => ({
  studentId: student.id,
  schoolId,
  preferenceRank: schoolId === null ? null : getRank(student, schoolId),
});

const sortStudents = (students: DAStudent[], policy: MatchPolicy): DAStudent[] => {
  if (policy.tieBreak === 'score_then_id') {
    return [...students].sort(byScoreThenId);
  }
  return students;
};

export const runDeferredAcceptance = (
  students: DAStudent[],
  schools: DASchool[],
  policy: MatchPolicy,
): DAResult => {
  const studentMap = new Map<StudentId, DAStudent>(students.map(s => [s.id, s]));

  const nextChoiceIndex = new Map<StudentId, number>();
  const heldBySchool = new Map<SchoolId, StudentId[]>();
  const assignedSchool = new Map<StudentId, SchoolId | null>();

  students.forEach(student => {
    nextChoiceIndex.set(student.id, 0);
    assignedSchool.set(student.id, null);
  });

  schools.forEach(school => {
    heldBySchool.set(school.id, []);
  });

  const events: DAEvent[] = [];
  let round = 0;

  while (true) {
    round += 1;
    const applicationsBySchool = new Map<SchoolId, StudentId[]>();

    students.forEach(student => {
      const alreadyAssigned = assignedSchool.get(student.id) !== null;
      if (alreadyAssigned) {
        return;
      }

      const nextIdx = nextChoiceIndex.get(student.id) ?? 0;
      if (nextIdx >= student.preferences.length) {
        return;
      }

      const appliedSchool = student.preferences[nextIdx];
      const apps = applicationsBySchool.get(appliedSchool) ?? [];
      apps.push(student.id);
      applicationsBySchool.set(appliedSchool, apps);

      events.push({
        round,
        studentId: student.id,
        schoolId: appliedSchool,
        action: 'apply',
        reason: `${student.name}が第${nextIdx + 1}志望に出願`,
      });
    });

    if (applicationsBySchool.size === 0) {
      break;
    }

    let anyRejection = false;

    schools.forEach(school => {
      const applicants = applicationsBySchool.get(school.id) ?? [];
      const currentlyHeld = heldBySchool.get(school.id) ?? [];

      const poolIds = Array.from(new Set([...currentlyHeld, ...applicants]));
      const poolStudents = poolIds
        .map(id => studentMap.get(id))
        .filter((s): s is DAStudent => Boolean(s));

      const ranked = sortStudents(poolStudents, policy);
      const keep = ranked.slice(0, school.capacity).map(s => s.id);
      const reject = ranked.slice(school.capacity).map(s => s.id);

      heldBySchool.set(school.id, keep);

      keep.forEach(studentId => {
        assignedSchool.set(studentId, school.id);
        const wasHeld = currentlyHeld.includes(studentId);
        if (!wasHeld) {
          const student = studentMap.get(studentId);
          if (!student) {
            return;
          }
          events.push({
            round,
            studentId,
            schoolId: school.id,
            action: 'hold',
            reason: `${school.name}の定員内に入り仮合格`,
          });
        }
      });

      reject.forEach(studentId => {
        anyRejection = true;
        assignedSchool.set(studentId, null);

        const prevChoice = nextChoiceIndex.get(studentId) ?? 0;
        nextChoiceIndex.set(studentId, prevChoice + 1);

        const student = studentMap.get(studentId);
        const hasNextChoice =
          student !== undefined ? prevChoice + 1 < student.preferences.length : false;
        const wasHeld = currentlyHeld.includes(studentId);

        events.push({
          round,
          studentId,
          schoolId: school.id,
          action: 'reject',
          hasNextChoice,
          reason: wasHeld
            ? 'より上位の受験生が入り、仮合格から押し出された'
            : '定員超過でこのラウンドでは仮合格にならなかった',
        });
      });
    });

    if (!anyRejection) {
      break;
    }
  }

  const assignments = students.map(student =>
    makeAssignment(student, assignedSchool.get(student.id) ?? null),
  );

  assignments
    .filter(result => result.schoolId !== null)
    .forEach(result => {
      events.push({
        round,
        studentId: result.studentId,
        schoolId: result.schoolId as SchoolId,
        action: 'accept',
        reason: '最終確定',
      });
    });

  return {
    assignments,
    events,
    rounds: round,
  };
};

export const runSingleApplication = (
  students: DAStudent[],
  schools: DASchool[],
  singleChoices: Record<StudentId, SchoolId>,
  policy: MatchPolicy,
): SingleResult => {
  const studentMap = new Map(students.map(student => [student.id, student]));
  const applicationsBySchool = new Map<SchoolId, StudentId[]>();

  students.forEach(student => {
    const chosenSchool = singleChoices[student.id];
    if (chosenSchool === undefined) {
      return;
    }
    const apps = applicationsBySchool.get(chosenSchool) ?? [];
    apps.push(student.id);
    applicationsBySchool.set(chosenSchool, apps);
  });

  const admitted = new Map<StudentId, SchoolId | null>();
  students.forEach(student => admitted.set(student.id, null));

  schools.forEach(school => {
    const ids = applicationsBySchool.get(school.id) ?? [];
    const applicants = ids
      .map(id => studentMap.get(id))
      .filter((s): s is DAStudent => Boolean(s));

    const ranked = sortStudents(applicants, policy);
    ranked.slice(0, school.capacity).forEach(student => {
      admitted.set(student.id, school.id);
    });
  });

  return {
    assignments: students.map(student => makeAssignment(student, admitted.get(student.id) ?? null)),
  };
};

export const compareSystems = (
  scenario: StudentScenario,
): {
  da: DAResult;
  single: SingleResult;
  compare: CompareResult;
} => {
  const da = runDeferredAcceptance(scenario.students, scenario.schools, scenario.policy);
  const single = runSingleApplication(
    scenario.students,
    scenario.schools,
    scenario.singleChoices,
    scenario.policy,
  );

  const daTarget = da.assignments.find(a => a.studentId === scenario.targetStudentId);
  const singleTarget = single.assignments.find(a => a.studentId === scenario.targetStudentId);

  if (!daTarget || !singleTarget) {
    throw new Error('対象生徒の結果が見つかりません。シナリオ定義を確認してください。');
  }

  return {
    da,
    single,
    compare: {
      targetStudentId: scenario.targetStudentId,
      da: daTarget,
      single: singleTarget,
      safetyNetWorked: singleTarget.schoolId === null && daTarget.schoolId !== null,
    },
  };
};

export const getSchoolName = (schools: DASchool[], schoolId: SchoolId | null): string => {
  if (schoolId === null) {
    return '割り当てなし';
  }
  return schools.find(school => school.id === schoolId)?.name ?? '不明な学校';
};
