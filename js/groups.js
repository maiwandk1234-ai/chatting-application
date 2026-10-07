// Group Management Logic (Create Group, Add/Remove Users, Admin Roles)

function initGroupsModule() {
  const createGroupBtn = document.getElementById('create-group-btn');
  const createGroupModal = document.getElementById('create-group-modal');
  const closeGroupModalBtn = document.getElementById('close-group-modal-btn');
  const submitCreateGroupBtn = document.getElementById('submit-create-group-btn');
  const cancelCreateGroupBtn = document.getElementById('cancel-create-group-btn');
  const infoDrawerCloseBtn = document.getElementById('info-drawer-close-btn');

  // Open create group modal
  if (createGroupBtn) {
    createGroupBtn.addEventListener('click', () => {
      openCreateGroupModal();
    });
  }

  // Close modals
  if (closeGroupModalBtn) {
    closeGroupModalBtn.addEventListener('click', () => {
      createGroupModal.classList.remove('open');
    });
  }
  if (cancelCreateGroupBtn) {
    cancelCreateGroupBtn.addEventListener('click', () => {
      createGroupModal.classList.remove('open');
    });
  }
  if (infoDrawerCloseBtn) {
    infoDrawerCloseBtn.addEventListener('click', () => {
      closeInfoDrawer();
    });
  }

  // Submit new group
  if (submitCreateGroupBtn) {
    submitCreateGroupBtn.addEventListener('click', () => {
      handleCreateGroupSubmit();
    });
  }

  // Chat header click to open Info Drawer
  const chatHeaderLeft = document.getElementById('chat-header-left');
  if (chatHeaderLeft) {
    chatHeaderLeft.addEventListener('click', () => {
      openInfoDrawer();
    });
  }
}

// Open Group Creation Modal
function openCreateGroupModal() {
  const modal = document.getElementById('create-group-modal');
  const checklist = document.getElementById('group-contact-checklist');
  const groupNameInput = document.getElementById('group-name-input');

  groupNameInput.value = '';
  checklist.innerHTML = '';

  AVAILABLE_CONTACTS.forEach(contact => {
    const item = document.createElement('label');
    item.className = 'contact-check-item';
    item.innerHTML = `
      <input type="checkbox" value="${contact.id}" data-name="${contact.name}">
      <img src="${contact.avatar}" style="width: 36px; height: 36px; border-radius: 50%;" alt="${contact.name}">
      <div>
        <div style="font-weight: 700; font-size: 14.5px;">${contact.name}</div>
        <div style="font-size: 12px; color: var(--wa-text-secondary);">${contact.phone}</div>
      </div>
    `;
    checklist.appendChild(item);
  });

  modal.classList.add('open');
  groupNameInput.focus();
}

// Handle Create Group Submission
function handleCreateGroupSubmit() {
  const groupNameInput = document.getElementById('group-name-input');
  const name = groupNameInput.value.trim();

  if (!name) {
    alert('Please provide a group subject/name.');
    return;
  }

  const selectedBoxes = document.querySelectorAll('#group-contact-checklist input[type="checkbox"]:checked');
  const members = [
    { id: 'user_me', name: 'Alex Morgan (You)', role: 'admin', phone: '+1 (555) 382-9012' }
  ];

  selectedBoxes.forEach(box => {
    const contact = AVAILABLE_CONTACTS.find(c => c.id === box.value);
    if (contact) {
      members.push({
        id: contact.id,
        name: contact.name,
        role: 'member',
        phone: contact.phone
      });
    }
  });

  const newGroupId = 'group_' + Date.now();
  const now = new Date();
  const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }).toLowerCase();

  const newGroup = {
    id: newGroupId,
    type: 'group',
    isGroup: true,
    name: name,
    description: 'Community & team discussion group.',
    avatar: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="50" fill="%23008069"/><path d="M35 65l15-30 15 30H35z" fill="%23ffffff"/><circle cx="50" cy="30" r="8" fill="%23a7f3d0"/><circle cx="30" cy="65" r="7" fill="%23a7f3d0"/><circle cx="70" cy="65" r="7" fill="%23a7f3d0"/></svg>`,
    timestamp: timeStr,
    lastMessage: {
      type: 'text',
      text: 'You created group "' + name + '"',
      sender: 'System',
      time: timeStr
    },
    unreadCount: 0,
    category: 'groups',
    members: members,
    messages: [
      {
        id: 'init_' + Date.now(),
        sender: 'System',
        text: `🔒 Messages and calls are end-to-end encrypted.\nYou created group "${name}".`,
        time: timeStr,
        status: 'read'
      }
    ]
  };

  // Add to chats list at beginning
  MOCK_CHATS.unshift(newGroup);

  // Close modal
  document.getElementById('create-group-modal').classList.remove('open');

  // Update UI and select new group
  updateChatListDisplay();
  selectChat(newGroupId);
  openInfoDrawer();
}

// Open Info Drawer (Right Panel)
function openInfoDrawer() {
  const drawer = document.getElementById('info-drawer');
  const chat = MOCK_CHATS.find(c => c.id === activeChatId);
  if (!chat) return;

  const titleEl = document.getElementById('drawer-title');
  const avatarEl = document.getElementById('drawer-avatar');
  const nameEl = document.getElementById('drawer-name');
  const subEl = document.getElementById('drawer-sub');
  const descSection = document.getElementById('drawer-desc-section');
  const descEl = document.getElementById('drawer-desc-text');
  const membersSection = document.getElementById('drawer-members-section');
  const membersList = document.getElementById('drawer-members-list');
  const membersCount = document.getElementById('drawer-members-count');

  titleEl.textContent = chat.isGroup ? 'Group info' : 'Contact info';
  avatarEl.src = chat.avatar;
  nameEl.textContent = chat.name;
  subEl.textContent = chat.isGroup ? `${chat.members.length} participants` : chat.phone || '';

  if (chat.isGroup) {
    descSection.style.display = 'block';
    descEl.textContent = chat.description || 'No group description yet.';

    membersSection.style.display = 'block';
    membersCount.textContent = `${chat.members.length} participants`;

    renderDrawerMembers(chat, membersList);
  } else {
    descSection.style.display = 'block';
    descEl.textContent = chat.about || 'Hey there! I am using WhatsApp.';
    membersSection.style.display = 'none';
  }

  drawer.classList.add('open');
}

// Close Info Drawer
function closeInfoDrawer() {
  const drawer = document.getElementById('info-drawer');
  drawer.classList.remove('open');
}

// Render Members in Group Drawer with Admin Actions
function renderDrawerMembers(chat, container) {
  container.innerHTML = '';

  chat.members.forEach(member => {
    const isMe = member.id === 'user_me';
    const isAdmin = member.role === 'admin';

    const item = document.createElement('div');
    item.className = 'drawer-member-item';

    // Find avatar if possible
    const matchedContact = AVAILABLE_CONTACTS.find(c => c.name === member.name || c.id === member.id);
    const memberAvatar = isMe ? MOCK_CURRENT_USER.avatar : (matchedContact ? matchedContact.avatar : chat.avatar);

    item.innerHTML = `
      <img class="drawer-member-avatar" src="${memberAvatar}" alt="${member.name}">
      <div class="drawer-member-info">
        <div class="drawer-member-name">
          <span>${member.name}</span>
          ${isAdmin ? '<span class="admin-badge">Group Admin</span>' : ''}
        </div>
        <div class="drawer-member-phone">${member.phone || ''}</div>
      </div>
      ${!isMe ? `
        <div style="display: flex; gap: 4px;">
          <button class="member-action-btn" title="Options" onclick="openMemberActionsMenu(event, '${chat.id}', '${member.id}')">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
              <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
            </svg>
          </button>
        </div>
      ` : ''}
    `;

    container.appendChild(item);
  });
}

// Member Admin Menu (Make Admin, Remove Member)
function openMemberActionsMenu(event, chatId, memberId) {
  event.stopPropagation();
  const chat = MOCK_CHATS.find(c => c.id === chatId);
  if (!chat || !chat.isGroup) return;

  const member = chat.members.find(m => m.id === memberId);
  if (!member) return;

  const isAdmin = member.role === 'admin';
  const action = confirm(
    `Admin Controls for ${member.name}:\n\n` +
    `1. Click OK to ${isAdmin ? 'Dismiss as Group Admin' : 'Make Group Admin'}\n` +
    `2. Or click CANCEL if you wish to Remove this user from the group?`
  );

  if (action) {
    // Toggle Admin status
    member.role = isAdmin ? 'member' : 'admin';
    alert(`${member.name} is now ${member.role === 'admin' ? 'a Group Admin' : 'a regular Member'}.`);
  } else {
    // Prompt remove
    const removeConfirm = confirm(`Are you sure you want to remove ${member.name} from "${chat.name}"?`);
    if (removeConfirm) {
      chat.members = chat.members.filter(m => m.id !== memberId);
      chat.messages.push({
        id: 'sys_' + Date.now(),
        sender: 'System',
        text: `You removed ${member.name} from the group.`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }).toLowerCase(),
        status: 'read'
      });
      renderMessages(chat);
      alert(`${member.name} has been removed.`);
    }
  }

  // Refresh Drawer
  openInfoDrawer();
}

// Add User to Group from drawer
function handleAddUserToGroup() {
  const chat = MOCK_CHATS.find(c => c.id === activeChatId);
  if (!chat || !chat.isGroup) return;

  // Filter contacts not already in group
  const existingIds = chat.members.map(m => m.id);
  const candidates = AVAILABLE_CONTACTS.filter(c => !existingIds.includes(c.id));

  if (candidates.length === 0) {
    alert('All available contacts are already members of this group.');
    return;
  }

  const promptNames = candidates.map((c, i) => `${i + 1}. ${c.name}`).join('\n');
  const choice = prompt(`Select a user to add (Enter number 1-${candidates.length}):\n\n${promptNames}`);
  const idx = parseInt(choice, 10) - 1;

  if (!isNaN(idx) && idx >= 0 && idx < candidates.length) {
    const selected = candidates[idx];
    chat.members.push({
      id: selected.id,
      name: selected.name,
      role: 'member',
      phone: selected.phone
    });

    chat.messages.push({
      id: 'sys_' + Date.now(),
      sender: 'System',
      text: `You added ${selected.name} to the group.`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }).toLowerCase(),
      status: 'read'
    });

    renderMessages(chat);
    openInfoDrawer();
    alert(`Added ${selected.name} to "${chat.name}".`);
  }
}
