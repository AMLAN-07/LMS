import React from 'react'

const Demo = () => {
 // utils/reportUtils.js

export function formatDate(dateStr) {
  if (!dateStr) return "—";

  const d = new Date(dateStr);
  return d.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
  });
}

export function daysOverdue(dueDate) {
  const due = new Date(dueDate);
  const today = new Date();

  due.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  return Math.round((today - due) / (1000 * 60 * 60 * 24));
}

export function getStatus(row) {
  const overdueBy = daysOverdue(row.dueDate);

  if (row.status === "OVERDUE" || overdueBy > 0) {
    return {
      label: `${overdueBy} day${overdueBy === 1 ? "" : "s"} overdue`,
      className: "bg-red-100 text-red-700",
    };
  }

  if (overdueBy === 0) {
    return {
      label: "Due today",
      className: "bg-yellow-100 text-yellow-700",
    };
  }

  if (overdueBy >= -2) {
    return {
      label: "Due soon",
      className: "bg-yellow-100 text-yellow-700",
    };
  }

  return {
    label: "Issued",
    className: "bg-green-100 text-green-700",
  };
}}


export default Demo