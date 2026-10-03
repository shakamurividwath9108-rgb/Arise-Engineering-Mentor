/* Adds channel-specific, topic-matched lecture and notes links to each language lesson. */
(function(){
  'use strict';
  const root=document.getElementById('language-topics');
  if(!root)return;
  const groups={
    c:[['Apna College · full C lesson','https://www.youtube.com/watch?v=irqbmMNs2Bo'],['CodeWithHarry · full C course','https://www.youtube.com/watch?v=aZb0iu4uGwA'],['Jacob Sorber · C playlists','https://www.youtube.com/@JacobSorber/playlists'] ],
    cpp:[['Apna College · C++ DSA playlist','https://www.youtube.com/playlist?list=PLfqMhTWNBTe137I_EPQd34TsgV6IO55pt'],['CodeWithHarry · C++ playlist','https://www.youtube.com/playlist?list=PLu0W_9lII9agpFUAlPFe_VNSlXW5uE0YL'],['Take U Forward · playlists','https://www.youtube.com/@takeUforward/playlists']],
    python:[['Corey Schafer · playlists','https://www.youtube.com/@coreyms/playlists'],['Codebasics · Python playlists','https://www.youtube.com/@codebasics/playlists'],['Tech With Tim · playlists','https://www.youtube.com/@TechWithTim/playlists']],
    java:[['Apna College · playlists','https://www.youtube.com/@ApnaCollegeOfficial/playlists'],['CodeWithHarry · playlists','https://www.youtube.com/@CodeWithHarry/playlists'],['Neso Academy · playlists','https://www.youtube.com/@nesoacademy/playlists']],
    javascript:[['Traversy Media · playlists','https://www.youtube.com/@TraversyMedia/playlists'],['The Net Ninja · playlists','https://www.youtube.com/@NetNinja/playlists'],['Web Dev Simplified · playlists','https://www.youtube.com/@WebDevSimplified/playlists']],
    sql:[['techTFQ · SQL playlists','https://www.youtube.com/@techTFQ/playlists'],['Ankit Bansal · SQL playlists','https://www.youtube.com/@AnkitBansal/playlists'],['Alex The Analyst · playlists','https://www.youtube.com/@AlexTheAnalyst/playlists']]
  };
  const notes={c:['CodeWithHarry C notes','https://www.codewithharry.com/notes'],cpp:['LearnCpp reference','https://www.learncpp.com/'],python:['Python official tutorial','https://docs.python.org/3/tutorial/'],java:['Dev.java learning path','https://dev.java/learn/'],javascript:['MDN JavaScript guide','https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide'],sql:['PostgreSQL SQL tutorial','https://www.postgresql.org/docs/current/tutorial.html']};
  const extraNotes={c:['cppreference · C language','https://en.cppreference.com/w/c'],cpp:['cppreference · C++ language','https://en.cppreference.com/w/cpp'],python:['Python practice tutorial','https://www.learnpython.org/'],java:['Oracle Java tutorials','https://docs.oracle.com/javase/tutorial/'],javascript:['JavaScript.info tutorial','https://javascript.info/'],sql:['SQLBolt interactive lessons','https://sqlbolt.com/']};
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
      const links=(groups[lang]||[]).map(function(item){return '<a href="'+esc(item[1])+'" target="_blank" rel="noopener">'+esc(item[0])+' ↗</a>'});
      const chapter=lang==='c'&&Object.keys(chapters).find(function(key){return topic.toLowerCase().includes(key)});
      if(chapter)links.unshift('<a href="'+chapters[chapter]+'" target="_blank" rel="noopener">Apna College · jump to this lesson ↗</a>');
      const note=(notes[lang]||[]);
      const shelf=document.createElement('details');shelf.className='language-instructor-shelf';
      const extra=extraNotes[lang]||['CodeWithHarry notes library','https://www.codewithharry.com/notes'];
      const gfgUrl=lang==='c'?'https://www.geeksforgeeks.org/c/c-fundamental-practice-problems/':'https://www.geeksforgeeks.org/explore';
      const gfgLabel=lang==='c'?'GeeksforGeeks · C fundamentals practice':'GeeksforGeeks · DSA practice by topic';
      shelf.innerHTML='<summary>📺 More topic lectures & notes</summary><p>Open a direct lesson or the selected channel’s playlist for <b>'+esc(topic)+'</b>. Choose one explanation, then solve the practice set above.</p><div class="instructor-video-links">'+links.join('')+'</div><div class="instructor-notes-links"><small>WRITTEN NOTES / REFERENCE</small><div><a href="'+esc(note[1])+'" target="_blank" rel="noopener">'+esc(note[0])+' ↗</a><a href="'+esc(extra[1])+'" target="_blank" rel="noopener">'+esc(extra[0])+' ↗</a></div><small>PRACTICE MORE</small><div><a href="'+esc(gfgUrl)+'" target="_blank" rel="noopener">'+esc(gfgLabel)+' ↗</a></div></div>';
      const practice=card.querySelector('.language-more-practice');
      if(practice)practice.insertAdjacentElement('beforebegin',shelf);else card.appendChild(shelf);
    });
  }
  enhance();
  new MutationObserver(enhance).observe(root,{childList:true,subtree:true});
  document.getElementById('language-tabs').addEventListener('click',function(){requestAnimationFrame(enhance)});
})();
