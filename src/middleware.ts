// Auth middleware disabled for development — enable when Supabase is connected
// import { updateSession } from '@/lib/supabase/middleware';
import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(_request: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: ['/ops/:path*', '/portal/:path*'],
};
