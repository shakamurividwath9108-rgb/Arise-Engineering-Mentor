/* ARISE action coach: review-first task cards and live-search provider routing. */
(function () {
  'use strict';

  var form = document.getElementById('assistant-form');
  var messages = document.getElementById('assistant-messages');
  var input = form && form.elements.prompt;
  var replay = false;
  if (!form || !messages || !input) return;

  function esc(value) {
    return String(value).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function say(text, role) {
    var node = document.createElement('div');
    node.className = 'assistant-message ' + (role === 'user' ? 'user-message' : 'bot-message');
    node.textContent = text;
    messages.appendChild(node);
    messages.scrollTop = messages.scrollHeight;
    return node;
  }

  function showCard(title, description, content) {
    var node = document.createElement('div');
    node.className = 'assistant-message bot-message';
    node.innerHTML = '<section class="mentor-action-card"><div class="mentor-action-card-head"><span>' + esc(title) + '</span><small>REVIEW BEFORE APPLYING</small></div>' +
      '<p>' + esc(description) + '</p>' + content + '<div class="mentor-action-result" aria-live="polite"></div></section>';
    messages.appendChild(node);
    messages.scrollTop = messages.scrollHeight;
    return node;
  }

  function localDate() {
    var d = new Date();
    return [d.getFullYear(), String(d.getMonth() + 1).padStart(2, '0'), String(d.getDate()).padStart(2, '0')].join('-');
  }

  function detectNote(q) {
    if (!/\b(create|make|save|write|capture)\b/i.test(q) || !/\bnote\b/i.test(q)) return null;
    var named = q.match(/\b(?:titled|called)\s+["“]?([^"”\n:]+)["”]?/i);
    var bodyMatch = q.match(/(?:\b(?:content|body)\s*[:=]|\n|\s+-\s+)([\s\S]+)$/i);
    var about = q.match(/\bnote\s+(?:on|about|for)\s+(.+?)(?:\s*[:\n]|$)/i);
    var title = named ? named[1].trim() : about ? about[1].trim() : 'Study note';
    if (title.length > 100) title = title.slice(0, 100);
    var content = bodyMatch ? bodyMatch[1].trim() : '';
    return { title: title, content: content };
  }

  function detectPlanner(q) {
    if (!/\b(timetable|time\s*table|schedule\s+my\s+day|plan\s+my\s+day)\b/i.test(q)) return null;
    var match = q.match(/(?:timetable|time\s*table|schedule\s+my\s+day|plan\s+my\s+day)\s*(?:for\s+today)?\s*[:\-]\s*([\s\S]+)$/i);
    var raw = match ? match[1].trim() : '';
    var lines = raw ? raw.split(/[;\n]+/).map(function (line) { return line.trim(); }).filter(Boolean) : [];
    if (lines.length === 1 && !lines[0].includes('|')) {
      lines = lines[0].split(/,|\s+and\s+/i).map(function (line) { return line.trim(); }).filter(Boolean);
    }
    lines = lines.map(function (line) {
      return line.includes('|') ? line : line + ' | 45 | medium';
    });
    return { lines: lines };
  }

  function detectRoom(q) {
    if (!/\b(create|start|make)\b/i.test(q) || !/\b(study room|room for studying|study group)\b/i.test(q)) return null;
    var named = q.match(/\b(?:called|named)\s+["“]?([^"”\n]+)["”]?/i);
    return { title: named ? named[1].trim().slice(0, 58) : '' };
  }

  function detectSharedTask(q) {
    var match = q.match(/^(?:please\s+)?(?:add|create)\s+(?:a\s+)?(?:shared\s+)?task\s*[:\-]?\s*(.+)$/i);
    return match ? match[1].trim().slice(0, 120) : '';
  }

  var destinations = [
    [/^(?:open|go to|take me to|show me)\s+.*\b(home|dashboard)\b/i, 'home', 'Home'],
    [/^(?:open|go to|take me to|show me)\s+.*\b(planner|timetable|schedule)\b/i, 'planner', 'Study planner'],
    [/^(?:open|go to|take me to|show me)\s+.*\b(notes?|journal)\b/i, 'notes', 'Notes & journal'],
    [/^(?:open|go to|take me to|show me)\s+.*\b(progress|cgpa|tracker)\b/i, 'progress', 'Progress trackers'],
    [/^(?:open|go to|take me to|show me)\s+.*\b(rooms?|friends|team)\b/i, 'rooms', 'Study rooms'],
    [/^(?:open|go to|take me to|show me)\s+.*\b(resources?|library|lectures?)\b/i, 'resources', 'Resource library'],
    [/^(?:open|go to|take me to|show me)\s+.*\b(hackathons?|events?)\b/i, 'hackathons', 'Hackathon radar'],
    [/^(?:open|go to|take me to|show me)\s+.*\b(gate|gate da)\b/i, 'gate', 'GATE DA hub'],
    [/^(?:open|go to|take me to|show me)\s+.*\b(coding|code practice|programming)\b/i, 'coding', 'Coding lab'],
    [/^(?:open|go to|take me to|show me)\s+.*\b(roadmap|career path)\b/i, 'career', 'Career roadmap'],
    [/^(?:open|go to|take me to|show me)\s+.*\b(college|exams?|vardhaman)\b/i, 'college', 'College & exams'],
    [/^(?:open|go to|take me to|show me)\s+.*\bsudoku\b/i, 'sudoku', 'Sudoku dojo']
  ];

  function taskIntent(q) {
    var note = detectNote(q);
    if (note) return { type: 'note', value: note };
    var planner = detectPlanner(q);
    if (planner) return { type: 'planner', value: planner };
    var room = detectRoom(q);
    if (room) return { type: 'room', value: room };
    var sharedTask = detectSharedTask(q);
    if (sharedTask) return { type: 'room-task', value: sharedTask };
    for (var i = 0; i < destinations.length; i += 1) {
      if (destinations[i][0].test(q)) return { type: 'navigate', value: { view: destinations[i][1], name: destinations[i][2] } };
    }
    return null;
  }

  function reviewCard(q) {
    var intent = taskIntent(q);
    if (!intent) return false;
    say(q, 'user');
    if (intent.type === 'note') {
      var content = '<label>Title<input maxlength="120" data-coach-note-title value="' + esc(intent.value.title) + '"></label>' +
        '<label>Collection tag<select data-coach-note-tag><option>General</option><option>College</option><option>DSA</option><option>AI &amp; DS</option><option>Project</option><option>Career</option><option>Research</option></select></label>' +
        '<label>Note content<textarea rows="5" data-coach-note-body placeholder="Add your explanation, example, or questions…">' + esc(intent.value.content) + '</textarea></label>' +
        '<div class="mentor-action-buttons"><button type="button" class="button button-accent" data-coach-apply="note">Save note</button><button type="button" class="text-button" data-coach-cancel>Cancel</button></div>';
      showCard('📝 Note draft', 'Check or edit this draft. ARISE saves it on this device only after you choose Save.', content);
    } else if (intent.type === 'planner') {
      var tasks = intent.value.lines.join('\n');
      var content = '<label>Subjects &amp; tasks<textarea rows="5" data-coach-planner-tasks placeholder="One per line: C if/else | 45 | high">' + esc(tasks) + '</textarea></label>' +
        '<div class="mentor-action-fields"><label>Date<input type="date" data-coach-planner-date value="' + localDate() + '"></label><label>Start<input type="time" data-coach-planner-start value="09:00"></label><label>Finish<input type="time" data-coach-planner-end value="20:00"></label></div>' +
        '<small class="mentor-action-note">ARISE checks the available time and places focused blocks around breaks. Existing classes and sessions are preserved.</small>' +
        '<div class="mentor-action-buttons"><button type="button" class="button button-accent" data-coach-apply="planner">Build timetable</button><button type="button" class="text-button" data-coach-cancel>Cancel</button></div>';
      showCard('🗓️ Timetable draft', 'Review the subjects, date and available hours before adding this plan to your day.', content);
    } else if (intent.type === 'room') {
      var content = '<label>Your display name<input maxlength="32" data-coach-room-name placeholder="Name friends will see"></label>' +
        '<label>Room name<input maxlength="60" data-coach-room-title placeholder="e.g. Graphs &amp; Coffee" value="' + esc(intent.value.title) + '"></label>' +
        '<div class="mentor-action-note">Creating the room makes an invite code and shared chat. It is created only when you press Create room.</div>' +
        '<div class="mentor-action-buttons"><button type="button" class="button button-accent" data-coach-apply="room">Create room</button><button type="button" class="text-button" data-coach-cancel>Cancel</button></div>';
      showCard('👥 Study room preview', 'Confirm the room name and display name. You can copy the invite code to friends after it opens.', content);
    } else if (intent.type === 'room-task') {
      var activeRoom = document.getElementById('room-workspace');
      if (activeRoom && !activeRoom.classList.contains('hidden')) {
        var content = '<label>Shared task<input maxlength="120" data-coach-room-task value="' + esc(intent.value) + '"></label>' +
          '<div class="mentor-action-buttons"><button type="button" class="button button-accent" data-coach-apply="room-task">Add to sprint board</button><button type="button" class="text-button" data-coach-cancel>Cancel</button></div>';
        showCard('✅ Shared task preview', 'Check the wording. The task will appear for everyone in this room after you add it.', content);
      } else {
        showCard('💬 Join a room first', 'Open Study rooms and join with your invite code. Then ask ARISE to add the task to that room’s sprint board.', '<div class="mentor-action-buttons"><button type="button" class="button button-accent" data-coach-go="rooms">Open study rooms</button><button type="button" class="text-button" data-coach-cancel>Cancel</button></div>');
      }
    } else {
      showCard('🧭 ' + intent.value.name, 'I found the right place in ARISE. Open it now?', '<div class="mentor-action-buttons"><button type="button" class="button button-accent" data-coach-go="' + esc(intent.value.view) + '">Open ' + esc(intent.value.name) + '</button><button type="button" class="text-button" data-coach-cancel>Cancel</button></div>');
    }
    var status = document.getElementById('assistant-status');
    if (status) status.textContent = 'Review the action before applying';
    return true;
  }

  function activeCard(button) { return button.closest('.mentor-action-card'); }
  function result(card, text) {
    var node = card && card.querySelector('.mentor-action-result');
    if (node) node.textContent = text;
  }
  function waitFor(selector, attempts) {
    return new Promise(function (resolve, reject) {
      var count = 0;
      var timer = window.setInterval(function () {
        var node = document.querySelector(selector);
        if (node) { window.clearInterval(timer); resolve(node); }
        else if (++count > (attempts || 40)) { window.clearInterval(timer); reject(new Error('ARISE did not open the requested form.')); }
      }, 75);
    });
  }
  function openView(name) {
    var button = document.querySelector('.nav-item[data-view="' + name + '"]');
    if (button) button.click();
  }

  async function applyNote(button) {
    var card = activeCard(button);
    var title = card.querySelector('[data-coach-note-title]').value.trim();
    var body = card.querySelector('[data-coach-note-body]').value;
    var tag = card.querySelector('[data-coach-note-tag]').value;
    if (!title) { result(card, 'Add a title before saving.'); return; }
    button.disabled = true;
    button.textContent = 'Saving…';
    try {
      openView('notes');
      await new Promise(function (resolve) { window.setTimeout(resolve, 180); });
      var previousCount = document.querySelectorAll('#notes-list [data-note-id]').length;
      (await waitFor('#new-note')).click();
      await new Promise(function (resolve, reject) {
        var checks = 0;
        var timer = window.setInterval(function () {
          if (document.querySelectorAll('#notes-list [data-note-id]').length > previousCount) { window.clearInterval(timer); resolve(); }
          else if (++checks > 50) { window.clearInterval(timer); reject(new Error('The new note did not finish saving.')); }
        }, 80);
      });
      var editor = await waitFor('#note-edit-form');
      editor.querySelector('[name="title"]').value = title;
      editor.querySelector('[name="content"]').value = body;
      editor.querySelector('[name="tag"]').value = tag;
      editor.dispatchEvent(new Event('input', { bubbles: true }));
      await new Promise(function (resolve) { window.setTimeout(resolve, 650); });
      button.textContent = '✅ Saved to Notes';
      result(card, 'Saved locally. Open Notes & journal to keep editing it.');
    } catch (error) {
      button.disabled = false;
      button.textContent = 'Save note';
      result(card, error.message);
    }
  }

  async function applyPlanner(button) {
    var card = activeCard(button);
    var tasks = card.querySelector('[data-coach-planner-tasks]').value.trim();
    if (!tasks) { result(card, 'Add at least one task, one per line.'); return; }
    var date = card.querySelector('[data-coach-planner-date]').value || localDate();
    var start = card.querySelector('[data-coach-planner-start]').value;
    var end = card.querySelector('[data-coach-planner-end]').value;
    if (!start || !end || end <= start) { result(card, 'Choose an end time later than the start time.'); return; }
    button.disabled = true;
    button.textContent = 'Checking available time…';
    try {
      openView('planner');
      var planner = await waitFor('#timetable-form');
      document.getElementById('timetable-tasks').value = tasks;
      document.getElementById('timetable-date').value = date;
      document.getElementById('timetable-start').value = start;
      document.getElementById('timetable-end').value = end;
      planner.requestSubmit();
      await new Promise(function (resolve) { window.setTimeout(resolve, 100); });
      button.textContent = '✅ Timetable built';
      result(card, document.getElementById('timetable-feedback').textContent || 'Timetable added to your Study planner.');
    } catch (error) {
      button.disabled = false;
      button.textContent = 'Build timetable';
      result(card, error.message);
    }
  }

  async function applyRoom(button) {
    var card = activeCard(button);
    var name = card.querySelector('[data-coach-room-name]').value.trim();
    var title = card.querySelector('[data-coach-room-title]').value.trim();
    if (!name || !title) { result(card, 'Add your display name and a room name.'); return; }
    button.disabled = true;
    button.textContent = 'Creating…';
    openView('rooms');
    var nameField = document.querySelector('#create-room-form input[name="name"]');
    var titleField = document.querySelector('#create-room-form input[name="title"]');
    if (!nameField || !titleField) { result(card, 'Open Study rooms and try again.'); button.disabled = false; return; }
    nameField.value = name;
    titleField.value = title;
    document.getElementById('create-room-form').requestSubmit();
    try {
      await waitFor('#room-workspace:not(.hidden) .room-invite b', 70);
      button.textContent = '✅ Room created';
      result(card, 'Room created. Invite code: ' + document.querySelector('.room-invite b').textContent.trim());
    } catch (error) {
      button.disabled = false;
      button.textContent = 'Create room';
      result(card, 'The server did not open the room. ' + error.message);
    }
  }

  function applyRoomTask(button) {
    var card = activeCard(button);
    var value = card.querySelector('[data-coach-room-task]').value.trim();
    var input = document.querySelector('#room-task-form input[name="title"]');
    if (!value || !input) { result(card, 'Add a task and make sure you are still in the room.'); return; }
    button.disabled = true;
    input.value = value;
    document.getElementById('room-task-form').requestSubmit();
    button.textContent = '✅ Added to sprint board';
    result(card, 'The task was sent to the shared room board.');
  }

  messages.addEventListener('click', function (event) {
    var button = event.target.closest('[data-coach-apply],[data-coach-go],[data-coach-cancel]');
    if (!button) return;
    if (button.hasAttribute('data-coach-cancel')) {
      button.closest('.assistant-message').remove();
      return;
    }
    if (button.hasAttribute('data-coach-go')) {
      openView(button.dataset.coachGo);
      result(activeCard(button), 'Opened in ARISE.');
      button.disabled = true;
      return;
    }
    if (button.dataset.coachApply === 'note') applyNote(button);
    if (button.dataset.coachApply === 'planner') applyPlanner(button);
    if (button.dataset.coachApply === 'room') applyRoom(button);
    if (button.dataset.coachApply === 'room-task') applyRoomTask(button);
  });

  form.addEventListener('submit', function (event) {
    if (replay) { replay = false; return; }
    var q = input.value.trim();
    if (!q) return;
    if (reviewCard(q)) {
      event.preventDefault();
      event.stopImmediatePropagation();
      input.value = '';
      return;
    }
    if (!/\b(latest|current|today|this week|right now|trending|upcoming|deadline|breaking|newest|news|market|live|recent)\b/i.test(q)) return;
    var select = document.getElementById('assistant-provider');
    if (!select || select.value === 'openai') return;
    event.preventDefault();
    event.stopImmediatePropagation();
    var original = q;
    fetch('/api/settings/keys?provider=openai', { cache: 'no-store' }).then(function (response) {
      if (!response.ok) throw new Error('OpenAI key status unavailable');
      return response.json();
    }).then(function (data) {
      if (data.configured) {
        select.value = 'openai';
        select.dispatchEvent(new Event('change', { bubbles: true }));
        var label = document.getElementById('assistant-context-label');
        if (label) label.textContent = '🔎 Using ChatGPT web search for current facts; ARISE checks source links.';
      } else {
        say('OpenAI web search is not connected on this server, so this answer will use the selected provider and ARISE’s refreshed live feeds.', 'bot');
      }
    }).catch(function () {
      say('I could not check the web-search connector just now. ARISE will use the selected provider and its cached feed.', 'bot');
    }).finally(function () {
      input.value = original;
      replay = true;
      form.requestSubmit();
    });
  }, true);

  var intro = document.createElement('div');
  intro.className = 'mentor-workbench-hint';
  intro.innerHTML = '<b>✨ ARISE can help you act</b><span>Try “create a note titled Pointers”, “timetable: C practice | 45 | high; linear algebra | 90 | medium”, or “open study rooms”. ChatGPT can search current web pages; DeepSeek uses ARISE’s refreshed feeds. You review drafts before they’re saved.</span>';
  form.insertAdjacentElement('beforebegin', intro);
})();
