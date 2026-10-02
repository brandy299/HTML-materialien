#!/usr/bin/env python3
"""
LERNRAUM – Hintergrundmusik für Erklärvideos (selbst erzeugt, rechtefrei).

Weiches Klangbett aus Akkorden (Pad) plus leise Zupftöne, ohne Gesang.
Das Ergebnis hängt nur von Dauer, Tempo, Stimmung und Startwert (--seed) ab,
ist also reproduzierbar und gehört niemandem – keine Urheberrechtsfragen.

  python3 app/tools/video-music.py --seconds 40 --bpm 92 --mood calm --seed pbp-nettobedarf --out musik.wav

Stimmungen: calm (ruhig, Standard) · bright (heller, etwas lebendiger)
Reine Python-Standardbibliothek (kein numpy nötig).
"""
import argparse, hashlib, math, random, struct, wave

SR = 22050

def midi(m):
    return 440.0 * 2 ** ((m - 69) / 12)

MOODS = {
    # Akkordfolgen (je Takt ein Akkord, MIDI-Töne)
    "calm":   [[48, 55, 59, 64], [45, 52, 57, 60], [41, 48, 53, 57], [43, 50, 55, 59]],   # Cmaj7 – Am7 – Fmaj – G
    "bright": [[48, 55, 60, 64], [43, 50, 55, 59], [45, 52, 57, 60], [41, 48, 53, 57]],   # C – G – Am – F
}

def add_note(buf, start, dur, freq, amp, kind):
    i0 = int(start * SR)
    n = int(dur * SR)
    for i in range(n):
        j = i0 + i
        if j >= len(buf):
            break
        t = i / SR
        if kind == "pad":
            att = min(1.0, t / 0.9)
            rel = min(1.0, (dur - t) / 1.2)
            env = max(0.0, att * rel)
            env = env * env * (3 - 2 * env)
            s = math.sin(2 * math.pi * freq * t) + 0.35 * math.sin(2 * math.pi * freq * 2.003 * t)
        else:  # Zupfton
            env = math.exp(-t * 4.2) * min(1.0, t / 0.006)
            s = math.sin(2 * math.pi * freq * t) + 0.45 * math.sin(2 * math.pi * freq * 2 * t) * math.exp(-t * 3)
        buf[j] += amp * env * s

def reverb(buf):
    out = buf[:]
    for delay, gain in ((0.113, 0.32), (0.171, 0.26), (0.233, 0.2)):
        d = int(delay * SR)
        for i in range(d, len(out)):
            out[i] += out[i - d] * gain * 0.55
    return out

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--seconds", type=float, required=True)
    ap.add_argument("--bpm", type=float, default=92)
    ap.add_argument("--mood", default="calm", choices=sorted(MOODS))
    ap.add_argument("--seed", default="lernraum")
    ap.add_argument("--out", required=True)
    a = ap.parse_args()

    rnd = random.Random(int(hashlib.sha1(a.seed.encode()).hexdigest()[:8], 16))
    beat = 60.0 / a.bpm
    bar = 4 * beat
    total = a.seconds + 1.8                     # kleiner Ausklang
    buf = [0.0] * int(total * SR)
    chords = MOODS[a.mood]

    bars = int(total / bar) + 1
    for b in range(bars):
        ch = chords[b % len(chords)]
        t0 = b * bar
        for k, m in enumerate(ch):                       # Pad
            add_note(buf, t0, bar + 1.1, midi(m), 0.075 if k else 0.11, "pad")
        scale = [ch[1] + 12, ch[2] + 12, ch[3] + 12, ch[1] + 24, ch[2] + 24]
        last = rnd.choice(scale)
        for e in range(8):                               # Achtel-Zupftöne
            if e % 2 == 0 or rnd.random() < 0.55:
                note = rnd.choice(scale)
                if note == last:
                    note = rnd.choice(scale)
                last = note
                add_note(buf, t0 + e * beat / 2, 1.0, midi(note), 0.05 if e % 4 else 0.07, "pluck")

    buf = reverb(buf)
    peak = max(1e-9, max(abs(x) for x in buf))
    g = 0.42 / peak                                      # Spitzenpegel ca. −7,5 dBFS; im Video zusätzlich leiser gemischt
    fi, fo = int(0.5 * SR), int(1.8 * SR)
    n = len(buf)
    with wave.open(a.out, "wb") as w:
        w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR)
        frames = bytearray()
        for i, x in enumerate(buf):
            f = min(1.0, i / fi, (n - i) / fo)
            v = max(-1.0, min(1.0, x * g * f))
            frames += struct.pack("<h", int(v * 32767))
        w.writeframes(bytes(frames))

if __name__ == "__main__":
    main()
