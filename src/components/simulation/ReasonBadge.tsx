import React from 'react';

interface ReasonBadgeProps {
  label: string;
  tone?: 'info' | 'success' | 'warning' | 'danger';
}

const toneClassMap: Record<NonNullable<ReasonBadgeProps['tone']>, string> = {
  info: 'bg-sky-100 text-sky-800 border-sky-200',
  success: 'bg-green-100 text-green-800 border-green-200',
  warning: 'bg-amber-100 text-amber-800 border-amber-200',
  danger: 'bg-red-100 text-red-800 border-red-200',
};

const ReasonBadge: React.FC<ReasonBadgeProps> = ({ label, tone = 'info' }) => {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium ${toneClassMap[tone]}`}
    >
      {label}
    </span>
  );
};

export default ReasonBadge;
