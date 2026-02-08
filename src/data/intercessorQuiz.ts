export interface QuizQuestion {
  id: string;
  question: string;
  answers: {
    text: string;
    type: IntercessorType;
  }[];
}

export type IntercessorType = 
  | 'warrior' 
  | 'compassionate' 
  | 'prophetic' 
  | 'priestly' 
  | 'watchman' 
  | 'burden-bearer' 
  | 'strategic';

export interface IntercessorTypeProfile {
  type: IntercessorType;
  name: string;
  title: string;
  description: string;
  strengths: string[];
  challenges: string[];
  bestPrayerFor: string[];
  biblicalExample: string;
  scriptureReference: string;
  advice: string;
}

export const intercessorTypeProfiles: Record<IntercessorType, IntercessorTypeProfile> = {
  warrior: {
    type: 'warrior',
    name: 'The Warrior Intercessor',
    title: 'Bold Spiritual Warrior',
    description: 'You are bold, aggressive in spiritual warfare, and take authority in prayer. You take the fight directly to the enemy with boldness and faith, commanding spiritual forces to bow before Jesus.',
    strengths: [
      'Take decisive authority in prayer',
      'Not intimidated by spiritual opposition',
      'Command breakthroughs with confidence',
      'Excel at dealing with strongholds',
      'Fearless in confronting evil',
      'Mobilize others to spiritual action'
    ],
    challenges: [
      'May come across as too aggressive',
      'Could neglect the emotional/compassion side',
      'Risk burnout from constant warfare mentality',
      'Need balance with gentleness',
      'May underestimate the power of waiting',
      'Can appear insensitive to those still struggling'
    ],
    bestPrayerFor: [
      'Spiritual strongholds',
      'Demonic oppression',
      'Breaking curses',
      'Cities under darkness',
      'Breakthrough situations',
      'Deliverance work'
    ],
    biblicalExample: 'Elijah - He prayed boldly, commanded nature, and confronted evil without apology',
    scriptureReference: 'Ephesians 6:12, 2 Corinthians 10:4-5, Colossians 2:15',
    advice: 'Balance your boldness with compassion. Remember that warfare prayer is ultimately about restoration and redemption. Learn to listen for God\'s still small voice alongside speaking with authority. Your fearlessness is needed—use it wisely.'
  },

  compassionate: {
    type: 'compassionate',
    name: 'The Compassionate Intercessor',
    title: 'Mercy-Focused Prayer Warrior',
    description: 'You feel deeply for others and intercede from a heart overflowing with compassion. You weep for the broken, the suffering, and the lost. Your prayers are tender, empathetic, and focused on God\'s mercy.',
    strengths: [
      'Feel what others feel',
      'Intercede with deep empathy',
      'Bring God\'s mercy into situations',
      'Comfort the suffering through prayer',
      'Naturally attract prayer partners',
      'Understand spiritual pain intimately'
    ],
    challenges: [
      'Can absorb others\' pain too deeply',
      'Risk emotional burnout',
      'May struggle with boundaries',
      'Could become overwhelmed by suffering',
      'Need to balance mercy with justice',
      'May neglect self-care'
    ],
    bestPrayerFor: [
      'The suffering and brokenhearted',
      'Families in crisis',
      'The addicted',
      'The abused',
      'Nations in poverty',
      'Personal restoration prayers'
    ],
    biblicalExample: 'Jesus - He wept over Jerusalem and carried compassion for the lost. His intercession was rooted in love for people.',
    scriptureReference: 'Matthew 9:36, Luke 19:41-42, Romans 12:15, Hebrews 4:15',
    advice: 'Your gift is precious. But protect your own heart. Don\'t absorb pain meant for Jesus. Learn to intercede with your feelings but from a place of faith in God\'s power. You balance needed spiritual warfare—remember that triumph and restoration matter too.'
  },

  prophetic: {
    type: 'prophetic',
    name: 'The Prophetic Intercessor',
    title: 'Prophetic Prayer Seer',
    description: 'You receive visions, words of knowledge, and prophetic insights while praying. You perceive spiritual realities others miss and intercede based on what God reveals to you.',
    strengths: [
      'Receive divine revelation in prayer',
      'See spiritual realities others miss',
      'Pray with prophetic accuracy',
      'Perceive God\'s future purposes',
      'Guide others with spiritual insight',
      'Ambassador between heaven and earth'
    ],
    challenges: [
      'Risk misinterpreting what you see',
      'Could become overly focused on the mystical',
      'Need accountability for revelations',
      'May struggle to communicate clearly',
      'Temptation to make decisions based on feelings',
      'Need to balance revelation with Scripture'
    ],
    bestPrayerFor: [
      'Strategic spiritual direction',
      'Prophetic intercession for nations',
      'Church leadership and vision',
      'Discerning God\'s purposes',
      'Breaking false prophetic words',
      'Spiritual direction for others'
    ],
    biblicalExample: 'John the beloved - He received the Revelation through prayer and intercession, seeing what the Spirit revealed',
    scriptureReference: '1 Corinthians 14:1-5, Ephesians 1:17-19, Revelation 1:10',
    advice: 'Test all revelations against Scripture. Seek mature leaders to help confirm what you\'re seeing. Don\'t rush to announce everything you perceive—pray first. Your gift is invaluable, but always submit to the Word of God and the body of Christ.'
  },

  priestly: {
    type: 'priestly',
    name: 'The Priestly Intercessor',
    title: 'Traditional Intercessor',
    description: 'You naturally function as a priest before God, representing others and standing in the gap. You intercede earnestly, methodically, and with devotion to your intercession assignment.',
    strengths: [
      'Represent others effectively',
      'Stand faithfully in the gap',
      'Consistent prayer discipline',
      'Devoted to your assignments',
      'Understand spiritual representation',
      'Build lasting prayer foundations'
    ],
    challenges: [
      'Can become mechanical in prayer',
      'May miss God\'s leading for variation',
      'Risk becoming rigid in method',
      'Could lack spontaneity',
      'Need fresh encounters with God',
      'May need more faith activation'
    ],
    bestPrayerFor: [
      'Your family lineage',
      'Your church leadership',
      'Specific community assignments',
      'Ongoing intercession roles',
      'Generational blessings',
      'Institutional spiritual health'
    ],
    biblicalExample: 'Aaron - He functioned as priest, representing Israel before God, offering prayers and intercession for the people',
    scriptureReference: 'Hebrews 5:1-6, 1 Timothy 2:1-2, Revelation 1:6',
    advice: 'Your faithfulness is vital to the kingdom. Don\'t let your routine become dry—continually seek fresh encounters with God. Mix your devotion with spontaneity. Study other intercessors\' methods to expand your own prayer toolkit. Your steadiness holds much spiritual weight.'
  },

  watchman: {
    type: 'watchman',
    name: 'The Watchman Intercessor',
    title: 'Alert Spiritual Watchman',
    description: 'You are alert to spiritual dangers, aware of threats others miss, and quick to intercede against advancing darkness. You serve as a watchman on the wall, sounding the alarm.',
    strengths: [
      'Perceive spiritual dangers early',
      'Alert others to threats',
      'Quick response intercession',
      'Protective prayer coverage',
      'Spiritual discernment',
      'Prevention-focused prayers'
    ],
    challenges: [
      'Can become overly anxious',
      'Risk seeing danger everywhere',
      'May alarm others unnecessarily',
      'Could lack trust in God\'s protection',
      'Tendency toward paranoia',
      'Need balance with faith'
    ],
    bestPrayerFor: [
      'Protection intercession',
      'Discerning deception',
      'Guarding leaders and churches',
      'Detecting spiritual threats',
      'Preventing enemy advances',
      'Warning intercession'
    ],
    biblicalExample: 'Watchman Ezekiel - Called to stand watch and sound warnings of coming judgment; interceding for his nation',
    scriptureReference: 'Ezekiel 3:17, Isaiah 62:6, Psalm 91',
    advice: 'Your sensitivity to spiritual danger is a gift, but balance it with faith and God\'s promises of protection. Not everything you sense is a separate alarm—sometimes God wants you to trust. Channel your alertness into strategic intercession rather than constant worry. Your vigilance guards the kingdom.'
  },

  'burden-bearer': {
    type: 'burden-bearer',
    name: 'The Burden-Bearer Intercessor',
    title: 'Deep Empathy Intercessor',
    description: 'You carry deep burdens on your heart for people and situations. You feel the weight of intercession intensely and often carry physically manifested emotions while praying.',
    strengths: [
      'Carry prayer burdens intensely',
      'Intercede with whole-heart devotion',
      'Feel what God feels',
      'Willing to painful intercession',
      'Breakthrough through deep travail',
      'Carry others\' redemption on your heart'
    ],
    challenges: [
      'Risk extreme emotional exhaustion',
      'Absorb too much spiritual pain',
      'Can become depressed',
      'Need careful boundaries',
      'Risk health issues from stress',
      'May not know when to stop carrying'
    ],
    bestPrayerFor: [
      'Interceding for the lost',
      'Redemption and restoration',
      'Nations and cities',
      'Deep spiritual breakthroughs',
      'Generational transformation',
      'Drawing others to salvation'
    ],
    biblicalExample: 'Jeremiah - Called \"the weeping prophet,\" he carried profound burden for his nation and interceded through tears and anguish',
    scriptureReference: 'Jeremiah 9:1, Lamentations 3:48, Romans 9:2-3',
    advice: 'Your ability to carry burden is powerful, but don\'t carry what Jesus came to carry. Remember He bore our burdens at the cross. Take breaks. Rest. Let God restore your spirit. Your intercession births spiritual breakthrough—that\'s real, but you must protect your well-being. Find prayer partners to share the load.'
  },

  strategic: {
    type: 'strategic',
    name: 'The Strategic Intercessor',
    title: 'Focused Strategic Pray-er',
    description: 'You research, plan, and organize your intercession strategically. You pray with focused intent, using information and targeted approaches to intercede effectively.',
    strengths: [
      'Research-driven intercession',
      'Organized prayer campaigns',
      'Mobilize intercessors strategically',
      'Target-focused prayers',
      'Effective resource management',
      'Strategic prayer planning'
    ],
    challenges: [
      'Can become overly intellectual',
      'Risk neglecting spontaneous worship',
      'May miss God\'s still small voice',
      'Could be too calculated',
      'Need balance with intimacy',
      'Risk burnout from managing'
    ],
    bestPrayerFor: [
      'Organized prayer campaigns',
      'Research-based intercession',
      'Leadership and policy intercession',
      'Infrastructure prayer',
      'Coordinating prayer networks',
      'Long-term strategic initiatives'
    ],
    biblicalExample: 'Nehemiah - He studied the situation, created a strategic plan, and organized people for rebuilding. His prayer was focused and strategic.',
    scriptureReference: 'Nehemiah 1-4, Psalm 127:1',
    advice: 'Your organizational gift is invaluable to kingdom work. But don\'t let planning overshadow prayer. Balance your research with worship. Create space for the Holy Spirit to redirect your strategy. Your ability to mobilize others is needed—use it to bring effective intercessors into action. Remember: the work succeeds through prayer, not just planning.'
  }
};

export const quizQuestions: QuizQuestion[] = [
  {
    id: 'q1',
    question: 'When you encounter a problem, your first instinct is to:',
    answers: [
      { text: 'Take authority and command change', type: 'warrior' },
      { text: 'Feel deeply for those affected and intercede with compassion', type: 'compassionate' },
      { text: 'Wait for a vision or word from God about what to do', type: 'prophetic' },
      { text: 'Stand faithfully and represent them before God', type: 'priestly' },
      { text: 'Alert others to potential dangers ahead', type: 'watchman' },
      { text: 'Carry the burden on your heart until breakthrough', type: 'burden-bearer' },
      { text: 'Research and create a strategic plan for prayer', type: 'strategic' }
    ]
  },
  {
    id: 'q2',
    question: 'How do you experience God most powerfully in prayer?',
    answers: [
      { text: 'Declaring His authority and taking spiritual ground', type: 'warrior' },
      { text: 'Feeling His heart for the hurting through your own tears', type: 'compassionate' },
      { text: 'Receiving visions, words, and prophetic revelation', type: 'prophetic' },
      { text: 'Standing steadfast in devoted intercession', type: 'priestly' },
      { text: 'Perceiving spiritual dangers and discerning His protection', type: 'watchman' },
      { text: 'Groaning with Him, carrying deep intercessory burden', type: 'burden-bearer' },
      { text: 'Seeing how organized prayer directly impacts situations', type: 'strategic' }
    ]
  },
  {
    id: 'q3',
    question: 'What energizes you most in intercession?',
    answers: [
      { text: 'Breaking through spiritual opposition', type: 'warrior' },
      { text: 'Knowing you\'ve brought comfort through prayer', type: 'compassionate' },
      { text: 'Understanding what God is doing beyond the natural', type: 'prophetic' },
      { text: 'Being faithful to your intercession assignments', type: 'priestly' },
      { text: 'Warning others and providing spiritual protection', type: 'watchman' },
      { text: 'Feeling transformation happening through travail', type: 'burden-bearer' },
      { text: 'Coordinating effective prayer strategies', type: 'strategic' }
    ]
  },
  {
    id: 'q4',
    question: 'When facing resistance in prayer, you typically:',
    answers: [
      { text: 'Press harder and command the enemy back', type: 'warrior' },
      { text: 'Weep and intercede with more empathy', type: 'compassionate' },
      { text: 'Wait for God to reveal what\'s happening spiritually', type: 'prophetic' },
      { text: 'Persist faithfully in your intercession role', type: 'priestly' },
      { text: 'Discern what spiritual threat is blocking progress', type: 'watchman' },
      { text: 'Feel the weight more intensely and travail deeper', type: 'burden-bearer' },
      { text: 'Analyze the situation and adjust your prayer strategy', type: 'strategic' }
    ]
  },
  {
    id: 'q5',
    question: 'In your prayer group, you are known for:',
    answers: [
      { text: 'Leading authority prayers and breaking strongholds', type: 'warrior' },
      { text: 'Bringing warmth, care, and emotional awareness', type: 'compassionate' },
      { text: 'Receiving words and prophetic insights', type: 'prophetic' },
      { text: 'Faithful, consistent, devotional intercession', type: 'priestly' },
      { text: 'Alerting the group to spiritual dangers', type: 'watchman' },
      { text: 'Deep, travailing intercession that moves everyone', type: 'burden-bearer' },
      { text: 'Organizing prayer initiatives and coordinating efforts', type: 'strategic' }
    ]
  },
  {
    id: 'q6',
    question: 'What would hurt you most about your intercession?',
    answers: [
      { text: 'Not having authority or influence in prayer', type: 'warrior' },
      { text: 'Knowing people are suffering and not being helped', type: 'compassionate' },
      { text: 'Missing what God is trying to reveal to you', type: 'prophetic' },
      { text: 'Abandoning your intercession assignment', type: 'priestly' },
      { text: 'Allowing darkness to advance unchecked', type: 'watchman' },
      { text: 'Not being able to carry people through to breakthrough', type: 'burden-bearer' },
      { text: 'Ineffective prayer because of poor coordination', type: 'strategic' }
    ]
  }
];

export const calculateResults = (answers: Record<string, IntercessorType>) => {
  const typeCounts: Record<IntercessorType, number> = {
    warrior: 0,
    compassionate: 0,
    prophetic: 0,
    priestly: 0,
    watchman: 0,
    'burden-bearer': 0,
    strategic: 0
  };

  Object.values(answers).forEach(type => {
    typeCounts[type]++;
  });

  // Sort by count to find primary and secondary types
  const sorted = Object.entries(typeCounts)
    .sort(([, a], [, b]) => b - a) as [IntercessorType, number][];

  return {
    primary: sorted[0]?.[0],
    secondary: sorted[1]?.[0],
    scores: typeCounts
  };
};
