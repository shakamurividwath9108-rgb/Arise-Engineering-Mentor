import { jsonResponse } from '../vercel-api/feeds.mjs';

export default async function handler(request) {
  if (request.method !== 'GET') return jsonResponse({ error: 'Method not allowed.' }, 405);
  return jsonResponse({
    ok: true,
    app: 'ARISE',
    appVersion: 25,
    deployment: 'vercel',
    time: new Date().toISOString(),
    features: { liveHackathons: true, engineeringSignals: true, codeforcesProblems: true, sharedStudyRooms: false },
    roomBackend: 'local-only',
    persistenceConfigured: false
  });
}
