import { cookies } from "next/headers";

type Usage = {
  daily: number;
  monthly: number;
  dailyLimit: number;
  monthlyLimit: number;
  paused: boolean;
};

const DEFAULTS: Usage = {
  daily: 0,
  monthly: 0,
  dailyLimit: 50,
  monthlyLimit: 1500,
  paused: false
};

export function getUsage(): Usage {
  const c = cookies().get("mgi_usage")?.value;
  if (!c) return DEFAULTS;
  try {
    const u = JSON.parse(c);
    return { ...DEFAULTS, ...u };
  } catch {
    return DEFAULTS;
  }
}

export function setUsage(u: Partial<Usage>) {
  const current = getUsage();
  const next = { ...current, ...u };
  cookies().set("mgi_usage", JSON.stringify(next), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
  });
  return next;
}

export function canSend(): { ok: boolean; reason?: string } {
  const u = getUsage();
  if (u.paused) return { ok: false, reason: "paused" };
  if (u.daily >= u.dailyLimit) return { ok: false, reason: "daily_limit" };
  if (u.monthly >= u.monthlyLimit) return { ok: false, reason: "monthly_limit" };
  return { ok: true };
}
