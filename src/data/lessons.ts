export type BlockType =
  | 'writing'
  | 'vowels'
  | 'combinations'
  | 'long_vowels'
  | 'words'
  | 'tanwins'
  | 'sukun'
  | 'shadda'
  | 'sun_moon'
  | 'intro';

export interface AudioItem {
  text: string;
  audio?: string | null;
  translit?: string;
}

export type LessonBlockItem = string | AudioItem;

export interface LessonBlock {
  type: BlockType;
  letter?: string;
  forms?: string[];
  items?: LessonBlockItem[];
  note?: string;
}

export interface Lesson {
  id: number;
  title: string;
  pdfPageStart: number;
  pdfPageEnd: number;
  blocks: LessonBlock[];
}

// Placeholder block used for lessons not yet fully populated.
// The lesson page renders this gracefully and the runtime audio helper
// falls back to SpeechSynthesis when a file is missing.
const upcomingStub: LessonBlock[] = [
  {
    type: 'intro',
    note: 'Скоро: полный интерактив для этого урока. Пока можно прослушать букву и ознакомиться со страницей в книге.',
    items: [],
  },
];

export const lessons: Lesson[] = [
  // ─────────────────────────── Lesson 1 ───────────────────────────
  {
    id: 1,
    title: 'Урок 1: Алиф и огласовки',
    pdfPageStart: 9,
    pdfPageEnd: 12,
    blocks: [
      {
        type: 'writing',
        letter: 'ا',
        forms: ['ا', 'ـا', 'أ', 'إ'],
      },
      {
        type: 'vowels',
        items: [
          { text: 'أَ', audio: '/audio/alif_a.mp3', translit: 'а' },
          { text: 'إِ', audio: '/audio/alif_i.mp3', translit: 'и' },
          { text: 'أُ', audio: '/audio/alif_u.mp3', translit: 'у' },
        ],
      },
      {
        type: 'combinations',
        items: ['أَ أَ أَ', 'إِ إِ إِ', 'أُ أُ أُ', 'أَ إِ أُ', 'إِ أُ أَ'],
      },
    ],
  },

  // ─────────────────────────── Lesson 2 ───────────────────────────
  {
    id: 2,
    title: 'Урок 2: Буква «ба»',
    pdfPageStart: 13,
    pdfPageEnd: 15,
    blocks: [
      {
        type: 'writing',
        letter: 'ب',
        forms: ['ب', 'بـ', 'ـبـ', 'ـب'],
      },
      {
        type: 'vowels',
        items: [
          { text: 'بَ', audio: '/audio/ba_a.mp3', translit: 'ба' },
          { text: 'بِ', audio: '/audio/ba_i.mp3', translit: 'би' },
          { text: 'بُ', audio: '/audio/ba_u.mp3', translit: 'бу' },
        ],
      },
      {
        type: 'combinations',
        items: ['بَبَ', 'بُبُ', 'بِبِ', 'بَ بِ بُ'],
      },
      {
        type: 'long_vowels',
        items: [
          { text: 'بَا', audio: '/audio/ba_aa.mp3', translit: 'баа' },
          { text: 'بُو', audio: '/audio/ba_uu.mp3', translit: 'буу' },
          { text: 'بِي', audio: '/audio/ba_ii.mp3', translit: 'бии' },
        ],
      },
      {
        type: 'words',
        items: [
          { text: 'بَب', audio: '/audio/word_bab.mp3', translit: 'баб' },
          { text: 'بِيب', audio: '/audio/word_bib.mp3', translit: 'биб' },
          { text: 'بُوب', audio: '/audio/word_bub.mp3', translit: 'буб' },
          { text: 'بَاب', audio: '/audio/word_baab.mp3', translit: 'бааб' },
        ],
      },
    ],
  },

  // ─────────────────────────── Lesson 3 ───────────────────────────
  {
    id: 3,
    title: 'Урок 3: Буква «та» и тануины',
    pdfPageStart: 16,
    pdfPageEnd: 18,
    blocks: [
      {
        type: 'writing',
        letter: 'ت',
        forms: ['ت', 'تـ', 'ـتـ', 'ـت'],
      },
      {
        type: 'vowels',
        items: [
          { text: 'تَ', audio: '/audio/ta_a.mp3', translit: 'та' },
          { text: 'تِ', audio: '/audio/ta_i.mp3', translit: 'ти' },
          { text: 'تُ', audio: '/audio/ta_u.mp3', translit: 'ту' },
        ],
      },
      {
        type: 'long_vowels',
        items: [
          { text: 'تَا', audio: '/audio/ta_aa.mp3', translit: 'таа' },
          { text: 'تُو', audio: '/audio/ta_uu.mp3', translit: 'туу' },
          { text: 'تِي', audio: '/audio/ta_ii.mp3', translit: 'тии' },
        ],
      },
      {
        type: 'combinations',
        items: ['تَتَ', 'تُتُ', 'تِتِ', 'تَ تِ تُ'],
      },
      {
        type: 'tanwins',
        items: [
          { text: 'تًا', audio: '/audio/ta_an.mp3', translit: 'тан' },
          { text: 'تٍ', audio: '/audio/ta_in.mp3', translit: 'тин' },
          { text: 'تٌ', audio: '/audio/ta_un.mp3', translit: 'тун' },
        ],
      },
      {
        type: 'words',
        items: [
          { text: 'تَابَ', audio: '/audio/word_taaba.mp3', translit: 'тааба' },
          { text: 'تُوت', audio: '/audio/word_tuut.mp3', translit: 'туут' },
          { text: 'تِين', audio: '/audio/word_tiin.mp3', translit: 'тиин' },
          { text: 'تَتَ', audio: '/audio/word_tata.mp3', translit: 'тата' },
        ],
      },
    ],
  },

  // ─────────────────────────── Lesson 4 ───────────────────────────
  {
    id: 4,
    title: 'Урок 4: Та марбута и сукун',
    pdfPageStart: 19,
    pdfPageEnd: 23,
    blocks: [
      {
        type: 'writing',
        letter: 'ة',
        forms: ['ة', 'ـة', 'ة', 'ـة'],
        note: 'Та марбута пишется только в конце слова. В паузе читается как «х», в потоке речи — как «т».',
      },
      {
        type: 'sukun',
        note: 'Сукун (ْ) — знак отсутствия гласной над согласной.',
        items: [
          { text: 'بَتْ', audio: '/audio/word_bat.mp3', translit: 'бат' },
          { text: 'بُتْ', audio: '/audio/word_but.mp3', translit: 'бут' },
          { text: 'بِتْ', audio: '/audio/word_bit.mp3', translit: 'бит' },
        ],
      },
      {
        type: 'words',
        note: 'Слова с та марбутой',
        items: [
          { text: 'تَوْبَة', audio: '/audio/word_tawba.mp3', translit: 'тауба' },
          { text: 'بَيْتٌ', audio: '/audio/word_baytun.mp3', translit: 'байтун' },
          { text: 'ثَابَتْ', audio: '/audio/word_thaabat.mp3', translit: 'сабат' },
          { text: 'ثَابَتِ', audio: '/audio/word_thaabati.mp3', translit: 'сабати' },
        ],
      },
    ],
  },

  // ─────────────────────────── Lesson 5 ───────────────────────────
  {
    id: 5,
    title: 'Урок 5: Буква «са» (ث)',
    pdfPageStart: 21,
    pdfPageEnd: 23,
    blocks: [
      {
        type: 'writing',
        letter: 'ث',
        forms: ['ث', 'ثـ', 'ـثـ', 'ـث'],
        note: 'Межзубный глухой звук, как английское «th» в слове think.',
      },
      {
        type: 'vowels',
        items: [
          { text: 'ثَ', audio: '/audio/tha_a.mp3', translit: 'са' },
          { text: 'ثِ', audio: '/audio/tha_i.mp3', translit: 'си' },
          { text: 'ثُ', audio: '/audio/tha_u.mp3', translit: 'су' },
        ],
      },
      {
        type: 'long_vowels',
        items: [
          { text: 'ثَا', audio: '/audio/tha_aa.mp3', translit: 'саа' },
          { text: 'ثُو', audio: '/audio/tha_uu.mp3', translit: 'суу' },
          { text: 'ثِي', audio: '/audio/tha_ii.mp3', translit: 'сии' },
        ],
      },
      {
        type: 'combinations',
        items: ['ثَ ثِ ثُ ثَ', 'ثَبَ', 'ثَتَ', 'ثُبُ'],
      },
      {
        type: 'sukun',
        items: ['ثْتْ', 'ثْبْ'],
      },
      {
        type: 'words',
        items: [
          { text: 'ثَابَ', audio: '/audio/word_thaaba.mp3', translit: 'сааба' },
          { text: 'ثَابَتْ', audio: '/audio/word_thaabat.mp3', translit: 'саабат' },
          { text: 'ثُبُور', audio: '/audio/word_thubuur.mp3', translit: 'субуур' },
        ],
      },
    ],
  },

  // ─────────────────────────── Lesson 6 ───────────────────────────
  {
    id: 6,
    title: 'Урок 6: Буква «нун» (ن)',
    pdfPageStart: 24,
    pdfPageEnd: 26,
    blocks: [
      {
        type: 'writing',
        letter: 'ن',
        forms: ['ن', 'نـ', 'ـنـ', 'ـن'],
      },
      {
        type: 'vowels',
        items: [
          { text: 'نَ', audio: '/audio/nun_a.mp3', translit: 'на' },
          { text: 'نِ', audio: '/audio/nun_i.mp3', translit: 'ни' },
          { text: 'نُ', audio: '/audio/nun_u.mp3', translit: 'ну' },
        ],
      },
      {
        type: 'long_vowels',
        items: [
          { text: 'نَا', audio: '/audio/nun_aa.mp3', translit: 'наа' },
          { text: 'نُو', audio: '/audio/nun_uu.mp3', translit: 'нуу' },
          { text: 'نِي', audio: '/audio/nun_ii.mp3', translit: 'нии' },
        ],
      },
      {
        type: 'sukun',
        items: ['نْت', 'نْث', 'نْب'],
      },
      {
        type: 'tanwins',
        items: [
          { text: 'نًا', audio: '/audio/nun_an.mp3', translit: 'нан' },
          { text: 'نٍ', audio: '/audio/nun_in.mp3', translit: 'нин' },
          { text: 'نٌ', audio: '/audio/nun_un.mp3', translit: 'нун' },
        ],
      },
      {
        type: 'words',
        items: [
          { text: 'نَامَ', audio: '/audio/word_naama.mp3', translit: 'нама' },
          { text: 'نُور', audio: '/audio/word_nuur.mp3', translit: 'нуур' },
          { text: 'نَيْن', audio: '/audio/word_nayn.mp3', translit: 'найн' },
          { text: 'نَمَا', audio: '/audio/word_namaa.mp3', translit: 'намаа' },
        ],
      },
    ],
  },

  // ─────────────────────────── Lesson 7 ───────────────────────────
  {
    id: 7,
    title: 'Урок 7: Буква «йа» (ي)',
    pdfPageStart: 27,
    pdfPageEnd: 29,
    blocks: [
      {
        type: 'writing',
        letter: 'ي',
        forms: ['ي', 'يـ', 'ـيـ', 'ـي'],
        note: 'Полугласная. В конце слова различай ي и ى (алиф максура).',
      },
      {
        type: 'vowels',
        items: [
          { text: 'يَ', audio: '/audio/ya_a.mp3', translit: 'я' },
          { text: 'يِ', audio: '/audio/ya_i.mp3', translit: 'йи' },
          { text: 'يُ', audio: '/audio/ya_u.mp3', translit: 'ю' },
        ],
      },
      {
        type: 'long_vowels',
        items: [
          { text: 'يَا', audio: '/audio/ya_aa.mp3', translit: 'яа' },
          { text: 'يُو', audio: '/audio/ya_uu.mp3', translit: 'юу' },
          { text: 'يِي', audio: '/audio/ya_ii.mp3', translit: 'ии' },
        ],
      },
      {
        type: 'sukun',
        items: ['يْت', 'يْب', 'يْن'],
      },
      {
        type: 'words',
        items: [
          { text: 'يَد', audio: '/audio/word_yad.mp3', translit: 'яд' },
          { text: 'يَوْم', audio: '/audio/word_yawm.mp3', translit: 'яум' },
          { text: 'يَقِين', audio: '/audio/word_yaqiin.mp3', translit: 'якын' },
          { text: 'يَنَامُ', audio: '/audio/word_yanaamu.mp3', translit: 'янааму' },
        ],
      },
    ],
  },

  // ─────────────────────────── Lesson 8 ───────────────────────────
  {
    id: 8,
    title: 'Урок 8: Буква «уау» (و)',
    pdfPageStart: 30,
    pdfPageEnd: 32,
    blocks: [
      {
        type: 'writing',
        letter: 'و',
        forms: ['و', 'و', 'ـو', 'ـو'],
        note: 'Уау не соединяется со следующей буквой слева.',
      },
      {
        type: 'vowels',
        items: [
          { text: 'وَ', audio: '/audio/waw_a.mp3', translit: 'уа' },
          { text: 'وِ', audio: '/audio/waw_i.mp3', translit: 'уи' },
          { text: 'وُ', audio: '/audio/waw_u.mp3', translit: 'уу' },
        ],
      },
      {
        type: 'long_vowels',
        items: [
          { text: 'وَا', audio: '/audio/waw_aa.mp3', translit: 'уаа' },
          { text: 'وُو', audio: '/audio/waw_uu.mp3', translit: 'уу́у' },
          { text: 'وِي', audio: '/audio/waw_ii.mp3', translit: 'уии' },
        ],
      },
      {
        type: 'sukun',
        items: ['وْت', 'وْب', 'وْم'],
      },
      {
        type: 'words',
        items: [
          { text: 'وَرَد', audio: '/audio/word_warad.mp3', translit: 'уарад' },
          { text: 'وَلَد', audio: '/audio/word_walad.mp3', translit: 'уалад' },
          { text: 'وَقْت', audio: '/audio/word_waqt.mp3', translit: 'уакт' },
          { text: 'وَسَط', audio: '/audio/word_wasat.mp3', translit: 'уасат' },
        ],
      },
    ],
  },

  // ─────────────────────────── Lesson 9 ───────────────────────────
  {
    id: 9,
    title: 'Урок 9: Буква «лам» (ل)',
    pdfPageStart: 33,
    pdfPageEnd: 35,
    blocks: [
      {
        type: 'writing',
        letter: 'ل',
        forms: ['ل', 'لـ', 'ـلـ', 'ـل'],
      },
      {
        type: 'vowels',
        items: [
          { text: 'لَ', audio: '/audio/lam_a.mp3', translit: 'ля' },
          { text: 'لِ', audio: '/audio/lam_i.mp3', translit: 'ли' },
          { text: 'لُ', audio: '/audio/lam_u.mp3', translit: 'лю' },
        ],
      },
      {
        type: 'long_vowels',
        items: [
          { text: 'لَا', audio: '/audio/lam_aa.mp3', translit: 'ляя' },
          { text: 'لُو', audio: '/audio/lam_uu.mp3', translit: 'люю' },
          { text: 'لِي', audio: '/audio/lam_ii.mp3', translit: 'лии' },
        ],
      },
      {
        type: 'sukun',
        items: ['لْم', 'لْب', 'لْت'],
      },
      {
        type: 'words',
        items: [
          { text: 'لَم', audio: '/audio/word_lam.mp3', translit: 'лям' },
          { text: 'لِمَ', audio: '/audio/word_lima.mp3', translit: 'лима' },
          { text: 'لَمَا', audio: '/audio/word_lamaa.mp3', translit: 'ляма' },
          { text: 'لَمَن', audio: '/audio/word_laman.mp3', translit: 'ляман' },
          { text: 'قَلَم', audio: '/audio/word_qalam.mp3', translit: 'калям' },
        ],
      },
    ],
  },

  // ─────────────────────────── Lesson 10 ───────────────────────────
  {
    id: 10,
    title: 'Урок 10: Буква «мим» (م)',
    pdfPageStart: 36,
    pdfPageEnd: 38,
    blocks: [
      {
        type: 'writing',
        letter: 'م',
        forms: ['م', 'مـ', 'ـمـ', 'ـم'],
      },
      {
        type: 'vowels',
        items: [
          { text: 'مَ', audio: '/audio/mim_a.mp3', translit: 'ма' },
          { text: 'مِ', audio: '/audio/mim_i.mp3', translit: 'ми' },
          { text: 'مُ', audio: '/audio/mim_u.mp3', translit: 'му' },
        ],
      },
      {
        type: 'long_vowels',
        items: [
          { text: 'مَا', audio: '/audio/mim_aa.mp3', translit: 'маа' },
          { text: 'مُو', audio: '/audio/mim_uu.mp3', translit: 'муу' },
          { text: 'مِي', audio: '/audio/mim_ii.mp3', translit: 'мии' },
        ],
      },
      {
        type: 'combinations',
        items: ['مَ مِ مُ', 'مَمَ', 'مَنَ', 'مَلَ'],
      },
      {
        type: 'words',
        items: [
          { text: 'مَان', audio: '/audio/word_maan.mp3', translit: 'маан' },
          { text: 'مُونَ', audio: '/audio/word_muuna.mp3', translit: 'муна' },
          { text: 'مِنَ', audio: '/audio/word_mina.mp3', translit: 'мина' },
          { text: 'وَمَا', audio: '/audio/word_wamaa.mp3', translit: 'уамаа' },
          { text: 'مَاتَ', audio: '/audio/word_maata.mp3', translit: 'маата' },
          { text: 'نَامَ', audio: '/audio/word_naama.mp3', translit: 'нама' },
        ],
      },
    ],
  },

  // ─────────────────────────── Lesson 11 ───────────────────────────
  {
    id: 11,
    title: 'Урок 11: Буква «ха» (ه)',
    pdfPageStart: 39,
    pdfPageEnd: 41,
    blocks: [
      {
        type: 'writing',
        letter: 'ه',
        forms: ['ه', 'هـ', 'ـهـ', 'ـه'],
        note: 'Гортанный звук, похож на английский «h».',
      },
      {
        type: 'vowels',
        items: [
          { text: 'هَ', audio: '/audio/ha_a.mp3', translit: 'ха' },
          { text: 'هِ', audio: '/audio/ha_i.mp3', translit: 'хи' },
          { text: 'هُ', audio: '/audio/ha_u.mp3', translit: 'ху' },
        ],
      },
      {
        type: 'long_vowels',
        items: [
          { text: 'هَا', audio: '/audio/ha_aa.mp3', translit: 'хаа' },
          { text: 'هُو', audio: '/audio/ha_uu.mp3', translit: 'хуу' },
          { text: 'هِي', audio: '/audio/ha_ii.mp3', translit: 'хии' },
        ],
      },
      {
        type: 'sukun',
        items: ['هْم', 'هْن', 'هْب'],
      },
      {
        type: 'words',
        items: [
          { text: 'هُوَ', audio: '/audio/word_huwa.mp3', translit: 'хуу' },
          { text: 'هِيَ', audio: '/audio/word_hiya.mp3', translit: 'хиййа' },
          { text: 'هٰذَا', audio: '/audio/word_hadha.mp3', translit: 'хаза' },
          { text: 'هَلْ', audio: '/audio/word_hal.mp3', translit: 'халь' },
        ],
      },
    ],
  },

  // ─────────────────────────── Lesson 12 ───────────────────────────
  {
    id: 12,
    title: 'Урок 12: Буква «каф» (ك)',
    pdfPageStart: 42,
    pdfPageEnd: 44,
    blocks: [
      {
        type: 'writing',
        letter: 'ك',
        forms: ['ك', 'كـ', 'ـكـ', 'ـك'],
        note: 'Смягчённый звук [к].',
      },
      {
        type: 'vowels',
        items: [
          { text: 'كَ', audio: '/audio/kaf_a.mp3', translit: 'ка' },
          { text: 'كِ', audio: '/audio/kaf_i.mp3', translit: 'ки' },
          { text: 'كُ', audio: '/audio/kaf_u.mp3', translit: 'ку' },
        ],
      },
      {
        type: 'long_vowels',
        items: [
          { text: 'كَا', audio: '/audio/kaf_aa.mp3', translit: 'каа' },
          { text: 'كُو', audio: '/audio/kaf_uu.mp3', translit: 'куу' },
          { text: 'كِي', audio: '/audio/kaf_ii.mp3', translit: 'кии' },
        ],
      },
      {
        type: 'combinations',
        items: ['كَ كِ كُ', 'كَكَ', 'كَلَ', 'كَمَ'],
      },
      {
        type: 'words',
        items: [
          { text: 'كَمْ', audio: '/audio/word_kam.mp3', translit: 'кам' },
          { text: 'كُلُّ', audio: '/audio/word_kullu.mp3', translit: 'кулль' },
          { text: 'كُنْ', audio: '/audio/word_kun.mp3', translit: 'кун' },
          { text: 'كِتَاب', audio: '/audio/word_kitaab.mp3', translit: 'китаб' },
        ],
      },
    ],
  },

  // ─────────────────────────── Lesson 13 ───────────────────────────
  {
    id: 13,
    title: 'Урок 13: Буква «фа» (ف)',
    pdfPageStart: 45,
    pdfPageEnd: 47,
    blocks: [
      {
        type: 'writing',
        letter: 'ف',
        forms: ['ف', 'فـ', 'ـفـ', 'ـف'],
      },
      {
        type: 'vowels',
        items: [
          { text: 'فَ', audio: '/audio/fa_a.mp3', translit: 'фа' },
          { text: 'فِ', audio: '/audio/fa_i.mp3', translit: 'фи' },
          { text: 'فُ', audio: '/audio/fa_u.mp3', translit: 'фу' },
        ],
      },
      {
        type: 'long_vowels',
        items: [
          { text: 'فَا', audio: '/audio/fa_aa.mp3', translit: 'фаа' },
          { text: 'فُو', audio: '/audio/fa_uu.mp3', translit: 'фуу' },
          { text: 'فِي', audio: '/audio/fa_ii.mp3', translit: 'фии' },
        ],
      },
      {
        type: 'sukun',
        items: ['فْت', 'فْل', 'فْم'],
      },
      {
        type: 'words',
        items: [
          { text: 'فَتَحَ', audio: '/audio/word_fataha.mp3', translit: 'фатаха' },
          { text: 'فَرَح', audio: '/audio/word_farah.mp3', translit: 'фарах' },
          { text: 'فِيل', audio: '/audio/word_fil.mp3', translit: 'филь' },
          { text: 'فَوْق', audio: '/audio/word_fawq.mp3', translit: 'фауг' },
        ],
      },
    ],
  },

  // ─────────────────────────── Lesson 14 ───────────────────────────
  {
    id: 14,
    title: 'Урок 14: Буква «коф» (ق)',
    pdfPageStart: 48,
    pdfPageEnd: 50,
    blocks: [
      {
        type: 'writing',
        letter: 'ق',
        forms: ['ق', 'قـ', 'ـقـ', 'ـق'],
        note: 'Увулярный напряжённый звук [q].',
      },
      {
        type: 'vowels',
        items: [
          { text: 'قَ', audio: '/audio/qaf_a.mp3', translit: 'ка' },
          { text: 'قِ', audio: '/audio/qaf_i.mp3', translit: 'ки' },
          { text: 'قُ', audio: '/audio/qaf_u.mp3', translit: 'ку' },
        ],
      },
      {
        type: 'long_vowels',
        items: [
          { text: 'قَا', audio: '/audio/qaf_aa.mp3', translit: 'каа' },
          { text: 'قُو', audio: '/audio/qaf_uu.mp3', translit: 'куу' },
          { text: 'قِي', audio: '/audio/qaf_ii.mp3', translit: 'кии' },
        ],
      },
      {
        type: 'combinations',
        items: ['قَ قِ قُ', 'قَلَ', 'قَمَ'],
      },
      {
        type: 'words',
        items: [
          { text: 'قَالَ', audio: '/audio/word_qala.mp3', translit: 'кала' },
          { text: 'قِيلَ', audio: '/audio/word_qila.mp3', translit: 'кила' },
          { text: 'قُلْ', audio: '/audio/word_qul.mp3', translit: 'кул' },
          { text: 'قَوْم', audio: '/audio/word_qawm.mp3', translit: 'каум' },
        ],
      },
    ],
  },

  // ─────────────────────────── Lesson 15 ───────────────────────────
  {
    id: 15,
    title: 'Урок 15: Буква «ро» (ر)',
    pdfPageStart: 51,
    pdfPageEnd: 53,
    blocks: [
      {
        type: 'writing',
        letter: 'ر',
        forms: ['ر', 'رـ', 'ر', 'ـر'],
        note: 'Рот не соединяется со следующей буквой слева.',
      },
      {
        type: 'vowels',
        items: [
          { text: 'رَ', audio: '/audio/ra_a.mp3', translit: 'ра' },
          { text: 'رِ', audio: '/audio/ra_i.mp3', translit: 'ри' },
          { text: 'رُ', audio: '/audio/ra_u.mp3', translit: 'ру' },
        ],
      },
      {
        type: 'long_vowels',
        items: [
          { text: 'رَا', audio: '/audio/ra_aa.mp3', translit: 'раа' },
          { text: 'رُو', audio: '/audio/ra_uu.mp3', translit: 'руу' },
          { text: 'رِي', audio: '/audio/ra_ii.mp3', translit: 'рии' },
        ],
      },
      {
        type: 'sukun',
        items: ['رْت', 'رْم', 'رْن'],
      },
      {
        type: 'words',
        items: [
          { text: 'رَانَ', audio: '/audio/word_rana.mp3', translit: 'рана' },
          { text: 'رُونَ', audio: '/audio/word_runa.mp3', translit: 'руна' },
          { text: 'رَبّ', audio: '/audio/word_rabb.mp3', translit: 'рабб' },
          { text: 'رَأْس', audio: '/audio/word_raas.mp3', translit: 'раас' },
        ],
      },
    ],
  },

  // ─────────────────────────── Lesson 16 ───────────────────────────
  {
    id: 16,
    title: 'Урок 16: Буква «за» (ز)',
    pdfPageStart: 55,
    pdfPageEnd: 57,
    blocks: [
      {
        type: 'writing',
        letter: 'ز',
        forms: ['ز', 'زـ', 'ز', 'ـز'],
        note: 'Звонкий звук [z]. Не соединяется со следующей буквой.',
      },
      {
        type: 'vowels',
        items: [
          { text: 'زَ', audio: '/audio/zay_a.mp3', translit: 'за' },
          { text: 'زِ', audio: '/audio/zay_i.mp3', translit: 'зи' },
          { text: 'زُ', audio: '/audio/zay_u.mp3', translit: 'зу' },
        ],
      },
      {
        type: 'long_vowels',
        items: [
          { text: 'زَا', audio: '/audio/zay_aa.mp3', translit: 'заа' },
          { text: 'زُو', audio: '/audio/zay_uu.mp3', translit: 'зуу' },
          { text: 'زِي', audio: '/audio/zay_ii.mp3', translit: 'зии' },
        ],
      },
      {
        type: 'sukun',
        items: ['زْت', 'زْل', 'زْم'],
      },
      {
        type: 'words',
        items: [
          { text: 'زَانَ', audio: '/audio/word_zana.mp3', translit: 'зана' },
          { text: 'زُون', audio: '/audio/word_zun.mp3', translit: 'зун' },
          { text: 'زَيْت', audio: '/audio/word_zayt.mp3', translit: 'зайт' },
          { text: 'زَبَد', audio: '/audio/word_zabad.mp3', translit: 'забад' },
        ],
      },
    ],
  },

  // ─────────────────────────── Lesson 17 ───────────────────────────
  {
    id: 17,
    title: 'Урок 17: Буква «даль» (د)',
    pdfPageStart: 58,
    pdfPageEnd: 60,
    blocks: [
      {
        type: 'writing',
        letter: 'د',
        forms: ['د', 'دـ', 'د', 'ـد'],
        note: 'Звук [d]. Не соединяется со следующей буквой.',
      },
      {
        type: 'vowels',
        items: [
          { text: 'دَ', audio: '/audio/dal_a.mp3', translit: 'да' },
          { text: 'دِ', audio: '/audio/dal_i.mp3', translit: 'ди' },
          { text: 'دُ', audio: '/audio/dal_u.mp3', translit: 'ду' },
        ],
      },
      {
        type: 'long_vowels',
        items: [
          { text: 'دَا', audio: '/audio/dal_aa.mp3', translit: 'даа' },
          { text: 'دُو', audio: '/audio/dal_uu.mp3', translit: 'дуу' },
          { text: 'دِي', audio: '/audio/dal_ii.mp3', translit: 'дии' },
        ],
      },
      {
        type: 'sukun',
        items: ['دْت', 'دْم', 'دْل'],
      },
      {
        type: 'words',
        items: [
          { text: 'دَانَ', audio: '/audio/word_dana.mp3', translit: 'дана' },
          { text: 'دُونَ', audio: '/audio/word_duna.mp3', translit: 'дуна' },
          { text: 'دَرْس', audio: '/audio/word_dars.mp3', translit: 'дарс' },
          { text: 'دُبّ', audio: '/audio/word_dubb.mp3', translit: 'дубб' },
        ],
      },
    ],
  },

  // ─────────────────────────── Lesson 18 ───────────────────────────
  {
    id: 18,
    title: 'Урок 18: Буква «заль» (ذ)',
    pdfPageStart: 61,
    pdfPageEnd: 64,
    blocks: [
      {
        type: 'writing',
        letter: 'ذ',
        forms: ['ذ', 'ذـ', 'ذ', 'ـذ'],
        note: 'Межзубный [ð], как английское «th» в слове this.',
      },
      {
        type: 'vowels',
        items: [
          { text: 'ذَ', audio: '/audio/dhal_a.mp3', translit: 'за' },
          { text: 'ذِ', audio: '/audio/dhal_i.mp3', translit: 'зи' },
          { text: 'ذُ', audio: '/audio/dhal_u.mp3', translit: 'зу' },
        ],
      },
      {
        type: 'long_vowels',
        items: [
          { text: 'ذَا', audio: '/audio/dhal_aa.mp3', translit: 'заа' },
          { text: 'ذُو', audio: '/audio/dhal_uu.mp3', translit: 'зуу' },
          { text: 'ذِي', audio: '/audio/dhal_ii.mp3', translit: 'зии' },
        ],
      },
      {
        type: 'sukun',
        items: ['ذْت', 'ذْم', 'ذْل'],
      },
      {
        type: 'words',
        items: [
          { text: 'ذَانَ', audio: '/audio/word_dhana.mp3', translit: 'зана' },
          { text: 'ذُونَ', audio: '/audio/word_dhuna.mp3', translit: 'зуна' },
          { text: 'ذَهَب', audio: '/audio/word_dhahab.mp3', translit: 'заhаб' },
          { text: 'ذِئْب', audio: '/audio/word_dhi_b.mp3', translit: 'зиб' },
        ],
      },
    ],
  },

  // ─────────────────────────── Lesson 19 ───────────────────────────
  {
    id: 19,
    title: 'Урок 19: Буква «джим» (ج)',
    pdfPageStart: 65,
    pdfPageEnd: 68,
    blocks: [
      {
        type: 'writing',
        letter: 'ج',
        forms: ['ج', 'جـ', 'ـجـ', 'ـج'],
        note: 'Звук [dʒ].',
      },
      {
        type: 'vowels',
        items: [
          { text: 'جَ', audio: '/audio/jim_a.mp3', translit: 'жа' },
          { text: 'جِ', audio: '/audio/jim_i.mp3', translit: 'жи' },
          { text: 'جُ', audio: '/audio/jim_u.mp3', translit: 'жу' },
        ],
      },
      {
        type: 'long_vowels',
        items: [
          { text: 'جَا', audio: '/audio/jim_aa.mp3', translit: 'жаа' },
          { text: 'جُو', audio: '/audio/jim_uu.mp3', translit: 'жуу' },
          { text: 'جِي', audio: '/audio/jim_ii.mp3', translit: 'жии' },
        ],
      },
      {
        type: 'combinations',
        items: ['جَ جِ جُ', 'جَلَ', 'جَمَ'],
      },
      {
        type: 'words',
        items: [
          { text: 'جَانَ', audio: '/audio/word_jana.mp3', translit: 'жана' },
          { text: 'جُون', audio: '/audio/word_jun.mp3', translit: 'жун' },
          { text: 'جَمَل', audio: '/audio/word_jamal.mp3', translit: 'жамал' },
          { text: 'جَزَر', audio: '/audio/word_jazar.mp3', translit: 'жазар' },
        ],
      },
    ],
  },

  // ─────────────────────────── Lesson 20 ───────────────────────────
  {
    id: 20,
    title: 'Урок 20: Буква «ха» (ح)',
    pdfPageStart: 69,
    pdfPageEnd: 72,
    blocks: [
      {
        type: 'writing',
        letter: 'ح',
        forms: ['ح', 'حـ', 'ـحـ', 'ـح'],
        note: 'Фарингальный глухой [ħ].',
      },
      {
        type: 'vowels',
        items: [
          { text: 'حَ', audio: '/audio/ha_a.mp3', translit: 'ха' },
          { text: 'حِ', audio: '/audio/ha_i.mp3', translit: 'хи' },
          { text: 'حُ', audio: '/audio/ha_u.mp3', translit: 'ху' },
        ],
      },
      {
        type: 'long_vowels',
        items: [
          { text: 'حَا', audio: '/audio/ha_aa.mp3', translit: 'хаа' },
          { text: 'حُو', audio: '/audio/ha_uu.mp3', translit: 'хуу' },
          { text: 'حِي', audio: '/audio/ha_ii.mp3', translit: 'хии' },
        ],
      },
      {
        type: 'sukun',
        items: ['حْت', 'حْم', 'حْل'],
      },
      {
        type: 'words',
        items: [
          { text: 'حَانَ', audio: '/audio/word_hana.mp3', translit: 'хана' },
          { text: 'حُوْنَ', audio: '/audio/word_hun.mp3', translit: 'хун' },
          { text: 'حَبْل', audio: '/audio/word_habl.mp3', translit: 'хабль' },
          { text: 'حَجَر', audio: '/audio/word_hajar.mp3', translit: 'хажар' },
        ],
      },
    ],
  },

  // ─────────────────────────── Lesson 21 ───────────────────────────
  {
    id: 21,
    title: 'Урок 21: Буква «хо» (خ)',
    pdfPageStart: 73,
    pdfPageEnd: 75,
    blocks: [
      {
        type: 'writing',
        letter: 'خ',
        forms: ['خ', 'خـ', 'ـخـ', 'ـخ'],
        note: 'Увулярный [x].',
      },
      {
        type: 'vowels',
        items: [
          { text: 'خَ', audio: '/audio/kha_a.mp3', translit: 'ха' },
          { text: 'خِ', audio: '/audio/kha_i.mp3', translit: 'хи' },
          { text: 'خُ', audio: '/audio/kha_u.mp3', translit: 'ху' },
        ],
      },
      {
        type: 'long_vowels',
        items: [
          { text: 'خَا', audio: '/audio/kha_aa.mp3', translit: 'хаа' },
          { text: 'خُو', audio: '/audio/kha_uu.mp3', translit: 'хуу' },
          { text: 'خِي', audio: '/audio/kha_ii.mp3', translit: 'хии' },
        ],
      },
      {
        type: 'combinations',
        items: ['خَ خِ خُ', 'خَلَ', 'خَمَ'],
      },
      {
        type: 'words',
        items: [
          { text: 'خَانَ', audio: '/audio/word_khana.mp3', translit: 'хана' },
          { text: 'خُون', audio: '/audio/word_khun.mp3', translit: 'хун' },
          { text: 'خُبْز', audio: '/audio/word_khubz.mp3', translit: 'хубз' },
          { text: 'خَطّ', audio: '/audio/word_khatt.mp3', translit: 'хатт' },
        ],
      },
    ],
  },

  // ─────────────────────────── Lesson 22 ───────────────────────────
  {
    id: 22,
    title: 'Урок 22: Буква «ъайн» (ع)',
    pdfPageStart: 77,
    pdfPageEnd: 80,
    blocks: [
      {
        type: 'writing',
        letter: 'ع',
        forms: ['ع', 'عـ', 'ـعـ', 'ـع'],
        note: 'Фарингальный звонкий. Один из самых сложных звуков.',
      },
      {
        type: 'vowels',
        items: [
          { text: 'عَ', audio: '/audio/ayn_a.mp3', translit: 'аъ' },
          { text: 'عِ', audio: '/audio/ayn_i.mp3', translit: 'иъ' },
          { text: 'عُ', audio: '/audio/ayn_u.mp3', translit: 'уъ' },
        ],
      },
      {
        type: 'long_vowels',
        items: [
          { text: 'عَا', audio: '/audio/ayn_aa.mp3', translit: 'аъа' },
          { text: 'عُو', audio: '/audio/ayn_uu.mp3', translit: 'уъу' },
          { text: 'عِي', audio: '/audio/ayn_ii.mp3', translit: 'иъи' },
        ],
      },
      {
        type: 'sukun',
        items: ['عْت', 'عْم', 'عْل'],
      },
      {
        type: 'words',
        items: [
          { text: 'عَانَ', audio: '/audio/word_ana.mp3', translit: 'ана' },
          { text: 'عُوْنَ', audio: '/audio/word_un.mp3', translit: 'ун' },
          { text: 'عَيْن', audio: '/audio/word_ayn.mp3', translit: 'айн' },
          { text: 'عِلْم', audio: '/audio/word_ilm.mp3', translit: 'ильм' },
        ],
      },
    ],
  },

  // ─────────────────────────── Lesson 23 ───────────────────────────
  {
    id: 23,
    title: 'Урок 23: Буква «ғайн» (غ)',
    pdfPageStart: 81,
    pdfPageEnd: 84,
    blocks: [
      {
        type: 'writing',
        letter: 'غ',
        forms: ['غ', 'غـ', 'ـغـ', 'ـغ'],
        note: 'Увулярный звонкий.',
      },
      {
        type: 'vowels',
        items: [
          { text: 'غَ', audio: '/audio/ghayn_a.mp3', translit: 'га' },
          { text: 'غِ', audio: '/audio/ghayn_i.mp3', translit: 'ги' },
          { text: 'غُ', audio: '/audio/ghayn_u.mp3', translit: 'гу' },
        ],
      },
      {
        type: 'long_vowels',
        items: [
          { text: 'غَا', audio: '/audio/ghayn_aa.mp3', translit: 'гаа' },
          { text: 'غُو', audio: '/audio/ghayn_uu.mp3', translit: 'гуу' },
          { text: 'غِي', audio: '/audio/ghayn_ii.mp3', translit: 'гии' },
        ],
      },
      {
        type: 'sukun',
        items: ['غْت', 'غْم', 'غْل'],
      },
      {
        type: 'words',
        items: [
          { text: 'غَانَ', audio: '/audio/word_ghana.mp3', translit: 'гана' },
          { text: 'غُوْنَ', audio: '/audio/word_ghun.mp3', translit: 'гун' },
          { text: 'غُرَاب', audio: '/audio/word_ghuraaб.mp3', translit: 'гураб' },
          { text: 'غَار', audio: '/audio/word_ghaar.mp3', translit: 'гаар' },
        ],
      },
    ],
  },

  // ─────────────────────────── Lesson 24 ───────────────────────────
  {
    id: 24,
    title: 'Урок 24: Буква «син» (س)',
    pdfPageStart: 85,
    pdfPageEnd: 88,
    blocks: [
      {
        type: 'writing',
        letter: 'س',
        forms: ['س', 'سـ', 'ـسـ', 'ـس'],
        note: 'Звук [s].',
      },
      {
        type: 'vowels',
        items: [
          { text: 'سَ', audio: '/audio/sin_a.mp3', translit: 'са' },
          { text: 'سِ', audio: '/audio/sin_i.mp3', translit: 'си' },
          { text: 'سُ', audio: '/audio/sin_u.mp3', translit: 'су' },
        ],
      },
      {
        type: 'long_vowels',
        items: [
          { text: 'سَا', audio: '/audio/sin_aa.mp3', translit: 'саа' },
          { text: 'سُو', audio: '/audio/sin_uu.mp3', translit: 'суу' },
          { text: 'سِي', audio: '/audio/sin_ii.mp3', translit: 'сии' },
        ],
      },
      {
        type: 'combinations',
        items: ['سَ سِ سُ', 'سَلَ', 'سَمَ'],
      },
      {
        type: 'words',
        items: [
          { text: 'سَانَ', audio: '/audio/word_sana.mp3', translit: 'сана' },
          { text: 'سُونَ', audio: '/audio/word_suna.mp3', translit: 'суна' },
          { text: 'سَكَر', audio: '/audio/word_sakar.mp3', translit: 'сакар' },
          { text: 'سَمَك', audio: '/audio/word_samak.mp3', translit: 'самак' },
        ],
      },
    ],
  },

  // ─────────────────────────── Lesson 25 ───────────────────────────
  {
    id: 25,
    title: 'Урок 25: Буква «шин» (ش)',
    pdfPageStart: 89,
    pdfPageEnd: 92,
    blocks: [
      {
        type: 'writing',
        letter: 'ش',
        forms: ['ش', 'شـ', 'ـشـ', 'ـش'],
        note: 'Звук [ʃ].',
      },
      {
        type: 'vowels',
        items: [
          { text: 'شَ', audio: '/audio/shin_a.mp3', translit: 'ша' },
          { text: 'شِ', audio: '/audio/shin_i.mp3', translit: 'ши' },
          { text: 'شُ', audio: '/audio/shin_u.mp3', translit: 'шу' },
        ],
      },
      {
        type: 'long_vowels',
        items: [
          { text: 'شَا', audio: '/audio/shin_aa.mp3', translit: 'шаа' },
          { text: 'شُو', audio: '/audio/shin_uu.mp3', translit: 'шуу' },
          { text: 'شِي', audio: '/audio/shin_ii.mp3', translit: 'шии' },
        ],
      },
      {
        type: 'sukun',
        items: ['شْت', 'شْم', 'شْل'],
      },
      {
        type: 'words',
        items: [
          { text: 'شَانَ', audio: '/audio/word_shana.mp3', translit: 'шана' },
          { text: 'شُونَ', audio: '/audio/word_shuna.mp3', translit: 'шуна' },
          { text: 'شَمْس', audio: '/audio/word_shams.mp3', translit: 'шамс' },
          { text: 'شَجَر', audio: '/audio/word_shajar.mp3', translit: 'шажар' },
        ],
      },
    ],
  },

  // ─────────────────────────── Lesson 26 ───────────────────────────
  {
    id: 26,
    title: 'Урок 26: Буква «сод» (ص)',
    pdfPageStart: 93,
    pdfPageEnd: 96,
    blocks: [
      {
        type: 'writing',
        letter: 'ص',
        forms: ['ص', 'صـ', 'ـصـ', 'ـص'],
        note: 'Эмфатический [sˤ] (фарингализованный).',
      },
      {
        type: 'vowels',
        items: [
          { text: 'صَ', audio: '/audio/sad_a.mp3', translit: 'са' },
          { text: 'صِ', audio: '/audio/sad_i.mp3', translit: 'си' },
          { text: 'صُ', audio: '/audio/sad_u.mp3', translit: 'су' },
        ],
      },
      {
        type: 'long_vowels',
        items: [
          { text: 'صَا', audio: '/audio/sad_aa.mp3', translit: 'саа' },
          { text: 'صُو', audio: '/audio/sad_uu.mp3', translit: 'суу' },
          { text: 'صِي', audio: '/audio/sad_ii.mp3', translit: 'сии' },
        ],
      },
      {
        type: 'sukun',
        items: ['صْت', 'صْم', 'صْل'],
      },
      {
        type: 'words',
        items: [
          { text: 'صَانَ', audio: '/audio/word_sana.mp3', translit: 'сана' },
          { text: 'صُونَ', audio: '/audio/word_suna.mp3', translit: 'суна' },
          { text: 'صَبْر', audio: '/audio/word_sabr.mp3', translit: 'сабр' },
          { text: 'صَوْت', audio: '/audio/word_sawt.mp3', translit: 'саут' },
        ],
      },
    ],
  },

  // ─────────────────────────── Lesson 27 ───────────────────────────
  {
    id: 27,
    title: 'Урок 27: Буква «дод» (ض)',
    pdfPageStart: 97,
    pdfPageEnd: 100,
    blocks: [
      {
        type: 'writing',
        letter: 'ض',
        forms: ['ض', 'ضـ', 'ـضـ', 'ـض'],
        note: 'Эмфатический [dˤ].',
      },
      {
        type: 'vowels',
        items: [
          { text: 'ضَ', audio: '/audio/dad_a.mp3', translit: 'да' },
          { text: 'ضِ', audio: '/audio/dad_i.mp3', translit: 'ди' },
          { text: 'ضُ', audio: '/audio/dad_u.mp3', translit: 'ду' },
        ],
      },
      {
        type: 'long_vowels',
        items: [
          { text: 'ضَا', audio: '/audio/dad_aa.mp3', translit: 'даа' },
          { text: 'ضُو', audio: '/audio/dad_uu.mp3', translit: 'дуу' },
          { text: 'ضِي', audio: '/audio/dad_ii.mp3', translit: 'дии' },
        ],
      },
      {
        type: 'sukun',
        items: ['ضْت', 'ضْم', 'ضْل'],
      },
      {
        type: 'words',
        items: [
          { text: 'ضَانَ', audio: '/audio/word_dana.mp3', translit: 'дана' },
          { text: 'ضُونَ', audio: '/audio/word_duna.mp3', translit: 'дуна' },
          { text: 'ضَوْء', audio: '/audio/word_daw.mp3', translit: 'дау' },
          { text: 'ضَرْب', audio: '/audio/word_darb.mp3', translit: 'дарб' },
        ],
      },
    ],
  },

  // ─────────────────────────── Lesson 28 ───────────────────────────
  {
    id: 28,
    title: 'Урок 28: Буква «то» (ط)',
    pdfPageStart: 101,
    pdfPageEnd: 104,
    blocks: [
      {
        type: 'writing',
        letter: 'ط',
        forms: ['ط', 'طـ', 'ـطـ', 'ـط'],
        note: 'Эмфатический [tˤ].',
      },
      {
        type: 'vowels',
        items: [
          { text: 'طَ', audio: '/audio/ta_emph_a.mp3', translit: 'та' },
          { text: 'طِ', audio: '/audio/ta_emph_i.mp3', translit: 'ти' },
          { text: 'طُ', audio: '/audio/ta_emph_u.mp3', translit: 'ту' },
        ],
      },
      {
        type: 'long_vowels',
        items: [
          { text: 'طَا', audio: '/audio/ta_emph_aa.mp3', translit: 'таа' },
          { text: 'طُو', audio: '/audio/ta_emph_uu.mp3', translit: 'туу' },
          { text: 'طِي', audio: '/audio/ta_emph_ii.mp3', translit: 'тии' },
        ],
      },
      {
        type: 'combinations',
        items: ['طَ طِ طُ', 'طَلَ', 'طَمَ'],
      },
      {
        type: 'words',
        items: [
          { text: 'طَانَ', audio: '/audio/word_tana.mp3', translit: 'тана' },
          { text: 'طُونَ', audio: '/audio/word_tuna.mp3', translit: 'туна' },
          { text: 'طَبِيب', audio: '/audio/word_tabib.mp3', translit: 'табиб' },
          { text: 'طَرِيق', audio: '/audio/word_tariq.mp3', translit: 'тариг' },
        ],
      },
    ],
  },

  // ─────────────────────────── Lesson 29 ───────────────────────────
  {
    id: 29,
    title: 'Урок 29: Буква «зо» (ظ)',
    pdfPageStart: 105,
    pdfPageEnd: 108,
    blocks: [
      {
        type: 'writing',
        letter: 'ظ',
        forms: ['ظ', 'ظـ', 'ـظـ', 'ـظ'],
        note: 'Эмфатический [ðˤ].',
      },
      {
        type: 'vowels',
        items: [
          { text: 'ظَ', audio: '/audio/za_a.mp3', translit: 'за' },
          { text: 'ظِ', audio: '/audio/za_i.mp3', translit: 'зи' },
          { text: 'ظُ', audio: '/audio/za_u.mp3', translit: 'зу' },
        ],
      },
      {
        type: 'long_vowels',
        items: [
          { text: 'ظَا', audio: '/audio/za_aa.mp3', translit: 'заа' },
          { text: 'ظُو', audio: '/audio/za_uu.mp3', translit: 'зуу' },
          { text: 'ظِي', audio: '/audio/za_ii.mp3', translit: 'зии' },
        ],
      },
      {
        type: 'sukun',
        items: ['ظْت', 'ظْم', 'ظْل'],
      },
      {
        type: 'words',
        items: [
          { text: 'ظَانَ', audio: '/audio/word_zana.mp3', translit: 'зана' },
          { text: 'ظُونَ', audio: '/audio/word_zuna.mp3', translit: 'зуна' },
          { text: 'ظِلّ', audio: '/audio/word_zill.mp3', translit: 'зилль' },
          { text: 'ظَهْر', audio: '/audio/word_zahr.mp3', translit: 'захр' },
        ],
      },
    ],
  },

  // ─────────────────────────── Lesson 30 ───────────────────────────
  {
    id: 30,
    title: 'Урок 30: Ташдид (удвоение)',
    pdfPageStart: 109,
    pdfPageEnd: 111,
    blocks: [
      {
        type: 'shadda',
        note: 'Ташдид (ّ) — знак удвоения согласной. Читается с усилением и удвоением звука.',
        items: [
          { text: 'إِنَّ', audio: '/audio/word_inna.mp3', translit: 'инна' },
          { text: 'رَبِّ', audio: '/audio/word_rabbi.mp3', translit: 'рабби' },
          { text: 'مُحَمَّد', audio: '/audio/word_muhammad.mp3', translit: 'мухаммад' },
          { text: 'حَقَّ', audio: '/audio/word_haqq.mp3', translit: 'хакк' },
          { text: 'صَفِيّ', audio: '/audio/word_safiyy.mp3', translit: 'сафийй' },
        ],
      },
      {
        type: 'combinations',
        note: 'Примеры сочетаний с ташдидом',
        items: ['كَلِّ', 'جَمِّ', 'سَمِّ', 'عَلِّ', 'نَبِّ'],
      },
    ],
  },

  // ─────────────────────────── Lesson 31 ───────────────────────────
  {
    id: 31,
    title: 'Урок 31: Лунные и солнечные буквы',
    pdfPageStart: 112,
    pdfPageEnd: 116,
    blocks: [
      {
        type: 'sun_moon',
        note: 'Солнечные буквы (شمسية) — ассимилируют лам артикля. Лунные буквы (قمرية) — не ассимилируют.',
        items: [
          { text: 'الشمس (аш-шамс) — солнце', audio: '/audio/word_shamsa.mp3', translit: 'ашшамс' },
          { text: 'القمر (аль-камар) — луна', audio: '/audio/word_qamar.mp3', translit: 'алькамар' },
          { text: 'الرحمن (ар-рахман) — солнечная', audio: '/audio/word_rahman.mp3', translit: 'аррахман' },
          { text: 'الملك (аль-малик) — лунная', audio: '/audio/word_malik.mp3', translit: 'альмалик' },
        ],
      },
      {
        type: 'combinations',
        note: 'Солнечные буквы: ت ث د ذ ر ز س ش ص ض ط ظ ل ن',
        items: ['الترجمان', 'الثعلب', 'الدار', 'الذهب', 'الرجل', 'الزيت', 'السكن', 'الشمس', 'الصفة', 'الضالة', 'الطريق', 'الظهر', 'اللسان', 'النور'],
      },
      {
        type: 'combinations',
        note: 'Лунные буквы: ا ب ج ح خ ع غ ف ق ك م ه و ي',
        items: ['الأب', 'الباب', 'الجزء', 'الحرف', 'الخيل', 'العين', 'الغار', 'الفضيل', 'القلم', 'الكتاب', 'الملك', 'الهواء', 'الواد', 'اليد'],
      },
    ],
  },
];
