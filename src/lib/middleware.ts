import type { NextMiddleware } from "next/server";
import type { CorsOptions } from "./types";
import { NextResponse } from "next/dist/server/web/spec-extension/response";
import { cors } from "./cors";

export interface CorsMiddlewareOptions extends CorsOptions {
  middleware?: NextMiddleware
}

/**
 * Wraps requests with specified CORS headers.
 *
 * Set origin to `"*"` to allow all origins. Use Next.js's `config.matcher` to
 * apply the middleware specific URLs only.
 */
export const CorsMiddleware = ({
  middleware,
  ...options
}: CorsMiddlewareOptions): NextMiddleware => {
  return async (request, event) => {
    const response =
      middleware !== undefined
        ? await middleware(request, event)
        : NextResponse.next();

    return cors(request, response, options);
  };
};
