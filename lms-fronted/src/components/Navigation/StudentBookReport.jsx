import { useState, useEffect } from "react";
import { listStudentBooks } from "../../services/StudentService";

const StudentBookReport = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadReport();
  }, []);

  function loadReport() {
    setLoading(true);
    setError(null);

    listStudentBooks()
      .then((res) => setRows(res.data))
      .catch((err) => {
        const message =
          (err.response && err.response.data && err.response.data.message) ||
          err.message ||
          "Could not load the report.";
        setError(message);
      })
      .finally(() => setLoading(false));
  }

  function formatDate(dateStr) {
    if (!dateStr) return "—";
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
    });
  }

  function daysOverdue(dueDate) {
    const due = new Date(dueDate);
    const today = new Date();

    due.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    return Math.round((today - due) / (1000 * 60 * 60 * 24));
  }

  function renderStatus(row) {
    const overdueBy = daysOverdue(row.dueDate);

    if (row.status === "OVERDUE" || overdueBy > 0) {
      return (
        <span className="px-3 py-1 rounded-md text-xs font-medium bg-red-100 text-red-700">
          {overdueBy} day{overdueBy === 1 ? "" : "s"} overdue
        </span>
      );
    }

    if (overdueBy === 0) {
      return (
        <span className="px-3 py-1 rounded-md text-xs font-medium bg-yellow-100 text-yellow-700">
          Due today
        </span>
      );
    }

    if (overdueBy >= -2) {
      return (
        <span className="px-3 py-1 rounded-md text-xs font-medium bg-yellow-100 text-yellow-700">
          Due soon
        </span>
      );
    }

    return (
      <span className="px-3 py-1 rounded-md text-xs font-medium bg-green-100 text-green-700">
        Issued
      </span>
    );
  }

  return (
    <div className="bg-white border border-green-100 rounded-xl p-5 shadow-md">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-green-900">
          Student Loan Report
        </h2>
        <span className="text-sm text-gray-500">
          {rows.length} active loan{rows.length === 1 ? "" : "s"}
        </span>
      </div>

      {/* Loading */}
      {loading && (
        <p className="py-6 text-center text-sm text-gray-500">
          Loading report...
        </p>
      )}

      {/* Error */}
      {!loading && error && (
        <div className="bg-red-100 text-red-700 border border-red-300 rounded-lg p-3 text-sm">
          {error}
        </div>
      )}

      {/* Empty */}
      {!loading && !error && rows.length === 0 && (
        <p className="py-6 text-center text-sm text-gray-500">
          No books are currently issued.
        </p>
      )}

      {/* Table */}
      {!loading && !error && rows.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-green-200">
                <th className="text-left py-2 px-2 font-semibold text-gray-500">
                  Student
                </th>
                <th className="text-left py-2 px-2 font-semibold text-gray-500">
                  Book
                </th>
                <th className="text-left py-2 px-2 font-semibold text-gray-500">
                  Issued
                </th>
                <th className="text-left py-2 px-2 font-semibold text-gray-500">
                  Due
                </th>
                <th className="text-left py-2 px-2 font-semibold text-gray-500">
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
              {rows.map((row, idx) => {
                const overdueBy = daysOverdue(row.dueDate);
                const isOverdue =
                  row.status === "OVERDUE" || overdueBy > 0;

                return (
                  <tr
                    key={idx}
                    className={`border-b border-gray-100 ${
                      isOverdue ? "bg-red-50" : ""
                    }`}
                  >
                    <td className="py-3 px-2 text-green-900">
                      {row.studentName}
                    </td>
                    <td className="py-3 px-2 text-green-900">
                      {row.bookTitle}
                    </td>
                    <td className="py-3 px-2 text-gray-500">
                      {formatDate(row.issueDate)}
                    </td>
                    <td className="py-3 px-2 text-gray-500">
                      {formatDate(row.dueDate)}
                    </td>
                    <td className="py-3 px-2">{renderStatus(row)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default StudentBookReport;