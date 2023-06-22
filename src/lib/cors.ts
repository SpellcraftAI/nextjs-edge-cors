import type { CorsOptions } from "./types";
import type { NextMiddleware, NextRequest } from "next/server";

const DEFAULT_HEADERS = new Headers({
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,HEAD,PUT,PATCH,POST,DELETE"
});

export const cors = (
  request: NextRequest,
  response: Awaited<ReturnType<NextMiddleware>>,
  options: CorsOptions = {}
) => {
  const { origin, credentials, methods, maxAge, allowedHeaders, exposedHeaders } = options;
  /**
   * If no `Origin` header on the request, do not touch the response.
   */
  if (request.headers.get("Origin") === null) {
    return response;
  }

  /**
   * Load default CORS headers.
   */
  const headers = new Headers(DEFAULT_HEADERS);

  if (origin !== undefined) {
    headers.set("Access-Control-Allow-Origin", origin);
  }

  if (credentials !== undefined) {
    headers.set("Access-Control-Allow-Credentials", "true");
  }

  if (exposedHeaders !== undefined) {
    headers.set("Access-Control-Expose-Headers", exposedHeaders.join(","));
  }

  /**
   * Handle preflight OPTIONS request.
   */
  if (request.method === "OPTIONS") {
    if (allowedHeaders !== undefined) {
      headers.set("Access-Control-Allow-Headers", allowedHeaders.join(","));
    }

    if (methods !== undefined) {
      headers.set("Access-Control-Allow-Methods", methods.join(","));
    }

    if (maxAge !== undefined) {
      headers.set("Access-Control-Max-Age", String(maxAge));
    }

    return new Response(null, {
      status: 204,
      headers
    });
  }

  if (response !== null && response !== undefined) {
    setHeaders(response.headers, headers);
  }

  return response;
};

const setHeaders = (headers: Headers, newHeaders: Headers, overwrite = false) => {
  newHeaders.forEach((value, key) => {
    if (!overwrite) {
      if (headers.has(key)) {
        return;
      }
    }

    headers.set(key, value);
  });
};
