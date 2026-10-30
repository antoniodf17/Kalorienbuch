// ---- Lebensmittel-Datenbank (Werte je 100 g bzw. 100 ml, gerundete Durchschnittswerte) ----
const DRINKS = new Set(["Milch 1,5 %", "Vollmilch 3,5 %", "Cola", "Orangensaft", "Bier (Pils)", "Kaffee schwarz", "Cappuccino", "Apfelschorle", "Eistee Pfirsich", "Energy Drink", "Rotwein", "Proteinshake (fertig)"]);
const FOODS = [
  ["Haferflocken", 372, 58.7, 13.5, 7.0, [["1 EL", 10], ["1 Portion", 50]]],
  ["Milch 1,5 %", 47, 4.9, 3.4, 1.5, [["1 Glas", 200], ["Schuss", 30]]],
  ["Vollmilch 3,5 %", 64, 4.8, 3.3, 3.5, [["1 Glas", 200]]],
  ["Magerquark", 67, 4.0, 12.0, 0.3, [["1 Becher", 250]]],
  ["Skyr natur", 63, 4.0, 11.0, 0.2, [["1 Becher", 150]]],
  ["Griechischer Joghurt 10 %", 122, 4.0, 4.5, 10.0, [["1 Portion", 150]]],
  ["Naturjoghurt 3,5 %", 66, 4.6, 3.6, 3.5, [["1 Becher", 150]]],
  ["Ei (Hühnerei)", 155, 1.1, 13.0, 11.0, [["1 Ei (M)", 58]]],
  ["Vollkornbrot", 220, 39.0, 7.5, 1.6, [["1 Scheibe", 50]]],
  ["Brötchen (Weizen)", 260, 51.0, 8.5, 1.5, [["1 Stück", 55]]],
  ["Toastbrot", 265, 48.0, 8.0, 3.8, [["1 Scheibe", 25]]],
  ["Butter", 741, 0.6, 0.7, 83.0, [["1 TL", 5], ["1 EL", 12]]],
  ["Erdnussbutter", 600, 16.0, 25.0, 50.0, [["1 EL", 15]]],
  ["Honig", 304, 82.0, 0.3, 0.0, [["1 TL", 7]]],
  ["Marmelade", 250, 60.0, 0.4, 0.1, [["1 TL", 10]]],
  ["Gouda", 356, 0.0, 25.0, 28.0, [["1 Scheibe", 25]]],
  ["Kochschinken", 113, 1.0, 19.0, 3.5, [["1 Scheibe", 20]]],
  ["Banane", 89, 20.0, 1.1, 0.3, [["1 Stück", 120]]],
  ["Apfel", 52, 11.4, 0.3, 0.2, [["1 Stück", 180]]],
  ["Erdbeeren", 32, 5.5, 0.7, 0.3, [["1 Schale", 150]]],
  ["Heidelbeeren", 57, 12.0, 0.7, 0.3, [["1 Handvoll", 60]]],
  ["Orange", 47, 9.0, 0.9, 0.1, [["1 Stück", 150]]],
  ["Hähnchenbrust", 110, 0.0, 23.0, 1.5, [["1 Filet", 150]]],
  ["Putenbrust", 105, 0.0, 24.0, 1.0, [["1 Filet", 150]]],
  ["Rinderhack", 250, 0.0, 19.0, 19.0, [["1 Packung", 500], ["1 Portion", 125]]],
  ["Lachs", 208, 0.0, 20.0, 13.0, [["1 Filet", 125]]],
  ["Thunfisch (Dose, im eigenen Saft)", 116, 0.0, 26.0, 1.0, [["1 Dose", 150]]],
  ["Tofu natur", 144, 2.0, 15.0, 8.5, [["1 Portion", 100]]],
  ["Reis (gekocht)", 130, 28.0, 2.7, 0.3, [["1 Portion", 200]]],
  ["Reis (roh)", 350, 78.0, 7.0, 0.6, [["1 Portion", 70]]],
  ["Nudeln (gekocht)", 150, 30.0, 5.5, 0.9, [["1 Portion", 220]]],
  ["Nudeln (roh)", 355, 71.0, 12.5, 1.5, [["1 Portion", 100]]],
  ["Kartoffeln (gekocht)", 77, 17.0, 2.0, 0.1, [["1 Portion", 250]]],
  ["Süßkartoffel", 86, 20.0, 1.6, 0.1, [["1 Stück", 200]]],
  ["Pommes frites", 300, 37.0, 3.4, 15.0, [["1 Portion", 150]]],
  ["Brokkoli", 34, 4.0, 2.8, 0.4, [["1 Portion", 200]]],
  ["Paprika", 30, 5.0, 1.0, 0.3, [["1 Stück", 150]]],
  ["Tomate", 18, 2.6, 0.9, 0.2, [["1 Stück", 80]]],
  ["Gurke", 15, 2.2, 0.6, 0.1, [["1 Stück", 400]]],
  ["Blattsalat", 15, 1.5, 1.3, 0.2, [["1 Schüssel", 80]]],
  ["Avocado", 160, 3.6, 2.0, 15.0, [["1 halbe", 70]]],
  ["Olivenöl", 884, 0.0, 0.0, 100.0, [["1 EL", 10]]],
  ["Mandeln", 579, 7.0, 21.0, 50.0, [["1 Handvoll", 30]]],
  ["Walnüsse", 654, 7.0, 15.0, 65.0, [["1 Handvoll", 30]]],
  ["Whey Protein (Pulver)", 380, 7.0, 78.0, 5.0, [["1 Messlöffel", 30]]],
  ["Proteinriegel", 360, 30.0, 33.0, 12.0, [["1 Riegel", 60]]],
  ["Zartbitterschokolade 70 %", 580, 34.0, 8.0, 42.0, [["1 Rippe", 10], ["1 Tafel", 100]]],
  ["Vollmilchschokolade", 535, 56.0, 7.5, 31.0, [["1 Rippe", 10]]],
  ["Chips", 536, 50.0, 6.5, 34.0, [["1 Tüte", 175], ["1 Handvoll", 25]]],
  ["Pizza Margherita", 245, 31.0, 10.0, 8.5, [["1 ganze", 350]]],
  ["Döner Kebab", 215, 21.0, 12.0, 9.0, [["1 Stück", 400]]],
  ["Cola", 42, 10.6, 0.0, 0.0, [["1 Dose", 330], ["1 Glas", 250]]],
  ["Orangensaft", 45, 10.0, 0.7, 0.2, [["1 Glas", 200]]],
  ["Bier (Pils)", 42, 3.1, 0.5, 0.0, [["1 Flasche", 500]]],
  ["Kaffee schwarz", 2, 0.0, 0.1, 0.0, [["1 Tasse", 200]]],
  ["Cappuccino", 40, 3.5, 2.2, 2.0, [["1 Tasse", 200]]],
  ["Apfelschorle", 24, 5.5, 0.1, 0.0, [["1 Glas", 250], ["1 Flasche", 500]]],
  ["Eistee Pfirsich", 28, 6.8, 0.0, 0.0, [["1 Glas", 250], ["1 Flasche", 500]]],
  ["Energy Drink", 45, 11.0, 0.0, 0.0, [["1 Dose", 250]]],
  ["Rotwein", 85, 2.6, 0.1, 0.0, [["1 Glas", 200]]],
  ["Proteinshake (fertig)", 60, 4.0, 9.0, 0.8, [["1 Flasche", 330]]],
].map(([name, kcal, c, p, f, portions]) => ({ name, kcal, c, p, f, portions, unit: DRINKS.has(name) ? "ml" : "g" }));

const MEALS = [
  { id: "fruehstueck", name: "Frühstück", hint: "Empfohlen ~25 %", share: 0.25 },
  { id: "mittag", name: "Mittagessen", hint: "Empfohlen ~35 %", share: 0.35 },
  { id: "abend", name: "Abendessen", hint: "Empfohlen ~30 %", share: 0.30 },
  { id: "snacks", name: "Snacks", hint: "Empfohlen ~10 %", share: 0.10 },
];

const DEFAULT_SETTINGS = { kcal: 2100, c: 230, p: 160, f: 60, water: 10, weight: 78, custom: [] };

// ---- Speicher: alles bleibt auf diesem Gerät ----
const local = {
  get(k) { try { const v = localStorage.getItem("kb:" + k); return v ? JSON.parse(v) : null; } catch { return null; } },
  set(k, v) { try { localStorage.setItem("kb:" + k, JSON.stringify(v)); } catch {} },
};
async function load(key) { return local.get(key); }
function save(key, value) { local.set(key, value); }

// ---- Zustand ----
let settings = { ...DEFAULT_SETTINGS };
let current = new Date(); current.setHours(12, 0, 0, 0);
let day = emptyDay();
function emptyDay() { return { meals: { fruehstueck: [], mittag: [], abend: [], snacks: [] }, water: 0 }; }
const keyFor = d => "day-" + d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");

const $ = id => document.getElementById(id);
const NF = {};
const fmt = (n, d = 0) => (NF[d] ||= new Intl.NumberFormat("de-DE", { maximumFractionDigits: d, minimumFractionDigits: d })).format(Number(n) || 0);
const esc = s => String(s).replace(/[&<>"']/g, ch => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch]));

function totals(list) {
  return list.reduce((t, e) => ({ kcal: t.kcal + e.kcal, c: t.c + e.c, p: t.p + e.p, f: t.f + e.f }), { kcal: 0, c: 0, p: 0, f: 0 });
}

function render() {
  const today = new Date(); today.setHours(12, 0, 0, 0);
  const diff = Math.round((current - today) / 864e5);
  $("day-title").textContent = diff === 0 ? "Heute" : diff === -1 ? "Gestern" : diff === 1 ? "Morgen" : current.toLocaleDateString("de-DE", { weekday: "long" });
  $("day-sub").textContent = current.toLocaleDateString("de-DE", { weekday: diff >= -1 && diff <= 1 ? "long" : undefined, day: "numeric", month: "long", year: "numeric" });

  const all = MEALS.flatMap(m => day.meals[m.id] || []);
  const t = totals(all);
  const left = settings.kcal - t.kcal;
  $("eaten").textContent = fmt(t.kcal);
  $("goal-kcal").textContent = fmt(settings.kcal);
  $("left").textContent = fmt(Math.abs(left));
  $("left-label").textContent = left >= 0 ? "kcal übrig" : "kcal zu viel";
  $("ring-center").classList.toggle("over", left < 0);
  const ratio = Math.min(t.kcal / (settings.kcal || 1), 1);
  $("ring-arc").style.strokeDashoffset = 326.7 * (1 - ratio);
  $("ring-arc").setAttribute("stroke", left < 0 ? "var(--over)" : "var(--accent)");
  for (const k of ["c", "p", "f"]) {
    $("bar-" + k).style.width = Math.min(100, t[k] / (settings[k] || 1) * 100) + "%";
    $("txt-" + k).textContent = `${fmt(t[k])} / ${fmt(settings[k])} g`;
  }

  // Wasser (1 Glas = 250 ml)
  const g = $("glasses"); g.innerHTML = "";
  for (let i = 0; i < settings.water; i++) {
    const b = document.createElement("button");
    b.type = "button"; b.className = "glass" + (i < day.water ? " full" : "");
    b.setAttribute("aria-label", `${i + 1} Glas Wasser`);
    b.onclick = () => { day.water = day.water === i + 1 ? i : i + 1; save(keyFor(current), day); render(); };
    g.appendChild(b);
  }
  $("water-txt").textContent = `${fmt(day.water * 0.25, 2).replace(/0$/, "")} von ${fmt(settings.water * 0.25, 1)} l`;

  const wrap = $("meals"); wrap.innerHTML = "";
  for (const m of MEALS) {
    const list = day.meals[m.id] || [];
    const mt = totals(list);
    const target = Math.round(settings.kcal * m.share);
    const sec = document.createElement("section");
    sec.className = "meal";
    sec.innerHTML = `
      <div class="meal-head">
        <div><h2>${m.name}</h2><div class="sub num">${list.length ? `${fmt(mt.kcal)} von ${fmt(target)} kcal` : `${m.hint} · ${fmt(target)} kcal`}</div></div>
        <button class="add" type="button" aria-label="Zu ${m.name} hinzufügen">+</button>
      </div>
      <ul class="entries">${list.map((e, i) => `
        <li><div class="name"><b>${esc(e.name)}</b><span class="num">${fmt(e.grams)} ${unitOf(e)} · K ${fmt(e.c)} · E ${fmt(e.p)} · F ${fmt(e.f)}</span></div>
        <span class="kcal num">${fmt(e.kcal)} kcal</span>
        <button class="del" type="button" data-i="${i}" aria-label="${esc(e.name)} entfernen">×</button></li>`).join("")}</ul>`;
    sec.querySelector(".add").onclick = () => openAdd(m);
    sec.querySelectorAll(".del").forEach(btn => btn.onclick = () => {
      list.splice(+btn.dataset.i, 1); save(keyFor(current), day); render();
    });
    wrap.appendChild(sec);
  }
}

async function loadDay() {
  const k = keyFor(current);
  const d = await load(k);
  if (k !== keyFor(current)) return;
  day = d && d.meals ? { ...emptyDay(), ...d, meals: { ...emptyDay().meals, ...d.meals } } : emptyDay();
  render();
}

$("prev").onclick = () => { current.setDate(current.getDate() - 1); day = emptyDay(); render(); loadDay(); };
$("next").onclick = () => { current.setDate(current.getDate() + 1); day = emptyDay(); render(); loadDay(); };

// ---- Dialoge ----
const bg = $("sheet-bg"), sheet = $("sheet");
function closeSheet() { stopScanner(); bg.hidden = true; sheet.innerHTML = ""; }
bg.addEventListener("click", e => { if (e.target === bg) closeSheet(); });
document.addEventListener("keydown", e => { if (e.key === "Escape" && !bg.hidden) closeSheet(); });

function openAdd(meal) {
  let tab = "suche";
  bg.hidden = false;
  const draw = () => {
    stopScanner();
    sheet.innerHTML = `
      <div class="sheet-head"><h3 id="sheet-title">${meal.name}</h3><button class="iconbtn" type="button" id="x">Fertig</button></div>
      <div class="tabs" role="tablist">
        <button role="tab" type="button" data-t="scan" aria-selected="${tab === "scan"}">Barcode</button>
        <button role="tab" type="button" data-t="suche" aria-selected="${tab === "suche"}">Suchen</button>
        <button role="tab" type="button" data-t="eigen" aria-selected="${tab === "eigen"}">Eigenes</button>
      </div>
      <div id="tabbody" style="display:flex;flex-direction:column;gap:12px"></div>`;
    $("x").onclick = closeSheet;
    sheet.querySelectorAll("[data-t]").forEach(b => b.onclick = async () => { await stopScanner(); tab = b.dataset.t; draw(); });
    if (tab === "scan") drawScan(meal);
    else if (tab === "suche") drawSearch(meal);
    else drawCustom(meal, () => { tab = "suche"; draw(); });
  };
  draw();
}

// ---- Mengenfeld: Gramm-Eingabe, bei Getränken zusätzlich ml-Leiste ----
const unitOf = x => (x && x.unit === "ml") ? "ml" : "g";
function amountField(id, unit, value, label = "Menge") {
  const v = Math.round(value || 0);
  return `<label class="f" for="${id}">${label ? label + " in " : ""}${unit === "ml" ? "ml" : "Gramm"}
    <input id="${id}" type="number" inputmode="decimal" min="1" step="1" value="${v}"></label>
    ${unit === "ml" ? `<div class="mlbar"><input id="${id}-r" type="range" min="0" max="${Math.max(1000, v)}" step="10" value="${v}" aria-label="Menge in ml">
      <div class="mlscale num"><span>0</span><span>250</span><span>500</span><span>750</span><span>1000 ml</span></div></div>` : ""}`;
}
function bindAmount(id, onchange) {
  const num = $(id), r = $(id + "-r");
  num.addEventListener("input", () => { if (r) { const v = parseFloat(num.value) || 0; if (v > +r.max) r.max = v; r.value = v; } onchange(); });
  if (r) r.addEventListener("input", () => { num.value = r.value; onchange(); });
}
function setAmount(id, v) { $(id).value = v; const r = $(id + "-r"); if (r) { if (v > +r.max) r.max = v; r.value = v; } }

// ---- Open Food Facts ----
const OFF_FIELDS = "code,product_name,product_name_de,brands,quantity,product_quantity_unit,serving_quantity,nutriments";

function offToFood(p) {
  if (!p) return null;
  const n = p.nutriments || {};
  let kcal = n["energy-kcal_100g"];
  if (kcal == null && n.energy_100g != null) kcal = n.energy_100g / 4.184;
  if (kcal == null) return null;
  const brand = Array.isArray(p.brands) ? p.brands[0] : String(p.brands || "").split(",")[0].trim();
  const title = String(p.product_name_de || p.product_name || "").trim();
  if (!title && !brand) return null;
  const name = brand && title && !title.toLowerCase().includes(brand.toLowerCase()) ? `${title} (${brand})` : (title || brand);
  const q = String(p.quantity || "").toLowerCase();
  const unit = p.product_quantity_unit === "ml" || /\d\s*(ml|cl|l)\b/.test(q) ? "ml" : "g";
  const serving = parseFloat(p.serving_quantity);
  return { name, code: p.code, unit, kcal: Math.round(+kcal), c: +(+n.carbohydrates_100g || 0).toFixed(1),
    p: +(+n.proteins_100g || 0).toFixed(1), f: +(+n.fat_100g || 0).toFixed(1),
    portions: serving > 0 ? [["1 Portion", Math.round(serving)]] : [], off: true };
}

async function offSearch(term, signal) {
  const url = "https://world.openfoodfacts.org/cgi/search.pl?action=process&json=1&search_simple=1&sort_by=unique_scans_n&lc=de&cc=de&page_size=25&search_terms=" +
    encodeURIComponent(term) + "&fields=" + OFF_FIELDS;
  const r = await fetch(url, { signal });
  if (!r.ok) throw new Error("search " + r.status);
  const d = await r.json();
  return (d.products || []).map(offToFood).filter(Boolean);
}

async function offBarcode(code) {
  const r = await fetch(`https://world.openfoodfacts.org/api/v2/product/${encodeURIComponent(code)}.json?fields=${OFF_FIELDS}`);
  if (r.status === 404) return null;
  if (!r.ok) throw new Error("product " + r.status);
  const d = await r.json();
  return d.status === 1 || d.product ? offToFood({ code, ...d.product }) : null;
}

// Gefundene Produkte merken, damit sie beim nächsten Mal sofort (auch offline) in der Suche sind
function remember(food) {
  if (!food || !food.off) return;
  const list = settings.custom || [];
  if (list.some(c => (food.code && c.code === food.code) || c.name === food.name)) return;
  const { off, mine, ...keep } = food;
  settings.custom = [keep, ...list].slice(0, 500);
  save("settings", settings);
}

// ---- Barcode-Scanner ----
let scanner = null;
async function stopScanner() {
  if (!scanner) return;
  const s = scanner; scanner = null;
  try { if (s.isScanning) await s.stop(); } catch {}
  try { s.clear(); } catch {}
}

function drawScan(meal) {
  const body = $("tabbody");
  body.innerHTML = `
    <div id="reader" class="reader"></div>
    <p class="hint" id="scan-status">Halte den Barcode der Packung in den Rahmen.</p>
    <div class="row">
      <input id="code" type="text" inputmode="numeric" pattern="[0-9]*" placeholder="Oder Barcode-Nummer eintippen" autocomplete="off">
      <button class="ghost narrow" type="button" id="code-go">Suchen</button>
    </div>
    <div id="picked"></div>`;
  const status = $("scan-status");
  const lookup = async code => {
    code = String(code).replace(/\D/g, "");
    if (code.length < 8) { status.textContent = "Die Nummer ist zu kurz. Ein Barcode hat meist 8 oder 13 Ziffern."; return; }
    status.textContent = `Suche Produkt ${code} …`;
    let food = (settings.custom || []).find(c => c.code === code);
    if (!food) {
      try { food = await offBarcode(code); }
      catch { status.textContent = "Keine Verbindung zur Produktdatenbank. Prüf dein Internet und versuch es noch mal."; return; }
    }
    if (!food) {
      status.textContent = `Produkt ${code} ist noch nicht in der Datenbank. Leg es unter „Eigenes“ an.`;
      return;
    }
    if (navigator.vibrate) navigator.vibrate(60);
    status.textContent = "Gefunden. Menge wählen und hinzufügen, oder den nächsten Barcode scannen.";
    showPick(meal, { ...food, off: true }, $("picked"), () => { status.textContent = "Hinzugefügt. Scan den nächsten Barcode."; });
  };
  $("code-go").onclick = () => lookup($("code").value);
  $("code").onkeydown = e => { if (e.key === "Enter") lookup($("code").value); };

  if (typeof Html5Qrcode === "undefined") { status.textContent = "Der Scanner konnte nicht geladen werden. Tipp die Nummer unten ein."; return; }
  const F = Html5QrcodeSupportedFormats;
  scanner = new Html5Qrcode("reader", { formatsToSupport: [F.EAN_13, F.EAN_8, F.UPC_A, F.UPC_E], verbose: false,
    experimentalFeatures: { useBarCodeDetectorIfSupported: true } });
  let last = "", lastAt = 0;
  scanner.start({ facingMode: "environment" },
    { fps: 12, qrbox: (w, h) => ({ width: Math.min(w * 0.85, 320), height: Math.min(h * 0.45, 150) }), aspectRatio: 1.333 },
    text => {
      const now = Date.now();
      if (text === last && now - lastAt < 4000) return;
      last = text; lastAt = now;
      lookup(text);
    }, () => {})
    .catch(() => { status.textContent = "Kein Zugriff auf die Kamera. Erlaube die Kamera in den Einstellungen oder tipp die Nummer unten ein."; });
}

// Gemeinsame Mengen-Auswahl für Suche und Scanner
function showPick(meal, f, box, onAdded) {
  const portions = chipList(f), u = unitOf(f);
  box.innerHTML = `<div class="picked">
    <b>${esc(f.name)}</b>
    <p class="hint num">je 100 ${u}: ${fmt(f.kcal)} kcal · K ${fmt(f.c, 1)} · E ${fmt(f.p, 1)} · F ${fmt(f.f, 1)}</p>
    <div class="chips">${portions.map(([l, g]) => `<button type="button" data-g="${g}">${l === g + " " + u ? esc(l) : `${esc(l)} (${g} ${u})`}</button>`).join("")}</div>
    ${amountField("grams", u, (f.portions && f.portions[0]) ? f.portions[0][1] : u === "ml" ? 250 : 100)}
    <div class="calc num" id="calc"></div>
    <button class="primary" type="button" id="addit">Zu ${meal.name} hinzufügen</button></div>`;
  const grams = $("grams");
  const upd = () => {
    const k = Math.max(0, parseFloat(grams.value) || 0) / 100;
    $("calc").innerHTML = `<span><b>${fmt(f.kcal * k)} kcal</b></span><span>K ${fmt(f.c * k, 1)} g</span><span>E ${fmt(f.p * k, 1)} g</span><span>F ${fmt(f.f * k, 1)} g</span>`;
  };
  box.querySelectorAll("[data-g]").forEach(b => b.onclick = () => { setAmount("grams", +b.dataset.g); upd(); });
  bindAmount("grams", upd); upd();
  $("addit").onclick = () => {
    const g = parseFloat(grams.value) || 0; if (g <= 0) { grams.focus(); return; }
    const k = g / 100;
    day.meals[meal.id].push({ name: f.name, grams: g, unit: u, kcal: Math.round(f.kcal * k), c: +(f.c * k).toFixed(1), p: +(f.p * k).toFixed(1), f: +(f.f * k).toFixed(1) });
    save(keyFor(current), day);
    remember(f);
    render();
    box.innerHTML = `<div class="result-box">${esc(f.name)} (${fmt(g)} ${u}) zu ${meal.name} hinzugefügt.</div>`;
    onAdded && onAdded();
  };
  box.scrollIntoView({ block: "nearest" });
}

function chipList(f) {
  const base = unitOf(f) === "ml" ? [["1 Glas", 250], ["1 Dose", 330], ["1 Flasche", 500]] : [["100 g", 100]];
  const own = f.portions || [];
  return [...own, ...base.filter(([l, g]) => !own.some(([, og]) => og === g))];
}
function allFoods() { return [...(settings.custom || []).map(f => ({ ...f, mine: true })), ...FOODS]; }

function drawSearch(meal) {
  const body = $("tabbody");
  body.innerHTML = `
    <input id="q" type="search" placeholder="z. B. Skyr, Vollmilch, ESN Whey …" autocomplete="off" enterkeyhint="search">
    <div id="picked"></div>
    <ul class="results" id="res"></ul>
    <p class="hint" id="off-status" hidden></p>
    <ul class="results" id="res-off"></ul>`;
  const q = $("q"), res = $("res"), resOff = $("res-off"), offStatus = $("off-status");
  const norm = s => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/ß/g, "ss");
  const row = (f, attr, i) => `<li><button type="button" ${attr}="${i}"><span>${esc(f.name)}${f.mine ? " <small>· gespeichert</small>" : ""}</span><small class="num">${fmt(f.kcal)} kcal / 100 ${unitOf(f)}</small></button></li>`;
  const index = allFoods().map(f => ({ f, key: norm(f.name) }));
  let hits = [], offHits = [], lastTerm = null, timer = 0, offTimer = 0, ctl = null;
  const list = () => {
    const raw = q.value.trim(), term = norm(raw);
    if (term === lastTerm) return;
    lastTerm = term;
    const words = term.split(/\s+/).filter(Boolean);
    hits = [];
    for (const it of index) { if (words.every(w => it.key.includes(w))) { hits.push(it.f); if (hits.length >= (term ? 15 : 12)) break; } }
    res.innerHTML = hits.map((f, i) => row(f, "data-i", i)).join("");
    // Open Food Facts erst nach einer kurzen Tipp-Pause fragen
    clearTimeout(offTimer); if (ctl) ctl.abort();
    resOff.innerHTML = ""; offHits = [];
    if (raw.length < 3) { offStatus.hidden = !raw || hits.length > 0; offStatus.textContent = "Tipp mindestens 3 Buchstaben, um alle Produkte zu durchsuchen."; return; }
    offStatus.hidden = false; offStatus.textContent = "Suche in Open Food Facts …";
    offTimer = setTimeout(async () => {
      ctl = new AbortController();
      try {
        const found = await offSearch(raw, ctl.signal);
        const seen = new Set(hits.map(h => h.code || h.name));
        offHits = found.filter(f => !seen.has(f.code) && !seen.has(f.name));
        offStatus.textContent = offHits.length ? "Aus Open Food Facts:" : (hits.length ? "" : "Nichts gefunden. Scan den Barcode oder leg es unter „Eigenes“ an.");
        offStatus.hidden = !offStatus.textContent;
        resOff.innerHTML = offHits.map((f, i) => row(f, "data-o", i)).join("");
      } catch (e) {
        if (e.name === "AbortError") return;
        offStatus.textContent = "Keine Verbindung zu Open Food Facts. Die gespeicherten Lebensmittel oben gehen trotzdem.";
      }
    }, 450);
  };
  const box = $("picked");
  res.onclick = e => { const b = e.target.closest("[data-i]"); if (b) showPick(meal, hits[+b.dataset.i], box, reset); };
  resOff.onclick = e => { const b = e.target.closest("[data-o]"); if (b) showPick(meal, offHits[+b.dataset.o], box, reset); };
  const reset = () => { q.value = ""; lastTerm = null; list(); };
  q.oninput = () => { clearTimeout(timer); timer = setTimeout(list, 90); };
  list();
  if (matchMedia("(pointer: fine)").matches) q.focus();
}

function drawCustom(meal, done) {
  const body = $("tabbody");
  body.innerHTML = `
    <p class="hint">Werte stehen auf der Verpackung unter „Nährwerte je 100 g“. Das Lebensmittel wird gespeichert und taucht danach in der Suche auf.</p>
    <label class="f" for="c-name">Name<input id="c-name" type="text" placeholder="z. B. Müsli von Oma"></label>
    <div class="grid2">
      <label class="f" for="c-kcal">kcal je 100 g bzw. ml<input id="c-kcal" type="number" inputmode="decimal" min="0"></label>
      <label class="f" for="c-c">Kohlenhydrate (g)<input id="c-c" type="number" inputmode="decimal" min="0" value="0"></label>
      <label class="f" for="c-p">Eiweiß (g)<input id="c-p" type="number" inputmode="decimal" min="0" value="0"></label>
      <label class="f" for="c-f">Fett (g)<input id="c-f" type="number" inputmode="decimal" min="0" value="0"></label>
    </div>
    <label class="chk"><input type="checkbox" id="c-drink"> Getränk (Werte je 100 ml, Menge in ml)</label>
    <label class="f" for="c-portion">Typische Portion in g bzw. ml (optional)<input id="c-portion" type="number" inputmode="decimal" min="0"></label>
    <p class="hint" id="c-err" hidden>Bitte Name und kcal ausfüllen.</p>
    <button class="primary" type="button" id="c-save">Speichern</button>`;
  $("c-save").onclick = () => {
    const name = $("c-name").value.trim(), kcal = parseFloat($("c-kcal").value);
    if (!name || !(kcal >= 0)) { $("c-err").hidden = false; return; }
    const portion = parseFloat($("c-portion").value);
    settings.custom = [{ name, kcal, c: parseFloat($("c-c").value) || 0, p: parseFloat($("c-p").value) || 0, f: parseFloat($("c-f").value) || 0,
      portions: portion > 0 ? [["1 Portion", portion]] : [], unit: $("c-drink").checked ? "ml" : "g" }, ...(settings.custom || [])];
    save("settings", settings);
    done();
    const q = $("q"); if (q) { q.value = name; q.dispatchEvent(new Event("input")); }
  };
}

function openGoals() {
  bg.hidden = false;
  sheet.innerHTML = `
    <div class="sheet-head"><h3 id="sheet-title">Deine Ziele</h3><button class="iconbtn" type="button" id="x">Schließen</button></div>
    <div class="grid2">
      <label class="f" for="g-kcal">Kalorien pro Tag<input id="g-kcal" type="number" min="800" value="${settings.kcal}"></label>
      <label class="f" for="g-water">Wasser (Gläser à 250 ml)<input id="g-water" type="number" min="1" max="20" value="${settings.water}"></label>
      <label class="f" for="g-c">Kohlenhydrate (g)<input id="g-c" type="number" min="0" value="${settings.c}"></label>
      <label class="f" for="g-p">Eiweiß (g)<input id="g-p" type="number" min="0" value="${settings.p}"></label>
      <label class="f" for="g-f">Fett (g)<input id="g-f" type="number" min="0" value="${settings.f}"></label>
    </div>
    <button class="primary" type="button" id="g-save">Ziele speichern</button>
    <h3 style="font-size:17px;margin-top:6px">Bedarf berechnen</h3>
    <p class="hint">Grundumsatz nach Mifflin-St Jeor mal Aktivitätsfaktor. Danach kannst du die Werte oben übernehmen.</p>
    <div class="grid2">
      <label class="f" for="b-sex">Geschlecht<select id="b-sex"><option value="m">männlich</option><option value="w">weiblich</option></select></label>
      <label class="f" for="b-age">Alter<input id="b-age" type="number" min="14" max="99" value="${settings.age || 25}"></label>
      <label class="f" for="b-w">Gewicht (kg)<input id="b-w" type="number" min="30" value="${settings.weight || 80}"></label>
      <label class="f" for="b-h">Größe (cm)<input id="b-h" type="number" min="120" value="${settings.height || 180}"></label>
      <label class="f" for="b-act">Aktivität<select id="b-act">
        <option value="1.2">Kaum Bewegung</option><option value="1.375">1–2× Training/Woche</option>
        <option value="1.55" selected>3–4× Training/Woche</option><option value="1.725">5–6× Training/Woche</option><option value="1.9">Täglich hart</option></select></label>
      <label class="f" for="b-goal">Ziel<select id="b-goal">
        <option value="-500" selected>Abnehmen / Cut (−500 kcal)</option><option value="0">Gewicht halten</option><option value="300">Muskelaufbau (+300 kcal)</option></select></label>
    </div>
    <div class="result-box num" id="b-out"></div>
    <button class="ghost" type="button" id="b-use">Werte übernehmen</button>
    <h3 style="font-size:17px;margin-top:6px">Daten sichern</h3>
    <p class="hint">Deine Einträge liegen nur auf diesem Handy. Mit einer Sicherung kannst du sie auf ein neues Gerät mitnehmen.</p>
    <div class="grid2">
      <button class="ghost" type="button" id="bk-out">Sicherung speichern</button>
      <label class="ghost filebtn" for="bk-in">Sicherung laden<input id="bk-in" type="file" accept="application/json,.json" hidden></label>
    </div>
    <p class="hint" id="bk-msg" hidden></p>`;
  if (settings.sex) $("b-sex").value = settings.sex;
  $("x").onclick = closeSheet;
  let rec = null;
  const calc = () => {
    const w = +$("b-w").value, h = +$("b-h").value, a = +$("b-age").value, s = $("b-sex").value;
    const bmr = 10 * w + 6.25 * h - 5 * a + (s === "m" ? 5 : -161);
    const kcal = Math.round((bmr * +$("b-act").value + +$("b-goal").value) / 10) * 10;
    const p = Math.round(w * 2), f = Math.round(w * 0.9), c = Math.max(0, Math.round((kcal - p * 4 - f * 9) / 4));
    rec = { kcal, p, f, c };
    $("b-out").innerHTML = `Grundumsatz ${fmt(bmr)} kcal · <b>Empfehlung ${fmt(kcal)} kcal</b><br>Eiweiß ${p} g · Fett ${f} g · Kohlenhydrate ${c} g`;
  };
  sheet.querySelectorAll("#b-sex,#b-age,#b-w,#b-h,#b-act,#b-goal").forEach(el => el.oninput = calc);
  calc();
  $("bk-out").onclick = () => {
    const data = {};
    try { for (let i = 0; i < localStorage.length; i++) { const k = localStorage.key(i); if (k.startsWith("kb:")) data[k] = localStorage.getItem(k); } } catch {}
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([JSON.stringify(data)], { type: "application/json" }));
    a.download = "kalorienbuch-sicherung-" + keyFor(new Date()).slice(4) + ".json";
    document.body.appendChild(a); a.click(); a.remove();
  };
  $("bk-in").onchange = async e => {
    const file = e.target.files[0]; if (!file) return;
    const msg = $("bk-msg"); msg.hidden = false;
    try {
      const data = JSON.parse(await file.text());
      const keys = Object.keys(data).filter(k => k.startsWith("kb:"));
      if (!keys.length) throw new Error();
      for (const k of keys) localStorage.setItem(k, data[k]);
      settings = { ...DEFAULT_SETTINGS, ...(local.get("settings") || {}) };
      await loadDay();
      msg.textContent = `Sicherung geladen (${keys.length} Einträge).`;
    } catch { msg.textContent = "Diese Datei ist keine Kalorienbuch-Sicherung."; }
  };
  $("b-use").onclick = () => { for (const k of ["kcal", "c", "p", "f"]) $("g-" + k).value = rec[k]; };
  $("g-save").onclick = () => {
    settings = { ...settings, kcal: +$("g-kcal").value || settings.kcal, c: +$("g-c").value || 0, p: +$("g-p").value || 0, f: +$("g-f").value || 0,
      water: Math.min(20, Math.max(1, +$("g-water").value || 8)),
      sex: $("b-sex").value, age: +$("b-age").value, weight: +$("b-w").value, height: +$("b-h").value };
    save("settings", settings); render(); closeSheet();
  };
}
$("btn-goal").onclick = openGoals;

// ---- Start ----
settings = { ...DEFAULT_SETTINGS, ...(local.get("settings") || {}) };
loadDay();
$("store-note").textContent = "Deine Einträge werden auf diesem Handy gespeichert. Produktdaten von Open Food Facts (ODbL).";
try { navigator.storage && navigator.storage.persist && navigator.storage.persist(); } catch {}
if ("serviceWorker" in navigator) addEventListener("load", () => navigator.serviceWorker.register("sw.js").catch(() => {}));

