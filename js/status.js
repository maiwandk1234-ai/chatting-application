// WhatsApp Status / Stories Viewer Logic

let currentStatusContact = null;
let currentStoryIndex = 0;
let storyTimer = null;
let storyProgressInterval = null;
let isStoryPaused = false;

function initStatusModule() {
  const statusViewerModal = document.getElementById('status-viewer-modal');
  const closeBtn = document.getElementById('status-viewer-close');
  const replyInput = document.getElementById('status-reply-input');
  const replySendBtn = document.getElementById('status-reply-send-btn');
  const contentArea = document.getElementById('status-content-area');

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      closeStatusViewer();
    });
  }

  // Click left side for previous story, right side for next story
  if (contentArea) {
    contentArea.addEventListener('click', (e) => {
      const rect = contentArea.getBoundingClientRect();
      const x = e.clientX - rect.left;
      if (x < rect.width / 3) {
        prevStory();
      } else {
        nextStory();
      }
    });

    // Hold down to pause
    contentArea.addEventListener('mousedown', () => {
      isStoryPaused = true;
    });
    contentArea.addEventListener('mouseup', () => {
      isStoryPaused = false;
    });
    contentArea.addEventListener('touchstart', () => {
      isStoryPaused = true;
    });
    contentArea.addEventListener('touchend', () => {
      isStoryPaused = false;
    });
  }

  // Send status reply
  if (replySendBtn && replyInput) {
    const sendReply = () => {
      const text = replyInput.value.trim();
      if (!text || !currentStatusContact) return;

      // Find contact's chat and push reply message
      const chat = MOCK_CHATS.find(c => c.name === currentStatusContact.name);
      if (chat) {
        const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }).toLowerCase();
        chat.messages.push({
          id: 'reply_' + Date.now(),
          sender: 'me',
          text: `Replied to status: "${text}"`,
          time: timeStr,
          status: 'sent'
        });
        chat.lastMessage = {
          type: 'text',
          text: `Replied to status: "${text}"`,
          sender: 'me',
          status: 'sent',
          time: timeStr
        };
        updateChatListDisplay();
      }

      alert(`Reply sent to ${currentStatusContact.name}!`);
      replyInput.value = '';
      closeStatusViewer();
    };

    replySendBtn.addEventListener('click', sendReply);
    replyInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') sendReply();
    });
  }

  // Quick reaction buttons in status viewer
  document.querySelectorAll('.status-quick-rx').forEach(btn => {
    btn.addEventListener('click', () => {
      const emoji = btn.textContent;
      if (!currentStatusContact) return;

      const chat = MOCK_CHATS.find(c => c.name === currentStatusContact.name);
      if (chat) {
        const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }).toLowerCase();
        chat.messages.push({
          id: 'rx_' + Date.now(),
          sender: 'me',
          text: `Reacted ${emoji} to status`,
          time: timeStr,
          status: 'sent'
        });
        updateChatListDisplay();
      }

      alert(`Reacted ${emoji} to ${currentStatusContact.name}'s status!`);
      closeStatusViewer();
    });
  });
}

// Render Status List in Sidebar (when Status tab is selected)
function renderStatusSidebar(container) {
  container.innerHTML = `
    <div style="padding: 12px 16px;">
      <!-- My Status Item -->
      <div class="chat-item" onclick="handleAddNewStatus()">
        <div class="chat-item-avatar-wrapper">
          <img class="chat-item-avatar" src="${MOCK_CURRENT_USER.avatar}" alt="My Status">
          <div style="position: absolute; bottom: 0; right: 0; width: 18px; height: 18px; background-color: var(--wa-green-primary); border: 2px solid #fff; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #fff; font-weight: 700; font-size: 14px;">+</div>
        </div>
        <div class="chat-item-content">
          <div class="chat-item-top">
            <span class="chat-item-name">My status</span>
          </div>
          <div class="chat-item-bottom">
            <span class="chat-item-snippet">Tap to add status update</span>
          </div>
        </div>
      </div>

      <div style="font-size: 13px; font-weight: 700; color: var(--wa-text-secondary); text-transform: uppercase; margin: 16px 0 8px 8px;">Recent updates</div>

      <div id="contact-status-list"></div>
    </div>
  `;

  const contactList = container.querySelector('#contact-status-list');
  const contactsWithStories = MOCK_STATUSES.filter(s => !s.isUser && s.stories.length > 0);

  contactsWithStories.forEach(statusItem => {
    const item = document.createElement('div');
    item.className = 'chat-item';
    item.onclick = () => openStatusViewer(statusItem);

    item.innerHTML = `
      <div class="chat-item-avatar-wrapper">
        <div style="padding: 2px; border-radius: 50%; border: 2px solid ${statusItem.hasUnseen ? 'var(--wa-green-primary)' : 'var(--wa-border)'};">
          <img class="chat-item-avatar" src="${statusItem.avatar}" style="width: 44px; height: 44px;" alt="${statusItem.name}">
        </div>
      </div>
      <div class="chat-item-content">
        <div class="chat-item-top">
          <span class="chat-item-name">${statusItem.name}</span>
        </div>
        <div class="chat-item-bottom">
          <span class="chat-item-snippet">${statusItem.time}</span>
        </div>
      </div>
    `;

    contactList.appendChild(item);
  });
}

// Open Status Story Viewer Modal
function openStatusViewer(contactStatus) {
  currentStatusContact = contactStatus;
  currentStoryIndex = 0;
  contactStatus.hasUnseen = false;

  const modal = document.getElementById('status-viewer-modal');
  const avatarEl = document.getElementById('status-viewer-avatar');
  const nameEl = document.getElementById('status-viewer-name');
  const timeEl = document.getElementById('status-viewer-time');
  const replyInput = document.getElementById('status-reply-input');

  avatarEl.src = contactStatus.avatar;
  nameEl.textContent = contactStatus.name;
  timeEl.textContent = contactStatus.time;
  replyInput.placeholder = `Reply to ${contactStatus.name}...`;

  // Create progress bar segments
  const progressBarsContainer = document.getElementById('status-progress-bars');
  progressBarsContainer.innerHTML = '';
  contactStatus.stories.forEach((_, idx) => {
    const segment = document.createElement('div');
    segment.className = 'status-progress-segment';
    segment.innerHTML = `<div class="status-progress-fill" id="status-prog-${idx}"></div>`;
    progressBarsContainer.appendChild(segment);
  });

  modal.classList.add('open');
  showStory(currentStoryIndex);
}

// Display specific story index
function showStory(index) {
  if (!currentStatusContact || !currentStatusContact.stories[index]) {
    closeStatusViewer();
    return;
  }

  clearInterval(storyProgressInterval);
  const story = currentStatusContact.stories[index];
  const contentArea = document.getElementById('status-content-area');
  const storyText = document.getElementById('status-story-text');

  contentArea.style.background = story.bgColor || 'linear-gradient(135deg, #0284c7, #0f172a)';
  storyText.textContent = story.text || story.caption || '';

  // Update segments before this index to 100%, after to 0%
  currentStatusContact.stories.forEach((_, idx) => {
    const fill = document.getElementById(`status-prog-${idx}`);
    if (fill) {
      if (idx < index) fill.style.width = '100%';
      else fill.style.width = '0%';
    }
  });

  // Animate current segment fill
  const currentFill = document.getElementById(`status-prog-${index}`);
  let progress = 0;
  const duration = 5000; // 5 seconds per story
  const step = 50;

  storyProgressInterval = setInterval(() => {
    if (isStoryPaused) return;

    progress += (step / duration) * 100;
    if (currentFill) currentFill.style.width = `${Math.min(progress, 100)}%`;

    if (progress >= 100) {
      clearInterval(storyProgressInterval);
      nextStory();
    }
  }, step);
}

// Next Story
function nextStory() {
  if (currentStatusContact && currentStoryIndex < currentStatusContact.stories.length - 1) {
    currentStoryIndex++;
    showStory(currentStoryIndex);
  } else {
    closeStatusViewer();
  }
}

// Previous Story
function prevStory() {
  if (currentStoryIndex > 0) {
    currentStoryIndex--;
    showStory(currentStoryIndex);
  }
}

// Close Status Viewer
function closeStatusViewer() {
  clearInterval(storyProgressInterval);
  const modal = document.getElementById('status-viewer-modal');
  modal.classList.remove('open');
  currentStatusContact = null;
}

// Add New Status Update
function handleAddNewStatus() {
  const text = prompt('Enter text for your new status update:');
  if (!text) return;

  const myStatus = MOCK_STATUSES.find(s => s.isUser);
  if (myStatus) {
    myStatus.stories.push({
      id: 'my_story_' + Date.now(),
      type: 'text',
      text: text,
      bgColor: 'linear-gradient(135deg, #10b981, #047857)',
      time: 'Just now'
    });
    alert('Status update posted!');
  }
}
