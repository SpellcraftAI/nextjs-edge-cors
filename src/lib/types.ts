import { type NextResponse } from "next/server";

export type NextServerResponse = Response | NextResponse | Promise<Response | NextResponse>;

export interface CorsOptions {
  origin?: string
  maxAge?: number
  credentials?: boolean
  methods?: string[]
  allowedHeaders?: string[]
  exposedHeaders?: string[]
}
