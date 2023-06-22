### Enable CORS for Next.js Edge

The easiest way to enable CORS is in your Next config, per the
[docs](https://vercel.com/guides/how-to-enable-cors):

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

Alternatively, you can use the `withCors()` Middleware wrapper:

```ts
// src/middleware.ts

export const middleware = withCors();

export const config = {
  matcher: ["/api/cors/:path*"]
};
```

### Advanced

You can wrap existing Middleware or pass CORS options to `withCors()`:

```ts
export const middleware = withCors(
  otherMiddleware,
  {
    /**
     * Only allow CORS requests from Google.com. Comma separate for multiple
     * values.
     */
    origin: "https://www.google.com"
  }
);

export const config = {
  matcher: ["/api/cors/:path*"]
};
```