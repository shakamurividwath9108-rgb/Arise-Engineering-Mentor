import { getSignals, jsonResponse } from '../vercel-api/feeds.mjs';

export default async function handler(request) {
  if (request.method !== 'GET') return jsonResponse({ error: 'Method not allowed.' }, 405);
  try {
    const url = new URL(request.url);
    return jsonResponse(await getSignals(url.searchParams.get('refresh') === '1'));
  } catch (error) {
    return jsonResponse({ items: [], updatedAt: new Date().toISOString(), sourcesSucceeded: 0, sourceCount: 0, sourceStatus: [], market: { skills: [], error: String(error?.message || 'Feed refresh failed').slice(0, 140) } }, 200);
  }
}
