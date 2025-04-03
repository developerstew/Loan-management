import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    env: process.env.NODE_ENV,
    hasDbUrl: !!process.env.DATABASE_URL,
    hasDirectUrl: !!process.env.DIRECT_URL,
    dbUrlStart: process.env.DATABASE_URL?.substring(0, 10) + '...',
    timestamp: new Date().toISOString(),
  });
}
