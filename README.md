# Kalorienbuch

Kalorien-Tracker fürs Handy, im Stil von Yazio. Läuft als installierbare Web-App (PWA) auf iPhone und Android, ohne App Store.

## Funktionen

- Tagesziel für Kalorien, Kohlenhydrate, Eiweiß und Fett, mit Bedarfsrechner
- Frühstück, Mittagessen, Abendessen und Snacks erfassen
- Barcode-Scanner mit der Handykamera
- Produktsuche in [Open Food Facts](https://world.openfoodfacts.org) (Millionen Produkte, kostenlos)
- Eigene Lebensmittel anlegen, Getränke in ml mit Schiebeleiste
- Wasser-Tracker, Tageswechsel, Sicherung zum Mitnehmen auf ein neues Handy
- Funktioniert offline für alles außer der Produktsuche

Alle Einträge bleiben auf dem Handy (localStorage). Es gibt keinen Server und kein Konto.

## Aufs Handy holen

1. Die App-Adresse öffnen (siehe unten).
2. **iPhone:** in Safari auf Teilen tippen, dann „Zum Home-Bildschirm“.
   **Android:** in Chrome im Menü „App installieren“ wählen.

## Online stellen (GitHub Pages)

Einmalig im Repo unter **Settings → Pages → Build and deployment → Source** „GitHub Actions“ auswählen.
Danach wird jeder Push auf `main` automatisch veröffentlicht unter `https://<benutzername>.github.io/<repo>/`.

## Aufbau

| Datei | Inhalt |
| --- | --- |
| `index.html` | Seitengerüst |
| `style.css` | Aussehen, helles und dunkles Design |
| `app.js` | Logik: Tagebuch, Suche, Scanner, Ziele |
| `sw.js` | Offline-Cache |
| `vendor/html5-qrcode.min.js` | Barcode-Erkennung ([html5-qrcode](https://github.com/mebjas/html5-qrcode) 2.3.8, Apache-2.0) |

Lokal testen: `python3 -m http.server 8000` und `http://localhost:8000` öffnen. Die Kamera braucht HTTPS oder localhost.

Produktdaten: © Open Food Facts Mitwirkende, [ODbL](https://opendatacommons.org/licenses/odbl/1-0/).
