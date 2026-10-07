// Realistic Mock Data for WhatsApp Web Application
// Avatars crafted with clean URL-encoded SVGs matching the characters from the reference screenshot

function makeSvgAvatar(svgString) {
  return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgString);
}

// 1. Mama: Blue hijab/headscarf portrait matching screenshot
const AVATAR_MAMA = makeSvgAvatar(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
  <defs>
    <linearGradient id="mamaBg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#1e3a8a"/>
      <stop offset="100%" stop-color="#0284c7"/>
    </linearGradient>
    <linearGradient id="hijab" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#1d4ed8"/>
      <stop offset="60%" stop-color="#2563eb"/>
      <stop offset="100%" stop-color="#1e40af"/>
    </linearGradient>
  </defs>
  <circle cx="50" cy="50" r="50" fill="url(#mamaBg)"/>
  <!-- Hijab wrap -->
  <path d="M50 14 C30 14 22 28 22 48 C22 72 32 88 50 88 C68 88 78 72 78 48 C78 28 70 14 50 14 Z" fill="url(#hijab)"/>
  <!-- Face oval -->
  <ellipse cx="54" cy="50" rx="16" ry="22" fill="#fde68a"/>
  <!-- Inner hijab shadow -->
  <path d="M38 42 C38 32 46 26 54 26 C62 26 68 32 68 42 C62 38 46 38 38 42 Z" fill="#1e3a8a" opacity="0.3"/>
  <!-- Eyes -->
  <ellipse cx="50" cy="46" rx="2" ry="2.5" fill="#1e293b"/>
  <ellipse cx="60" cy="46" rx="2" ry="2.5" fill="#1e293b"/>
  <!-- Smile -->
  <path d="M51 58 Q55 63 60 58" stroke="#b45309" stroke-width="2" fill="none" stroke-linecap="round"/>
  <!-- Soft cheek blush -->
  <circle cx="48" cy="53" r="3" fill="#f87171" opacity="0.4"/>
  <circle cx="62" cy="53" r="3" fill="#f87171" opacity="0.4"/>
  <!-- Hijab chest folds -->
  <path d="M22 68 C22 68 36 94 54 94 C72 94 80 72 80 72 C80 92 68 100 50 100 C32 100 20 92 22 68 Z" fill="#1e40af"/>
</svg>`);

// 2. Lubna: Stylish portrait in dark blazer matching screenshot
const AVATAR_LUBNA = makeSvgAvatar(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
  <defs>
    <linearGradient id="lubnaBg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#475569"/>
      <stop offset="100%" stop-color="#1e293b"/>
    </linearGradient>
  </defs>
  <circle cx="50" cy="50" r="50" fill="url(#lubnaBg)"/>
  <!-- Person in dark attire -->
  <ellipse cx="50" cy="40" rx="15" ry="18" fill="#fcd34d"/>
  <!-- Dark hair -->
  <path d="M34 38 C34 24 42 18 50 18 C58 18 66 24 66 38 C62 30 38 30 34 38 Z" fill="#09090b"/>
  <!-- Sunglasses -->
  <rect x="40" y="36" width="9" height="7" rx="2" fill="#09090b"/>
  <rect x="51" y="36" width="9" height="7" rx="2" fill="#09090b"/>
  <line x1="49" y1="39" x2="51" y2="39" stroke="#09090b" stroke-width="2"/>
  <!-- Black jacket -->
  <path d="M20 92 C24 68 36 60 50 60 C64 60 76 68 80 92 Z" fill="#09090b"/>
  <path d="M44 60 L50 76 L56 60 Z" fill="#ffffff"/>
</svg>`);

// 3. Uzma Ijaz: Gentle soft hijab matching screenshot
const AVATAR_UZMA = makeSvgAvatar(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
  <defs>
    <linearGradient id="uzmaBg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#701a75"/>
      <stop offset="100%" stop-color="#a21caf"/>
    </linearGradient>
  </defs>
  <circle cx="50" cy="50" r="50" fill="url(#uzmaBg)"/>
  <!-- Warm mauve/sand hijab -->
  <path d="M50 16 C32 16 26 28 26 50 C26 74 34 88 50 88 C66 88 74 74 74 50 C74 28 68 16 50 16 Z" fill="#d6d3d1"/>
  <ellipse cx="49" cy="48" rx="14" ry="19" fill="#fed7aa"/>
  <ellipse cx="45" cy="45" rx="1.8" ry="2" fill="#44403c"/>
  <ellipse cx="53" cy="45" rx="1.8" ry="2" fill="#44403c"/>
  <path d="M46 54 Q49 57 52 54" stroke="#78350f" stroke-width="1.8" fill="none" stroke-linecap="round"/>
  <!-- Dress wrap -->
  <path d="M22 84 C26 66 38 68 50 68 C62 68 74 66 78 84 C72 96 62 100 50 100 C38 100 28 96 22 84 Z" fill="#a8a29e"/>
</svg>`);

// 4. Dada: Elderly grandfather with white beard matching screenshot
const AVATAR_DADA = makeSvgAvatar(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
  <defs>
    <linearGradient id="dadaBg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#b45309"/>
      <stop offset="100%" stop-color="#78350f"/>
    </linearGradient>
  </defs>
  <circle cx="50" cy="50" r="50" fill="url(#dadaBg)"/>
  <ellipse cx="50" cy="40" rx="16" ry="20" fill="#fde68a"/>
  <!-- Eyes -->
  <circle cx="45" cy="38" r="2" fill="#374151"/>
  <circle cx="55" cy="38" r="2" fill="#374151"/>
  <!-- White beard -->
  <path d="M37 44 C37 68 45 78 50 78 C55 78 63 68 63 44 C61 50 50 54 37 44 Z" fill="#f8fafc"/>
  <!-- White hair -->
  <path d="M34 36 C34 22 42 16 50 16 C58 16 66 22 66 36 C64 26 36 26 34 36 Z" fill="#f1f5f9"/>
  <!-- Grey traditional shirt -->
  <path d="M22 92 C26 72 38 66 50 66 C62 66 74 72 78 92 Z" fill="#475569"/>
</svg>`);

// 5. Muneeba: Artistic portrait matching screenshot
const AVATAR_MUNEEBA = makeSvgAvatar(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
  <defs>
    <linearGradient id="munBg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#047857"/>
      <stop offset="100%" stop-color="#064e3b"/>
    </linearGradient>
  </defs>
  <circle cx="50" cy="50" r="50" fill="url(#munBg)"/>
  <!-- Face -->
  <ellipse cx="50" cy="42" rx="14" ry="17" fill="#fed7aa"/>
  <!-- Dark curly hair -->
  <path d="M30 42 C28 24 38 18 50 18 C62 18 72 24 70 42 C68 56 64 64 64 64 C64 64 58 50 50 50 C42 50 36 64 36 64 C36 64 32 56 30 42 Z" fill="#18181b"/>
  <!-- Eyes -->
  <circle cx="45" cy="40" r="2" fill="#18181b"/>
  <circle cx="55" cy="40" r="2" fill="#18181b"/>
  <path d="M47 48 Q50 51 53 48" stroke="#ea580c" stroke-width="1.5" fill="none" stroke-linecap="round"/>
  <!-- Green top -->
  <path d="M24 92 C28 72 38 66 50 66 C62 66 72 72 76 92 Z" fill="#10b981"/>
</svg>`);

// 6. Danyal: Young man portrait matching screenshot
const AVATAR_DANYAL = makeSvgAvatar(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
  <defs>
    <linearGradient id="danBg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#18181b"/>
      <stop offset="100%" stop-color="#3f3f46"/>
    </linearGradient>
  </defs>
  <circle cx="50" cy="50" r="50" fill="url(#danBg)"/>
  <ellipse cx="50" cy="44" rx="15" ry="19" fill="#fed7aa"/>
  <!-- Modern hair -->
  <path d="M32 38 C32 20 40 16 52 16 C62 16 68 22 66 36 C60 28 38 28 32 38 Z" fill="#09090b"/>
  <circle cx="45" cy="42" r="2" fill="#09090b"/>
  <circle cx="55" cy="42" r="2" fill="#09090b"/>
  <path d="M46 51 Q50 54 54 51" stroke="#b45309" stroke-width="1.6" fill="none" stroke-linecap="round"/>
  <!-- Dark jacket -->
  <path d="M22 92 C26 70 38 64 50 64 C62 64 74 70 78 92 Z" fill="#27272a"/>
</svg>`);

// 7. Urooj: Warm sunset portrait matching screenshot
const AVATAR_UROOJ = makeSvgAvatar(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
  <defs>
    <linearGradient id="uroojBg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#f97316"/>
      <stop offset="100%" stop-color="#db2777"/>
    </linearGradient>
  </defs>
  <circle cx="50" cy="50" r="50" fill="url(#uroojBg)"/>
  <ellipse cx="50" cy="42" rx="14" ry="18" fill="#fde68a"/>
  <!-- Hijab in soft cream -->
  <path d="M50 16 C34 16 28 28 28 48 C28 72 36 86 50 86 C64 86 72 72 72 48 C72 28 66 16 50 16 Z" fill="#ffedd5"/>
  <ellipse cx="49" cy="45" rx="12" ry="16" fill="#fed7aa"/>
  <circle cx="45" cy="42" r="1.8" fill="#451a03"/>
  <circle cx="53" cy="42" r="1.8" fill="#451a03"/>
  <path d="M46 51 Q49 54 52 51" stroke="#9a3412" stroke-width="1.5" fill="none" stroke-linecap="round"/>
  <!-- Outfit -->
  <path d="M22 90 C26 70 38 66 50 66 C62 66 74 70 78 90 Z" fill="#ffffff"/>
</svg>`);

// Current user avatar
const AVATAR_ME = makeSvgAvatar(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
  <defs>
    <linearGradient id="meBg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#2b5876"/>
      <stop offset="100%" stop-color="#4e4376"/>
    </linearGradient>
  </defs>
  <circle cx="50" cy="50" r="50" fill="url(#meBg)"/>
  <circle cx="50" cy="38" r="18" fill="#e0e7ff"/>
  <path d="M22 84 C27 66 42 62 50 62 C58 62 73 66 78 84 Z" fill="#e0e7ff"/>
</svg>`);

const MOCK_CURRENT_USER = {
  id: 'user_me',
  name: 'Alex Morgan',
  phone: '+1 (555) 382-9012',
  about: 'Hey there! I am using WhatsApp.',
  status: 'Online',
  avatar: AVATAR_ME
};

const MOCK_CHATS = [
  {
    id: 'chat_1',
    type: 'direct',
    name: 'Mama',
    phone: '+1 (555) 201-4491',
    about: 'Family first ❤️',
    avatar: AVATAR_MAMA,
    timestamp: '11:36 pm',
    lastMessage: {
      type: 'audio',
      text: 'Voice message (0:22)',
      duration: '0:22',
      sender: 'me',
      status: 'read',
      time: '11:36 pm'
    },
    unreadCount: 0,
    isOnline: true,
    isPinned: true,
    category: 'all',
    messages: [
      {
        id: 'm1_1',
        sender: 'contact',
        text: 'Assalam u Alaikum! Did you reach home safely?',
        time: '11:30 pm',
        status: 'read'
      },
      {
        id: 'm1_2',
        sender: 'me',
        text: 'Walaikum Assalam Mama! Yes just arrived 5 minutes ago.',
        time: '11:32 pm',
        status: 'read'
      },
      {
        id: 'm1_3',
        sender: 'contact',
        text: 'Good. Did you have your dinner yet?',
        time: '11:34 pm',
        status: 'read'
      },
      {
        id: 'm1_4',
        sender: 'me',
        type: 'audio',
        duration: '0:22',
        audioUrl: '#',
        time: '11:36 pm',
        status: 'read',
        reaction: null
      }
    ]
  },
  {
    id: 'chat_2',
    type: 'direct',
    name: 'Lubna ..☀️..',
    phone: '+1 (555) 843-1102',
    about: 'Radiating positivity ✨',
    avatar: AVATAR_LUBNA,
    timestamp: '11:13 am',
    lastMessage: {
      type: 'reaction',
      reactionEmoji: '😢',
      reactedTo: 'wallah 😌',
      text: 'You reacted 😢 to: "wallah 😌"',
      sender: 'me',
      time: '11:13 am'
    },
    unreadCount: 0,
    isOnline: false,
    category: 'all',
    messages: [
      {
        id: 'm2_1',
        sender: 'contact',
        text: 'Are you joining the seminar tomorrow morning?',
        time: '10:58 am',
        status: 'read'
      },
      {
        id: 'm2_2',
        sender: 'me',
        text: 'I wish I could, got stuck in the project deadline.',
        time: '11:05 am',
        status: 'read'
      },
      {
        id: 'm2_3',
        sender: 'contact',
        text: 'wallah 😌',
        time: '11:10 am',
        status: 'read',
        reaction: '😢'
      }
    ]
  },
  {
    id: 'chat_3',
    type: 'direct',
    name: 'Uzma Ijaz',
    phone: '+1 (555) 672-9011',
    about: 'Silent gratitude 🌸',
    avatar: AVATAR_UZMA,
    timestamp: '10:44 am',
    lastMessage: {
      type: 'reaction',
      reactionEmoji: '🙃',
      reactedTo: 'Lines...👀😍',
      text: 'You reacted 🙃 to: "Lines...👀😍"',
      sender: 'me',
      time: '10:44 am'
    },
    unreadCount: 0,
    isOnline: false,
    category: 'all',
    messages: [
      {
        id: 'm3_1',
        sender: 'contact',
        text: 'Check out the new design poetry collection I posted!',
        time: '10:40 am',
        status: 'read'
      },
      {
        id: 'm3_2',
        sender: 'contact',
        text: 'Lines...👀😍',
        time: '10:42 am',
        status: 'read',
        reaction: '🙃'
      }
    ]
  },
  {
    id: 'chat_4',
    type: 'direct',
    name: 'Dada',
    phone: '+1 (555) 431-7788',
    about: 'Blessings for all 🤲',
    avatar: AVATAR_DADA,
    timestamp: '9:28 am',
    lastMessage: {
      type: 'call',
      callType: 'voice',
      text: 'Voice call',
      time: '9:28 am'
    },
    unreadCount: 0,
    isOnline: true,
    category: 'all',
    messages: [
      {
        id: 'm4_1',
        sender: 'contact',
        text: 'Good morning child. How is your work going?',
        time: '9:15 am',
        status: 'read'
      },
      {
        id: 'm4_2',
        sender: 'me',
        text: 'Good morning Dada! Going really well, thank you!',
        time: '9:18 am',
        status: 'read'
      },
      {
        id: 'm4_3',
        sender: 'contact',
        type: 'call_log',
        callType: 'voice',
        text: 'Voice call • 4 mins',
        time: '9:28 am'
      }
    ]
  },
  {
    id: 'chat_5',
    type: 'direct',
    name: 'Muneeba',
    phone: '+1 (555) 912-3344',
    about: 'Art & sketching ✨',
    avatar: AVATAR_MUNEEBA,
    timestamp: '9:27 am',
    lastMessage: {
      type: 'reaction_received',
      reactionEmoji: '❤️',
      reactedTo: '😅😂',
      text: 'Reacted ❤️ to: "😅😂"',
      sender: 'contact',
      time: '9:27 am'
    },
    unreadCount: 0,
    isOnline: false,
    category: 'all',
    messages: [
      {
        id: 'm5_1',
        sender: 'me',
        text: 'Did you see the meme I forwarded in the group?',
        time: '9:22 am',
        status: 'read'
      },
      {
        id: 'm5_2',
        sender: 'me',
        text: '😅😂',
        time: '9:24 am',
        status: 'read',
        reaction: '❤️'
      }
    ]
  },
  {
    id: 'chat_6',
    type: 'direct',
    name: 'Danyal',
    phone: '+1 (555) 554-9921',
    about: 'Code, coffee, repeat ☕',
    avatar: AVATAR_DANYAL,
    timestamp: '9:25 am',
    lastMessage: {
      type: 'reaction',
      reactionEmoji: '👍',
      reactedTo: 'Ok',
      text: 'You reacted 👍 to: "Ok"',
      sender: 'me',
      time: '9:25 am'
    },
    unreadCount: 0,
    isOnline: false,
    category: 'all',
    messages: [
      {
        id: 'm6_1',
        sender: 'me',
        text: 'Hey Danyal, pushed the latest commit to our frontend repo.',
        time: '9:20 am',
        status: 'read'
      },
      {
        id: 'm6_2',
        sender: 'contact',
        text: 'Ok',
        time: '9:24 am',
        status: 'read',
        reaction: '👍'
      }
    ]
  },
  {
    id: 'chat_7',
    type: 'direct',
    name: 'Urooj💕💕',
    phone: '+1 (555) 773-8219',
    about: 'Forever grateful 🌸🕊️',
    avatar: AVATAR_UROOJ,
    timestamp: '3:19 am',
    lastMessage: {
      type: 'audio',
      text: 'Voice message (0:21)',
      duration: '0:21',
      sender: 'me',
      status: 'read',
      time: '3:19 am'
    },
    unreadCount: 0,
    isOnline: false,
    category: 'all',
    messages: [
      {
        id: 'm7_1',
        sender: 'contact',
        text: 'Have a safe flight tomorrow! Remember to call when you land.',
        time: '3:15 am',
        status: 'read'
      },
      {
        id: 'm7_2',
        sender: 'me',
        type: 'audio',
        duration: '0:21',
        time: '3:19 am',
        status: 'read'
      }
    ]
  },
  {
    id: 'chat_8',
    type: 'group',
    name: 'Tech Innovators & UI 🚀',
    description: 'Frontend and web app architecture discussions. Admins manage members.',
    avatar: makeSvgAvatar(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
        <circle cx="50" cy="50" r="50" fill="#0284c7"/>
        <path d="M35 65 L50 35 L65 65 Z" fill="#ffffff"/>
        <circle cx="50" cy="30" r="8" fill="#38bdf8"/>
        <circle cx="30" cy="65" r="7" fill="#38bdf8"/>
        <circle cx="70" cy="65" r="7" fill="#38bdf8"/>
      </svg>`),
    timestamp: 'Yesterday',
    lastMessage: {
      type: 'text',
      text: 'David: Lato font looks so clean on WhatsApp desktop!',
      sender: 'David Chen',
      time: 'Yesterday'
    },
    unreadCount: 3,
    isOnline: false,
    isGroup: true,
    category: 'groups',
    members: [
      { id: 'user_me', name: 'Alex Morgan (You)', role: 'admin', phone: '+1 (555) 382-9012' },
      { id: 'user_david', name: 'David Chen', role: 'admin', phone: '+1 (555) 778-9901' },
      { id: 'user_sarah', name: 'Sarah Miller', role: 'member', phone: '+1 (555) 332-1144' },
      { id: 'user_elena', name: 'Elena Rostova', role: 'member', phone: '+1 (555) 887-2200' },
      { id: 'user_marcus', name: 'Marcus Vance', role: 'member', phone: '+1 (555) 124-6677' }
    ],
    messages: [
      {
        id: 'mg_1',
        sender: 'David Chen',
        senderId: 'user_david',
        senderColor: '#e11d48',
        text: 'Welcome team to the WhatsApp UI refactor workspace!',
        time: '10:00 am',
        status: 'read'
      },
      {
        id: 'mg_2',
        sender: 'Sarah Miller',
        senderId: 'user_sarah',
        senderColor: '#059669',
        text: 'Lato font looks so clean on WhatsApp desktop!',
        time: '10:14 am',
        status: 'read'
      }
    ]
  },
  {
    id: 'chat_9',
    type: 'direct',
    name: 'Sarah Miller',
    phone: '+1 (555) 332-1144',
    about: 'Design lead @ Studio',
    avatar: makeSvgAvatar(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
        <circle cx="50" cy="50" r="50" fill="#7c3aed"/>
        <circle cx="50" cy="38" r="16" fill="#fed7aa"/>
        <path d="M25 86 C30 69 44 65 50 65 C56 65 70 69 75 86 Z" fill="#a855f7"/>
      </svg>`),
    timestamp: 'Yesterday',
    lastMessage: {
      type: 'text',
      text: 'Loved the prototype presentation today!',
      sender: 'contact',
      time: 'Yesterday'
    },
    unreadCount: 1,
    isOnline: true,
    category: 'unread',
    messages: [
      {
        id: 'ms_1',
        sender: 'contact',
        text: 'Hey Alex! Loved the prototype presentation today!',
        time: '5:45 pm',
        status: 'read'
      }
    ]
  }
];

const MOCK_CHANNELS = [
  {
    id: 'chan_1',
    name: 'WhatsApp Official',
    verified: true,
    followers: '142M followers',
    avatar: 'Assets/whatsapp_logo.svg',
    description: 'The official WhatsApp channel for company updates, feature drops, and security notices.',
    isFollowing: true,
    posts: [
      {
        id: 'cp_1',
        text: '🚀 Introducing enhanced channel discovery and voice message speed controls across desktop and web.',
        time: 'Today, 2:15 pm',
        views: '3.4M',
        reactions: [
          { emoji: '🔥', count: 18230 },
          { emoji: '💚', count: 42100 },
          { emoji: '🎉', count: 9540 }
        ]
      },
      {
        id: 'cp_2',
        text: '🔒 Privacy reminder: Your personal messages remain protected with end-to-end encryption by default.',
        time: 'Yesterday',
        views: '5.1M',
        reactions: [
          { emoji: '👍', count: 52000 },
          { emoji: '🔒', count: 31000 }
        ]
      }
    ]
  },
  {
    id: 'chan_2',
    name: 'Tech & AI Insights',
    verified: true,
    followers: '28M followers',
    avatar: makeSvgAvatar(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
        <circle cx="50" cy="50" r="50" fill="#6366f1"/>
        <rect x="30" y="35" width="40" height="30" rx="4" fill="#ffffff"/>
        <circle cx="40" cy="50" r="4" fill="#6366f1"/>
        <circle cx="60" cy="50" r="4" fill="#6366f1"/>
      </svg>`),
    description: 'Curated daily breakthroughs in artificial intelligence, software engineering, and hardware.',
    isFollowing: true,
    posts: [
      {
        id: 'cp_3',
        text: '💡 WebAssembly 2.0 and native WebGPU are revolutionizing browser-based AI inference performance.',
        time: 'Today, 10:40 am',
        views: '840K',
        reactions: [
          { emoji: '🚀', count: 12400 },
          { emoji: '👏', count: 6200 }
        ]
      }
    ]
  },
  {
    id: 'chan_3',
    name: 'Design Digest & UI',
    verified: false,
    followers: '4.9M followers',
    avatar: makeSvgAvatar(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
        <circle cx="50" cy="50" r="50" fill="#ec4899"/>
        <polygon points="50,20 80,75 20,75" fill="#ffffff"/>
      </svg>`),
    description: 'UI/UX inspiration, typography pairings, design tokens, and frontend styling showcases.',
    isFollowing: false,
    posts: [
      {
        id: 'cp_4',
        text: '🎨 Typography in UI: Why clean sans-serif typefaces like Lato improve scanability in messaging interfaces.',
        time: '3 days ago',
        views: '190K',
        reactions: [
          { emoji: '❤️', count: 4800 },
          { emoji: '✨', count: 2900 }
        ]
      }
    ]
  }
];

const MOCK_STATUSES = [
  {
    id: 'status_me',
    isUser: true,
    name: 'My status',
    time: 'Tap to add status update',
    avatar: AVATAR_ME,
    stories: []
  },
  {
    id: 'status_lubna',
    name: 'Lubna ..☀️..',
    time: '24 minutes ago',
    avatar: AVATAR_LUBNA,
    hasUnseen: true,
    stories: [
      {
        id: 's1',
        type: 'image',
        caption: 'Morning sunshine and serene beginnings ☀️☕',
        bgColor: 'linear-gradient(135deg, #f59e0b, #d97706)',
        time: '24 minutes ago'
      },
      {
        id: 's2',
        type: 'text',
        text: '“Every day is a fresh opportunity to learn and grow.” ✨',
        bgColor: 'linear-gradient(135deg, #0284c7, #0369a1)',
        time: '18 minutes ago'
      }
    ]
  },
  {
    id: 'status_mama',
    name: 'Mama',
    time: '2 hours ago',
    avatar: AVATAR_MAMA,
    hasUnseen: true,
    stories: [
      {
        id: 's3',
        type: 'text',
        text: '🌸 Home sweet home. Blessed day to all our loved ones!',
        bgColor: 'linear-gradient(135deg, #059669, #047857)',
        time: '2 hours ago'
      }
    ]
  },
  {
    id: 'status_urooj',
    name: 'Urooj💕💕',
    time: '5 hours ago',
    avatar: AVATAR_UROOJ,
    hasUnseen: false,
    stories: [
      {
        id: 's4',
        type: 'text',
        text: '✈️ Safe travels ahead! Karachi bound for the weekend!',
        bgColor: 'linear-gradient(135deg, #db2777, #9d174d)',
        time: '5 hours ago'
      }
    ]
  }
];

const MOCK_CALLS = [
  {
    id: 'call_1',
    name: 'Dada',
    avatar: AVATAR_DADA,
    type: 'voice',
    direction: 'incoming',
    statusText: 'Incoming',
    time: 'Today, 9:28 am',
    duration: '4m 12s'
  },
  {
    id: 'call_2',
    name: 'Mama',
    avatar: AVATAR_MAMA,
    type: 'video',
    direction: 'outgoing',
    statusText: 'Outgoing',
    time: 'Yesterday, 8:40 pm',
    duration: '18m 05s'
  },
  {
    id: 'call_3',
    name: 'Sarah Miller',
    avatar: makeSvgAvatar(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
        <circle cx="50" cy="50" r="50" fill="#7c3aed"/>
        <circle cx="50" cy="38" r="16" fill="#fed7aa"/>
        <path d="M25 86 C30 69 44 65 50 65 C56 65 70 69 75 86 Z" fill="#a855f7"/>
      </svg>`),
    type: 'voice',
    direction: 'missed',
    statusText: 'Missed',
    time: 'Yesterday, 4:15 pm',
    duration: null
  },
  {
    id: 'call_4',
    name: 'Danyal',
    avatar: AVATAR_DANYAL,
    type: 'video',
    direction: 'outgoing',
    statusText: 'Outgoing',
    time: 'May 18, 2:30 pm',
    duration: '12m 44s'
  }
];

// Available users to add to groups
const AVAILABLE_CONTACTS = [
  { id: 'user_david', name: 'David Chen', phone: '+1 (555) 778-9901', avatar: AVATAR_DANYAL },
  { id: 'user_sarah', name: 'Sarah Miller', phone: '+1 (555) 332-1144', avatar: AVATAR_UZMA },
  { id: 'user_elena', name: 'Elena Rostova', phone: '+1 (555) 887-2200', avatar: AVATAR_UROOJ },
  { id: 'user_marcus', name: 'Marcus Vance', phone: '+1 (555) 124-6677', avatar: AVATAR_DADA },
  { id: 'user_muneeba', name: 'Muneeba', phone: '+1 (555) 912-3344', avatar: AVATAR_MUNEEBA },
  { id: 'user_lubna', name: 'Lubna ..☀️..', phone: '+1 (555) 843-1102', avatar: AVATAR_LUBNA }
];
