export const headers = () => {
  return [
    {
      // matching all API routes
      source: "/api/configFile/:path*",
      headers: [
        { key: "Access-Control-Allow-Credentials", value: "true" },
        { key: "Access-Control-Allow-Origin", value: "*" },
        { key: "Access-Control-Allow-Methods", value: "GET,OPTIONS,PATCH,DELETE,POST,PUT" },
        { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
        { key: "Test-Next-Config", value: "PASS" }
      ]
    }
  ];
};

export const trailingSlash = true;

export const rewrites = () => {
  return [
    {
      source: "/:path*",
      destination: "/:path*/index.html" // The :path parameter is used here so will not be automatically passed in the query
    }
  ];
};
