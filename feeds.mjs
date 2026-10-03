const cache = new Map();
const UA = 'ARISE Engineering Mentor/1.0 (+https://vercel.com)';

export function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store', 'x-content-type-options': 'nosniff' }
  });
}

async function fetchText(url, timeout = 10000) {
  const response = await fetch(url, {
    signal: AbortSignal.timeout(timeout),
    headers: { 'user-agent': UA, accept: 'application/json, application/atom+xml, application/rss+xml, text/html;q=0.9, */*;q=0.8' }
  });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return response.text();
}

function decode(value = '') {
  return String(value).replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1').replace(/<[^>]+>/g, ' ')
    .replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;|&apos;/g, "'")
    .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&#(\d+);/g, (_, n) => String.fromCharCode(+n))
    .replace(/&#x([\da-f]+);/gi, (_, n) => String.fromCharCode(parseInt(n, 16))).replace(/\s+/g, ' ').trim();
}

function parseFeed(xml, source, category) {
  const entries = xml.match(/<(?:item|entry)\b[\s\S]*?<\/(?:item|entry)>/gi) || [];
  return entries.slice(0, 18).map(item => {
    const title = decode((item.match(/<title[^>]*>([\s\S]*?)<\/title>/i) || [])[1] || '');
    const rawLink = (item.match(/<link[^>]*>([\s\S]*?)<\/link>/i) || [])[1] || (item.match(/<link[^>]*href=["']([^"']+)/i) || [])[1] || '';
    const rawDesc = (item.match(/<(?:description|summary|content:encoded)[^>]*>([\s\S]*?)<\/(?:description|summary|content:encoded)>/i) || [])[1] || '';
    const rawDate = (item.match(/<(?:pubDate|published|updated|dc:date)[^>]*>([\s\S]*?)<\/(?:pubDate|published|updated|dc:date)>/i) || [])[1] || '';
    const url = decode(rawLink);
    return { title, url: url.startsWith('/') ? '' : url, summary: decode(rawDesc).slice(0, 330), published: decode(rawDate).slice(0, 80), source, category };
  }).filter(item => item.title && /^https:\/\//i.test(item.url));
}

function todayIST() {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Kolkata', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date());
}

function parseDevpost(raw) {
  const data = JSON.parse(raw), today = todayIST();
  return (Array.isArray(data.hackathons) ? data.hackathons : []).map(item => {
    const dates = String(item.submission_period_dates || '');
    const match = dates.match(/\b(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+\d{1,2},?\s+\d{4}\b/gi) || [];
    const endDate = match.length ? new Date(match.at(-1)).toISOString().slice(0, 10) : '';
    const url = String(item.url || '');
    const themes = (item.themes || []).map(theme => theme.name).filter(Boolean);
    return {
      id: `devpost-${item.id}`, sourceId: 'devpost', source: 'Devpost · live hackathons', title: item.title || 'Devpost hackathon',
      summary: [item.organization_name, item.displayed_location?.location, themes.join(' · ')].filter(Boolean).join(' · ') || 'Open the organizer page for current eligibility and event details.',
      deadline: dates ? `Submission period · ${dates}` : 'Check organizer deadline',
      dateLabel: endDate ? new Date(`${endDate}T00:00:00`).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }).toUpperCase() : 'OPEN',
      endDate: endDate || undefined, url, openState: item.open_state
    };
  }).filter(item => /^https:\/\//i.test(item.url) && (!item.endDate || item.endDate >= today) && item.openState !== 'ended')
    .map(({ openState, ...item }) => item);
}

function parseUnstop(html) {
  const cards = html.match(/<a href="\/hackathons\/[^\"]+"\s+class="single_profile">[\s\S]*?<\/a>/gi) || [];
  const today = todayIST();
  return cards.map(card => {
    const relative = decode(card).match(/(\d+)\s+days?\s+left/i);
    const title = decode((card.match(/<amp-img[^>]*alt="([^"]+)"/i) || [])[1] || '').trim();
    const path = (card.match(/href="([^"]+)"/i) || [])[1] || '';
    const days = relative ? Number(relative[1]) : null;
    const endDate = days === null ? '' : new Date(Date.parse(`${today}T00:00:00+05:30`) + days * 86400000).toISOString().slice(0, 10);
    return {
      id: `unstop-${path.split('/').filter(Boolean).at(-1)}`, sourceId: 'unstop', source: 'Unstop · live hackathons', title,
      summary: decode(card).slice(0, 260) || 'Open the organizer listing for theme, eligibility and event details.',
      deadline: days === null ? 'Open organizer page for current application deadline' : `Listing shows ${days} days left · confirm on organizer page`,
      dateLabel: days === null ? 'OPEN' : `${days}D LEFT`, endDate: endDate || undefined, url: `https://unstop.com${path}`
    };
  }).filter(item => item.title && /^https:\/\/unstop\.com\//i.test(item.url) && (!item.endDate || item.endDate >= today));
}

export async function getHackathons(force = false) {
  const saved = cache.get('hackathons');
  if (!force && saved && Date.now() - saved.at < 15 * 60_000) return saved.value;
  const sources = [
    ['https://devpost.com/api/hackathons?per_page=100&page=1', 'Devpost · live hackathons', parseDevpost],
    ['https://unstop.com/hackathons/amp', 'Unstop · live hackathons', parseUnstop]
  ];
  const results = await Promise.allSettled(sources.map(async ([url, , parse]) => parse(await fetchText(url, 15000))));
  const items = results.flatMap(result => result.status === 'fulfilled' ? result.value : []);
  const unique = [...new Map(items.map(item => [item.id, item])).values()].sort((a, b) => (a.endDate || '9999-99-99').localeCompare(b.endDate || '9999-99-99'));
  const sourceStatus = results.map((result, i) => ({ source: sources[i][1], ok: result.status === 'fulfilled', items: result.status === 'fulfilled' ? result.value.length : 0, error: result.status === 'rejected' ? String(result.reason?.message || 'Fetch failed').slice(0, 120) : undefined }));
  const value = { items: unique, updatedAt: new Date().toISOString(), verifiedAt: todayIST(), sourcesChecked: sourceStatus.filter(item => item.ok).length, sourceCount: sources.length, liveCount: unique.length, sourceStatus, note: unique.length ? `${unique.length} current listings loaded from Devpost and Unstop. Confirm eligibility and deadlines on the organizer page.` : 'No live cards returned. Use the organizer directories for current listings.' };
  cache.set('hackathons', { at: Date.now(), value });
  return value;
}

const feeds = [
  ['https://export.arxiv.org/rss/cs.AI', 'arXiv · AI', 'ai'],
  ['https://export.arxiv.org/rss/cs.LG', 'arXiv · Machine Learning', 'ai'],
  ['https://export.arxiv.org/rss/stat.ML', 'arXiv · Statistics & ML', 'data'],
  ['https://github.blog/feed/', 'GitHub Blog', 'engineering'],
  ['https://huggingface.co/blog/feed.xml', 'Hugging Face', 'ai'],
  ['https://dev.to/feed/tag/ai', 'Dev.to · AI community', 'community'],
  ['https://dev.to/feed/tag/data', 'Dev.to · data community', 'community']
];
const taxonomy = [
  ['Python', /\bpython\b/i], ['TypeScript', /\btypescript\b/i], ['JavaScript', /\bjavascript\b|\bnode(?:\.js)?\b/i], ['React', /\breact(?:\.js)?\b/i],
  ['SQL & databases', /\bsql\b|postgres|mysql|database/i], ['Cloud (AWS/Azure/GCP)', /\baws\b|amazon web services|\bazure\b|\bgcp\b|google cloud/i],
  ['Docker & containers', /\bdocker\b|containeri[sz]/i], ['Kubernetes', /\bkubernetes\b|\bk8s\b/i], ['Go', /\bgolang\b/i], ['Rust', /\brust\b/i], ['C++', /\bc\+\+\b/i], ['Java', /\bjava\b/i],
  ['AI / LLM engineering', /\bai\b|\bllm\b|large language|machine learning|generative ai/i], ['Data engineering', /data engineer|data pipeline|apache spark|\bdbt\b/i],
  ['MLOps & model deployment', /mlops|model deployment|model serving|inference/i], ['RAG & retrieval', /\brag\b|retrieval augmented|vector search/i], ['AI agents', /\bagents?\b|agentic/i]
];

async function getMarket() {
  const raw = JSON.parse(await fetchText('https://remoteok.com/api', 12000));
  const now = Date.now();
  const jobs = (Array.isArray(raw) ? raw : []).filter(job => job?.position && job.url && job.date && now - Date.parse(job.date) < 45 * 86400000 && Date.parse(job.date) <= now);
  const skills = taxonomy.map(([name, pattern]) => {
    const hits = jobs.filter(job => pattern.test(`${(job.tags || []).join(' ')} ${job.position || ''}`));
    return { name, count: hits.length, jobs: hits.slice(0, 2).map(job => ({ title: job.position, company: job.company || '', date: job.date, url: job.url, location: job.location || 'Remote' })) };
  }).filter(skill => skill.count).sort((a, b) => b.count - a.count);
  return { source: 'RemoteOK public global-remote listings', locationScope: 'Global remote sample · not an India-wide census', jobsSampled: jobs.length, updatedAt: new Date().toISOString(), skills };
}

export async function getSignals(force = false) {
  const saved = cache.get('signals');
  if (!force && saved && Date.now() - saved.at < 10 * 60_000) return saved.value;
  const results = await Promise.allSettled(feeds.map(async ([url, source, category]) => parseFeed(await fetchText(url), source, category)));
  const sourceStatus = results.map((result, i) => ({ source: feeds[i][1], ok: result.status === 'fulfilled', items: result.status === 'fulfilled' ? result.value.length : 0, error: result.status === 'rejected' ? String(result.reason?.message || 'Feed unavailable').slice(0, 120) : undefined }));
  let items = results.flatMap(result => result.status === 'fulfilled' ? result.value : []);
  const queries = [['artificial intelligence', 'AI'], ['data science', 'Data science']];
  const discussions = await Promise.allSettled(queries.map(async ([query, label]) => {
    const response = await fetch(`https://hn.algolia.com/api/v1/search_by_date?query=${encodeURIComponent(query)}&tags=story&hitsPerPage=8`, { signal: AbortSignal.timeout(8000) });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    return (data.hits || []).map(hit => ({ title: hit.title || hit.story_title, url: hit.url || hit.story_url, summary: `Community discussion about ${label} on Hacker News.`, published: hit.created_at, source: 'Hacker News · community', category: 'community' })).filter(item => item.title && /^https:\/\//i.test(item.url || ''));
  }));
  items = items.concat(discussions.flatMap(result => result.status === 'fulfilled' ? result.value : []));
  discussions.forEach((result, i) => sourceStatus.push({ source: `Hacker News · ${queries[i][1]}`, ok: result.status === 'fulfilled', items: result.status === 'fulfilled' ? result.value.length : 0, error: result.status === 'rejected' ? String(result.reason?.message || 'Feed unavailable').slice(0, 120) : undefined }));
  const [marketResult] = await Promise.allSettled([getMarket()]);
  const market = marketResult.status === 'fulfilled' ? marketResult.value : { source: 'RemoteOK public global-remote listings', locationScope: 'Global remote sample · not an India-wide census', jobsSampled: 0, updatedAt: new Date().toISOString(), skills: [], error: 'Job trend refresh unavailable.' };
  items.sort((a, b) => String(b.published).localeCompare(String(a.published)));
  const value = { items: items.slice(0, 70), updatedAt: new Date().toISOString(), sourcesSucceeded: sourceStatus.filter(item => item.ok).length, sourceCount: sourceStatus.length, sourceStatus, market };
  cache.set('signals', { at: Date.now(), value });
  return value;
}

const aliases = { complexity: ['implementation', 'math'], sorting: ['binary search', 'sortings'], hashing: ['strings', 'hashing'], trees: ['dfs and similar', 'trees'], graphs: ['dfs and similar', 'graphs'], shortest: ['shortest paths', 'graphs'], dp: ['dp'], discrete: ['combinatorics', 'math'], interview: ['implementation', 'greedy'] };
export async function getProblems(topic) {
  const tags = aliases[topic] || [];
  if (!tags.length) return [];
  const saved = cache.get('codeforces');
  let problems = saved?.value;
  if (!problems || Date.now() - saved.at > 30 * 60_000) {
    const response = await fetch('https://codeforces.com/api/problemset.problems', { signal: AbortSignal.timeout(12000), headers: { 'user-agent': 'ARISE student problem suggestions' } });
    if (!response.ok) throw new Error('Codeforces is unavailable right now.');
    const data = await response.json();
    if (data.status !== 'OK') throw new Error('Codeforces could not return problems.');
    problems = data.result.problems;
    cache.set('codeforces', { at: Date.now(), value: problems });
  }
  const overlaps = problem => (problem.tags || []).filter(tag => tags.includes(tag.toLowerCase())).length;
  return problems.filter(problem => problem.contestId && problem.index && problem.rating >= 800 && problem.rating <= 1500 && overlaps(problem) > 0)
    .sort((a, b) => a.rating - b.rating).slice(0, 25)
    .map(problem => ({ name: `${problem.contestId}${problem.index} · ${problem.name}`, rating: problem.rating, tags: problem.tags, url: `https://codeforces.com/problemset/problem/${problem.contestId}/${problem.index}` }));
}
