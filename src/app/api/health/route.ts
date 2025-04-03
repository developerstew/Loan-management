import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { log } from '@/lib/logger';

export async function GET() {
  try {
    log.info('Health check: Testing database connection');

    // Test database connection
    await prisma.$connect();

    // Try a simple query
    const count = await prisma.loan.count();

    log.info('Health check: Database connection successful', {
      loanCount: count,
    });

    return NextResponse.json({
      status: 'healthy',
      database: 'connected',
      loanCount: count,
      timestamp: new Date().toISOString(),
      env: process.env.NODE_ENV,
      hasDbUrl: !!process.env.DATABASE_URL,
      hasDirectUrl: !!process.env.DIRECT_URL,
    });
  } catch (error) {
    log.error('Health check: Database connection failed', error);

    return NextResponse.json(
      {
        status: 'unhealthy',
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString(),
        env: process.env.NODE_ENV,
        hasDbUrl: !!process.env.DATABASE_URL,
        hasDirectUrl: !!process.env.DIRECT_URL,
      },
      { status: 500 },
    );
  }
}
