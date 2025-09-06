import { NextRequest } from "next/server";
import { getUsage, setUsage } from "@/lib/usage";

export async function GET(){
  const u = getUsage();
  return Response.json(u);
}

export async function POST(){
  const u = getUsage();
  const next = setUsage({ daily: u.daily + 1, monthly: u.monthly + 1 });
  return Response.json(next);
}

export async function PATCH(req: NextRequest){
  const body = await req.text();
  let data: any = {};
  try { data = JSON.parse(body) } catch {}
  const next = setUsage(data);
  return Response.json(next);
}
