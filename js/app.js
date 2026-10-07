// WhatsApp Web Application - Main App Controller

let currentRailTab = 'chats';
let currentFilter = 'all';
let searchQuery = '';

document.addEventListener('DOMContentLoaded', () => {
  initRailNavigation();
  initSearchAndFilters();
  initChatModule();
  initGroupsModule();
  initStatusModule();
  initCallsModule();
  initProfileModule();

  // Initial render of chat list
  updateChatListDisplay();

  // Mobile Back Button
  const mobileBackBtn = document.getElementById('mobile-back-btn');
  if (mobileBackBtn) {
    mobileBackBtn.addEventListener('click', () => {
      const chatArea = document.getElementById('chat-area');
      chatArea.classList.remove('mobile-open');
    });
  }
});

// Rail Navigation Controller
function initRailNavigation() {
  const railButtons = document.querySelectorAll('.rail-btn[data-tab]');
  
  railButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const tab = btn.getAttribute('data-tab');
      switchRailTab(tab);
    });
  });

  // Meta AI Sparkle button
  const metaAiBtn = document.getElementById('rail-meta-ai-btn');
  if (metaAiBtn) {
    metaAiBtn.addEventListener('click', () => {
      handleMetaAIClick();
    });
  }
}

function switchRailTab(tab) {
  currentRailTab = tab;

  // Update rail buttons active state
  document.querySelectorAll('.rail-btn[data-tab]').forEach(btn => {
    if (btn.getAttribute('data-tab') === tab) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  // Close profile drawer if open
  const profileDrawer = document.getElementById('profile-drawer');
  if (profileDrawer) profileDrawer.classList.remove('open');

  const titleEl = document.getElementById('sidebar-main-title');
  const searchContainer = document.getElementById('search-container');
  const filterChipsRow = document.getElementById('filter-chips-row');
  const chatListContainer = document.getElementById('chat-list-container');
  const newChatBtn = document.getElementById('new-chat-btn');

  if (tab === 'chats') {
    titleEl.textContent = 'Chats';
    searchContainer.style.display = 'block';
    filterChipsRow.style.display = 'flex';
    newChatBtn.style.display = 'flex';
    updateChatListDisplay();
  } else if (tab === 'calls') {
    titleEl.textContent = 'Calls';
    searchContainer.style.display = 'none';
    filterChipsRow.style.display = 'none';
    newChatBtn.style.display = 'none';
    renderCallsSidebar(chatListContainer);
  } else if (tab === 'status') {
    titleEl.textContent = 'Status';
    searchContainer.style.display = 'none';
    filterChipsRow.style.display = 'none';
    newChatBtn.style.display = 'none';
    renderStatusSidebar(chatListContainer);
  } else if (tab === 'channels') {
    titleEl.textContent = 'Channels';
    searchContainer.style.display = 'none';
    filterChipsRow.style.display = 'none';
    newChatBtn.style.display = 'none';
    renderChannelsSidebar(chatListContainer);
  } else if (tab === 'groups') {
    titleEl.textContent = 'Communities';
    searchContainer.style.display = 'block';
    filterChipsRow.style.display = 'none';
    newChatBtn.style.display = 'flex';
    currentFilter = 'groups';
    updateChatListDisplay();
  } else if (tab === 'archived') {
    titleEl.textContent = 'Archived';
    searchContainer.style.display = 'block';
    filterChipsRow.style.display = 'none';
    newChatBtn.style.display = 'none';
    chatListContainer.innerHTML = '<div style="padding: 40px; text-align: center; color: var(--wa-text-secondary);">No archived chats.</div>';
  } else if (tab === 'starred') {
    titleEl.textContent = 'Starred Messages';
    searchContainer.style.display = 'none';
    filterChipsRow.style.display = 'none';
    newChatBtn.style.display = 'none';
    chatListContainer.innerHTML = '<div style="padding: 40px; text-align: center; color: var(--wa-text-secondary);">No starred messages yet. Tap and hold any message to star it.</div>';
  }
}

// Search & Filter Controller
function initSearchAndFilters() {
  const searchInput = document.getElementById('search-input');
  const clearBtn = document.getElementById('search-clear-btn');
  const filterChips = document.querySelectorAll('.filter-chip[data-filter]');

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.trim().toLowerCase();
      if (searchQuery.length > 0) {
        clearBtn.style.display = 'block';
      } else {
        clearBtn.style.display = 'none';
      }
      updateChatListDisplay();
    });
  }

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      searchInput.value = '';
      searchQuery = '';
      clearBtn.style.display = 'none';
      searchInput.focus();
      updateChatListDisplay();
    });
  }

  // Filter Chips ("All", "Unread", "Favourites", "Groups")
  filterChips.forEach(chip => {
    chip.addEventListener('click', () => {
      filterChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      currentFilter = chip.getAttribute('data-filter');
      updateChatListDisplay();
    });
  });
}

// Update Chat List in Sidebar
function updateChatListDisplay() {
  const container = document.getElementById('chat-list-container');
  if (!container || currentRailTab !== 'chats') return;

  container.innerHTML = '';

  let filtered = MOCK_CHATS.filter(chat => {
    // Search query match
    if (searchQuery) {
      const matchName = chat.name.toLowerCase().includes(searchQuery);
      const matchText = chat.lastMessage && chat.lastMessage.text && chat.lastMessage.text.toLowerCase().includes(searchQuery);
      if (!matchName && !matchText) return false;
    }

    // Filter chips
    if (currentFilter === 'unread') {
      return chat.unreadCount > 0 || chat.category === 'unread';
    }
    if (currentFilter === 'favourites') {
      return chat.isPinned;
    }
    if (currentFilter === 'groups') {
      return chat.isGroup;
    }

    return true; // 'all'
  });

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="padding: 48px 24px; text-align: center; color: var(--wa-text-secondary); font-size: 14.5px;">
        No chats found matching your criteria.
      </div>
    `;
    return;
  }

  filtered.forEach(chat => {
    const item = document.createElement('div');
    item.className = `chat-item ${chat.id === activeChatId ? 'active' : ''}`;
    item.setAttribute('data-chat-id', chat.id);
    item.onclick = () => selectChat(chat.id);

    // Build snippet html
    let snippetHtml = '';
    const last = chat.lastMessage;

    if (last) {
      if (last.type === 'audio') {
        snippetHtml = `
          <span class="blue-ticks">
            <svg viewBox="0 0 18 18" width="16" height="16"><path fill="currentColor" d="M13.5 4.5L7 11 4.5 8.5l-.9.9L7 12.8l7.4-7.4z"/><path fill="currentColor" d="M16.5 4.5L10 11 8.5 9.5l-.9.9L10 12.8l7.4-7.4z"/></svg>
          </span>
          <svg class="snippet-icon" viewBox="0 0 24 24"><path fill="currentColor" d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/><path fill="currentColor" d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/></svg>
          <span>${last.duration || '0:22'}</span>
        `;
      } else if (last.type === 'reaction') {
        snippetHtml = `<span>${escapeHtml(last.text)}</span>`;
      } else if (last.type === 'reaction_received') {
        snippetHtml = `<span>${escapeHtml(last.text)}</span>`;
      } else if (last.type === 'call') {
        snippetHtml = `
          <svg class="snippet-icon" viewBox="0 0 24 24"><path fill="currentColor" d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
          <span>Voice call</span>
        `;
      } else {
        if (last.sender === 'me') {
          snippetHtml = `
            <span class="blue-ticks">
              <svg viewBox="0 0 18 18" width="16" height="16"><path fill="currentColor" d="M13.5 4.5L7 11 4.5 8.5l-.9.9L7 12.8l7.4-7.4z"/><path fill="currentColor" d="M16.5 4.5L10 11 8.5 9.5l-.9.9L10 12.8l7.4-7.4z"/></svg>
            </span>
            <span>${escapeHtml(last.text)}</span>
          `;
        } else {
          snippetHtml = `<span>${escapeHtml(last.text)}</span>`;
        }
      }
    }

    const avatarWrapper = document.createElement('div');
    avatarWrapper.className = 'chat-item-avatar-wrapper';

    const avatarImg = document.createElement('img');
    avatarImg.className = 'chat-item-avatar';
    avatarImg.src = chat.avatar;
    avatarImg.alt = chat.name;
    avatarWrapper.appendChild(avatarImg);

    if (chat.isOnline) {
      const badge = document.createElement('div');
      badge.className = 'chat-item-online-badge';
      avatarWrapper.appendChild(badge);
    }

    const contentDiv = document.createElement('div');
    contentDiv.className = 'chat-item-content';
    contentDiv.innerHTML = `
      <div class="chat-item-top">
        <span class="chat-item-name">${escapeHtml(chat.name)}</span>
        <span class="chat-item-time">${chat.timestamp}</span>
      </div>
      <div class="chat-item-bottom">
        <div class="chat-item-snippet">${snippetHtml}</div>
        <div class="chat-item-badge-group">
          ${chat.unreadCount > 0 ? `<span class="unread-badge">${chat.unreadCount}</span>` : ''}
          ${chat.isPinned ? `<svg class="pin-icon" viewBox="0 0 24 24"><path fill="currentColor" d="M16 12V4h1V2H7v2h1v8l-2 2v2h5.2v6h1.6v-6H18v-2l-2-2z"/></svg>` : ''}
        </div>
      </div>
    `;

    item.appendChild(avatarWrapper);
    item.appendChild(contentDiv);
    container.appendChild(item);
  });
}

// Channels Tab Sidebar & Feed View
function renderChannelsSidebar(container) {
  container.innerHTML = `
    <div style="padding: 12px 16px;">
      <div style="font-size: 13px; font-weight: 700; color: var(--wa-text-secondary); text-transform: uppercase; margin-bottom: 12px;">Followed Channels</div>
      <div id="channels-list"></div>
    </div>
  `;

  const listEl = container.querySelector('#channels-list');

  MOCK_CHANNELS.forEach(channel => {
    const card = document.createElement('div');
    card.className = 'channel-card';
    card.onclick = () => openChannelFeed(channel);

    card.innerHTML = `
      <img src="${channel.avatar}" style="width: 44px; height: 44px; border-radius: 50%; object-fit: cover;" alt="${channel.name}">
      <div style="flex: 1; min-width: 0;">
        <div style="display: flex; align-items: center; gap: 4px;">
          <span style="font-weight: 700; font-size: 15px; color: var(--wa-text-primary);">${channel.name}</span>
          ${channel.verified ? '<svg viewBox="0 0 24 24" width="16" height="16" fill="var(--wa-green-primary)"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>' : ''}
        </div>
        <div style="font-size: 12.5px; color: var(--wa-text-secondary);">${channel.followers}</div>
      </div>
      <button style="padding: 6px 12px; border-radius: 16px; font-size: 12.5px; font-weight: 700; background-color: ${channel.isFollowing ? 'var(--wa-bg-search)' : 'var(--wa-green-primary)'}; color: ${channel.isFollowing ? 'var(--wa-text-primary)' : '#ffffff'};">
        ${channel.isFollowing ? 'Following' : 'Follow'}
      </button>
    `;

    listEl.appendChild(card);
  });
}

// Open Channel Feed in Main Pane
function openChannelFeed(channel) {
  const container = document.getElementById('chat-messages-container');
  const headerAvatar = document.getElementById('chat-header-avatar');
  const headerName = document.getElementById('chat-header-name');
  const headerStatus = document.getElementById('chat-header-status');

  headerAvatar.src = channel.avatar;
  headerName.textContent = channel.name;
  headerStatus.textContent = `${channel.followers} • Channel`;

  container.innerHTML = `
    <div class="channel-feed-container">
      <div style="background-color: var(--wa-bg-sidebar); border-radius: 12px; padding: 20px; border: 1px solid var(--wa-border); text-align: center; margin-bottom: 12px;">
        <img src="${channel.avatar}" style="width: 80px; height: 80px; border-radius: 50%; margin-bottom: 12px;" alt="${channel.name}">
        <div style="font-size: 20px; font-weight: 700; margin-bottom: 4px;">${channel.name}</div>
        <div style="font-size: 14px; color: var(--wa-text-secondary); margin-bottom: 16px;">${channel.description}</div>
        <button onclick="toggleChannelFollow('${channel.id}')" style="padding: 8px 24px; border-radius: 20px; background-color: ${channel.isFollowing ? 'var(--wa-bg-search)' : 'var(--wa-green-primary)'}; color: ${channel.isFollowing ? 'var(--wa-text-primary)' : '#fff'}; font-weight: 700;">
          ${channel.isFollowing ? 'Following' : 'Follow Channel'}
        </button>
      </div>

      ${channel.posts.map(post => `
        <div class="channel-post-card">
          <div style="font-size: 15px; line-height: 1.5; color: var(--wa-text-primary);">${post.text}</div>
          <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--wa-border-subtle); padding-top: 10px;">
            <div class="channel-post-reactions">
              ${post.reactions.map(r => `
                <div class="channel-reaction-chip" onclick="incrementPostReaction(this)">
                  <span>${r.emoji}</span>
                  <span style="font-size: 12px; font-weight: 700;">${r.count.toLocaleString()}</span>
                </div>
              `).join('')}
            </div>
            <div style="font-size: 12px; color: var(--wa-text-secondary);">👁️ ${post.views} • ${post.time}</div>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

function toggleChannelFollow(channelId) {
  const channel = MOCK_CHANNELS.find(c => c.id === channelId);
  if (channel) {
    channel.isFollowing = !channel.isFollowing;
    openChannelFeed(channel);
    renderChannelsSidebar(document.getElementById('chat-list-container'));
  }
}

function incrementPostReaction(chip) {
  const countEl = chip.querySelector('span:nth-child(2)');
  let count = parseInt(countEl.textContent.replace(/,/g, ''), 10) || 0;
  count++;
  countEl.textContent = count.toLocaleString();
}

// Meta AI Sparkle Trigger
function handleMetaAIClick() {
  const promptText = prompt('Ask Meta AI anything:');
  if (promptText && promptText.trim()) {
    alert(`✨ Meta AI response:\n\n"Here is what I found for '${promptText}': WhatsApp web application is operating in full responsive frontend simulation mode with Lato typography and pixel-accurate aesthetics."`);
  }
}
