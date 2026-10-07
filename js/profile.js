// User Profile Drawer & Settings Logic

function initProfileModule() {
  const profileBtn = document.getElementById('rail-profile-btn');
  const profileDrawer = document.getElementById('profile-drawer');
  const closeProfileBtn = document.getElementById('profile-drawer-close');
  const themeToggleTopbar = document.getElementById('theme-toggle-topbar');

  // Open profile drawer
  if (profileBtn) {
    profileBtn.addEventListener('click', () => {
      openProfileDrawer();
    });
  }

  // Close profile drawer
  if (closeProfileBtn) {
    closeProfileBtn.addEventListener('click', () => {
      profileDrawer.classList.remove('open');
      if (profileBtn) profileBtn.classList.remove('active');
    });
  }

  // Theme toggle button
  if (themeToggleTopbar) {
    themeToggleTopbar.addEventListener('click', () => {
      toggleDarkTheme();
    });
  }

  // Load saved theme
  const savedTheme = localStorage.getItem('wa_theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeButtonUI(savedTheme);
}

// Open Profile Drawer
function openProfileDrawer() {
  const profileDrawer = document.getElementById('profile-drawer');
  const profileBtn = document.getElementById('rail-profile-btn');

  const avatarImg = document.getElementById('profile-avatar-img');
  const nameInput = document.getElementById('profile-name-val');
  const aboutInput = document.getElementById('profile-about-val');
  const phoneText = document.getElementById('profile-phone-val');

  avatarImg.src = MOCK_CURRENT_USER.avatar;
  nameInput.textContent = MOCK_CURRENT_USER.name;
  aboutInput.textContent = MOCK_CURRENT_USER.about;
  phoneText.textContent = MOCK_CURRENT_USER.phone;

  profileDrawer.classList.add('open');
  if (profileBtn) profileBtn.classList.add('active');
}

// Edit Profile Name
function handleEditProfileName() {
  const current = MOCK_CURRENT_USER.name;
  const newName = prompt('Enter your new name:', current);
  if (newName && newName.trim()) {
    MOCK_CURRENT_USER.name = newName.trim();
    document.getElementById('profile-name-val').textContent = MOCK_CURRENT_USER.name;
  }
}

// Edit Profile About
function handleEditProfileAbout() {
  const current = MOCK_CURRENT_USER.about;
  const newAbout = prompt('Enter your status / about message:', current);
  if (newAbout && newAbout.trim()) {
    MOCK_CURRENT_USER.about = newAbout.trim();
    document.getElementById('profile-about-val').textContent = MOCK_CURRENT_USER.about;
  }
}

// Dark Mode Toggle
function toggleDarkTheme() {
  const current = document.documentElement.getAttribute('data-theme') || 'light';
  const newTheme = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('wa_theme', newTheme);
  updateThemeButtonUI(newTheme);
}

function updateThemeButtonUI(theme) {
  const btn = document.getElementById('theme-toggle-topbar');
  if (!btn) return;
  if (theme === 'dark') {
    btn.innerHTML = `
      <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1z"/></svg>
      <span>Light Mode</span>
    `;
  } else {
    btn.innerHTML = `
      <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9c0-.46-.04-.92-.1-1.36-.98 1.37-2.58 2.26-4.4 2.26-3.03 0-5.5-2.47-5.5-5.5 0-1.82.89-3.42 2.26-4.4-.44-.06-.9-.1-1.36-.1z"/></svg>
      <span>Dark Mode</span>
    `;
  }
}
