/* Four-year skill passport: realistic sequencing with proof-of-work links. */
(function(){
  'use strict';
  const host=document.getElementById('engineering-atlas');if(!host)return;
  const plan=[
    {year:1,label:'YEAR 01 · FOUNDATION',heading:'Become fluent in the fundamentals',focus:'Keep C as your class language. Build problem-solving habits, math foundations and a visible learning routine.',items:[
      {id:'c-core',title:'C → confident problem solver',proof:'Write, trace and debug small programs; solve 40 beginner problems across input, conditions, loops, arrays and functions.',resource:'https://www.hackerrank.com/domains/c',link:'Practice C'},
      {id:'git-shell',title:'Git, GitHub and the command line',proof:'Use branches, commits and pull requests; publish clean lab work with a readable README.',resource:'https://missing.csail.mit.edu/2026/',link:'MIT tool lessons'},
      {id:'math-data',title:'Math, statistics and data literacy',proof:'Explain vectors, matrices, probability, distributions and how to spot misleading charts.',resource:'https://www.openintro.org/book/os/',link:'OpenIntro Statistics'},
      {id:'communicate-1',title:'Explain your work clearly',proof:'Write a one-page lab report and give a 3-minute explanation of one concept each month.',resource:'https://developers.google.com/tech-writing',link:'Google writing course'}
    ]},
    {year:2,label:'YEAR 02 · BUILD',heading:'Turn ideas into reliable software',focus:'Move from syntax to data structures, databases, APIs, collaborative code and small complete projects.',items:[
      {id:'dsa-core',title:'Data structures and algorithms',proof:'Study arrays, hashing, stacks, queues, trees, graphs and complexity; enter beginner contests and upsolve.',resource:'https://cses.fi/book/index.php',link:'CSES handbook'},
      {id:'sql-data',title:'SQL, data cleaning and analysis',proof:'Build a reproducible notebook or database project; document the dataset and every transformation.',resource:'https://www.kaggle.com/learn',link:'Kaggle Learn'},
      {id:'api-web',title:'Web, APIs and database design',proof:'Ship an app with a UI, API, persistent storage, input validation and a useful error state.',resource:'https://fastapi.tiangolo.com/tutorial/',link:'FastAPI tutorial'},
      {id:'team-delivery',title:'Code review, tests and team delivery',proof:'Contribute one reviewed pull request and add an automated check to a team repository.',resource:'https://docs.github.com/en/get-started/exploring-projects-on-github/contributing-to-open-source',link:'Open-source workflow'}
    ]},
    {year:3,label:'YEAR 03 · SPECIALIZE',heading:'Build depth in AI & Data Science',focus:'Choose a lane based on projects and curiosity. Learn evaluation and deployment alongside models.',items:[
      {id:'ml-evaluation',title:'Machine learning and evaluation',proof:'Compare a baseline with a stronger model; prevent leakage and explain precision, recall and failure cases.',resource:'https://developers.google.com/machine-learning/crash-course/',link:'Google ML course'},
      {id:'deep-ai',title:'Deep learning, NLP, vision and LLMs',proof:'Reproduce a small result, measure it on held-out data and explain what the model still cannot do.',resource:'https://huggingface.co/learn',link:'Hugging Face courses'},
      {id:'mlops-data',title:'Data pipelines, cloud and MLOps',proof:'Deploy a small service or pipeline; log versions, validate inputs and monitor one useful metric.',resource:'https://developers.google.com/machine-learning/crash-course/production-ml-systems/deployment-testing',link:'Production ML testing'},
      {id:'research-open',title:'Research, open source or an internship',proof:'Complete one sustained experience: a research reproduction, accepted contribution, internship or community project.',resource:'https://summerofcode.withgoogle.com/',link:'Google Summer of Code'}
    ]},
    {year:4,label:'YEAR 04 · LEAD',heading:'Prove you can deliver impact',focus:'Bring technical depth, product judgment, communication and interview readiness together in one strong body of work.',items:[
      {id:'capstone-prod',title:'Production-quality capstone',proof:'Ship a usable capstone with tests, deployment, architecture notes, an evaluation report and a 2-minute demo.',resource:'https://codelabs.developers.google.com/codelabs/cloud-run-deploy',link:'Deploy a web app'},
      {id:'advanced-cp',title:'Advanced problem solving and interviews',proof:'Keep a contest routine, review failed approaches and explain complexity and trade-offs out loud.',resource:'https://codeforces.com/contests',link:'Codeforces contests'},
      {id:'product-founder',title:'Product discovery and entrepreneurship',proof:'Talk to real users, test one risky assumption, define an MVP and pitch evidence instead of promises.',resource:'https://www.startupschool.org/',link:'Startup School'},
      {id:'portfolio-career',title:'Portfolio, communication and career launch',proof:'Publish 2–3 polished projects, a focused resume and a portfolio; practice technical and behavioral interviews.',resource:'https://docs.github.com/en/pages/quickstart',link:'Publish your portfolio'}
    ]}
  ];
  const key='arise.engineering-atlas.v1';let done={};
  try{done=JSON.parse(localStorage.getItem(key)||'{}')||{}}catch(_){done={}}
  function render(){
    const total=plan.reduce(function(n,y){return n+y.items.length},0),count=plan.reduce(function(n,y){return n+y.items.filter(function(x){return !!done[x.id]}).length},0),pct=Math.round(count/total*100);
    host.innerHTML='<div class="atlas-head"><div><span class="eyebrow">THE 2030 ENGINEER · SKILL PASSPORT</span><h2>Four years. <em>Proof over hype.</em></h2><p>Sequence the skills that compound: fundamentals → shipped software → AI depth → leadership and impact. Check a milestone when you have the evidence, not just watched a video.</p></div><div class="atlas-progress"><b>'+count+' / '+total+'</b><span>milestones · '+pct+'%</span><i><em style="width:'+pct+'%"></em></i></div></div><div class="atlas-principles"><span>✦ Fundamentals first</span><span>⌘ Build in public</span><span>◈ Evaluate honestly</span><span>↗ Communicate clearly</span></div><div class="atlas-years">'+plan.map(function(y){const n=y.items.filter(function(x){return !!done[x.id]}).length;return '<section class="atlas-year"><div class="atlas-year-head"><span>'+y.label+'</span><b>'+n+'/'+y.items.length+'</b></div><h3>'+y.heading+'</h3><p>'+y.focus+'</p><div class="atlas-milestones">'+y.items.map(function(x){return '<article class="atlas-milestone '+(done[x.id]?'is-done':'')+'"><label><input type="checkbox" data-atlas-check="'+x.id+'" '+(done[x.id]?'checked':'')+'><span class="atlas-checkmark">✓</span><b>'+x.title+'</b></label><small>'+x.proof+'</small><a href="'+x.resource+'" target="_blank" rel="noopener">'+x.link+' ↗</a></article>'}).join('')+'</div></section>'}).join('')+'</div><p class="atlas-footnote">No roadmap guarantees a salary or a hackathon win. This one makes sure your skills turn into evidence: solved problems, shipped projects, reviews, demos and clear explanations.</p>';
  }
  host.addEventListener('change',function(e){const input=e.target.closest('[data-atlas-check]');if(!input)return;done[input.dataset.atlasCheck]=input.checked;localStorage.setItem(key,JSON.stringify(done));render();});
  render();
})();
