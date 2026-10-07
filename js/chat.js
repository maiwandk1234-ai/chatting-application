// Chat Interaction & Messaging Logic

let activeChatId = 'chat_1'; // Default to "Mama" matching screenshot
let typingTimeout = null;
let currentPlayingAudio = null;

// Initialize chat logic
function initChatModule() {
  const composerInput = document.getElementById('composer-input');
  const sendOrMicBtn = document.getElementById('send-or-mic-btn');
  const emojiToggleBtn = document.getElementById('emoji-toggle-btn');
  const attachToggleBtn = document.getElementById('attach-toggle-btn');
  const emojiPicker = document.getElementById('emoji-picker-popover');
  const attachMenu = document.getElementById('attachment-popover');

  // Input change detection to toggle between Mic and Send buttons
  composerInput.addEventListener('input', (e) => {
    const val = e.target.value.trim();
    if (val.length > 0) {
      sendOrMicBtn.classList.remove('mic-mode');
      sendOrMicBtn.classList.add('send-mode');
      sendOrMicBtn.innerHTML = `
        <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
          <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
        </svg>
      `;
    } else {
      sendOrMicBtn.classList.remove('send-mode');
      sendOrMicBtn.classList.add('mic-mode');
      sendOrMicBtn.innerHTML = `
        <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
          <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/>
          <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/>
        </svg>
      `;
    }
  });

  // Enter to send
  composerInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  });

  // Click on send or mic button
  sendOrMicBtn.addEventListener('click', () => {
    if (sendOrMicBtn.classList.contains('send-mode')) {
      handleSendMessage();
    } else {
      // Send simulated voice note
      handleSendVoiceNote();
    }
  });

  // Emoji picker toggle
  emojiToggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    emojiPicker.classList.toggle('open');
    attachMenu.classList.remove('open');
  });

  // Attachment menu toggle
  attachToggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    attachMenu.classList.toggle('open');
    emojiPicker.classList.remove('open');
  });

  // Close popovers on click outside
  document.addEventListener('click', (e) => {
    if (!emojiPicker.contains(e.target) && !emojiToggleBtn.contains(e.target)) {
      emojiPicker.classList.remove('open');
    }
    if (!attachMenu.contains(e.target) && !attachToggleBtn.contains(e.target)) {
      attachMenu.classList.remove('open');
    }
  });

  // Render emoji picker items
  renderEmojiPicker();

  // Attach options clicks
  document.querySelectorAll('.attach-option-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const type = btn.getAttribute('data-type');
      handleAttachmentClick(type);
      attachMenu.classList.remove('open');
    });
  });

  // Open default chat (Mama)
  selectChat(activeChatId);
}

// Select a chat
function selectChat(chatId) {
  activeChatId = chatId;
  const chat = MOCK_CHATS.find(c => c.id === chatId);
  if (!chat) return;

  // Clear unread count on selection
  chat.unreadCount = 0;

  // Update chat header
  const headerAvatar = document.getElementById('chat-header-avatar');
  const headerName = document.getElementById('chat-header-name');
  const headerStatus = document.getElementById('chat-header-status');

  headerAvatar.src = chat.avatar;
  headerName.textContent = chat.name;

  if (chat.isGroup) {
    const memberNames = chat.members.map(m => m.name.split(' ')[0]).join(', ');
    headerStatus.textContent = `${chat.members.length} participants: ${memberNames}`;
    headerStatus.className = 'chat-header-status';
  } else if (chat.isOnline) {
    headerStatus.textContent = 'online';
    headerStatus.className = 'chat-header-status online';
  } else {
    headerStatus.textContent = `last seen ${chat.timestamp}`;
    headerStatus.className = 'chat-header-status';
  }

  // Render messages
  renderMessages(chat);

  // Update active style in chat list
  document.querySelectorAll('.chat-item').forEach(item => {
    if (item.getAttribute('data-chat-id') === chatId) {
      item.classList.add('active');
      const badge = item.querySelector('.unread-badge');
      if (badge) badge.remove();
    } else {
      item.classList.remove('active');
    }
  });

  // Mobile layout switch
  const chatArea = document.getElementById('chat-area');
  chatArea.classList.add('mobile-open');

  // Focus input
  const composerInput = document.getElementById('composer-input');
  if (composerInput && window.innerWidth > 768) {
    composerInput.focus();
  }
}

// Render Messages for a Chat
function renderMessages(chat) {
  const container = document.getElementById('chat-messages-container');
  container.innerHTML = '';

  // 1. Encryption Banner
  const encBanner = document.createElement('div');
  encBanner.className = 'chat-encryption-banner';
  encBanner.innerHTML = `
    <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
      <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
    </svg>
    <span>Messages and calls are end-to-end encrypted. No one outside of this chat can read or listen to them.</span>
  `;
  container.appendChild(encBanner);

  // 2. Date divider
  const dateDiv = document.createElement('div');
  dateDiv.className = 'chat-date-divider';
  dateDiv.textContent = 'TODAY';
  container.appendChild(dateDiv);

  // 3. Render each message
  chat.messages.forEach(msg => {
    const msgElement = createMessageElement(msg, chat);
    container.appendChild(msgElement);
  });

  // Scroll to bottom
  container.scrollTop = container.scrollHeight;
}

// Create single message DOM element
function createMessageElement(msg, chat) {
  const isMe = msg.sender === 'me';
  const row = document.createElement('div');
  row.className = `message-row ${isMe ? 'outgoing' : 'incoming'}`;
  row.id = `msg-${msg.id}`;

  let contentHtml = '';

  // Group sender label
  if (!isMe && chat.isGroup && msg.sender) {
    const color = msg.senderColor || '#059669';
    contentHtml += `<div class="message-sender-name" style="color: ${color};">${msg.sender}</div>`;
  }

  // Content by message type
  if (msg.type === 'audio') {
    contentHtml += `
      <div class="voice-note-player" data-msg-id="${msg.id}">
        <button class="vn-play-btn" onclick="togglePlayVoiceNote('${msg.id}')">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
            <path d="M8 5v14l11-7z"/>
          </svg>
        </button>
        <div class="vn-waveform-box">
          <div class="vn-waveform-visual">
            <div class="vn-bar" style="height: 8px;"></div>
            <div class="vn-bar" style="height: 14px;"></div>
            <div class="vn-bar" style="height: 20px;"></div>
            <div class="vn-bar" style="height: 10px;"></div>
            <div class="vn-bar" style="height: 16px;"></div>
            <div class="vn-bar" style="height: 22px;"></div>
            <div class="vn-bar" style="height: 18px;"></div>
            <div class="vn-bar" style="height: 12px;"></div>
            <div class="vn-bar" style="height: 16px;"></div>
            <div class="vn-bar" style="height: 8px;"></div>
          </div>
          <div class="vn-info-row">
            <span class="vn-timer">${msg.duration || '0:22'}</span>
            <svg class="vn-mic-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/>
            </svg>
          </div>
        </div>
      </div>
    `;
  } else if (msg.type === 'call_log') {
    contentHtml += `
      <div class="call-log-bubble">
        <div class="call-log-icon-box">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="#54656f">
            <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
          </svg>
        </div>
        <div>
          <div style="font-weight: 700;">${msg.text}</div>
          <div style="font-size: 11px; color: var(--wa-bubble-time);">${msg.time}</div>
        </div>
      </div>
    `;
  } else if (msg.type === 'image') {
    contentHtml += `
      <div style="margin-bottom: 6px; border-radius: 6px; overflow: hidden;">
        <img src="${msg.imageUrl}" style="width: 100%; max-height: 240px; object-fit: cover; display: block;" alt="Media"/>
      </div>
      <div>${msg.text || ''}</div>
    `;
  } else {
    // Normal text message
    contentHtml += `<span>${escapeHtml(msg.text)}</span>`;
  }

  // Ticks status & time
  let tickSvg = '';
  if (isMe) {
    if (msg.status === 'sent') {
      // Single grey tick
      tickSvg = `<svg class="tick-icon" viewBox="0 0 18 18"><path fill="currentColor" d="M13.5 4.5L7 11 4.5 8.5l-.9.9L7 12.8l7.4-7.4z"/></svg>`;
    } else if (msg.status === 'delivered') {
      // Double grey ticks
      tickSvg = `<svg class="tick-icon" viewBox="0 0 18 18"><path fill="currentColor" d="M13.5 4.5L7 11 4.5 8.5l-.9.9L7 12.8l7.4-7.4z"/><path fill="currentColor" d="M16.5 4.5L10 11 8.5 9.5l-.9.9L10 12.8l7.4-7.4z"/></svg>`;
    } else {
      // Double blue ticks (read)
      tickSvg = `<svg class="tick-icon blue-ticks" viewBox="0 0 18 18"><path fill="currentColor" d="M13.5 4.5L7 11 4.5 8.5l-.9.9L7 12.8l7.4-7.4z"/><path fill="currentColor" d="M16.5 4.5L10 11 8.5 9.5l-.9.9L10 12.8l7.4-7.4z"/></svg>`;
    }
  }

  // Bubble container
  const bubble = document.createElement('div');
  bubble.className = `message-bubble ${isMe ? 'outgoing' : 'incoming'}`;
  bubble.innerHTML = `
    ${contentHtml}
    <div class="message-meta">
      <span>${msg.time}</span>
      ${tickSvg}
    </div>
  `;

  // Reaction Badge if present
  if (msg.reaction) {
    const rxBadge = document.createElement('div');
    rxBadge.className = 'message-reaction-badge';
    rxBadge.innerHTML = `<span>${msg.reaction}</span> <span>1</span>`;
    rxBadge.onclick = (e) => {
      e.stopPropagation();
      toggleReaction(msg.id, msg.reaction);
    };
    bubble.appendChild(rxBadge);
  }

  // Hover Quick Reaction Bar
  const hoverBar = document.createElement('div');
  hoverBar.className = 'message-hover-actions';
  hoverBar.innerHTML = `
    <button class="hover-emoji-btn" onclick="toggleReaction('${msg.id}', '👍')">👍</button>
    <button class="hover-emoji-btn" onclick="toggleReaction('${msg.id}', '❤️')">❤️</button>
    <button class="hover-emoji-btn" onclick="toggleReaction('${msg.id}', '😂')">😂</button>
    <button class="hover-emoji-btn" onclick="toggleReaction('${msg.id}', '😮')">😮</button>
    <button class="hover-emoji-btn" onclick="toggleReaction('${msg.id}', '😢')">😢</button>
    <button class="hover-emoji-btn" onclick="toggleReaction('${msg.id}', '🙏')">🙏</button>
    <button class="message-dropdown-btn" onclick="showMsgActions('${msg.id}')">
      <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
        <path d="M7 10l5 5 5-5z"/>
      </svg>
    </button>
  `;
  row.appendChild(hoverBar);
  row.appendChild(bubble);

  return row;
}

// Send Message Interaction
function handleSendMessage() {
  const composerInput = document.getElementById('composer-input');
  const text = composerInput.value.trim();
  if (!text) return;

  const chat = MOCK_CHATS.find(c => c.id === activeChatId);
  if (!chat) return;

  const now = new Date();
  const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }).toLowerCase();

  const newMsg = {
    id: 'msg_' + Date.now(),
    sender: 'me',
    text: text,
    time: timeStr,
    status: 'sent',
    reaction: null
  };

  chat.messages.push(newMsg);
  chat.lastMessage = {
    type: 'text',
    text: text,
    sender: 'me',
    status: 'sent',
    time: timeStr
  };
  chat.timestamp = timeStr;

  // Clear composer
  composerInput.value = '';
  composerInput.dispatchEvent(new Event('input'));

  // Re-render
  renderMessages(chat);
  updateChatListDisplay();

  // Tick progression: delivered in 400ms, read in 800ms
  setTimeout(() => {
    newMsg.status = 'delivered';
    renderMessages(chat);
  }, 400);

  setTimeout(() => {
    newMsg.status = 'read';
    renderMessages(chat);
  }, 900);

  // Trigger automated realistic contact response after 1.5s
  simulateContactReply(chat, text);
}

// Send Simulated Voice Note
function handleSendVoiceNote() {
  const chat = MOCK_CHATS.find(c => c.id === activeChatId);
  if (!chat) return;

  const now = new Date();
  const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }).toLowerCase();

  const newMsg = {
    id: 'msg_audio_' + Date.now(),
    sender: 'me',
    type: 'audio',
    duration: '0:18',
    time: timeStr,
    status: 'sent',
    reaction: null
  };

  chat.messages.push(newMsg);
  chat.lastMessage = {
    type: 'audio',
    text: 'Voice message (0:18)',
    duration: '0:18',
    sender: 'me',
    status: 'read',
    time: timeStr
  };
  chat.timestamp = timeStr;

  renderMessages(chat);
  updateChatListDisplay();

  setTimeout(() => {
    newMsg.status = 'read';
    renderMessages(chat);
  }, 800);

  simulateContactReply(chat, 'voice note');
}

// Automated Realistic Reply Simulation
function simulateContactReply(chat, userPrompt) {
  clearTimeout(typingTimeout);

  const headerStatus = document.getElementById('chat-header-status');

  // Show "typing..." in header
  typingTimeout = setTimeout(() => {
    if (activeChatId === chat.id) {
      headerStatus.textContent = 'typing...';
      headerStatus.className = 'chat-header-status typing';
    }

    setTimeout(() => {
      // Pick realistic contextual reply
      let replyText = 'Sounds wonderful! Let me review this shortly.';
      const lower = userPrompt.toLowerCase();

      if (chat.name === 'Mama') {
        replyText = 'Allah bless you, take care and remember to rest on time! ❤️';
      } else if (lower.includes('hello') || lower.includes('hi') || lower.includes('hey')) {
        replyText = 'Hey there! Hope everything is going great on your end.';
      } else if (lower.includes('project') || lower.includes('frontend') || lower.includes('code')) {
        replyText = 'The WhatsApp frontend looks identical to the screenshot! Super responsive and clean.';
      } else if (chat.isGroup) {
        replyText = 'David Chen: Great progress team! Everything works smoothly in this demo.';
      }

      const now = new Date();
      const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }).toLowerCase();

      const replyMsg = {
        id: 'msg_reply_' + Date.now(),
        sender: chat.isGroup ? 'David Chen' : 'contact',
        senderColor: '#e11d48',
        text: replyText,
        time: timeStr,
        status: 'read',
        reaction: null
      };

      chat.messages.push(replyMsg);
      chat.lastMessage = {
        type: 'text',
        text: replyText,
        sender: chat.isGroup ? 'David Chen' : 'contact',
        time: timeStr
      };
      chat.timestamp = timeStr;

      if (activeChatId === chat.id) {
        headerStatus.textContent = chat.isGroup ? `${chat.members.length} participants` : 'online';
        headerStatus.className = chat.isGroup ? 'chat-header-status' : 'chat-header-status online';
        renderMessages(chat);
      }

      updateChatListDisplay();
    }, 1200);
  }, 800);
}

// Toggle Message Reaction
function toggleReaction(msgId, emoji) {
  const chat = MOCK_CHATS.find(c => c.id === activeChatId);
  if (!chat) return;

  const msg = chat.messages.find(m => m.id === msgId);
  if (!msg) return;

  if (msg.reaction === emoji) {
    msg.reaction = null;
  } else {
    msg.reaction = emoji;
  }

  renderMessages(chat);
}

// Toggle Audio / Voice Note Playback Mock
function togglePlayVoiceNote(msgId) {
  const player = document.querySelector(`.voice-note-player[data-msg-id="${msgId}"]`);
  if (!player) return;

  const btn = player.querySelector('.vn-play-btn');
  const timer = player.querySelector('.vn-timer');
  const bars = player.querySelectorAll('.vn-bar');

  if (currentPlayingAudio && currentPlayingAudio.id === msgId) {
    // Pause
    clearInterval(currentPlayingAudio.interval);
    currentPlayingAudio = null;
    btn.innerHTML = `<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>`;
    return;
  }

  // Start play
  if (currentPlayingAudio) {
    clearInterval(currentPlayingAudio.interval);
    const prevBtn = document.querySelector(`.voice-note-player[data-msg-id="${currentPlayingAudio.id}"] .vn-play-btn`);
    if (prevBtn) prevBtn.innerHTML = `<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>`;
  }

  btn.innerHTML = `<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>`;

  let seconds = 0;
  const maxSec = 22;

  const interval = setInterval(() => {
    seconds++;
    const formatted = `0:${seconds < 10 ? '0' : ''}${seconds}`;
    timer.textContent = formatted;

    // highlight bars
    const barIndex = Math.floor((seconds / maxSec) * bars.length);
    bars.forEach((b, idx) => {
      if (idx <= barIndex) b.classList.add('played');
      else b.classList.remove('played');
    });

    if (seconds >= maxSec) {
      clearInterval(interval);
      btn.innerHTML = `<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>`;
      timer.textContent = '0:22';
      bars.forEach(b => b.classList.remove('played'));
      currentPlayingAudio = null;
    }
  }, 200);

  currentPlayingAudio = { id: msgId, interval };
}

// Emoji Picker Grid Population
function renderEmojiPicker() {
  const grid = document.getElementById('emoji-picker-grid');
  const emojis = [
    '😀','😃','😄','😁','😆','😅','😂','🤣','🥲','🥹','😊','😇','🙂','🙃','😉','😌',
    '😍','🥰','😘','😗','😙','😚','😋','😛','😝','😜','🤪','🤨','🧐','🤓','😎','🥸',
    '🤩','🥳','😏','😒','😞','😔','😟','😕','🙁','☹️','😣','😖','😫','😩','🥺','😢',
    '😭','😮‍💨','😤','😠','😡','🤬','🤯','😳','🥵','🥶','😱','😨','😰','😥','😓','🤗',
    '👍','👎','👏','🙌','👐','🤲','🤝','🙏','✍️','💅','🤳','💪','🦾','🦿','🦵','🦶',
    '❤️','🧡','💛','💚','💙','💜','🖤','🤍','🤎','💔','❣️','💕','💞','💓','💗','💖',
    '🔥','✨','🌟','💫','💥','💯','💢','💬','👁️','👀','🧠','🫀','🫁','🩸','🩹','🩺'
  ];

  grid.innerHTML = '';
  emojis.forEach(emoji => {
    const btn = document.createElement('button');
    btn.className = 'emoji-btn-item';
    btn.textContent = emoji;
    btn.onclick = () => {
      const input = document.getElementById('composer-input');
      input.value += emoji;
      input.dispatchEvent(new Event('input'));
      input.focus();
    };
    grid.appendChild(btn);
  });
}

// Attachment Click Handler
function handleAttachmentClick(type) {
  const chat = MOCK_CHATS.find(c => c.id === activeChatId);
  if (!chat) return;

  const now = new Date();
  const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }).toLowerCase();

  let mockMsg = null;

  if (type === 'photos') {
    mockMsg = {
      id: 'msg_photo_' + Date.now(),
      sender: 'me',
      type: 'image',
      imageUrl: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="240" viewBox="0 0 400 240"><defs><linearGradient id="lg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="%230284c7"/><stop offset="100%" stop-color="%230f172a"/></linearGradient></defs><rect width="400" height="240" fill="url(%23lg)"/><circle cx="320" cy="60" r="30" fill="%23facc15"/><path d="M0 200l120-90 100 70 80-50 100 70v40H0z" fill="%231e293b"/></svg>',
      text: 'Sunset view from the hills 🌅',
      time: timeStr,
      status: 'read'
    };
  } else if (type === 'document') {
    mockMsg = {
      id: 'msg_doc_' + Date.now(),
      sender: 'me',
      text: '📄 Project_Architecture_Spec_v2.pdf (1.4 MB)',
      time: timeStr,
      status: 'read'
    };
  } else if (type === 'contact') {
    mockMsg = {
      id: 'msg_con_' + Date.now(),
      sender: 'me',
      text: '👤 Contact Card: David Chen (+1 555-778-9901)',
      time: timeStr,
      status: 'read'
    };
  } else if (type === 'poll') {
    mockMsg = {
      id: 'msg_poll_' + Date.now(),
      sender: 'me',
      text: '📊 Poll: Best day for group call? (1) Friday (2) Saturday',
      time: timeStr,
      status: 'read'
    };
  }

  if (mockMsg) {
    chat.messages.push(mockMsg);
    chat.lastMessage = {
      type: 'text',
      text: mockMsg.text,
      sender: 'me',
      status: 'read',
      time: timeStr
    };
    renderMessages(chat);
    updateChatListDisplay();
  }
}

// Utility: escape HTML
function escapeHtml(text) {
  if (!text) return '';
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}
