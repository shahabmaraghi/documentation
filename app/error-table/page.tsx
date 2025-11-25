"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  flexRender,
  ColumnDef,
  createColumnHelper,
  CellContext,
  HeaderContext,
} from "@tanstack/react-table";

interface ErrorCode {
  code?: number;
  message?: string;
  description?: string;
  [key: string]: any;
}

// Mock data to use when API fails
const MOCK_ERROR_DATA: ErrorCode[] = [
  {
    code: 1,
    message: "خطای احراز هویت",
    description: "API Key نامعتبر است",
  },
  {
    code: 2,
    message: "خطای اعتبارسنجی",
    description: "پارامترهای ارسالی نامعتبر هستند",
  },
  {
    code: 3,
    message: "خطای محدودیت",
    description: "تعداد درخواست‌ها از حد مجاز تجاوز کرده است",
  },
  {
    code: 4,
    message: "خطای سرور",
    description: "خطای داخلی سرور رخ داده است",
  },
  {
    code: 5,
    message: "خطای شبکه",
    description: "اتصال به سرور برقرار نشد",
  },
  {
    code: 6,
    message: "خطای فرمت",
    description: "فرمت داده‌های ارسالی صحیح نیست",
  },
  {
    code: 7,
    message: "خطای مجوز",
    description: "شما مجوز دسترسی به این منبع را ندارید",
  },
  {
    code: 8,
    message: "خطای یافت نشد",
    description: "منبع درخواستی یافت نشد",
  },
];

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
  const [isMobile, setIsMobile] = useState(false);
  const [usingMockData, setUsingMockData] = useState(false);

  useEffect(() => {
    // Set page title
    document.title = "جدول کدهای خطا - مستندات پیام کوتاه قاصدک";

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        setUsingMockData(false);
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
        let fetchedData: ErrorCode[] = [];
        if (Array.isArray(result)) {
          fetchedData = result;
        } else if (result.data && Array.isArray(result.data)) {
          fetchedData = result.data;
        } else if (result.result && Array.isArray(result.result)) {
          fetchedData = result.result;
        } else {
          fetchedData = [result];
        }

        // If no data or empty array, use mock data
        if (fetchedData.length === 0) {
          setData(MOCK_ERROR_DATA);
          setUsingMockData(true);
          setError("داده‌ای از API دریافت نشد. در حال نمایش داده‌های نمونه");
        } else {
          setData(fetchedData);
        }
      } catch (err) {
        // On error, use mock data instead
        setData(MOCK_ERROR_DATA);
        setUsingMockData(true);
        setError(
          err instanceof Error
            ? `خطا در دریافت داده‌ها: ${err.message}. در حال نمایش داده‌های نمونه`
            : "خطا در دریافت داده‌ها. در حال نمایش داده‌های نمونه"
        );
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

    const filteredKeys = Array.from(allKeys)
      .sort()
      .filter((key) => key !== "id");

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

  // Create columns dynamically
  const columnHelper = createColumnHelper<ErrorCode>();

  const columns = useMemo<ColumnDef<ErrorCode>[]>(() => {
    return headers.map((header) =>
      columnHelper.accessor((row: ErrorCode) => row[header], {
        id: header,
        header: () => <span style={{ fontWeight: "600" }}>{header}</span>,
        cell: (info: CellContext<ErrorCode, unknown>) => {
          const value = info.getValue();
          return value !== null && value !== undefined ? String(value) : "-";
        },
      })
    );
  }, [headers, columnHelper]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div
      style={{
        padding: "clamp(1rem, 2vw, 2rem)",
        maxWidth: "1400px",
        margin: "0 auto",
        backgroundColor: "rgb(245, 246, 251)",
        minHeight: "100vh",
      }}
    >
      <h1
        style={{
          marginBottom: "1.5rem",
          fontSize: "clamp(1.5rem, 4vw, 2rem)",
          fontWeight: "700",
        }}
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
            backgroundColor: usingMockData ? "#fef3c7" : "#fee2e2",
            border: `1px solid ${usingMockData ? "#fcd34d" : "#fca5a5"}`,
            borderRadius: "8px",
            marginBottom: "1rem",
            color: usingMockData ? "#92400e" : "#991b1b",
          }}
        >
          <strong>{usingMockData ? "توجه:" : "خطا:"}</strong> {error}
        </div>
      )}

      {!loading && data.length === 0 && (
        <div
          style={{
            textAlign: "center",
            padding: "3rem",
            fontSize: "1.1rem",
          }}
        >
          داده‌ای یافت نشد.
        </div>
      )}

      {!loading && data.length > 0 && (
        <>
          {/* Mobile Card View */}
          {isMobile ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
              }}
            >
              {table.getRowModel().rows.map((row: any) => (
                <div
                  key={row.id}
                  style={{
                    border: "1px solid var(--doc-border)",
                    borderRadius: "var(--doc-radius-md)",
                    backgroundColor: "var(--doc-surface)",
                    padding: "1rem",
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.75rem",
                  }}
                >
                  {row.getVisibleCells().map((cell: any) => (
                    <div
                      key={cell.id}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.25rem",
                        paddingBottom: "0.75rem",
                        borderBottom: "1px solid var(--doc-border)",
                      }}
                    >
                      <div
                        style={{
                          fontWeight: "600",
                          fontSize: "0.875rem",
                          color: "var(--doc-text-muted)",
                          textTransform: "uppercase",
                        }}
                      >
                        {cell.column.id}
                      </div>
                      <div
                        style={{
                          fontSize: "1rem",
                          color: "var(--doc-text)",
                          wordBreak: "break-word",
                        }}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ) : (
            /* Desktop/Tablet Table View */
            <div
              style={{
                overflowX: "auto",
                WebkitOverflowScrolling: "touch",
                border: "1px solid var(--doc-border)",
                borderRadius: "var(--doc-radius-md)",
                backgroundColor: "var(--doc-surface)",
              }}
            >
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  minWidth: "600px",
                }}
              >
                <thead>
                  {table.getHeaderGroups().map((headerGroup: any) => (
                    <tr
                      key={headerGroup.id}
                      style={{
                        backgroundColor: "var(--doc-surface-alt)",
                        borderBottom: "2px solid var(--doc-border)",
                      }}
                    >
                      {headerGroup.headers.map((header: any) => (
                        <th
                          key={header.id}
                          style={{
                            padding: "clamp(0.75rem, 1.5vw, 1rem)",
                            textAlign: "right",
                            fontWeight: "600",
                            borderLeft: "1px solid var(--doc-border)",
                            fontSize: "clamp(0.875rem, 1.5vw, 1rem)",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody>
                  {table.getRowModel().rows.map((row: any) => (
                    <tr
                      key={row.id}
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
                      {row.getVisibleCells().map((cell: any) => (
                        <td
                          key={cell.id}
                          style={{
                            padding: "clamp(0.75rem, 1.5vw, 1rem)",
                            textAlign: "right",
                            borderLeft: "1px solid var(--doc-border)",
                            fontSize: "clamp(0.875rem, 1.5vw, 1rem)",
                            wordBreak: "break-word",
                          }}
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}

      {!loading && data.length > 0 && (
        <div
          style={{
            marginTop: "1rem",
            color: "var(--doc-text-muted)",
            fontSize: "clamp(0.875rem, 1.5vw, 0.9rem)",
          }}
        >
          تعداد ردیف‌ها: {data.length}
          {usingMockData && " (داده‌های نمونه)"}
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
