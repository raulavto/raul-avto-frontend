type GoogleStarRating = 'ONE' | 'TWO' | 'THREE' | 'FOUR' | 'FIVE';

type GoogleReviewer = {
  profilePhotoUrl?: string;
  displayName?: string;
  isAnonymous?: boolean;
};

type GoogleReview = {
  reviewId?: string;
  reviewer?: GoogleReviewer;
  starRating?: GoogleStarRating;
  comment?: string;
  createTime?: string;
  updateTime?: string;
};

type GoogleReviewsListResponse = {
  reviews?: GoogleReview[];
  averageRating?: number;
  totalReviewCount?: number;
  nextPageToken?: string;
};

export type PublicGoogleReview = {
  id: string;
  name: string;
  rating: number;
  text: string;
  createTime: string | null;
  profilePhotoUrl: string | null;
};

export type GoogleReviewsPayload = {
  reviews: PublicGoogleReview[];
  averageRating: number | null;
  totalReviewCount: number | null;
  source: 'google' | 'fallback';
  fetchedAt: number;
};

const STAR_RATING_MAP: Record<GoogleStarRating, number> = {
  ONE: 1,
  TWO: 2,
  THREE: 3,
  FOUR: 4,
  FIVE: 5,
};

const OAUTH_TOKEN_URL = 'https://oauth2.googleapis.com/token';
const REVIEWS_SCOPE = 'https://www.googleapis.com/auth/business.manage';

let cachedAccessToken: { token: string; expiresAt: number } | null = null;

function requireEnv(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(`${name} is missing`);
  }
  return value;
}

function stripResourcePrefix(value: string, prefix: string): string {
  const trimmed = value.trim();
  return trimmed.startsWith(`${prefix}/`)
    ? trimmed.slice(prefix.length + 1)
    : trimmed;
}

function getAccountAndLocationIds() {
  const accountId = stripResourcePrefix(
    requireEnv('GOOGLE_BUSINESS_ACCOUNT_ID'),
    'accounts'
  );
  const locationId = stripResourcePrefix(
    requireEnv('GOOGLE_BUSINESS_LOCATION_ID'),
    'locations'
  );

  return { accountId, locationId };
}

async function getAccessToken(): Promise<string> {
  const now = Date.now();
  if (cachedAccessToken && cachedAccessToken.expiresAt > now + 60_000) {
    return cachedAccessToken.token;
  }

  const clientId = requireEnv('GOOGLE_BUSINESS_CLIENT_ID');
  const clientSecret = requireEnv('GOOGLE_BUSINESS_CLIENT_SECRET');
  const refreshToken = requireEnv('GOOGLE_BUSINESS_REFRESH_TOKEN');

  const body = new URLSearchParams({
    client_id: clientId,
    client_secret: clientSecret,
    refresh_token: refreshToken,
    grant_type: 'refresh_token',
  });

  const response = await fetch(OAUTH_TOKEN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body,
    cache: 'no-store',
  });

  const data = (await response.json()) as {
    access_token?: string;
    expires_in?: number;
    error?: string;
    error_description?: string;
  };

  if (!response.ok || !data.access_token) {
    throw new Error(
      data.error_description ||
        data.error ||
        `Failed to refresh Google Business access token (${response.status})`
    );
  }

  cachedAccessToken = {
    token: data.access_token,
    expiresAt: now + (data.expires_in ?? 3600) * 1000,
  };

  return data.access_token;
}

function mapStarRating(rating?: GoogleStarRating): number {
  if (!rating) return 0;
  return STAR_RATING_MAP[rating] ?? 0;
}

function cleanReviewComment(comment?: string): string {
  if (!comment) return '';

  // Google sometimes appends a translated version after "(Translated by Google)".
  const marker = '(Translated by Google)';
  const markerIndex = comment.indexOf(marker);
  if (markerIndex === -1) return comment.trim();

  return comment.slice(0, markerIndex).trim();
}

function mapReview(review: GoogleReview, index: number): PublicGoogleReview | null {
  const text = cleanReviewComment(review.comment);
  const rating = mapStarRating(review.starRating);

  if (!text || rating < 1) return null;

  const name =
    review.reviewer?.displayName?.trim() ||
    (review.reviewer?.isAnonymous ? 'Google user' : 'Google user');

  return {
    id: review.reviewId || `google-review-${index}`,
    name,
    rating,
    text,
    createTime: review.createTime || review.updateTime || null,
    profilePhotoUrl: review.reviewer?.profilePhotoUrl || null,
  };
}

async function fetchReviewsPage(
  accessToken: string,
  accountId: string,
  locationId: string,
  pageToken?: string
): Promise<GoogleReviewsListResponse> {
  const url = new URL(
    `https://mybusiness.googleapis.com/v4/accounts/${accountId}/locations/${locationId}/reviews`
  );
  url.searchParams.set('pageSize', '50');
  url.searchParams.set('orderBy', 'updateTime desc');
  if (pageToken) {
    url.searchParams.set('pageToken', pageToken);
  }

  const response = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: 'application/json',
    },
    cache: 'no-store',
  });

  const data = (await response.json()) as GoogleReviewsListResponse & {
    error?: { message?: string; status?: string };
  };

  if (!response.ok) {
    throw new Error(
      data.error?.message ||
        `Google Business reviews request failed (${response.status})`
    );
  }

  return data;
}

export async function fetchGoogleBusinessReviews(
  maxReviews = 24
): Promise<GoogleReviewsPayload> {
  const { accountId, locationId } = getAccountAndLocationIds();
  const accessToken = await getAccessToken();

  const collected: PublicGoogleReview[] = [];
  let nextPageToken: string | undefined;
  let averageRating: number | null = null;
  let totalReviewCount: number | null = null;

  do {
    const page = await fetchReviewsPage(
      accessToken,
      accountId,
      locationId,
      nextPageToken
    );

    if (typeof page.averageRating === 'number') {
      averageRating = page.averageRating;
    }
    if (typeof page.totalReviewCount === 'number') {
      totalReviewCount = page.totalReviewCount;
    }

    for (const [index, review] of (page.reviews || []).entries()) {
      const mapped = mapReview(review, collected.length + index);
      if (mapped) collected.push(mapped);
      if (collected.length >= maxReviews) break;
    }

    nextPageToken =
      collected.length >= maxReviews ? undefined : page.nextPageToken;
  } while (nextPageToken);

  return {
    reviews: collected.slice(0, maxReviews),
    averageRating,
    totalReviewCount,
    source: 'google',
    fetchedAt: Date.now(),
  };
}

export function getGoogleBusinessScope() {
  return REVIEWS_SCOPE;
}
