'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import ReasonBadge from './ReasonBadge';
import { DAEvent, DASchool, DAStudent, SchoolId, StudentId } from '@/lib/da/types';

interface DAPlaybackProps {
  students: DAStudent[];
  schools: DASchool[];
  events: DAEvent[];
  focusStudentId: StudentId;
}

const shortLabel = (student: DAStudent): string => {
  if (student.id === 'you') {
    return 'Y';
  }
  return student.name.replace('受験生', '').charAt(0);
};

const DAPlayback: React.FC<DAPlaybackProps> = ({ students, schools, events, focusStudentId }) => {
  const [eventIndex, setEventIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const applyPreference = (matches: boolean) => setReducedMotion(matches);
    applyPreference(query.matches);
    const onChange = (e: MediaQueryListEvent) => applyPreference(e.matches);
    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    if (!isPlaying) {
      return;
    }
    if (eventIndex >= events.length - 1) {
      return;
    }

    const timer = window.setTimeout(
      () =>
        setEventIndex(prev => {
          const next = Math.min(prev + 1, events.length - 1);
          if (next === events.length - 1) {
            setIsPlaying(false);
          }
          return next;
        }),
      reducedMotion ? 1800 : 1100,
    );
    return () => window.clearTimeout(timer);
  }, [eventIndex, events.length, isPlaying, reducedMotion]);

  const currentEvent = events[eventIndex];

  const studentPos = useMemo(() => {
    const baseY = 58;
    const gap = 44;
    return new Map(students.map((student, idx) => [student.id, { x: 90, y: baseY + gap * idx }]));
  }, [students]);

  const schoolPos = useMemo(() => {
    const baseY = 70;
    const gap = 62;
    return new Map(schools.map((school, idx) => [school.id, { x: 520, y: baseY + gap * idx }]));
  }, [schools]);

  const heldBySchool = useMemo(() => {
    const holdMap = new Map<SchoolId, Set<StudentId>>();
    schools.forEach(school => holdMap.set(school.id, new Set<StudentId>()));

    for (let i = 0; i <= eventIndex; i += 1) {
      const event = events[i];
      const schoolHolds = holdMap.get(event.schoolId);
      if (!schoolHolds) {
        continue;
      }
      if (event.action === 'hold' || event.action === 'accept') {
        schoolHolds.add(event.studentId);
      }
      if (event.action === 'reject') {
        schoolHolds.delete(event.studentId);
      }
    }

    return holdMap;
  }, [eventIndex, events, schools]);

  const heldOrderedBySchool = useMemo(() => {
    const studentMap = new Map(students.map(student => [student.id, student]));
    const ordered = new Map<SchoolId, DAStudent[]>();

    schools.forEach(school => {
      const ids = Array.from(heldBySchool.get(school.id) ?? []);
      const list = ids
        .map(id => studentMap.get(id))
        .filter((student): student is DAStudent => Boolean(student))
        .sort((a, b) => b.score - a.score);
      ordered.set(school.id, list);
    });

    return ordered;
  }, [heldBySchool, schools, students]);

  const goPrev = () => setEventIndex(prev => Math.max(prev - 1, 0));
  const goNext = () => setEventIndex(prev => Math.min(prev + 1, events.length - 1));
  const togglePlay = () => setIsPlaying(prev => !prev);

  if (!currentEvent) {
    return (
      <Card accent="blue">
        <p className="text-sm text-slate-600">イベントがありません。</p>
      </Card>
    );
  }

  const from = studentPos.get(currentEvent.studentId);
  const to = schoolPos.get(currentEvent.schoolId);

  return (
    <Card accent="blue" className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="font-heading text-xl font-bold text-slate-900">DAステップ再生</h2>
          <p className="text-sm text-slate-600">
            Round {currentEvent.round} / Event {eventIndex + 1} of {events.length}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={goPrev} disabled={eventIndex === 0}>
            前へ
          </Button>
          <Button variant="primary" size="sm" onClick={togglePlay}>
            {isPlaying ? '停止' : '再生'}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={goNext}
            disabled={eventIndex === events.length - 1}
          >
            次へ
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <ReasonBadge
          tone={
            currentEvent.action === 'reject'
              ? 'danger'
              : currentEvent.action === 'hold' || currentEvent.action === 'accept'
                ? 'success'
                : 'info'
          }
          label={
            currentEvent.action === 'apply'
              ? '出願'
              : currentEvent.action === 'hold'
                ? '仮合格'
                : currentEvent.action === 'reject'
                  ? '押し出し/不合格'
                  : '最終確定'
          }
        />
        {currentEvent.hasNextChoice && <ReasonBadge tone="warning" label="まだ次志望がある" />}
      </div>

      <p className="rounded-md bg-slate-50 p-3 text-sm text-slate-700">{currentEvent.reason}</p>

      <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white">
        <svg viewBox="0 0 680 360" className="h-[360px] min-w-[640px] w-full">
          <defs>
            <marker
              id="arrow-head"
              markerWidth="10"
              markerHeight="10"
              refX="8"
              refY="3"
              orient="auto"
              markerUnits="strokeWidth"
            >
              <path d="M0,0 L0,6 L9,3 z" fill="#0369a1" />
            </marker>
          </defs>

          {students.map(student => {
            const pos = studentPos.get(student.id);
            if (!pos) {
              return null;
            }
            const isFocus = student.id === focusStudentId;
            const isCurrent = student.id === currentEvent.studentId;

            return (
              <g key={student.id}>
                <rect
                  x={pos.x - 64}
                  y={pos.y - 16}
                  width={128}
                  height={32}
                  rx={8}
                  fill={isCurrent ? '#dbeafe' : '#f8fafc'}
                  stroke={isFocus ? '#0369a1' : '#94a3b8'}
                  strokeWidth={isFocus ? 2 : 1}
                />
                <circle
                  cx={pos.x - 46}
                  cy={pos.y}
                  r={10}
                  fill={isCurrent ? '#2563eb' : '#64748b'}
                  stroke={isCurrent ? '#1d4ed8' : '#475569'}
                  strokeWidth={1.2}
                />
                <text
                  x={pos.x - 46}
                  y={pos.y + 4}
                  textAnchor="middle"
                  fontSize="10.5"
                  fontWeight={800}
                  fill="#ffffff"
                >
                  {shortLabel(student)}
                </text>
                <text x={pos.x + 10} y={pos.y + 4} textAnchor="middle" fontSize="12" fill="#0f172a">
                  {student.name} ({student.score})
                </text>
              </g>
            );
          })}

          {schools.map(school => {
            const pos = schoolPos.get(school.id);
            if (!pos) {
              return null;
            }
            const held = heldBySchool.get(school.id);
            const heldCount = held?.size ?? 0;
            const heldStudents = heldOrderedBySchool.get(school.id) ?? [];
            const slots = Array.from({ length: school.capacity });

            return (
              <g key={school.id}>
                <rect
                  x={pos.x - 85}
                  y={pos.y - 26}
                  width={170}
                  height={54}
                  rx={10}
                  fill="#f0fdf4"
                  stroke="#16a34a"
                />
                <text x={pos.x} y={pos.y - 8} textAnchor="middle" fontSize="13" fill="#14532d">
                  {school.name}
                </text>
                <text x={pos.x} y={pos.y + 8} textAnchor="middle" fontSize="11" fill="#166534">
                  仮合格 {heldCount}/{school.capacity}
                </text>

                {slots.map((_, idx) => {
                  const student = heldStudents[idx];
                  const slotGap = 22;
                  const startX = pos.x - ((school.capacity - 1) * slotGap) / 2;
                  const x = startX + idx * slotGap;
                  const y = pos.y + 20;

                  return (
                    <g key={`${school.id}-slot-${idx}`}>
                      <circle
                        cx={x}
                        cy={y + 4.5}
                        r={8}
                        fill={student ? '#16a34a' : '#cbd5e1'}
                        stroke={student ? '#166534' : '#94a3b8'}
                        strokeWidth={1.2}
                      />
                      {student && (
                        <text
                          x={x}
                          y={y + 9}
                          textAnchor="middle"
                          fontSize="10.5"
                          fontWeight={800}
                          fill="#ffffff"
                        >
                          {shortLabel(student)}
                        </text>
                      )}
                    </g>
                  );
                })}
              </g>
            );
          })}

          {from && to && (
            <line
              x1={from.x + 66}
              y1={from.y}
              x2={to.x - 86}
              y2={to.y}
              stroke="#0369a1"
              strokeWidth="2.2"
              markerEnd="url(#arrow-head)"
              strokeDasharray={currentEvent.action === 'apply' ? '6 4' : undefined}
            />
          )}
        </svg>
      </div>
    </Card>
  );
};

export default DAPlayback;
