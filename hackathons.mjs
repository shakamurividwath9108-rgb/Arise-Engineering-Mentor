import { getHackathons, jsonResponse } from '../vercel-api/feeds.mjs';

export default async function handler(request) {
  if (request.method !== 'GET') return jsonResponse({ error: 'Method not allowed.' }, 405);
  try {
    const url = new URL(request.url);
    return jsonResponse(await getHackathons(url.searchParams.get('refresh') === '1'));
  } catch (error) {
    return jsonResponse({ items: [], updatedAt: new Date().toISOString(), liveCount: 0, sourcesChecked: 0, sourceCount: 2, sourceStatus: [], note: `Live refresh failed: ${String(error?.message || 'source unavailable').slice(0, 140)}. Use organizer links to confirm current events.` }, 200);
  }
}
