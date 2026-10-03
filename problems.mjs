import { getProblems, jsonResponse } from '../vercel-api/feeds.mjs';

export default async function handler(request) {
  if (request.method !== 'GET') return jsonResponse({ error: 'Method not allowed.' }, 405);
  const topic = new URL(request.url).searchParams.get('topic') || '';
  try {
    return jsonResponse({ problems: await getProblems(topic) });
  } catch (error) {
    return jsonResponse({ error: String(error?.message || 'Could not load current Codeforces problems.').slice(0, 180) }, 502);
  }
}
