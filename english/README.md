# Everyday English (Prototyp)

Eigenständiger Anfänger-Englischkurs, getrennt von der Lernraum-App und vom alten Hub `englisch/`.
Konzept: Claude-Dokument „Konzept: Everyday English“ (Thread „Englischkurs ausbauen“).
Nicht in Startseite oder App verlinkt, `noindex`, bis yb den Kurs freigibt.

- `index.html`: Karte, Stationen (Szene, Sehen, Üben, Hören, Check), alle Inhalte von Einheit 1.
- `scenes/be.js`: 3D-Bühne mit Wortblöcken (three.js) und 2D-Ersatz mit gleicher Schnittstelle.
- `vendor/three.module.min.js`: three.js r160.1 (MIT), selbst gehostet, wird erst in „Sehen“ geladen.
- `fonts/`: Kopie der Hub-Schriften (IM Fell English, Be Vietnam Pro, OFL).

Handy-Regeln: Tippflächen ≥ 44 px, kein seitliches Scrollen ab 320 px. Ohne WebGL oder bei „Bewegung reduzieren“ erscheint der 2D-Ersatz.
Vietnamesisch ist eine Lernhilfe und muss vor Freigabe gegengelesen werden. Fortschritt nur im Browser (`localStorage`, `ee.proto.u1`).
