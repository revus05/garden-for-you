"use client";

export function setClientCookie(
  name: string,
  value: string,
  options: {
    path?: string;
    maxAgeSeconds?: number;
    sameSite?: "lax" | "strict" | "none";
    secure?: boolean;
  } = {},
) {
  const path = options.path ?? "/";
  const sameSite = options.sameSite ?? "lax";
  const secure =
    options.secure ??
    (typeof window !== "undefined" && window.location.protocol === "https:");

  // Note: can't set HttpOnly from the client.
  const parts = [
    `${encodeURIComponent(name)}=${encodeURIComponent(value)}`,
    `Path=${path}`,
    `SameSite=${sameSite}`,
  ];

  if (typeof options.maxAgeSeconds === "number") {
    parts.push(`Max-Age=${options.maxAgeSeconds}`);
  }

  if (secure) {
    parts.push("Secure");
  }

  // biome-ignore lint/suspicious/noDocumentCookie: needed for setting auth token cookie in the browser.
  document.cookie = parts.join("; ");
}
