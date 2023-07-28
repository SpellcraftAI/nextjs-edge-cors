### CORS for Next.js Edge Runtime

Easily add CORS to your Edge endpoints.

### Usage

The easiest way to enable CORS is using Middleware:


```ts
// src/middleware.ts

import { CorsMiddleware } from "nextjs-edge-cors";

// Allow all origins.
export const middleware = CorsMiddleware({
  origin: "*"
})

// Match /api/cors/**.
export const config = {
  matcher: ["/api/cors/:path*"]
};
```

Alternatively, you can apply the headers manually in your Next.js config:

```js
// next.config.mjs

export const headers = () => {
  return [
    {
      source: "/api/cors/:path*",
      headers: [
        { key: "Access-Control-Allow-Credentials", value: "true" },
        { key: "Access-Control-Allow-Origin", value: "*" },
        { key: "Access-Control-Allow-Methods", value: "GET,OPTIONS,PATCH,DELETE,POST,PUT" },
        { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
      ]
    }
  ];
};
```

### Advanced

You can wrap existing Middleware and/or pass CORS options to `CorsMiddleware`:

```ts
import { CorsMiddleware } from "nextjs-edge-cors"

export const middleware = CorsMiddleware({
  origin: "https://www.google.com",
  // Other CORS options.
  maxAge: 123456,
  // Additional middleware.
  middleware: () => {
    return NextResponse.next({
      headers: {
        "Test-Stacked-Middleware": "PASS"
      }
    });
  }
});

export const config = {
  matcher: ["/api/cors/:path*"]
};
```