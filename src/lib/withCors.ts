import type { NextMiddleware } from "next/server";
import type { CorsOptions } from "./types";
import { NextResponse } from "next/dist/server/web/spec-extension/response";
import { cors } from "./cors";

export const withCors = (
  middleware?: NextMiddleware,
  options?: CorsOptions
): NextMiddleware => {
  return async (request, event) => {
    const response =
      middleware !== undefined
        ? await middleware(request, event)
        : NextResponse.next();

    return cors(request, response, options);
  };
};
