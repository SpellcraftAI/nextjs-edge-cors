import { NextResponse, type NextRequest } from "next/server";

type NextMiddlewareResponse = Response | NextResponse | Promise<Response | NextResponse>;
type NextMiddleware = (request: NextRequest) => NextMiddlewareResponse;

export type WithCors = (middleware?: NextMiddleware) => NextMiddleware;

const CORS_METHODS = new Headers({
  "Access-Control-Allow-Methods": "GET,HEAD,PUT,PATCH,POST,DELETE"
});

const DEFAULT_HEADERS = new Headers({
  "Access-Control-Allow-Origin": "*"
});

const setHeaders = (headers: Headers, newHeaders: Headers) => {
  newHeaders.forEach((value, key) => {
    headers.set(key, value);
  });
};

export const withCors: WithCors = (middleware) => {
  const corsMiddleware: NextMiddleware = (request) => {
    /**
   * Load default CORS headers.
   */
    const headers = new Headers(DEFAULT_HEADERS);

    if (request.method === "OPTIONS") {
      setHeaders(headers, CORS_METHODS);

      return new Response(null, {
        status: 204,
        headers
      });
    }

    const response = NextResponse.next({
      headers
    });

    return response;
  };

  if (middleware === undefined) {
    return corsMiddleware;
  }

  return async (request) => {
    const corsResponse = corsMiddleware(request);

    if (corsResponse instanceof Response) {
      return await middleware(request);
    }

    return await corsResponse.then(async (response) => {
      if (response instanceof Response) {
        return await middleware(request);
      }

      return response;
    });
  };
};
