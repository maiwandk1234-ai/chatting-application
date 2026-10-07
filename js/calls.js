// WhatsApp Calls & Calling Overlay Logic

let activeCallInterval = null;
let callDurationSeconds = 0;
let isMicMuted = false;
let isCameraOff = false;

function initCallsModule() {
  const callOverlay = document.getElementById('call-overlay-modal');
  const endCallBtn = document.getElementById('call-end-btn');
  const micToggleBtn = document.getElementById('call-mic-btn');
  const cameraToggleBtn = document.getElementById('call-camera-btn');

  // Header call buttons
  const headerVoiceCallBtn = document.getElementById('header-voice-call-btn');
  const headerVideoCallBtn = document.getElementById('header-video-call-btn');

  if (headerVoiceCallBtn) {
    headerVoiceCallBtn.addEventListener('click', () => {
      const chat = MOCK_CHATS.find(c => c.id === activeChatId);
      if (chat) startCall(chat.name, chat.avatar, 'voice');
    });
  }

  if (headerVideoCallBtn) {
    headerVideoCallBtn.addEventListener('click', () => {
      const chat = MOCK_CHATS.find(c => c.id === activeChatId);
      if (chat) startCall(chat.name, chat.avatar, 'video');
    });
  }

  // End Call
  if (endCallBtn) {
    endCallBtn.addEventListener('click', () => {
      endActiveCall();
    });
  }

  // Mic Toggle
  if (micToggleBtn) {
    micToggleBtn.addEventListener('click', () => {
      isMicMuted = !isMicMuted;
      micToggleBtn.classList.toggle('active', isMicMuted);
    });
  }

  // Camera Toggle
  if (cameraToggleBtn) {
    cameraToggleBtn.addEventListener('click', () => {
      isCameraOff = !isCameraOff;
      cameraToggleBtn.classList.toggle('active', isCameraOff);
    });
  }
}

// Render Calls List in Sidebar
function renderCallsSidebar(container) {
  container.innerHTML = `
    <div style="padding: 12px 16px;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
        <span style="font-size: 13px; font-weight: 700; color: var(--wa-text-secondary); text-transform: uppercase;">Recent Calls</span>
        <button onclick="simulateIncomingCall()" style="font-size: 12.5px; color: var(--wa-green-primary); font-weight: 700; background: var(--wa-green-active-pill); padding: 4px 10px; border-radius: 12px;">Simulate Incoming</button>
      </div>
      <div id="calls-history-list"></div>
    </div>
  `;

  const listEl = container.querySelector('#calls-history-list');

  MOCK_CALLS.forEach(call => {
    const item = document.createElement('div');
    item.className = 'chat-item';

    let iconColor = '#25d366';
    let iconSvg = '';

    if (call.direction === 'missed') {
      iconColor = '#ef4444';
      iconSvg = `<svg viewBox="0 0 24 24" width="16" height="16" fill="${iconColor}"><path d="M19.59 7L12 14.59 6.41 9H11V7H3v8h2v-4.59l7 7 9-9z"/></svg>`;
    } else if (call.direction === 'incoming') {
      iconSvg = `<svg viewBox="0 0 24 24" width="16" height="16" fill="${iconColor}"><path d="M20 5.41L18.59 4 7 15.59V9H5v10h10v-2H8.41z"/></svg>`;
    } else {
      iconSvg = `<svg viewBox="0 0 24 24" width="16" height="16" fill="${iconColor}"><path d="M9 5v2h6.59L4 18.59 5.41 20 17 8.41V15h2V5z"/></svg>`;
    }

    item.innerHTML = `
      <div class="chat-item-avatar-wrapper">
        <img class="chat-item-avatar" src="${call.avatar}" alt="${call.name}">
      </div>
      <div class="chat-item-content">
        <div class="chat-item-top">
          <span class="chat-item-name">${call.name}</span>
        </div>
        <div class="chat-item-bottom">
          <span class="chat-item-snippet">
            ${iconSvg}
            <span>${call.time}</span>
          </span>
        </div>
      </div>
      <button class="header-action-btn" onclick="event.stopPropagation(); startCall('${call.name}', '${call.avatar}', '${call.type}')">
        <svg viewBox="0 0 24 24" width="20" height="20" fill="var(--wa-green-primary)">
          <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
        </svg>
      </button>
    `;

    listEl.appendChild(item);
  });
}

// Start Call Overlay
function startCall(contactName, avatarUrl, callType) {
  const modal = document.getElementById('call-overlay-modal');
  const avatarEl = document.getElementById('call-avatar');
  const nameEl = document.getElementById('call-contact-name');
  const statusEl = document.getElementById('call-status-label');
  const timerEl = document.getElementById('call-timer');

  avatarEl.src = avatarUrl;
  nameEl.textContent = contactName;
  statusEl.textContent = callType === 'video' ? 'WhatsApp Video Call...' : 'WhatsApp Voice Call...';
  timerEl.textContent = 'Calling...';

  modal.classList.add('open');

  // Ringing progression
  setTimeout(() => {
    if (modal.classList.contains('open')) {
      timerEl.textContent = 'Ringing...';
    }
  }, 1200);

  // Connect call after 2.5s
  setTimeout(() => {
    if (modal.classList.contains('open')) {
      statusEl.textContent = callType === 'video' ? 'Video Connected' : 'Connected';
      startCallTimer();
    }
  }, 2500);
}

// Call Duration Timer
function startCallTimer() {
  const timerEl = document.getElementById('call-timer');
  callDurationSeconds = 0;
  clearInterval(activeCallInterval);

  activeCallInterval = setInterval(() => {
    callDurationSeconds++;
    const mins = Math.floor(callDurationSeconds / 60);
    const secs = callDurationSeconds % 60;
    timerEl.textContent = `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
  }, 1000);
}

// End Active Call
function endActiveCall() {
  clearInterval(activeCallInterval);
  const modal = document.getElementById('call-overlay-modal');
  modal.classList.remove('open');

  // Log in chat if it's currently open contact
  const nameEl = document.getElementById('call-contact-name');
  const contactName = nameEl.textContent;

  const chat = MOCK_CHATS.find(c => c.name === contactName);
  if (chat && callDurationSeconds > 0) {
    const mins = Math.floor(callDurationSeconds / 60);
    const secs = callDurationSeconds % 60;
    const durStr = `${mins > 0 ? mins + 'm ' : ''}${secs}s`;

    chat.messages.push({
      id: 'call_end_' + Date.now(),
      sender: 'me',
      type: 'call_log',
      callType: 'voice',
      text: `Voice call • ${durStr}`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }).toLowerCase()
    });

    renderMessages(chat);
  }

  callDurationSeconds = 0;
}

// Simulate Incoming Call
function simulateIncomingCall() {
  const caller = MOCK_CHATS[0]; // Mama
  const answer = confirm(`📞 Incoming WhatsApp Voice Call from ${caller.name}\n\nClick OK to ACCEPT, or Cancel to DECLINE.`);

  if (answer) {
    startCall(caller.name, caller.avatar, 'voice');
  } else {
    alert(`Call declined.`);
  }
}
