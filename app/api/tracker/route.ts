import { isDomain, isIpAddress } from "@/lib/utils";
import { NextResponse } from "next/server";
import { promises as dns } from 'dns';
import { headers } from "next/headers";

export const runtime = 'nodejs';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search") || "";
  const headersList = await headers();
  console.log('User IP:', headersList.get("x-real-ip"));
  let userIp = headersList.get("x-forwarded-for") || headersList.get("x-real-ip");

  if (userIp && userIp.includes(',')) {
    userIp = userIp.split(',')[0].trim();
  }

  if (!userIp || userIp === "::1" || userIp === "127.0.0.1") {
    userIp = "";
  }

  let apiURL = `https://ipwho.is/${userIp}`;

  if (isIpAddress(search)) {
    apiURL = `https://ipwho.is/${search}`;
  } else if (isDomain(search)) {
    const { address } = await dns.lookup(search);
    apiURL = `https://ipwho.is/${address}`;
  }

  try {
    const res = await fetch(apiURL);
    const data = await res.json();

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed fetch data.' }, { status: 500 });
  }
}