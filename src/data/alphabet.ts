export interface AlphabetLetter {
  id: number;
  letter: string;
  name: string;
  translit: string;
  sound: string;
  audio: string;
  forms: {
    isolated: string;
    initial: string;
    medial: string;
    final: string;
  };
}

export const alphabet: AlphabetLetter[] = [
  { id: 1, letter: 'ا', name: 'Алиф', translit: 'Alif', sound: 'a', audio: '/audio/alif.mp3',
    forms: { isolated: 'ا', initial: 'ا', medial: 'ـا', final: 'ـا' } },
  { id: 2, letter: 'ب', name: 'Ба', translit: 'Ba', sound: 'b', audio: '/audio/ba.mp3',
    forms: { isolated: 'ب', initial: 'بـ', medial: 'ـبـ', final: 'ـب' } },
  { id: 3, letter: 'ت', name: 'Та', translit: 'Ta', sound: 't', audio: '/audio/ta.mp3',
    forms: { isolated: 'ت', initial: 'تـ', medial: 'ـтـ', final: 'ـт' } },
  { id: 4, letter: 'ث', name: 'Са', translit: 'Tha', sound: 'th', audio: '/audio/tha.mp3',
    forms: { isolated: 'ث', initial: 'ثـ', medial: 'ـثـ', final: 'ـث' } },
  { id: 5, letter: 'ج', name: 'Джим', translit: 'Jim', sound: 'j', audio: '/audio/jim.mp3',
    forms: { isolated: 'ج', initial: 'جـ', medial: 'ـجـ', final: 'ـج' } },
  { id: 6, letter: 'ح', name: 'Ха', translit: 'Ha', sound: 'ḥ', audio: '/audio/ha.mp3',
    forms: { isolated: 'ح', initial: 'حـ', medial: 'ـحـ', final: 'ـح' } },
  { id: 7, letter: 'خ', name: 'Хо', translit: 'Kha', sound: 'kh', audio: '/audio/kha.mp3',
    forms: { isolated: 'خ', initial: 'خـ', medial: 'ـخـ', final: 'ـخ' } },
  { id: 8, letter: 'د', name: 'Даль', translit: 'Dal', sound: 'd', audio: '/audio/dal.mp3',
    forms: { isolated: 'د', initial: 'د', medial: 'ـد', final: 'ـد' } },
  { id: 9, letter: 'ذ', name: 'Заль', translit: 'Dhal', sound: 'dh', audio: '/audio/dhal.mp3',
    forms: { isolated: 'ذ', initial: 'ذ', medial: 'ـذ', final: 'ـذ' } },
  { id: 10, letter: 'ر', name: 'Ра', translit: 'Ra', sound: 'r', audio: '/audio/ra.mp3',
    forms: { isolated: 'ر', initial: 'ر', medial: 'ـر', final: 'ـر' } },
  { id: 11, letter: 'ز', name: 'Зай', translit: 'Zay', sound: 'z', audio: '/audio/zay.mp3',
    forms: { isolated: 'ز', initial: 'ز', medial: 'ـза', final: 'ـза' } },
  { id: 12, letter: 'س', name: 'Син', translit: 'Sin', sound: 's', audio: '/audio/sin.mp3',
    forms: { isolated: 'س', initial: 'سـ', medial: 'ـسـ', final: 'ـس' } },
  { id: 13, letter: 'ш', name: 'Шин', translit: 'Shin', sound: 'sh', audio: '/audio/shin.mp3',
    forms: { isolated: 'ش', initial: 'شـ', medial: 'ـшـ', final: 'ـш' } },
  { id: 14, letter: 'ص', name: 'Сод', translit: 'Sad', sound: 'ṣ', audio: '/audio/sad.mp3',
    forms: { isolated: 'ص', initial: 'صـ', medial: 'ـصـ', final: 'ـص' } },
  { id: 15, letter: 'ض', name: 'Дод', translit: 'Dad', sound: 'ḍ', audio: '/audio/dad.mp3',
    forms: { isolated: 'ض', initial: 'ضـ', medial: 'ـضـ', final: 'ـض' } },
  { id: 16, letter: 'ط', name: 'То', translit: 'Ta', sound: 'ṭ', audio: '/audio/ta_emph.mp3',
    forms: { isolated: 'ط', initial: 'طـ', medial: 'ـطـ', final: 'ط' } },
  { id: 17, letter: 'ظ', name: 'Зо', translit: 'Dha', sound: 'ẓ', audio: '/audio/za.mp3',
    forms: { isolated: 'ظ', initial: 'ظـ', medial: 'ـظـ', final: 'ـظ' } },
  { id: 18, letter: 'ع', name: 'Айн', translit: 'Ayn', sound: 'ʿ', audio: '/audio/ayn.mp3',
    forms: { isolated: 'ع', initial: 'عـ', medial: 'ـعـ', final: 'ـع' } },
  { id: 19, letter: 'غ', name: 'Гойн', translit: 'Ghayn', sound: 'gh', audio: '/audio/ghayn.mp3',
    forms: { isolated: 'غ', initial: 'غـ', medial: 'ـغـ', final: 'ـغ' } },
  { id: 20, letter: 'ف', name: 'Фа', translit: 'Fa', sound: 'f', audio: '/audio/fa.mp3',
    forms: { isolated: 'ف', initial: 'فـ', medial: 'ـفـ', final: 'ـف' } },
  { id: 21, letter: 'ق', name: 'Коф', translit: 'Qaf', sound: 'q', audio: '/audio/qaf.mp3',
    forms: { isolated: 'ق', initial: 'قـ', medial: 'ـقـ', final: 'ـق' } },
  { id: 22, letter: 'ك', name: 'Каф', translit: 'Kaf', sound: 'k', audio: '/audio/kaf.mp3',
    forms: { isolated: 'ك', initial: 'كـ', medial: 'ـكـ', final: 'ـك' } },
  { id: 23, letter: 'ل', name: 'Лям', translit: 'Lam', sound: 'l', audio: '/audio/lam.mp3',
    forms: { isolated: 'ل', initial: 'لـ', medial: 'ـلـ', final: 'ـл' } },
  { id: 24, letter: 'م', name: 'Мим', translit: 'Mim', sound: 'm', audio: '/audio/mim.mp3',
    forms: { isolated: 'م', initial: 'مـ', medial: 'ـмـ', final: 'ـм' } },
  { id: 25, letter: 'ن', name: 'Нун', translit: 'Nun', sound: 'n', audio: '/audio/nun.mp3',
    forms: { isolated: 'ن', initial: 'نـ', medial: 'ـنـ', final: 'ـن' } },
  { id: 26, letter: 'ه', name: 'Ха', translit: 'Ha', sound: 'h', audio: '/audio/ha_light.mp3',
    forms: { isolated: 'ه', initial: 'هـ', medial: 'ـهـ', final: 'ـه' } },
  { id: 27, letter: 'و', name: 'Вав', translit: 'Waw', sound: 'w', audio: '/audio/waw.mp3',
    forms: { isolated: 'و', initial: 'و', medial: 'ـو', final: 'ـو' } },
  { id: 28, letter: 'ي', name: 'Йа', translit: 'Ya', sound: 'y', audio: '/audio/ya.mp3',
    forms: { isolated: 'ي', initial: 'يـ', medial: 'ـيـ', final: 'ـي' } },
];
