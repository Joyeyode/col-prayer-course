// Bible verse translations database
// Includes KJV, NIV, ESV, NKJV, NLT for core passages used in the course

export interface BibleVerse {
  reference: string;
  translations: {
    [key: string]: string;
  };
}

export const bibleMajorTranslations = [
  { code: 'KJV', name: 'King James Version', icon: '👑' },
  { code: 'NIV', name: 'New International Version', icon: '📖' },
  { code: 'ESV', name: 'English Standard Version', icon: '✨' },
  { code: 'NKJV', name: 'New King James Version', icon: '📕' },
  { code: 'NLT', name: 'New Living Translation', icon: '🌟' },
];

// Please note: In a production app, you would fetch these from a Bible API service
// like Bible.com API, ESV API, or YouVersion API. Here are example translations.
export const bibleVerses: BibleVerse[] = [
  {
    reference: '1 Thessalonians 5:17',
    translations: {
      KJV: 'Pray without ceasing.',
      NIV: 'Pray without ceasing.',
      ESV: 'Pray without ceasing.',
      NKJV: 'Pray without ceasing.',
      NLT: 'Never stop praying.',
    },
  },
  {
    reference: 'Ephesians 6:18',
    translations: {
      KJV: 'Praying always with all prayer and supplication in the Spirit, and watching thereunto with all perseverance and supplication for all saints;',
      NIV: 'And pray in the Spirit on all occasions with all kinds of prayers and petitions. Be alert and always keep on praying for all the Lord\'s people.',
      ESV: 'Praying at all times in the Spirit, with all prayer and supplication. To that end keep alert with all perseverance, making supplication for all the saints.',
      NKJV: 'Praying always with all prayer and supplication in the Spirit, being watchful to this end with all perseverance and supplication for all the saints—',
      NLT: 'Pray in the Spirit at all times and on every occasion with all kinds of prayers, staying alert and being persistent in your prayers for all believers everywhere.',
    },
  },
  {
    reference: 'Colossians 4:2',
    translations: {
      KJV: 'Continue in prayer, and watch in the same with thanksgiving;',
      NIV: 'Devote yourselves to prayer, being watchful and thankful.',
      ESV: 'Continue steadfastly in prayer, being watchful in it with thanksgiving.',
      NKJV: 'Continue earnestly in prayer, being vigilant in it with thanksgiving;',
      NLT: 'Devote yourselves to prayer with an alert mind and a thankful heart.',
    },
  },
  {
    reference: 'Romans 12:12',
    translations: {
      KJV: 'Rejoicing in hope; patient in tribulation; continuing instant in prayer;',
      NIV: 'Be joyful in hope, patient in affliction, faithful in prayer.',
      ESV: 'Rejoice in hope, be patient in tribulation, be constant in prayer.',
      NKJV: 'Rejoicing in hope, patient in tribulation, continuing steadfastly in prayer;',
      NLT: 'Rejoice in our confident hope. Be patient in trouble, and keep on praying.',
    },
  },
  {
    reference: '2 Chronicles 7:14',
    translations: {
      KJV: 'If my people, which are called by my name, shall humble themselves, and pray, and seek my face, and turn from their wicked ways; then will I hear from heaven, and will forgive their sin, and will heal their land.',
      NIV: '"If my people, who are called by my name, will humble themselves and pray and seek my face and turn from their wicked ways, then I will hear from heaven, and I will forgive their sin and will heal their land.',
      ESV: 'If my people who are called by my name humble themselves, and pray and seek my face and turn from their wicked ways, then I will hear from heaven and will forgive their sin and heal their land.',
      NKJV: '"If My people who are called by My name will humble themselves, and pray and seek My face, and turn from their wicked ways, then I will hear from heaven, and will forgive their sin and heal their land.',
      NLT: '"At last my people are humbling themselves and praying, and seeking my face and turning from their wicked ways. Then I will hear from heaven and will forgive their sins and restore their land.',
    },
  },
  {
    reference: '1 John 5:14-15',
    translations: {
      KJV: 'And this is the confidence that we have in him, that, if we ask any thing according to his will, he heareth us: And if we know that he hear us, whatsoever we ask, we know that we have the petitions that we desired of him.',
      NIV: 'This is the confidence we have in approaching God: that if we ask anything according to his will, he hears us. And if we know that he hears us—whatever we ask—we know that we have what we asked of him.',
      ESV: 'And this is the confidence that we have toward him, that if we ask anything according to his will he hears us. And if we know that he hears us in whatever we ask, we know that we have the requests that we have asked of him.',
      NKJV: 'Now this is the confidence that we have in Him, that if we ask anything according to His will, He hears us. And if we know that He hears us, whatever we ask, we know that we have the petitions that we have asked of Him.',
      NLT: 'And we are confident that he hears us whenever we ask for anything that pleases him. And since we know he hears us when we make our requests, we also know that he will give us what we ask for.',
    },
  },
  {
    reference: 'Matthew 21:22',
    translations: {
      KJV: 'And all things, whatsoever ye shall ask in prayer, believing, ye shall receive.',
      NIV: 'If you believe, you will receive all that you ask for in prayer.',
      ESV: 'And whatever you ask in prayer, you will receive, if you have faith.',
      NKJV: 'And whatever things you ask in prayer, believing, you will receive.',
      NLT: 'You can pray for anything, and if you have faith, you will receive it.',
    },
  },
  {
    reference: 'Philippians 4:6-7',
    translations: {
      KJV: 'Be careful for nothing; but in every thing by prayer and supplication with thanksgiving let your requests be made known unto God. And the peace of God, which passeth all understanding, shall keep your hearts and your minds in Christ Jesus.',
      NIV: 'Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God. And the peace of God, which transcends all understanding, will guard your hearts and your minds in Christ Jesus.',
      ESV: 'Do not be anxious about anything, but in everything by prayer and supplication with thanksgiving let your requests be made known to God. And the peace of God, which surpasses all understanding, will guard your hearts and your minds in Christ Jesus.',
      NKJV: 'Be anxious for nothing, but in everything by prayer and supplication, with thanksgiving, let your requests be made known to God; and the peace of God, which surpasses all understanding, will guard your hearts and your minds in Christ Jesus.',
      NLT: 'Don\'t worry about anything; instead, pray about everything. Tell God what you need, and thank him for all he has done. Then you will experience God\'s peace, which exceeds anything we can understand. His peace will guard your hearts and your minds as you live in Christ Jesus.',
    },
  },
  {
    reference: 'Nehemiah 4:9',
    translations: {
      KJV: 'Nevertheless we made our prayer unto our God, and set a watch against them day and night, because of them.',
      NIV: 'But we prayed to our God and posted a guard day and night to meet this threat.',
      ESV: 'And we prayed to our God and set a guard as a protection against them day and night.',
      NKJV: 'Nevertheless we made our prayer to our God, and because of them we set a watch against them day and night.',
      NLT: 'But we prayed to our God and guarded the city day and night to protect ourselves.',
    },
  },
  {
    reference: 'Daniel 6:10',
    translations: {
      KJV: 'Now when Daniel knew that the writing was signed, he went into his house; and his windows being open in his chamber toward Jerusalem, he kneeled upon his knees three times a day, and prayed, and gave thanks before his God, as he did aforetime.',
      NIV: 'Now when Daniel learned that the decree had been published, he went home to his upstairs room where the windows opened toward Jerusalem. Three times a day he got down on his knees and prayed, giving thanks to his God, just as he had done before.',
      ESV: 'When Daniel learned that the document had been signed, he went to his house where he had windows in his upper chamber open toward Jerusalem. He got down on his knees three times a day and prayed and gave thanks before his God, as he had done previously.',
      NKJV: 'Now when Daniel knew that the writing was signed, he went home. And in his upper room, with his windows open toward Jerusalem, he knelt down on his knees three times that day, and prayed and gave thanks before his God, as was his custom since early days.',
      NLT: 'But when Daniel learned that the law had been signed, he went home and knelt down as usual in his upstairs room, with its windows open toward Jerusalem. He prayed three times a day, just as he had always done, giving thanks to his God.',
    },
  },
];

export const getVerseTranslation = (reference: string, translation: string): string => {
  const verse = bibleVerses.find(v => v.reference === reference);
  if (!verse) {
    return reference;
  }
  return verse.translations[translation] || verse.translations['KJV'] || reference;
};
