from gtts import gTTS
import os

letters = {
    "alif": "أ", "ba": "ب", "ta": "ت", "tha": "ث", "jim": "ج",
    "ha": "ح", "kha": "خ", "dal": "д", "dhal": "ذ", "ra": "ر",
    "zay": "ز", "sin": "س", "shin": "ш", "sad": "ص", "dad": "ض",
    "ta_emph": "ط", "za": "ظ", "ayn": "ع", "ghayn": "غ", "fa": "ف",
    "qaf": "ق", "kaf": "к", "lam": "л", "mim": "м", "nun": "н",
    "ha_light": "ه", "waw": "و", "ya": "и"
}

output_dir = "public/audio"
if not os.path.exists(output_dir):
    os.makedirs(output_dir)

for name, char in letters.items():
    tts = gTTS(text=char, lang='ar')
    filename = os.path.join(output_dir, f"{name}.mp3")
    tts.save(filename)
    print(f"Generated {filename}")
