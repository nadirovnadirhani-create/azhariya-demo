"""
Build-time audio generator for the Azharia app.

Generates one MP3 per Arabic phoneme / word referenced by lessons 1-10 in
src/data/lessons.ts, using Google Text-to-Speech (gTTS).

Usage (from repo root):
    pip install gTTS
    python scripts/generate_audio.py

Output: azharia-next/public/audio/*.mp3

The runtime helper src/shared/lib/audio.ts falls back to the browser's
SpeechSynthesis API when an MP3 is missing, so missing files do not break
the app — but pre-generating them gives a much better demo on devices
without a high-quality Arabic voice installed.
"""

from __future__ import annotations

import os
import sys
import time
from pathlib import Path

try:
    from gtts import gTTS
except ImportError:  # pragma: no cover
    sys.stderr.write("Missing dependency. Run: pip install gTTS\n")
    sys.exit(1)


# Directory containing this script: <repo>/azharia-next/scripts/
SCRIPT_DIR = Path(__file__).resolve().parent
OUTPUT_DIR = SCRIPT_DIR.parent / "public" / "audio"
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)


# Slug -> Arabic letter (isolated form). Slug matches the audio filename prefix
# referenced by src/data/lessons.ts.
LETTERS: dict[str, str] = {
    "alif": "ا",
    "ba": "ب",
    "ta": "ت",
    "tha": "ث",
    "nun": "ن",
    "ya": "ي",
    "waw": "و",
    "lam": "ل",
    "mim": "م",
    # The script can be extended for later lessons; lessons 11-31 are stubs
    # for now so audio there is not required.
}


# Diacritic suffixes used by lessons 1-10. The TTS engine reads the
# composed glyph; we feed it the letter + diacritic so it pronounces the
# correct syllable.
SUFFIXES: dict[str, str] = {
    "a": "َ",      # FATHA  (بَ)
    "i": "ِ",      # KASRA  (بِ)
    "u": "ُ",      # DAMMA  (بُ)
    "aa": "َا",    # long alif (بَا)
    "uu": "ُو",    # long waw  (بُو)
    "ii": "ِي",    # long ya   (بِي)
    "an": "ً",     # tanwin fatha
    "in": "ٍ",     # tanwin kasra
    "un": "ٌ",     # tanwin damma
}


# Words referenced by lessons 1-10 (see src/data/lessons.ts `words` blocks).
# Key = filename slug used in lessons.ts audio refs; value = Arabic word.
WORDS: dict[str, str] = {
    # Lesson 2 (ba)
    "bab":   "بَب",
    "bib":   "بِيب",
    "bub":   "بُوب",
    "baab":  "بَاب",
    # Lesson 3 (ta)
    "taaba": "تَابَ",
    "tuut":  "تُوت",
    "tiin":  "تِين",
    "tata":  "تَتَ",
    # Lesson 4 (ta marbuta / sukun)
    "bat":         "بَتْ",
    "but":         "بُتْ",
    "bit":         "بِتْ",
    "tawba":       "تَوْبَة",
    "baytun":      "بَيْتٌ",
    "thaabat":     "ثَابَتْ",
    "thaabati":    "ثَابَتِ",
    # Lesson 5 (tha)
    "thaaba":   "ثَابَ",
    "thubuur":  "ثُبُور",
    # Lesson 6 (nun)
    "naama": "نَامَ",
    "nuur":  "نُور",
    "nayn":  "نَيْن",
    "namaa": "نَمَا",
    # Lesson 7 (ya)
    "yad":     "يَد",
    "yawm":    "يَوْم",
    "yaqiin":  "يَقِين",
    "yanaamu": "يَنَامُ",
    # Lesson 8 (waw)
    "warad": "وَرَد",
    "walad": "وَلَد",
    "waqt":  "وَقْت",
    "wasat": "وَسَط",
    # Lesson 9 (lam)
    "lam":   "لَم",
    "lima":  "لِمَ",
    "lamaa": "لَمَا",
    "laman": "لَمَن",
    "qalam": "قَلَم",
    # Lesson 10 (mim)
    "maan":  "مَان",
    "muuna": "مُونَ",
    "mina":  "مِنَ",
    "wamaa": "وَمَا",
    "maata": "مَاتَ",
}


def synth(arabic_text: str, out_path: Path) -> None:
    """Generate one MP3 with gTTS. Skips if file already exists."""
    if out_path.exists():
        return
    tts = gTTS(text=arabic_text, lang="ar")
    tts.save(str(out_path))
    print(f"  + {out_path.name}")
    # gTTS hits a public endpoint — be polite.
    time.sleep(0.2)


def main() -> int:
    print(f"Output directory: {OUTPUT_DIR}")

    print("\n== Letters (isolated) ==")
    for slug, glyph in LETTERS.items():
        synth(glyph, OUTPUT_DIR / f"{slug}.mp3")

    print("\n== Vowel / long-vowel / tanwin combinations ==")
    for slug, glyph in LETTERS.items():
        for suffix_slug, diacritic in SUFFIXES.items():
            text = glyph + diacritic
            synth(text, OUTPUT_DIR / f"{slug}_{suffix_slug}.mp3")

    print("\n== Words ==")
    for slug, word in WORDS.items():
        synth(word, OUTPUT_DIR / f"word_{slug}.mp3")

    print("\nDone.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
