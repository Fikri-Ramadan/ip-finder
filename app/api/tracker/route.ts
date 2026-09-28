import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const ip = searchParams.get("ip") || "";

  const apiKey = process.env.ABSTRACT_API_KEY;

  try {
    const res = await fetch(`https://ip-intelligence.abstractapi.com/v1/?ip_address=${ip}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      }
    });
    const data = await res.json();

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed fetch data.' }, { status: 500 });
  }
}