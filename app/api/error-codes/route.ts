import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch(
      "http://sms.ghasedak.me:8087/SMSRequestManagement/api/v1/WebServiceLog/GetWebServiceErrorCodes",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        // Add cache control if needed
        cache: "no-store",
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: `HTTP error! status: ${response.status}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching error codes:", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "خطا در دریافت داده‌ها",
      },
      { status: 500 }
    );
  }
}

