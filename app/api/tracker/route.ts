import { isDomain, isIpAddress } from "@/lib/utils";
import { NextResponse } from "next/server";
import { promises as dns } from 'dns';

export const runtime = 'nodejs';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search") || "";

  let apiURL = `https://ipwho.is/`;

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