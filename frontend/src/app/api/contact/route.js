import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();
    const requiredFields = ["name", "email", "commissionType", "description", "agreedTerms"];
    const hasRequiredFields = requiredFields.every((key) => body[key]);

    if (!hasRequiredFields) {
      return NextResponse.json({ ok: false, error: "missing required fields" }, { status: 400 });
    }

    return NextResponse.json(
      {
        ok: true,
        message: "submission received",
      },
      { status: 200 },
    );
  } catch {
    return NextResponse.json({ ok: false, error: "invalid request" }, { status: 400 });
  }
}
