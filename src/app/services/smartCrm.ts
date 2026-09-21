export type LeadSource =
  | 'callback'
  | 'order'
  | 'lead-form'
  | 'partnership'
  | 'partnership-question';

export type CrmLeadPayload = {
  source: LeadSource;
  phone: string;
  name?: string;
  email?: string;
  title?: string;
  brand?: string;
  model?: string;
  year?: string;
  details?: Record<string, string | number | boolean | null | undefined>;
  utm?: {
    source?: string;
    medium?: string;
    campaign?: string;
    content?: string;
    term?: string;
    gaClientId?: string;
  };
};

const SOURCE_LABELS: Record<LeadSource, string> = {
  callback: 'Запит на дзвінок',
  order: 'Заявка на підбір авто',
  'lead-form': 'Заявка на підбір (lead-form)',
  partnership: 'Заявка для дилерів',
  'partnership-question': 'Питання / консультація',
};

function parseOptionalNumber(value?: string | null): number | undefined {
  if (!value || !String(value).trim()) return undefined;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : undefined;
}

const DEAL_NAME_MAX = 100;

function truncate(value: string, max: number): string {
  const normalized = value.replace(/\s+/g, ' ').trim();
  if (normalized.length <= max) return normalized;
  return `${normalized.slice(0, Math.max(0, max - 1))}…`;
}

function buildDealName(payload: CrmLeadPayload): string {
  const label = payload.title || SOURCE_LABELS[payload.source];
  const who = payload.name?.trim() || payload.phone?.trim() || '';
  return truncate(who ? `${label}: ${who}` : label, DEAL_NAME_MAX);
}

function buildDetailsText(payload: CrmLeadPayload): string {
  const lines: string[] = [];

  if (payload.name) lines.push(`Ім'я: ${payload.name}`);
  if (payload.phone) lines.push(`Телефон: ${payload.phone}`);
  if (payload.email) lines.push(`Email: ${payload.email}`);
  if (payload.brand) lines.push(`Марка: ${payload.brand}`);
  if (payload.model) lines.push(`Модель: ${payload.model}`);
  if (payload.year) lines.push(`Рік: ${payload.year}`);

  if (payload.details) {
    for (const [key, value] of Object.entries(payload.details)) {
      if (value === undefined || value === null || value === '') continue;
      lines.push(`${key}: ${value}`);
    }
  }

  return lines.join(' | ');
}

function buildCustomFields(payload: CrmLeadPayload): Array<{
  fieldId: number;
  value: string;
}> {
  const fields: Array<{ fieldId: number; value: string }> = [];

  const brandId = parseOptionalNumber(process.env.SMARTCRM_FIELD_BRAND_ID);
  const modelId = parseOptionalNumber(process.env.SMARTCRM_FIELD_MODEL_ID);
  const yearId = parseOptionalNumber(process.env.SMARTCRM_FIELD_YEAR_ID);
  const utmFieldId = parseOptionalNumber(process.env.SMARTCRM_FIELD_UTM_ID);

  if (brandId && payload.brand?.trim()) {
    fields.push({ fieldId: brandId, value: payload.brand.trim() });
  }
  if (modelId && payload.model?.trim()) {
    fields.push({ fieldId: modelId, value: payload.model.trim() });
  }
  if (yearId && payload.year?.trim()) {
    fields.push({ fieldId: yearId, value: payload.year.trim() });
  }
  if (utmFieldId) {
    fields.push({ fieldId: utmFieldId, value: 'website' });
  }

  return fields;
}

export async function createSmartCrmDeal(payload: CrmLeadPayload) {
  const key = process.env.SMARTCRM_KEY?.trim();
  const secret = process.env.SMARTCRM_SECRET?.trim();
  const configuredUrl = process.env.SMARTCRM_API_URL?.trim();
  const apiUrl = (() => {
    if (!configuredUrl) {
      return 'https://api.binotel.com/api/4.0/smartcrm/deal-create.json';
    }
    if (configuredUrl.includes('deal-create')) return configuredUrl;
    return `${configuredUrl.replace(/\/$/, '')}/deal-create.json`;
  })();

  if (!key || !secret) {
    throw new Error(
      'SmartCRM credentials are missing (SMARTCRM_KEY / SMARTCRM_SECRET).'
    );
  }

  if (!payload.phone?.trim() && !payload.email?.trim()) {
    throw new Error('Phone or email is required for SmartCRM lead.');
  }

  const pipelineId = parseOptionalNumber(process.env.SMARTCRM_PIPELINE_ID);
  if (!pipelineId) {
    throw new Error('SmartCRM pipelineId is missing. Set SMARTCRM_PIPELINE_ID.');
  }

  const stageId = parseOptionalNumber(process.env.SMARTCRM_STAGE_ID);
  const assignedToId = parseOptionalNumber(process.env.SMARTCRM_ASSIGNED_TO_ID);
  const detailsText = buildDetailsText(payload);
  const customFields = buildCustomFields(payload);

  const body: Record<string, unknown> = {
    key,
    secret,
    pipelineId,
    name: buildDealName(payload),
    customerDraft: {
      ...(payload.name ? { name: payload.name } : {}),
      ...(payload.phone ? { number: payload.phone } : {}),
      ...(payload.email ? { email: payload.email } : {}),
    },
    utm: {
      ...payload.utm,
      // Always mark leads from the site (all forms)
      source: 'website',
      medium: 'website',
      campaign: payload.utm?.campaign || payload.source,
      content:
        payload.utm?.content ||
        (detailsText ? truncate(detailsText, 250) : undefined),
    },
  };

  if (stageId !== undefined) body.stageId = stageId;
  if (assignedToId !== undefined) body.assignedToId = assignedToId;
  if (customFields.length > 0) body.fields = customFields;

  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  const text = await response.text();
  let data: any = null;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = { raw: text };
  }

  const apiFailed =
    !response.ok ||
    data?.status === 'error' ||
    (typeof data?.code === 'number' && data.code !== 0);

  if (apiFailed) {
    const error = new Error(
      data?.message ||
        `SmartCRM deal-create failed with status ${response.status}`
    ) as Error & { status?: number; data?: unknown };
    error.status = response.ok ? 422 : response.status;
    error.data = data;
    throw error;
  }

  return data;
}
