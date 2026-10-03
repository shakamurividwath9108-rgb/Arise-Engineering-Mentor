/* Adds persistent, shared focus streaks to ARISE invite-code rooms. */
(function () {
  'use strict';

  var workspace = document.getElementById('room-workspace');
  var roomName = '';
  var busy = false;
  if (!workspace) return;

  var templates = [
    ['📚 Study squad', 'Study squad · '],
    ['⚔️ DSA arena', 'DSA arena · '],
    ['🧪 Project lab', 'Project lab · '],
    ['📝 Exam prep', 'Exam prep · ']
  ];

  function esc(value) {
    return String(value).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function todayIST() {
    var parts = new Intl.DateTimeFormat('en-CA', {
      timeZone: 'Asia/Kolkata', year: 'numeric', month: '2-digit', day: '2-digit'
    }).formatToParts(new Date());
    var values = {};
    parts.forEach(function (part) { values[part.type] = part.value; });
    return values.year + '-' + values.month + '-' + values.day;
  }

  function shiftDay(day, amount) {
    var date = new Date(day + 'T00:00:00Z');
    date.setUTCDate(date.getUTCDate() + amount);
    return date.toISOString().slice(0, 10);
  }

  function streak(days) {
    var set = new Set(days);
    var today = todayIST();
    var cursor = set.has(today) ? today : shiftDay(today, -1);
    var count = 0;
    while (set.has(cursor) && count < 3650) {
      count += 1;
      cursor = shiftDay(cursor, -1);
    }
    return count;
  }

  function dayLabel(day) {
    var date = new Date(day + 'T12:00:00+05:30');
    return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
  }

  function readTask(label) {
    var input = label.querySelector('input[data-room-task]');
    var span = label.querySelector('span');
    if (!input || !span) return null;
    var small = span.querySelector('small');
    var title = '';
    span.childNodes.forEach(function (node) {
      if (node.nodeType === Node.TEXT_NODE) title += node.textContent;
    });
    return {
      id: input.getAttribute('data-room-task'),
      done: input.checked,
      title: title.trim(),
      by: small ? small.textContent.replace(/^by\s*/i, '').trim() : ''
    };
  }

  function currentCode() {
    var node = workspace.querySelector('.room-invite b');
    return node ? node.textContent.trim().toUpperCase() : '';
  }

  function getRoomTasks() {
    return Array.from(workspace.querySelectorAll('.room-task')).map(readTask).filter(Boolean);
  }

  function focusCheckins(tasks) {
    return tasks.filter(function (task) {
      return task.done && /^🏁 DAILY STUDY · \d{4}-\d\d-\d\d$/.test(task.title);
    }).map(function (task) {
      return { by: task.by, date: task.title.slice(-10) };
    });
  }

  function checkinButtonLabel(records) {
    var today = todayIST();
    var ours = records.some(function (record) {
      return record.date === today && record.by.toLowerCase() === roomName.toLowerCase();
    });
    if (ours) return { text: '✅ Checked in today', disabled: true };
    return { text: '🏁 I studied 25+ minutes', disabled: busy };
  }

  function showPromptRow() {
    var form = workspace.querySelector('#room-message-form');
    if (!form || form.previousElementSibling?.classList.contains('room-prompt-row')) return;
    var row = document.createElement('div');
    row.className = 'room-prompt-row';
    row.setAttribute('aria-label', 'Conversation starters');
    row.innerHTML = '<button type="button" data-room-prompt="What did you make progress on today? 🌱">🌱 Share a win</button>' +
      '<button type="button" data-room-prompt="I am stuck on… can someone give me a hint? 🆘">🆘 Ask for a hint</button>' +
      '<button type="button" data-room-prompt="Useful resource for the group: ">🔗 Share a link</button>';
    form.parentNode.insertBefore(row, form);
  }

  function decorate() {
    if (workspace.classList.contains('hidden') || !workspace.querySelector('.room-topbar')) return;
    var tasks = getRoomTasks();
    var checkinTasks = tasks.filter(function (task) {
      return /^🏁 DAILY STUDY · \d{4}-\d\d-\d\d$/.test(task.title);
    });
    var records = focusCheckins(tasks);
    var teamDays = Array.from(new Set(records.map(function (item) { return item.date; })));
    var teamStreak = streak(teamDays);
    var myDays = records.filter(function (item) {
      return item.by.toLowerCase() === roomName.toLowerCase();
    }).map(function (item) { return item.date; });
    var myStreak = streak(myDays);
    var normalTasks = tasks.filter(function (task) {
      return !/^🏁 DAILY STUDY · /.test(task.title);
    });
    var done = normalTasks.filter(function (task) { return task.done; }).length;
    var bar = workspace.querySelector('.room-spark-strip');
    if (!bar) {
      bar = document.createElement('section');
      bar.className = 'room-spark-strip';
      bar.setAttribute('aria-label', 'Room streaks and daily check-in');
      workspace.querySelector('.room-topbar').insertAdjacentElement('afterend', bar);
    }
    var action = checkinButtonLabel(records);
    var status = teamStreak >= 30 ? '👑 Legendary month' : teamStreak >= 7 ? '⚡ One-week streak' : teamStreak >= 3 ? '🔥 On a roll' : teamStreak ? '🌱 Keep it growing' : '✨ Start a new streak';
    var recent = records.slice().sort(function (a, b) { return b.date.localeCompare(a.date); }).slice(0, 5);
    var barHtml = '<div class="room-spark-main"><div class="room-spark-copy"><span class="room-spark-label">THE PARTY STREAK</span><b>🔥 ' + teamStreak + ' day' + (teamStreak === 1 ? '' : 's') + '</b><small>' + status + ' · one check-in keeps the team chain alive</small></div>' +
      '<div class="room-spark-copy room-spark-personal"><span class="room-spark-label">YOUR STREAK</span><b>⚡ ' + myStreak + ' day' + (myStreak === 1 ? '' : 's') + '</b><small>One honest 25-minute focus session per day</small></div>' +
      '<div class="room-spark-copy room-spark-sprint"><span class="room-spark-label">SPRINT BOARD</span><b>🎯 ' + done + ' / ' + normalTasks.length + '</b><small>shared tasks complete</small></div>' +
      '<button class="room-checkin-button" type="button" data-room-checkin ' + (action.disabled || busy ? 'disabled' : '') + '>' + esc(busy ? '⏳ Saving your win…' : action.text) + '</button></div>' +
      '<div class="room-spark-history"><span>🏅 Recent focus wins</span>' + (recent.length ? recent.map(function (item) {
        return '<small><b>' + esc(item.by) + '</b> · ' + esc(dayLabel(item.date)) + '</small>';
      }).join('') : '<small>Your group’s first check-in starts the streak.</small>') + '</div>';
    if (bar.dataset.signature !== barHtml) { bar.innerHTML = barHtml; bar.dataset.signature = barHtml; }

    checkinTasks.forEach(function (task) {
      var input = workspace.querySelector('[data-room-task="' + CSS.escape(task.id) + '"]');
      var label = input && input.closest('.room-task');
      if (label) {
        label.classList.add('room-checkin-entry');
        label.setAttribute('aria-hidden', 'true');
      }
    });

    var leaderboard = workspace.querySelector('.room-leaderboard');
    if (leaderboard) {
      Array.from(leaderboard.querySelectorAll(':scope > div')).forEach(function (row) {
        var name = row.querySelector('span')?.textContent.replace(/^\d+\.\s*/, '').trim() || '';
        var memberDays = records.filter(function (item) { return item.by.toLowerCase() === name.toLowerCase(); }).map(function (item) { return item.date; });
        var memberStreak = streak(memberDays);
        var value = String(memberStreak);
        var badge = row.querySelector('.room-member-streak');
        if (!badge) {
          badge = document.createElement('small');
          badge.className = 'room-member-streak';
          row.appendChild(badge);
        }
        if (badge.dataset.days !== value) {
          badge.dataset.days = value;
          badge.textContent = '🔥 ' + value + 'd';
        }
      });
    }
    showPromptRow();
  }

  async function saveCheckin(button) {
    if (busy) return;
    var code = currentCode();
    var name = roomName.trim();
    if (!code || !name) {
      button.textContent = 'Join again to check in';
      return;
    }
    var date = todayIST();
    var title = '🏁 DAILY STUDY · ' + date;
    var base = '/api/rooms/' + encodeURIComponent(code);
    busy = true;
    decorate();
    try {
      var response = await fetch(base, { cache: 'no-store' });
      var room = await response.json();
      if (!response.ok) throw new Error(room.error || 'Could not load room.');
      var existing = (room.tasks || []).find(function (task) {
        return task.title === title && String(task.by || '').toLowerCase() === name.toLowerCase();
      });
      if (!existing) {
        response = await fetch(base + '/tasks', {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: name, title: title })
        });
        var created = await response.json();
        if (!response.ok) throw new Error(created.error || 'Could not save check-in.');
        response = await fetch(base, { cache: 'no-store' });
        room = await response.json();
        existing = (room.tasks || []).find(function (task) {
          return task.title === title && String(task.by || '').toLowerCase() === name.toLowerCase();
        });
      }
      if (existing && !existing.done) {
        response = await fetch(base + '/tasks/' + encodeURIComponent(existing.id), {
          method: 'PATCH', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: name, done: true })
        });
        var saved = await response.json();
        if (!response.ok) throw new Error(saved.error || 'Could not finish check-in.');
      }
      button.textContent = '🎉 Today’s win is saved!';
    } catch (error) {
      button.textContent = 'Try check-in again';
      button.title = error.message || 'Room server is unavailable.';
    } finally {
      busy = false;
      window.setTimeout(decorate, 350);
    }
  }

  document.addEventListener('submit', function (event) {
    var form = event.target;
    if ((form.id === 'create-room-form' || form.id === 'join-room-form') && form.elements.name) {
      roomName = String(form.elements.name.value || '').trim().slice(0, 32);
    }
  }, true);

  document.addEventListener('click', function (event) {
    var template = event.target.closest('[data-room-template]');
    if (template) {
      var title = document.querySelector('#create-room-form input[name="title"]');
      if (title) {
        title.value = template.dataset.roomTemplate;
        title.focus();
      }
      document.querySelectorAll('[data-room-template]').forEach(function (button) {
        button.classList.toggle('selected', button === template);
      });
      return;
    }
    var prompt = event.target.closest('[data-room-prompt]');
    if (prompt) {
      var input = workspace.querySelector('#room-message-form input[name="text"]');
      if (input) {
        input.value = prompt.dataset.roomPrompt;
        input.focus();
      }
      return;
    }
    var checkin = event.target.closest('[data-room-checkin]');
    if (checkin) saveCheckin(checkin);
  });

  function addRoomTemplates() {
    var form = document.getElementById('create-room-form');
    if (!form || form.querySelector('.room-template-choices')) return;
    var chooser = document.createElement('div');
    chooser.className = 'room-template-choices';
    chooser.innerHTML = '<span>Pick a room vibe</span><div>' + templates.map(function (item, index) {
      return '<button type="button" data-room-template="' + esc(item[1]) + '" class="' + (!index ? 'selected' : '') + '">' + esc(item[0]) + '</button>';
    }).join('') + '</div>';
    var title = form.querySelector('input[name="title"]');
    if (title) form.insertBefore(chooser, title);
  }

  addRoomTemplates();
  new MutationObserver(decorate).observe(workspace, { childList: true, subtree: true });
  decorate();
})();
