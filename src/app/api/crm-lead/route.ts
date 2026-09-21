import { NextRequest, NextResponse } from 'next/server';
import {
  createSmartCrmDeal,
  type CrmLeadPayload,
  type LeadSource,
} from '@/app/services/smartCrm';

export const runtime = 'nodejs';

const ALLOWED_SOURCES: LeadSource[] = [
  'callback',
  'order',
  'lead-form',
  'partnership',
  'partnership-question',
];

function isLeadSource(value: unknown): value is LeadSource {
  return typeof value === 'string' && ALLOWED_SOURCES.includes(value as LeadSource);
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as Partial<CrmLeadPayload>;

    if (!isLeadSource(body.source)) {
      return NextResponse.json(
        { error: 'Invalid or missing source' },
        { status: 400 }
      );
    }

    const phone = typeof body.phone === 'string' ? body.phone.trim() : '';
    const email = typeof body.email === 'string' ? body.email.trim() : '';

    if (!phone && !email) {
      return NextResponse.json(
        { error: 'Phone or email is required' },
        { status: 400 }
      );
    }

    const payload: CrmLeadPayload = {
      source: body.source,
      phone,
      email: email || undefined,
      name: typeof body.name === 'string' ? body.name.trim() : undefined,
      title: typeof body.title === 'string' ? body.title.trim() : undefined,
      brand: typeof body.brand === 'string' ? body.brand.trim() : undefined,
      model: typeof body.model === 'string' ? body.model.trim() : undefined,
      year: typeof body.year === 'string' ? body.year.trim() : undefined,
      details:
        body.details && typeof body.details === 'object'
          ? body.details
          : undefined,
      utm: body.utm && typeof body.utm === 'object' ? body.utm : undefined,
    };

    const result = await createSmartCrmDeal(payload);

    return NextResponse.json({ success: true, result });
  } catch (error: any) {
    console.error('[crm-lead]', error?.data || error?.message || error);

    const status =
      typeof error?.status === 'number' && error.status >= 400
        ? error.status
        : 500;

    return NextResponse.json(
      {
        error: error?.message || 'Failed to create SmartCRM deal',
        details: error?.data || null,
      },
      { status }
    );
  }
}
