/* ARISE difficulty overlay: translates published ratings where possible and labels local estimates honestly. */
(function(){
  'use strict';
  const cfKnown={'4/A':800,'231/A':800,'50/A':800,'339/A':800,'4/C':1300,'20/C':1600};
  const rankNames=['E','D','C','B','A','S'];
  function cfRating(title,url,label){
    const m=String(label||'').match(/\b(\d{3,4})\b/);
    if(m&&/codeforces\.com/i.test(url))return +m[1];
    const id=String(url).match(/problemset\/problem\/(\d+)\/([A-Z]\d?)/i);
    return id?cfKnown[(id[1]+'/'+id[2]).toUpperCase()]||cfKnown[id[1]+'/'+id[2].toUpperCase()]||null:null;
  }
  function rankFor(title,label,url,context,forceEstimate){
    const site=String(url).toLowerCase(),meta=String(label||'').toLowerCase(),name=String(title||'').toLowerCase(),topic=String(context||'').toLowerCase();
    const rating=cfRating(title,url,label);
    if(rating!==null){const rank=rating<=800?'E':rating<=1000?'D':rating<=1200?'C':rating<=1400?'B':rating<=1700?'A':'S';return {rank:rank,source:'Codeforces '+rating+' rating'};}
    if(/guided|course|project|research|series|open source|lesson|reference|notes/.test(meta+' '+name)&&!forceEstimate)return null;
    let rank='';
    const officialDifficulty=/hackerrank\.com|leetcode\.com|geeksforgeeks\.org/.test(site);
    const levelText=meta+' '+name;
    if(/\bexpert\b|\bvery hard\b|\badvanced\b/.test(levelText))rank='S';
    else if(/\bhard\b/.test(levelText))rank='A';
    else if(/\bmedium\b|intermediate/.test(levelText))rank='C';
    else if(/\beasy\b/.test(levelText))rank='E';
    else if(/warm.?up|starter|introductory|beginner|hello world|solve me first|fundamental|basic|simple/.test(levelText))rank='E';
    else if(/\b900\b|\b1000\b|\bdiv\s*2a\b|lightweight/.test(levelText))rank='D';
    if(!rank&&forceEstimate){
      if(/if.?else|condition|variable|input.?output|loop|fundamental|beginner|hello world/.test(topic))rank='E';
      else if(/flow|centroid|heavy.?light|suffix array|fft|advanced dp|advanced math|advanced graph|constructive|digit dp/.test(topic))rank='S';
      else if(/shortest|dynamic programming|\bdp\b|segment tree|range query|number theory/.test(topic))rank='A';
      else if(/hash|tree|graph|greedy|binary|stack|queue|recursion|backtrack/.test(topic))rank='C';
      else if(/function|array|string|search|sort|complexity/.test(topic))rank='D';
      else return null;
    }
    if(!rank)return null;
    const platform=/hackerrank\.com/.test(site)?'HackerRank':/leetcode\.com/.test(site)?'LeetCode':/geeksforgeeks\.org/.test(site)?'GeeksforGeeks':'';
    const source=officialDifficulty&&/\b(easy|medium|hard|advanced|expert)\b/.test(meta)?platform+' published difficulty label → ARISE '+rank:meta?('ARISE estimate · '+label):'ARISE estimate · topic progression';
    return {rank:rank,source:source};
  }
  function makeBadge(info){const badge=document.createElement('span');badge.className='topic-rank-badge rank-'+info.rank.toLowerCase();badge.textContent=info.rank+'-RANK';badge.title=info.source+' · E→S is ARISE’s learning scale, not the platform’s own badge';badge.setAttribute('aria-label',info.rank+' rank. '+info.source);return badge;}
  function badgeOn(link,title,label,context,force){
    if(!link||link.dataset.ariseRanked)return;
    const info=rankFor(title,label,link.href,context,force);if(!info)return;
    link.dataset.ariseRanked='true';link.dataset.ariseRank=info.rank;
    const holder=link.querySelector('.pick-platform,span')||link;
    holder.appendChild(makeBadge(info));
  }
  function addScaleNote(host){if(!host||host.querySelector('.rank-source-note'))return;const n=document.createElement('small');n.className='rank-source-note';n.textContent='ARISE rank key · E warm-up (≤800) → D foundation (801–1,000) → C steady (1,001–1,200) → B challenging (1,201–1,400) → A advanced (1,401–1,700) → S elite (>1,700) on Codeforces. HackerRank, LeetCode and GeeksforGeeks difficulty labels map to this ladder; unrated or topic-only suggestions are marked ARISE estimate. Open each platform for its current rating and rules.';host.appendChild(n)}
  function decorate(){
    document.querySelectorAll('.topic-picks .picks-heading,.language-intro,.cp-roadmap-head').forEach(addScaleNote);
    document.querySelectorAll('#topic-grid .pick-item').forEach(function(a){const card=a.closest('.topic-card');const label=a.querySelector('small');badgeOn(a,(a.querySelector('b')||{}).textContent,label&&label.textContent,card&&(card.querySelector('h3')||{}).textContent,false)});
    document.querySelectorAll('#language-topics .language-pick').forEach(function(a){const row=a.closest('.language-topic');const label=a.querySelector('span');badgeOn(a,(a.querySelector('b')||{}).textContent,label&&label.textContent,row&&(row.querySelector('h3')||{}).textContent,false)});
    document.querySelectorAll('#cp-roadmap-grid .cp-topic-row').forEach(function(row){const topic=(row.querySelector('.cp-topic-title span')||{}).textContent||'';row.querySelectorAll('.cp-topic-resources>div').forEach(function(group){const heading=(group.querySelector('small')||{}).textContent||'';if(!/PROBLEMS|PRACTICE/.test(heading.toUpperCase()))return;group.querySelectorAll('a').forEach(function(a){badgeOn(a,a.textContent,'',topic,true)});});});
    document.querySelectorAll('.cf-results a').forEach(function(a){const box=a.closest('.topic-card');badgeOn(a,a.textContent,'',box&&(box.querySelector('h3')||{}).textContent,false)});
  }
  decorate();
  const observer=new MutationObserver(decorate);
  ['topic-grid','language-topics','cp-roadmap-grid'].forEach(function(id){const el=document.getElementById(id);if(el)observer.observe(el,{childList:true,subtree:true});});
  document.addEventListener('click',function(e){if(e.target.closest('[data-select-topic],[data-language],[data-live-cf]'))setTimeout(decorate,0);});
  window.ARISE_DIFFICULTY={rankFor:rankFor,scale:rankNames,description:'E → S is an ARISE guide. Codeforces numeric ratings and labeled difficulty tiers are mapped from their platform; topic-only ranks are estimates.'};
})();
