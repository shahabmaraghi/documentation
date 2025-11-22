"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface ErrorCode {
  code?: number;
  message?: string;
  description?: string;
  [key: string]: any;
}

const SkeletonTable = ({
  columns = 4,
  rows = 6,
}: {
  columns?: number;
  rows?: number;
}) => {
  const templateColumns = `repeat(${columns}, minmax(120px, 1fr))`;

  return (
    <div
      className="error-table-skeleton"
      style={{
        border: "1px solid var(--doc-border)",
        borderRadius: "var(--doc-radius-md)",
        backgroundColor: "var(--doc-surface)",
        padding: "1rem",
      }}
      aria-hidden="true"
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: templateColumns,
          gap: "0.75rem",
          marginBottom: "1rem",
        }}
      >
        {Array.from({ length: columns }).map((_, index) => (
          <div
            key={`skeleton-header-${index}`}
            className="skeleton-block"
            style={{ height: "18px", borderRadius: "6px" }}
          />
        ))}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <div
            key={`skeleton-row-${rowIndex}`}
            style={{
              display: "grid",
              gridTemplateColumns: templateColumns,
              gap: "0.75rem",
            }}
          >
            {Array.from({ length: columns }).map((_, colIndex) => (
              <div
                key={`skeleton-cell-${rowIndex}-${colIndex}`}
                className="skeleton-block"
                style={{ height: "16px", borderRadius: "6px" }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default function ErrorTablePage() {
  const router = useRouter();
  const [data, setData] = useState<ErrorCode[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch("/api/error-codes");

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();

        // Check if the response contains an error
        if (result.error) {
          throw new Error(result.error);
        }

        // Handle different possible response structures
        if (Array.isArray(result)) {
          setData(result);
        } else if (result.data && Array.isArray(result.data)) {
          setData(result.data);
        } else if (result.result && Array.isArray(result.result)) {
          setData(result.result);
        } else {
          setData([result]);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "خطا در دریافت داده‌ها");
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Get all unique keys from the data to create table headers
  const getTableHeaders = () => {
    if (data.length === 0) return [];

    const allKeys = new Set<string>();
    data.forEach((item) => {
      Object.keys(item).forEach((key) => allKeys.add(key));
    });

    const filteredKeys = Array.from(allKeys).sort().filter((key) => key !== "id");

    // Swap name and description columns
    const nameIndex = filteredKeys.indexOf("name");
    const descriptionIndex = filteredKeys.indexOf("description");

    if (nameIndex !== -1 && descriptionIndex !== -1) {
      [filteredKeys[nameIndex], filteredKeys[descriptionIndex]] = [
        filteredKeys[descriptionIndex],
        filteredKeys[nameIndex],
      ];
    }

    return filteredKeys;
  };

  const headers = getTableHeaders();

  return (
    <div
      style={{
        padding: "2rem",
        maxWidth: "1400px",
        margin: "0 auto",
        backgroundColor: "rgb(245, 246, 251)",
      }}
    >
      <h1
        style={{ marginBottom: "1.5rem", fontSize: "2rem", fontWeight: "700" }}
      >
        جدول کدهای خطا
      </h1>

      {loading && (
        <SkeletonTable columns={Math.max(headers.length, 4)} rows={6} />
      )}

      {error && (
        <div
          style={{
            padding: "1rem",
            backgroundColor: "#fee2e2",
            border: "1px solid #fca5a5",
            borderRadius: "8px",
            marginBottom: "1rem",
            color: "#991b1b",
          }}
        >
          <strong>خطا:</strong> {error}
        </div>
      )}

      {!loading && !error && data.length === 0 && (
        <div
          style={{ textAlign: "center", padding: "3rem", fontSize: "1.1rem" }}
        >
          داده‌ای یافت نشد.
        </div>
      )}

      {!loading && !error && data.length > 0 && (
        // <div
        //   style={{
        //     overflowX: "auto",
        //     border: "1px solid var(--doc-border)",
        //     borderRadius: "var(--doc-radius-md)",
        //     backgroundColor: "var(--doc-surface)",
        //   }}
        // >
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            minWidth: "600px",
          }}
        >
          <thead>
            <tr
              style={{
                backgroundColor: "var(--doc-surface-alt)",
                borderBottom: "2px solid var(--doc-border)",
              }}
            >
              {headers.map((header) => (
                <th
                  key={header}
                  style={{
                    padding: "1rem",
                    textAlign: "right",
                    fontWeight: "600",
                    borderLeft: "1px solid var(--doc-border)",
                  }}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr
                key={index}
                style={{
                  borderBottom: "1px solid var(--doc-border)",
                  transition: "background-color 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor =
                    "var(--doc-surface-alt)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                }}
              >
                {headers.map((header) => (
                  <td
                    key={header}
                    style={{
                      padding: "1rem",
                      textAlign: "right",
                      borderLeft: "1px solid var(--doc-border)",
                    }}
                  >
                    {item[header] !== null && item[header] !== undefined
                      ? String(item[header])
                      : "-"}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        // </div>
      )}

      {!loading && !error && data.length > 0 && (
        <div
          style={{
            marginTop: "1rem",
            color: "var(--doc-text-muted)",
            fontSize: "0.9rem",
          }}
        >
          تعداد ردیف‌ها: {data.length}
        </div>
      )}

      <div
        style={{
          marginTop: "2rem",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <button
          onClick={() => router.back()}
          style={{
            padding: "0.75rem 1.5rem",
            backgroundColor: "#05756b26",
            color: "var(--doc-text)",
            border: "1px solid #05756b",
            borderRadius: "var(--doc-radius-md)",
            fontSize: "1rem",
            fontWeight: "600",
            cursor: "pointer",
            transition:
              "background-color 0.2s ease, border-color 0.2s ease, color 0.2s ease",
          }}
        >
          بازگشت
        </button>
      </div>
    </div>
  );
}
