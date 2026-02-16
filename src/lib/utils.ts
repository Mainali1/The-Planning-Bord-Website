import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const LICENSE_API_BASE = import.meta.env.VITE_LICENSE_API_BASE ?? ""

export type LicenseTier = "professional" | "enterprise"

export async function startCheckout(tier: LicenseTier) {
  if (!LICENSE_API_BASE) {
    throw new Error("License API base URL is not configured")
  }

  const response = await fetch(`${LICENSE_API_BASE}/api/checkout/session`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ tier }),
  })

  if (!response.ok) {
    throw new Error("Failed to start checkout")
  }

  const data = await response.json() as { url?: string }

  if (!data.url) {
    throw new Error("Checkout URL missing in response")
  }

  window.location.href = data.url
}
