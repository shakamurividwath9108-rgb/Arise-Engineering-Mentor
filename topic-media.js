/* Adds channel-specific, topic-matched lecture and notes links to each language lesson. */
(function(){
  'use strict';
  const root=document.getElementById('language-topics');
  if(!root)return;
  const groups={
    c:[['Apna College · complete C lesson','https://www.youtube.com/watch?v=irqbmMNs2Bo'],['CodeWithHarry · updated C course','https://www.youtube.com/watch?v=aZb0iu4uGwA'],['NPTEL · C lecture search','https://www.youtube.com/results?search_query=NPTEL+Problem+Solving+Through+Programming+in+C'] ],
    cpp:[['Apna College · C++ DSA playlist','https://www.youtube.com/playlist?list=PLfqMhTWNBTe137I_EPQd34TsgV6IO55pt'],['CodeWithHarry · C++ playlist','https://www.youtube.com/playlist?list=PLu0W_9lII9agpFUAlPFe_VNSlXW5uE0YL'],['GATE Wallah · topic search','https://www.youtube.com/@gatewallah_ee_ec_cs_in/search?query=']],
    python:[['CodeWithHarry · topic search','https://www.youtube.com/@CodeWithHarry/search?query='],['Apna College · topic search','https://www.youtube.com/@ApnaCollegeOfficial/search?query='],['GATE Wallah · DA topic search','https://www.youtube.com/@gatewallah_ee_ec_cs_in/search?query=']],
    java:[['Apna College · topic search','https://www.youtube.com/@ApnaCollegeOfficial/search?query='],['CodeWithHarry · topic search','https://www.youtube.com/@CodeWithHarry/search?query='],['Neso Academy · topic search','https://www.youtube.com/@nesoacademy/search?query=']],
    javascript:[['Apna College · topic search','https://www.youtube.com/@ApnaCollegeOfficial/search?query='],['CodeWithHarry · topic search','https://www.youtube.com/@CodeWithHarry/search?query='],['freeCodeCamp · topic search','https://www.youtube.com/@freecodecamp/search?query=']],
    sql:[['CodeWithHarry · topic search','https://www.youtube.com/@CodeWithHarry/search?query='],['Gate Smashers · topic search','https://www.youtube.com/@GateSmashers/search?query='],['freeCodeCamp · topic search','https://www.youtube.com/@freecodecamp/search?query=']]
  };
  const notes={c:['CodeWithHarry C notes','https://www.codewithharry.com/notes'],cpp:['LearnCpp reference','https://www.learncpp.com/'],python:['Python official tutorial','https://docs.python.org/3/tutorial/'],java:['Dev.java learning path','https://dev.java/learn/'],javascript:['MDN JavaScript guide','https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide'],sql:['PostgreSQL SQL tutorial','https://www.postgresql.org/docs/current/tutorial.html']};
  const chapters={
    'if / else':'https://www.youtube.com/watch?v=irqbmMNs2Bo&t=7275s',
    'loops':'https://www.youtube.com/watch?v=irqbmMNs2Bo&t=9936s',
    'functions':'https://www.youtube.com/watch?v=irqbmMNs2Bo&t=13894s',
    'arrays':'https://www.youtube.com/watch?v=irqbmMNs2Bo&t=22730s',
    'pointers':'https://www.youtube.com/watch?v=irqbmMNs2Bo&t=19290s'
  };
  const languageNames={c:'C',cpp:'C++',python:'Python',java:'Java',javascript:'JavaScript',sql:'SQL'};
  function esc(text){return String(text).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
  function topicQuery(language,topic){return encodeURIComponent(language+' '+topic+' programming tutorial lecture')}
  function enhance(){
    const active=document.querySelector('#language-tabs .language-tab.active');
    const lang=active&&active.dataset.language;
    const language=languageNames[lang]||'programming';
    if(!lang)return;
    root.querySelectorAll('.language-topic').forEach(function(card){
      if(card.querySelector('.language-instructor-shelf'))return;
      const heading=card.querySelector('h3');if(!heading)return;
      const topic=heading.textContent.trim(),query=topicQuery(language,topic);
      const links=(groups[lang]||[]).map(function(item){const url=item[1].endsWith('query=')?item[1]+query:item[1];return '<a href="'+esc(url)+'" target="_blank" rel="noopener">'+esc(item[0])+' ↗</a>'});
      links.push('<a href="https://www.youtube.com/results?search_query='+query+'" target="_blank" rel="noopener">More lecture options ↗</a>');
      const chapter=lang==='c'&&Object.keys(chapters).find(function(key){return topic.toLowerCase().includes(key)});
      if(chapter)links.unshift('<a href="'+chapters[chapter]+'" target="_blank" rel="noopener">Apna College · jump to this lesson ↗</a>');
      const note=(notes[lang]||[]);
      const shelf=document.createElement('details');shelf.className='language-instructor-shelf';
      shelf.innerHTML='<summary>📺 More topic lectures & notes</summary><p>These links open the named channel’s results for <b>'+esc(topic)+'</b>. Choose one explanation, then solve the practice set above.</p><div class="instructor-video-links">'+links.join('')+'</div><div class="instructor-notes-links"><small>WRITTEN NOTES / REFERENCE</small><div><a href="'+esc(note[1])+'" target="_blank" rel="noopener">'+esc(note[0])+' ↗</a><a href="https://www.codewithharry.com/notes" target="_blank" rel="noopener">CodeWithHarry notes library ↗</a></div></div>';
      const practice=card.querySelector('.language-more-practice');
      if(practice)practice.insertAdjacentElement('beforebegin',shelf);else card.appendChild(shelf);
    });
  }
  enhance();
  new MutationObserver(enhance).observe(root,{childList:true,subtree:true});
  document.getElementById('language-tabs').addEventListener('click',function(){requestAnimationFrame(enhance)});
})();
