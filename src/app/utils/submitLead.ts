import type { CrmLeadPayload } from '@/app/services/smartCrm';

/**
 * Sends lead to SmartCRM via /api/crm-lead.
 */
export async function submitLead(
  payload: CrmLeadPayload
): Promise<{ ok: boolean; error?: string }> {
  try {
    const response = await fetch('/api/crm-lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const data = await response.json().catch(() => null);
      console.error('[submitLead] SmartCRM error:', data);
      return {
        ok: false,
        error: data?.error || `SmartCRM request failed (${response.status})`,
      };
    }

    return { ok: true };
  } catch (error: any) {
    console.error('[submitLead] network error:', error);
    return { ok: false, error: error?.message || 'Network error' };
  }
}
