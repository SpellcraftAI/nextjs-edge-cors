import { type NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: ["/api/cors/:path*"]
};

const CORS_METHODS = new Headers({
  "Access-Control-Allow-Methods": "GET,HEAD,PUT,PATCH,POST,DELETE"
});

const DEFAULT_HEADERS = new Headers({
  "Access-Control-Allow-Origin": "*"
});

const setHeaders = (headers: Headers, newHeaders: Headers, overwrite = false) => {
  newHeaders.forEach((value, key) => {
    if (!overwrite) {
      if (headers.has(key)) {
        return;
      }
    }

    headers.set(key, value);
  });

  return headers;
};

type NextServerResponse = Response | NextResponse | Promise<Response | NextResponse>;
type NextMiddleware = (request: NextRequest) => NextServerResponse;

const cors = (request: NextRequest, response: Awaited<NextServerResponse>) => {
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

  setHeaders(response.headers, headers);
  return response;
};

export const withCors = (middleware?: NextMiddleware): NextMiddleware => {
  return async (request: NextRequest) => {
    const response =
      middleware !== undefined
        ? await middleware(request)
        : NextResponse.next();

    return cors(request, response);
  };
};

export const middleware = withCors(
  () => {
    return NextResponse.next({
      headers: {
        TEST_STACKED_MIDDLEWARE: "PASS"
      }
    });
  }
);
