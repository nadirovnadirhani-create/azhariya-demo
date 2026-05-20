/**
 * Arabic audio playback with graceful fallback.
 *
 * Strategy:
 *   1. If `src` is provided, try Howler (HTML5 audio).
 *   2. On load error, missing src, or unsupported audio, fall back to
 *      `window.speechSynthesis` with lang='ar-SA' speaking `fallbackText`.
 *
 * SSR-safe: bails out early when window/document is unavailable.
 */

import { Howl } from 'howler';

export interface PlayArabicOptions {
  onStart?: () => void;
  onEnd?: () => void;
  rate?: number; // for SpeechSynthesis fallback; default 0.85 (slower for learners)
}

let activeHowl: Howl | null = null;
let cachedArabicVoice: SpeechSynthesisVoice | null | undefined;

function getArabicVoice(): SpeechSynthesisVoice | null {
  if (typeof window === 'undefined' || !window.speechSynthesis) return null;
  if (cachedArabicVoice !== undefined) return cachedArabicVoice;

  const voices = window.speechSynthesis.getVoices();
  const arabic =
    voices.find((v) => v.lang === 'ar-SA') ??
    voices.find((v) => v.lang.startsWith('ar-')) ??
    voices.find((v) => v.lang.toLowerCase().startsWith('ar')) ??
    null;

  // Voices list can be empty on first call in some browsers — cache only if non-empty
  if (voices.length > 0) cachedArabicVoice = arabic;
  return arabic;
}

function speak(text: string, options: PlayArabicOptions): void {
  if (typeof window === 'undefined' || !window.speechSynthesis) {
    options.onEnd?.();
    return;
  }
  // Cancel anything already speaking so rapid clicks feel responsive.
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'ar-SA';
  utterance.rate = options.rate ?? 0.85;

  const voice = getArabicVoice();
  if (voice) utterance.voice = voice;

  utterance.onstart = () => options.onStart?.();
  utterance.onend = () => options.onEnd?.();
  utterance.onerror = () => options.onEnd?.();

  window.speechSynthesis.speak(utterance);
}

/**
 * Play an Arabic audio fragment with TTS fallback.
 *
 * @param src           URL of the MP3, or null/undefined to go straight to TTS.
 * @param fallbackText  Arabic text to speak if the audio file is missing/fails.
 * @param options       Optional lifecycle callbacks.
 */
export function playArabic(
  src: string | null | undefined,
  fallbackText?: string,
  options: PlayArabicOptions = {},
): void {
  if (typeof window === 'undefined') return;

  // Stop any prior Howl playback to keep UI state in sync.
  if (activeHowl) {
    activeHowl.unload();
    activeHowl = null;
  }

  const fallback = () => {
    if (fallbackText && fallbackText.trim().length > 0) {
      speak(fallbackText, options);
    } else {
      options.onEnd?.();
    }
  };

  if (!src) {
    fallback();
    return;
  }

  let audioUrl = src;
  if (audioUrl.startsWith('/')) {
    audioUrl = `${process.env.NEXT_PUBLIC_BASE_PATH || ''}${audioUrl}`;
  }

  const sound = new Howl({
    src: [audioUrl],
    html5: true,
    onplay: () => options.onStart?.(),
    onend: () => {
      options.onEnd?.();
      activeHowl = null;
    },
    onloaderror: () => {
      activeHowl = null;
      fallback();
    },
    onplayerror: () => {
      activeHowl = null;
      fallback();
    },
  });

  activeHowl = sound;
  sound.play();
}

/**
 * Stop whatever is currently playing (Howl or SpeechSynthesis).
 */
export function stopArabic(): void {
  if (typeof window === 'undefined') return;
  if (activeHowl) {
    activeHowl.stop();
    activeHowl.unload();
    activeHowl = null;
  }
  if (window.speechSynthesis) {
    window.speechSynthesis.cancel();
  }
}
