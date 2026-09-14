import { NextResponse } from 'next/server';
import {
  fetchGoogleBusinessReviews,
  type GoogleReviewsPayload,
} from '@/app/services/googleBusinessReviews';

export const dynamic = 'force-dynamic';
export const maxDuration = 30;

const CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour
const MAX_REVIEWS = 24;

let cache: GoogleReviewsPayload | null = null;

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  return String(error);
}

export async function GET() {
  try {
    if (cache && Date.now() - cache.fetchedAt < CACHE_TTL_MS) {
      return NextResponse.json({
        ...cache,
        cached: true,
      });
    }

    const payload = await fetchGoogleBusinessReviews(MAX_REVIEWS);
    cache = payload;

    console.log(
      `[google-reviews] loaded ${payload.reviews.length} reviews` +
        (payload.totalReviewCount != null
          ? ` / total=${payload.totalReviewCount}`
          : '') +
        (payload.averageRating != null
          ? ` / avg=${payload.averageRating}`
          : '')
    );

    return NextResponse.json({
      ...payload,
      cached: false,
    });
  } catch (error) {
    const message = getErrorMessage(error);
    console.error('[google-reviews] failed:', message);

    if (cache) {
      return NextResponse.json({
        ...cache,
        cached: true,
        stale: true,
        warning: message,
      });
    }

    return NextResponse.json(
      {
        reviews: [],
        averageRating: null,
        totalReviewCount: null,
        source: 'fallback',
        fetchedAt: Date.now(),
        error: message,
      },
      { status: 503 }
    );
  }
}
