import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';
import { randomInt, randomUUID } from 'node:crypto';

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = process.env.ARISE_DATA_DIR || path.join(ROOT, '.arise-data');
const PORT = Number(process.env.PORT || 3000);
const HOST = process.env.HOST || '0.0.0.0';
const DATA_SOURCE = await fs.readFile(path.join(ROOT, 'data.js'), 'utf8');
const sandbox = { window: {} };
vm.runInNewContext(DATA_SOURCE, sandbox, { timeout: 1000 });
const APP = sandbox.window.ORBIT_DATA;
await fs.mkdir(DATA_DIR, { recursive: true });

let rooms = {};
try { rooms = JSON.parse(await fs.readFile(path.join(DATA_DIR, 'rooms.json'), 'utf8')); } catch {}
const streams = new Map();
const cache = new Map();
const mime = { '.html':'text/html; charset=utf-8', '.css':'text/css; charset=utf-8', '.js':'text/javascript; charset=utf-8', '.mjs':'text/javascript; charset=utf-8', '.svg':'image/svg+xml', '.webmanifest':'application/manifest+json', '.json':'application/json; charset=utf-8', '.png':'image/png', '.ico':'image/x-icon' };

function json(res, status, data) {
  res.writeHead(status, { 'Content-Type':'application/json; charset=utf-8', 'Cache-Control':'no-store', 'X-Content-Type-Options':'nosniff' });
  res.end(JSON.stringify(data));
}
async function body(req) {
  let raw = '';
  for await (const chunk of req) { raw += chunk; if (raw.length > 100_000) { const error = new Error('Request is too large.'); error.statusCode = 413; throw error; } }
  try { return raw ? JSON.parse(raw) : {}; } catch { const error = new Error('Request body must be JSON.'); error.statusCode = 400; throw error; }
}
function persistRooms() {
  const file = path.join(DATA_DIR, 'rooms.json');
  const temp = file + '.tmp';
  return fs.writeFile(temp, JSON.stringify(rooms, null, 2)).then(() => fs.rename(temp, file));
}
function newRoomCode() { return randomInt(0, 36 ** 6).toString(36).toUpperCase().padStart(6, '0'); }
function clean(value, max=500) { return String(value ?? '').replace(/[<>\u0000-\u001f]/g, ' ').trim().slice(0, max); }
function roomState(room) { return { code:room.code, title:room.title, created:room.created, members:Object.values(room.members), tasks:room.tasks, messages:room.messages.slice(-100), notes:room.notes }; }
function emit(code) {
  const room = rooms[code]; if (!room) return;
  const payload = `data: ${JSON.stringify(roomState(room))}\n\n`;
  for (const res of streams.get(code) || []) { try { res.write(payload); } catch {} }
}
function sendEvent(code, type, payload) {
  const clients = streams.get(code) || [];
  for (const res of clients) { try { res.write(`event: ${type}\ndata: ${JSON.stringify(payload)}\n\n`); } catch {} }
}

const hackathonSnapshot = [
  { id:'blackbox-03', sourceId:'unstop', source:'Unstop · verified 25 Sep 2026', title:'The Black-Box Protocol: Stage 03 — System Convergence', summary:'36-hour engineering challenge. Unstop listing showed registration due 28 Sep and event dates 6–7 Oct 2026 when checked on 25 Sep.', deadline:'Registration · 28 Sep 2026', registrationDeadline:'2026-09-28', dateLabel:'6–7 OCT', startDate:'2026-10-06', endDate:'2026-10-07', url:'https://unstop.com/hackathons/the-black-box-protocol-stage-03-system-convergence-techhelp4u-1745778/' },
    { id:'build-for-billions', sourceId:'unstop', source:'Unstop · verified 25 Sep 2026', title:'Build for Billions · NITK Surathkal', summary:'Unstop listing showed the hackathon starting 26 Sep 2026. Open the organizer listing to confirm registration and participation details.', deadline:'Starts · 26 Sep 2026', dateLabel:'26–27 SEP', startDate:'2026-09-26', endDate:'2026-09-27', url:'https://api.unstop.com/hackathons/build-for-billions-nitk-surathkal-1754386' },
  ...APP.hackSources.map(x => ({ id:x.id, sourceId:x.id, source:x.name+' · live listing', title:x.name+' hackathons and builder events', summary:x.hint+' — open the organizer page for current deadlines and eligibility.', deadline:'Check live organizer listing', dateLabel:'OPEN', url:x.url }))
];

let liveHackathonCache=null;
function plainText(s=''){return decode(s.replace(/<script[\s\S]*?<\/script>/gi,' ').replace(/<style[\s\S]*?<\/style>/gi,' '))}
function todayInIndia(){return new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Kolkata',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date())}
function parseDevpostApi(raw,sourceLabel){const data=JSON.parse(raw),today=todayInIndia(),records=Array.isArray(data.hackathons)?data.hackathons:[];return records.map(x=>{const dates=String(x.submission_period_dates||''),matches=dates.match(/\b(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+\d{1,2},?\s+\d{4}\b/gi)||[],dateText=matches.at(-1)||'',endDate=dateText?new Date(dateText).toISOString().slice(0,10):'',url=String(x.url||''),themes=(x.themes||[]).map(t=>t.name).filter(Boolean),location=x.displayed_location?.location||'',prize=plainText(x.prize_amount||'');return{id:'devpost-'+x.id,sourceId:'devpost',source:sourceLabel,title:x.title||'Devpost hackathon',summary:[x.organization_name,location,prize&&'Prize '+prize,themes.join(' · ')].filter(Boolean).join(' · ')||'Open the organizer page for current eligibility and event details.',deadline:dates?'Submission period · '+dates:'Check organizer deadline',dateLabel:endDate?new Date(endDate+'T00:00:00').toLocaleDateString('en-IN',{day:'numeric',month:'short'}).toUpperCase():'OPEN',endDate:endDate||undefined,url,openState:x.open_state}}).filter(x=>/^https:\/\//i.test(x.url)&&(!x.endDate||x.endDate>=today)&&x.openState!=='ended').map(({openState,...x})=>x)}
function parseUnstopAmp(html,sourceLabel){const cards=html.match(/<a href="\/hackathons\/[^\"]+"\s+class="single_profile">[\s\S]*?<\/a>/gi)||[],today=todayInIndia(),out=[];for(const card of cards){const url=(card.match(/href="([^\"]+)"/i)||[])[1]||'',alt=(card.match(/<amp-img[^>]*alt="([^\"]+)"/i)||[])[1]||'',plain=plainText(card),title=decode(alt).trim(),relative=plain.match(/(\d+)\s+days?\s+left/i),days=relative?Number(relative[1]):null,deadline=days===null?'Open organizer page for current application deadline':'Listing shows '+days+' day'+(days===1?'':'s')+' left · confirm on organizer page',endDate=days===null?'':new Date(Date.parse(today+'T00:00:00+05:30')+days*86400000).toISOString().slice(0,10);if(!title||!url)continue;out.push({id:'unstop-'+url.split('/').filter(Boolean).at(-1),sourceId:'unstop',source:sourceLabel,title,summary:plain.slice(0,260)||'Open the organizer listing for theme, eligibility and event details.',deadline,dateLabel:days===null?'OPEN':days+'D LEFT',endDate:endDate||undefined,url:'https://unstop.com'+url})}return out.filter(x=>!x.endDate||x.endDate>=today)}
async function getLiveHackathons(force=false){
  if(!force&&liveHackathonCache&&Date.now()-liveHackathonCache.at<3*60*60_000)return liveHackathonCache.value;
  const today=todayInIndia(),base=hackathonSnapshot.filter(x=>(!x.registrationDeadline||x.registrationDeadline>=today)&&(!x.endDate||x.endDate>=today)),tasks=[['https://devpost.com/api/hackathons?per_page=100&page=1','Devpost · live hackathons',parseDevpostApi],['https://unstop.com/hackathons/amp','Unstop · live hackathons',parseUnstopAmp]];
  const results=await Promise.allSettled(tasks.map(async([url,label,parse])=>parse(await fetchText(url,15000),label)));
  const live=results.flatMap(x=>x.status==='fulfilled'?x.value:[]),byId=new Map();for(const x of base.concat(live))byId.set(x.id,x);
  const items=Array.from(byId.values()).filter(x=>(!x.registrationDeadline||x.registrationDeadline>=today)&&(!x.endDate||x.endDate>=today)).sort((a,b)=>(a.endDate||'9999-99-99').localeCompare(b.endDate||'9999-99-99'));
  const sourceStatus=results.map((r,i)=>({source:tasks[i][1],ok:r.status==='fulfilled',items:r.status==='fulfilled'?r.value.length:0,error:r.status==='rejected'?String(r.reason?.message||'Fetch failed').slice(0,140):undefined}));
  const value={items,updatedAt:new Date().toISOString(),verifiedAt:today,sourcesChecked:sourceStatus.filter(x=>x.ok).length,sourceCount:sourceStatus.length,liveCount:live.length,sourceStatus,note:live.length?live.length+' current listings loaded from Devpost and Unstop. Check each organizer page for eligibility and deadlines.':'Refresh returned no current event cards; linked Devpost, Devfolio, MLH and Unstop directories remain available.'};
  liveHackathonCache={at:Date.now(),value};return value;
}
async function fetchText(url, ms=9000) {
  const controller = new AbortController(); const timer = setTimeout(() => controller.abort(), ms);
  try { const r = await fetch(url, { signal:controller.signal, headers:{ 'User-Agent':'ARISE Student Learning Companion/1.0', 'Accept':'application/rss+xml, application/atom+xml, application/json, text/html;q=0.9, */*;q=0.8', 'Cache-Control':'no-cache', 'Pragma':'no-cache' } }); if (!r.ok) throw new Error(`HTTP ${r.status}`); return await r.text(); }
  finally { clearTimeout(timer); }
}
function decode(s='') { return s.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g,'$1').replace(/<[^>]+>/g,' ').replace(/&amp;/g,'&').replace(/&quot;/g,'"').replace(/&#39;|&apos;/g,"'").replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&#(\d+);/g,(_,n)=>String.fromCharCode(+n)).replace(/&#x([\da-f]+);/gi,(_,n)=>String.fromCharCode(parseInt(n,16))).replace(/\s+/g,' ').trim(); }
function parseFeed(xml, source, category) {
  const entries = xml.match(/<(?:item|entry)\b[\s\S]*?<\/(?:item|entry)>/gi) || [];
  return entries.slice(0,18).map(item => {
    const title=decode((item.match(/<title[^>]*>([\s\S]*?)<\/title>/i)||[])[1]||'');
    const rawLink=(item.match(/<link[^>]*>([\s\S]*?)<\/link>/i)||[])[1] || (item.match(/<link[^>]*href=["']([^"']+)/i)||[])[1] || '';
    const rawDesc=(item.match(/<(?:description|summary|content:encoded)[^>]*>([\s\S]*?)<\/(?:description|summary|content:encoded)>/i)||[])[1]||'';
    const rawDate=(item.match(/<(?:pubDate|published|updated|dc:date)[^>]*>([\s\S]*?)<\/(?:pubDate|published|updated|dc:date)>/i)||[])[1]||'';
    let url=decode(rawLink); if(url.startsWith('/')) url='';
    return { title, url, summary:decode(rawDesc).slice(0,330), published:decode(rawDate).slice(0,80), source, category };
  }).filter(x=>x.title&&/^https?:\/\//i.test(x.url));
}
async function getRemoteSkillMarket(force=false){const cached=cache.get('jobs');if(!force&&cached&&Date.now()-cached.at<6*60*60_000)return cached.value;const raw=JSON.parse(await fetchText('https://remoteok.com/api',12000)),now=Date.now(),jobs=(Array.isArray(raw)?raw:[]).filter(x=>x&&x.position&&x.url&&x.date&&now-Date.parse(x.date)<45*86400000&&Date.parse(x.date)<=now);const taxonomy=[['Python',/\bpython\b/i],['TypeScript',/\btypescript\b/i],['JavaScript',/\bjavascript\b|\bnode(?:\.js)?\b/i],['React',/\breact(?:\.js)?\b/i],['SQL & databases',/\bsql\b|postgres|mysql|database/i],['Cloud (AWS/Azure/GCP)',/\baws\b|amazon web services|\bazure\b|\bgcp\b|google cloud/i],['Docker & containers',/\bdocker\b|containeri[sz]/i],['Kubernetes',/\bkubernetes\b|\bk8s\b/i],['Go',/\bgolang\b|\bgo\b/i],['Rust',/\brust\b/i],['C++',/\bc\+\+\b/i],['Java',/\bjava\b/i],['AI / LLM engineering',/\bai\b|\bllm\b|large language|machine learning|generative ai/i],['Data engineering',/data engineer|data pipeline|apache spark|\bdbt\b/i],['MLOps & model deployment',/mlops|model deployment|model serving|inference/i],['RAG & retrieval',/\brag\b|retrieval augmented|vector search/i],['AI agents',/\bagents?\b|agentic/i]];const skills=taxonomy.map(([name,re])=>{const hits=jobs.filter(j=>{const tags=(j.tags||[]).join(' '),title=j.position||'',combined=tags+' '+title;return re.test(combined)});return {name,count:hits.length,jobs:hits.slice(0,2).map(j=>({title:j.position,company:j.company||'',date:j.date,url:j.url,location:j.location||'Remote'}))}}).filter(x=>x.count>0).sort((a,b)=>b.count-a.count);const value={source:'RemoteOK public global-remote listings',locationScope:'Global remote sample · not an India-wide census',jobsSampled:jobs.length,updatedAt:new Date().toISOString(),skills};cache.set('jobs',{at:Date.now(),value});return value}
async function getSignals(force=false) {
  const key='signals',cached=cache.get(key);if(!force&&cached&&Date.now()-cached.at<20*60_000)return cached.value;
  const feeds=[
    ['https://export.arxiv.org/rss/cs.AI','arXiv · AI','ai'],
    ['https://export.arxiv.org/rss/cs.LG','arXiv · Machine Learning','ai'],
    ['https://export.arxiv.org/rss/stat.ML','arXiv · Statistics & ML','data'],
    ['https://github.blog/feed/','GitHub Blog','engineering'],
    ['https://huggingface.co/blog/feed.xml','Hugging Face','ai'],
    ['https://dev.to/feed/tag/ai','Dev.to · AI community','community'],
    ['https://dev.to/feed/tag/data','Dev.to · data community','community']
  ];
  const results=await Promise.allSettled(feeds.map(async([url,source,category])=>parseFeed(await fetchText(url),source,category)));
  const sourceStatus=results.map((r,i)=>({source:feeds[i][1],ok:r.status==='fulfilled',items:r.status==='fulfilled'?r.value.length:0,error:r.status==='rejected'?String(r.reason?.message||'Feed unavailable').slice(0,140):undefined}));
  let items=results.flatMap(x=>x.status==='fulfilled'?x.value:[]),market=null;
  try{market=await getRemoteSkillMarket(force)}catch(e){market={source:'RemoteOK public global-remote listings',locationScope:'Global remote sample · not an India-wide census',jobsSampled:0,updatedAt:new Date().toISOString(),skills:[],error:'Job listing refresh unavailable; other research and community feeds may still refresh.'}}
  const queries=[['artificial intelligence','AI'],['data science','Data science']];
  const discussions=await Promise.allSettled(queries.map(async([query,label])=>{const hn=await fetch('https://hn.algolia.com/api/v1/search_by_date?query='+encodeURIComponent(query)+'&tags=story&hitsPerPage=8',{signal:AbortSignal.timeout(8000),headers:{'Cache-Control':'no-cache'}});if(!hn.ok)throw new Error('HTTP '+hn.status);const d=await hn.json();return(d.hits||[]).map(x=>({title:x.title||x.story_title,url:x.url||x.story_url,summary:'Community discussion about '+label+' on Hacker News.',published:x.created_at,source:'Hacker News · community',category:'community'})).filter(x=>x.title&&x.url)}));
  items=items.concat(discussions.flatMap(x=>x.status==='fulfilled'?x.value:[]));
  for(let i=0;i<discussions.length;i++)sourceStatus.push({source:'Hacker News · '+queries[i][1],ok:discussions[i].status==='fulfilled',items:discussions[i].status==='fulfilled'?discussions[i].value.length:0,error:discussions[i].status==='rejected'?String(discussions[i].reason?.message||'Feed unavailable').slice(0,140):undefined});
  items=items.sort((a,b)=>String(b.published).localeCompare(String(a.published))).slice(0,70);
  const value={items,updatedAt:new Date().toISOString(),sourcesSucceeded:sourceStatus.filter(x=>x.ok).length,sourceCount:sourceStatus.length,sourceStatus,market};cache.set(key,{at:Date.now(),value});return value;
}
async function getCodeforces(topic) {
  const key='codeforces';let data=cache.get(key);if(!data||Date.now()-data.at>30*60_000){const raw=await fetch('https://codeforces.com/api/problemset.problems',{signal:AbortSignal.timeout(12000),headers:{'User-Agent':'ARISE student problem suggestions'}});if(!raw.ok)throw new Error('Codeforces is unavailable right now.');const d=await raw.json();if(d.status!=='OK')throw new Error('Codeforces could not return problems.');data={at:Date.now(),value:d.result.problems};cache.set(key,data)}
  const aliases={complexity:['implementation','math'],sorting:['binary search','sortings'],hashing:['strings','hashing'],trees:['dfs and similar','trees'],graphs:['dfs and similar','graphs'],shortest:['shortest paths','graphs'],dp:['dp'],discrete:['combinatorics','math'],interview:['implementation','greedy']};const tags=aliases[topic]||[];if(!tags.length)return [];
  const overlap=p=>(p.tags||[]).filter(t=>tags.includes(t.toLowerCase())).length;
  return data.value.filter(p=>p.contestId&&p.index&&p.rating>=800&&p.rating<=1500&&overlap(p)>0).sort((a,b)=>(a.rating||9999)-(b.rating||9999)).slice(0,25).map(p=>({name:`${p.contestId}${p.index} · ${p.name}`,rating:p.rating,tags:p.tags,url:`https://codeforces.com/problemset/problem/${p.contestId}/${p.index}`}));
}

const server = http.createServer(async (req,res) => {
  try {
    const url=new URL(req.url,'http://localhost');const pathname=decodeURIComponent(url.pathname);
    if(pathname.startsWith('/api/')){
      if(pathname==='/api/health'&&req.method==='GET')return json(res,200,{ok:true,app:'ARISE',appVersion:25,deployment:'local',roomBackend:'local-file',persistenceConfigured:true,time:new Date().toISOString()});
      if(pathname==='/api/hackathons'&&req.method==='GET'){
        try{return json(res,200,await getLiveHackathons(url.searchParams.get('refresh')==='1'))}catch(e){const today=todayInIndia(),items=hackathonSnapshot.filter(x=>!x.endDate||x.endDate>=today);return json(res,200,{items,updatedAt:new Date().toISOString(),verifiedAt:today,sourcesChecked:0,liveCount:0,sourceStatus:[{source:'Devpost · live AI/data listings',ok:false,items:0,error:String(e?.message||'Refresh failed').slice(0,140)}],note:'Live refresh failed; showing only the saved snapshot and organizer directories.'})}
      }
      if(pathname==='/api/signals'&&req.method==='GET')return json(res,200,await getSignals(url.searchParams.get('refresh')==='1'));
      if(pathname==='/api/problems'&&req.method==='GET'){
        try{return json(res,200,{problems:await getCodeforces(url.searchParams.get('topic')||'')})}catch(e){return json(res,502,{error:e.message})}
      }
      if(pathname==='/api/rooms'&&req.method==='POST'){
        const b=await body(req);const title=clean(b.title,60),name=clean(b.name,32);if(!title||!name)return json(res,400,{error:'Add your name and a room name.'});let code='';do{code=newRoomCode()}while(rooms[code]);rooms[code]={code,title,created:new Date().toISOString(),members:{[name.toLowerCase()]:{name,points:0}},tasks:[],messages:[{id:randomUUID(),name:'ARISE',text:`${name} opened ${title}. Say hello!`,at:new Date().toISOString()}],notes:''};await persistRooms();return json(res,201,{code});
      }
      const match=pathname.match(/^\/api\/rooms\/([A-Z0-9]+)(?:\/(join|messages|tasks|notes|events))?(?:\/([A-Za-z0-9_-]+))?$/i);
      if(match){const code=match[1].toUpperCase(),action=match[2],id=match[3],room=rooms[code];if(!room)return json(res,404,{error:'That room code was not found. Ask your friend to check it.'});
        if(action==='events'&&req.method==='GET'){
          res.writeHead(200,{'Content-Type':'text/event-stream; charset=utf-8','Cache-Control':'no-cache, no-transform','Connection':'keep-alive','X-Accel-Buffering':'no'});res.write(`data: ${JSON.stringify(roomState(room))}\n\n`);if(!streams.has(code))streams.set(code,new Set());streams.get(code).add(res);const ping=setInterval(()=>{try{res.write(': ping\n\n')}catch{}},20_000);req.on('close',()=>{clearInterval(ping);streams.get(code)?.delete(res)});return;
        }
        if(action==='join'&&req.method==='POST'){const b=await body(req),name=clean(b.name,32);if(!name)return json(res,400,{error:'Add a display name.'});const key=name.toLowerCase();room.members[key]=room.members[key]||{name,points:0};room.updated=new Date().toISOString();await persistRooms();emit(code);sendEvent(code,'presence',{name});return json(res,200,roomState(room));}
        if(action==='messages'&&req.method==='POST'){const b=await body(req),name=clean(b.name,32)||'Learner',text=clean(b.text,500);if(!text)return json(res,400,{error:'Message is empty.'});room.messages.push({id:randomUUID(),name,text,at:new Date().toISOString()});room.messages=room.messages.slice(-100);await persistRooms();emit(code);return json(res,201,{ok:true});}
        if(action==='tasks'&&req.method==='POST'){const b=await body(req),title=clean(b.title,120),name=clean(b.name,32)||'Learner';if(!title)return json(res,400,{error:'Task is empty.'});room.tasks.push({id:randomUUID(),title,by:name,done:false,points:0});await persistRooms();emit(code);return json(res,201,{ok:true});}
        if(action==='tasks'&&id&&req.method==='PATCH'){const b=await body(req),task=room.tasks.find(x=>x.id===id),name=clean(b.name,32)||'Learner';if(!task)return json(res,404,{error:'Task no longer exists.'});if(Boolean(task.done)!==Boolean(b.done)){task.done=Boolean(b.done);task.points=task.done?10:0;const member=room.members[name.toLowerCase()]||(room.members[name.toLowerCase()]={name,points:0});member.points=Math.max(0,(member.points||0)+(task.done?10:-10));}await persistRooms();emit(code);return json(res,200,{ok:true});}
        if(action==='notes'&&req.method==='PUT'){const b=await body(req);room.notes=clean(b.notes,12000);await persistRooms();emit(code);return json(res,200,{ok:true});}
        if(!action&&req.method==='GET')return json(res,200,roomState(room));
      }
      return json(res,404,{error:'API route not found.'});
    }
    let relative=pathname==='/'?'index.html':pathname.replace(/^\/+/, '');if(relative.split(/[\\/]/).some(part=>part.startsWith('.')))return json(res,404,{error:'Not found'});const resolved=path.resolve(ROOT,relative);if(!resolved.startsWith(ROOT+path.sep)&&resolved!==ROOT)return json(res,403,{error:'Forbidden'});
    let content;try{content=await fs.readFile(resolved)}catch{return json(res,404,{error:'Not found'});}const ext=path.extname(resolved).toLowerCase(),revalidate=['.html','.js','.mjs','.css','.webmanifest'].includes(ext);res.writeHead(200,{'Content-Type':mime[ext]||'application/octet-stream','Cache-Control':revalidate?'no-cache':'public, max-age=3600','X-Content-Type-Options':'nosniff','Referrer-Policy':'strict-origin-when-cross-origin'});res.end(content);
  }catch(e){if(!res.headersSent)json(res,e?.statusCode||500,{error:e?.message||'Unexpected server error.'});else res.end();}
});
server.listen(PORT,HOST,()=>console.log(`ARISE is running at http://localhost:${PORT} (LAN: http://<your-computer-ip>:${PORT})`));
