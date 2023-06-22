export type StaticOrigin = boolean | string | RegExp | Array<boolean | string | RegExp>;

export type OriginFn = (
  origin: string | undefined,
  req: Request
) => StaticOrigin | Promise<StaticOrigin>;

export function isOriginAllowed (origin: string, allowed: StaticOrigin): boolean {
  if (Array.isArray(allowed)) {
    return allowed.some((o) => isOriginAllowed(origin, o));
  }

  if (typeof allowed === "string") {
    return origin === allowed;
  }

  if (allowed instanceof RegExp) {
    return allowed.test(origin);
  }

  return Boolean(allowed);
}

export function getOriginHeaders (reqOrigin: string) {
  const headers = new Headers();

  if (typeof origin === "string") {
    headers.set("Access-Control-Allow-Origin", origin);

    if (origin !== "*") {
      headers.append("Vary", "Origin");
    }

    return headers;
  }

  const allowed = isOriginAllowed(reqOrigin ?? "", origin);
  if (allowed) {
    headers.set("Access-Control-Allow-Origin", reqOrigin);
    headers.append("Vary", "Origin");
  }

  return headers;
}
