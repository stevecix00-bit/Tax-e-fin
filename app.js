const { useState, useEffect, useMemo, useCallback } = React;

/* ---------- TOKEN DI DESIGN ---------- */
const C = {
  navy: "#16324F",
  blue: "#2E6F9E",
  blueSoft: "#EAF2F8",
  bg: "#F2F5F7",
  white: "#FFFFFF",
  grayMed: "#8A94A6",
  grayDark: "#2B2F36",
  green: "#3A9D6F",
  amber: "#DB9A22",
  red: "#C94A4A",
  redSoft: "#FBEAEA",
  line: "#E2E7EC",
};
const PALETTE = ["#2E6F9E", "#5B8FB9", "#3A9D6F", "#8A94A6", "#DB9A22", "#C94A4A", "#7C6FD0", "#4FA6A6", "#B0724F", "#6B7280"];

/* ---------- ICONE SVG (senza dipendenze esterne) ---------- */
const ICON_PATHS = {
  home: <><path d="M3 11l9-7 9 7" /><path d="M6 10v9h5v-5h2v5h5v-9" /></>,
  car: <><rect x="3" y="10" width="18" height="6" rx="2" /><circle cx="7.5" cy="18" r="1.4" /><circle cx="16.5" cy="18" r="1.4" /><path d="M5 10l1.8-4h10.4l1.8 4" /></>,
  food: <><path d="M6 8h12l-1 12H7L6 8z" /><path d="M9 8V6a3 3 0 016 0v2" /></>,
  work: <><rect x="3" y="7" width="18" height="12" rx="2" /><path d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2" /></>,
  leisure: <><circle cx="7" cy="17" r="2.3" /><circle cx="17" cy="15" r="2.3" /><path d="M9.3 17V5l9.4-1.7V13" /></>,
  health: <path d="M12 21s-7-4.35-9.5-9A5.5 5.5 0 0112 5a5.5 5.5 0 019.5 7c-2.5 4.65-9.5 9-9.5 9z" />,
  other: <><circle cx="5" cy="12" r="1.4" /><circle cx="12" cy="12" r="1.4" /><circle cx="19" cy="12" r="1.4" /></>,
  folder: <path d="M3 7a2 2 0 012-2h4l2 2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V7z" />,
  repeat: <><polyline points="17 2 21 6 17 10" /><path d="M3 12V10a4 4 0 014-4h14" /><polyline points="7 22 3 18 7 14" /><path d="M21 12v2a4 4 0 01-4 4H3" /></>,
  plus: <><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></>,
  camera: <><path d="M4 8h3l2-3h6l2 3h3v11H4z" /><circle cx="12" cy="13" r="3.4" /></>,
  close: <><line x1="5" y1="5" x2="19" y2="19" /><line x1="19" y1="5" x2="5" y2="19" /></>,
  trendUp: <><polyline points="3 17 9 11 13 15 21 6" /><polyline points="15 6 21 6 21 12" /></>,
  trendDown: <><polyline points="3 7 9 13 13 9 21 18" /><polyline points="15 18 21 18 21 12" /></>,
  download: <><path d="M12 3v12" /><polyline points="7 11 12 16 17 11" /><line x1="4" y1="20" x2="20" y2="20" /></>,
  trash: <><polyline points="3 6 5 6 21 6" /><path d="M8 6V4h8v2M6 6l1 14h10l1-14" /></>,
  settings: <><circle cx="12" cy="12" r="3" /><path d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1" /></>,
  receipt: <><path d="M6 2h12v20l-3-2-3 2-3-2-3 2z" /><line x1="9" y1="7" x2="15" y2="7" /><line x1="9" y1="11" x2="15" y2="11" /></>,
  wallet: <><rect x="3" y="6" width="18" height="13" rx="2" /><path d="M3 10h18" /><circle cx="17" cy="14" r="1.2" /></>,
  calculator: <><rect x="5" y="3" width="14" height="18" rx="2" /><line x1="8" y1="7" x2="16" y2="7" /><circle cx="8.5" cy="12" r="0.6" fill="currentColor" /><circle cx="12" cy="12" r="0.6" fill="currentColor" /><circle cx="15.5" cy="12" r="0.6" fill="currentColor" /><circle cx="8.5" cy="16" r="0.6" fill="currentColor" /><circle cx="12" cy="16" r="0.6" fill="currentColor" /><circle cx="15.5" cy="16" r="0.6" fill="currentColor" /></>,
  file: <><path d="M6 2h9l5 5v15H6z" /><polyline points="15 2 15 7 20 7" /></>,
  alert: <><path d="M12 3l10 18H2z" /><line x1="12" y1="9" x2="12" y2="14" /><circle cx="12" cy="17" r="0.6" fill="currentColor" /></>,
  check: <polyline points="4 12 9 17 20 6" />,
  lock: <><rect x="5" y="11" width="14" height="9" rx="2" /><path d="M8 11V8a4 4 0 018 0v3" /></>,
  arrowLeft: <><line x1="19" y1="12" x2="5" y2="12" /><polyline points="11 6 5 12 11 18" /></>,
  chevronRight: <polyline points="9 6 15 12 9 18" />,
  chevronDown: <polyline points="6 9 12 15 18 9" />,
  pie: <><path d="M12 2a10 10 0 1010 10H12z" /><path d="M12 2v10h10" /></>,
};
function Icon({ name, size = 18, color = "currentColor", strokeWidth = 1.8, style }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color}
      strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" style={style}>
      {ICON_PATHS[name] || ICON_PATHS.other}
    </svg>
  );
}

/* ---------- GRAFICO A TORTA (senza dipendenze esterne) ---------- */
function PieChartCustom({ data, size = 130, innerRatio = 0.55 }) {
  const total = data.reduce((t, d) => t + d.value, 0);
  if (total <= 0) return null;
  const cx = size / 2, cy = size / 2, r = size / 2 - 3, rInner = r * innerRatio;
  let cum = 0;
  const slices = data.map((d, i) => {
    const a0 = (cum / total) * 2 * Math.PI - Math.PI / 2;
    cum += d.value;
    const a1 = (cum / total) * 2 * Math.PI - Math.PI / 2;
    const large = a1 - a0 > Math.PI ? 1 : 0;
    const x1 = cx + r * Math.cos(a0), y1 = cy + r * Math.sin(a0);
    const x2 = cx + r * Math.cos(a1), y2 = cy + r * Math.sin(a1);
    const xi1 = cx + rInner * Math.cos(a0), yi1 = cy + rInner * Math.sin(a0);
    const xi2 = cx + rInner * Math.cos(a1), yi2 = cy + rInner * Math.sin(a1);
    const d1 = `M ${xi1} ${yi1} L ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2} L ${xi2} ${yi2} A ${rInner} ${rInner} 0 ${large} 0 ${xi1} ${yi1} Z`;
    return <path key={i} d={d1} fill={d.color} />;
  });
  return <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>{slices}</svg>;
}

/* ---------- CATEGORIE DI DEFAULT (albero) ---------- */
const CATEGORIE_DEFAULT = [
  { id: "casa", nome: "Casa", parentId: null, colore: "#2E6F9E", icona: "home" },
  { id: "auto", nome: "Auto", parentId: null, colore: "#5B8FB9", icona: "car" },
  { id: "cibo", nome: "Cibo", parentId: null, colore: "#3A9D6F", icona: "food" },
  { id: "lavoro", nome: "Lavoro", parentId: null, colore: "#8A94A6", icona: "work" },
  { id: "svago", nome: "Svago", parentId: null, colore: "#DB9A22", icona: "leisure" },
  { id: "salute", nome: "Salute", parentId: null, colore: "#C94A4A", icona: "health" },
  { id: "altro", nome: "Altro", parentId: null, colore: "#6B7280", icona: "other" },
];

/* ---------- HELPER ALBERO CATEGORIE ---------- */
function nodeById(categorie, id) {
  return categorie.find((c) => c.id === id) || categorie.find((c) => c.id === "altro") || CATEGORIE_DEFAULT[6];
}
function childrenOf(categorie, parentId) {
  return categorie.filter((c) => c.parentId === parentId);
}
function descendantIds(categorie, id) {
  const out = [id];
  childrenOf(categorie, id).forEach((f) => out.push(...descendantIds(categorie, f.id)));
  return out;
}
function topLevelId(categorie, id) {
  let n = nodeById(categorie, id);
  while (n.parentId) n = nodeById(categorie, n.parentId);
  return n.id;
}
function pathLabel(categorie, id) {
  const parti = [];
  let n = nodeById(categorie, id);
  parti.unshift(n.nome);
  while (n.parentId) { n = nodeById(categorie, n.parentId); parti.unshift(n.nome); }
  return parti.join(" / ");
}
function flattenTree(categorie, parentId = null, depth = 0) {
  let out = [];
  childrenOf(categorie, parentId).forEach((n) => {
    out.push({ ...n, depth });
    out = out.concat(flattenTree(categorie, n.id, depth + 1));
  });
  return out;
}

const eur = (n) => (Number.isFinite(n) ? n : 0).toLocaleString("it-IT", { style: "currency", currency: "EUR" });
const dataIT = (iso) => { if (!iso) return ""; const [y, m, d] = iso.split("-"); return `${d}/${m}/${y}`; };
const oggiISO = () => new Date().toISOString().slice(0, 10);
const meseChiave = (iso) => iso.slice(0, 7);
const nomeMese = (chiave) => { const [y, m] = chiave.split("-").map(Number); return new Date(y, m - 1, 1).toLocaleDateString("it-IT", { month: "long", year: "numeric" }); };

/* ---------- CALCOLO IRPEF (scaglioni 2024, stima indicativa) ---------- */
function calcolaIrpef({ reddito, detrazioni }) {
  const r = Math.max(0, Number(reddito) || 0);
  const s1 = Math.min(r, 28000) * 0.23;
  const s2 = Math.max(0, Math.min(r, 50000) - 28000) * 0.35;
  const s3 = Math.max(0, r - 50000) * 0.43;
  const irpefLorda = s1 + s2 + s3;
  const irpefNetta = Math.max(0, irpefLorda - (Number(detrazioni) || 0));
  const addizionali = r * 0.019;
  const totaleTasse = irpefNetta + addizionali;
  const aliquotaMedia = r > 0 ? (totaleTasse / r) * 100 : 0;
  const nettoAnnuo = Math.max(0, r - totaleTasse);
  return { irpefLorda, irpefNetta, addizionali, totaleTasse, aliquotaMedia, nettoAnnuo, nettoMensile: nettoAnnuo / 12 };
}

/* ---------- SPESE FISSE COME VOCI VIRTUALI DEL MESE ---------- */
function fisseVirtualiPerMese(fisse, meseSel, meseCorrente) {
  if (meseSel < meseCorrente) return [];
  return fisse.map((f) => ({ id: "fissa-" + f.id + "-" + meseSel, data: meseSel + "-01", importo: f.importo, categoria: f.categoria, negozio: f.nome, fissa: true }));
}
function speseDelMese(spese, fisse, meseSel, meseCorrente) {
  const manuali = spese.filter((s) => meseChiave(s.data) === meseSel);
  return [...manuali, ...fisseVirtualiPerMese(fisse, meseSel, meseCorrente)];
}

/* ---------- STORAGE LOCALE ---------- */
const store = {
  get(key, fallback) { try { const v = localStorage.getItem(key); return v !== null ? JSON.parse(v) : fallback; } catch { return fallback; } },
  set(key, value) { try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) { console.error("Errore salvataggio", e); } },
};

/* ---------- COMPONENTI UI DI BASE ---------- */
function Card({ children, style, dashed }) {
  return <div style={{ background: C.white, borderRadius: 14, padding: "14px 16px", border: dashed ? `1.5px dashed ${C.line}` : `1px solid ${C.line}`, ...style }}>{children}</div>;
}
function Pill({ children, bg, color }) {
  return <span style={{ background: bg, color, fontSize: 12, fontWeight: 600, padding: "3px 9px", borderRadius: 20 }}>{children}</span>;
}
function BarraProgresso({ pct, colore }) {
  return <div style={{ height: 8, background: "#EEF1F4", borderRadius: 6, overflow: "hidden" }}><div style={{ width: `${Math.min(pct, 100)}%`, height: "100%", background: colore, transition: "width .3s" }} /></div>;
}
function BottomNav({ tab, setTab }) {
  const items = [
    { id: "home", label: "Home", icon: "home" },
    { id: "budget", label: "Budget", icon: "wallet" },
    { id: "tasse", label: "Tasse", icon: "calculator" },
    { id: "report", label: "Report", icon: "file" },
    { id: "impostazioni", label: "Profilo", icon: "settings" },
  ];
  return (
    <div style={{ position: "sticky", bottom: 0, left: 0, right: 0, background: C.white, borderTop: `1px solid ${C.line}`, display: "flex", padding: "6px 2px 10px" }}>
      {items.map((it) => {
        const active = tab === it.id;
        return (
          <button key={it.id} onClick={() => setTab(it.id)} style={{ flex: 1, background: "none", border: "none", display: "flex", flexDirection: "column", alignItems: "center", gap: 3, padding: "6px 0", cursor: "pointer" }}>
            <Icon name={it.icon} size={20} color={active ? C.navy : C.grayMed} strokeWidth={active ? 2.4 : 1.8} />
            <span style={{ fontSize: 11, color: active ? C.navy : C.grayMed, fontWeight: active ? 700 : 500 }}>{it.label}</span>
          </button>
        );
      })}
    </div>
  );
}
function Header({ title, right, onBack }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 18px 6px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        {onBack && <button onClick={onBack} style={{ background: "none", border: "none", padding: 4, cursor: "pointer" }}><Icon name="arrowLeft" size={20} color={C.navy} /></button>}
        <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 20, fontWeight: 700, color: C.navy, margin: 0 }}>{title}</h1>
      </div>
      {right}
    </div>
  );
}
function SelectCategoria({ categorie, value, onChange, style }) {
  const flat = flattenTree(categorie);
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)} style={style || inputStyleRef}>
      {flat.map((n) => (
        <option key={n.id} value={n.id}>{"\u00A0\u00A0".repeat(n.depth)}{n.depth > 0 ? "↳ " : ""}{n.nome}</option>
      ))}
    </select>
  );
}

/* ---------- ONBOARDING ---------- */
function Onboarding({ onDone }) {
  const [step, setStep] = useState(0);
  const passi = [
    { icon: "receipt", titolo: "Aggiungi le tue spese", testo: "Scatta una foto dello scontrino o inseriscila a mano: data, importo, negozio e categoria." },
    { icon: "wallet", titolo: "Budget a cartelle e spese fisse", testo: "Organizza il budget in cartelle e sottocartelle e imposta le spese fisse ricorrenti: verranno conteggiate ogni mese in automatico." },
    { icon: "calculator", titolo: "Stima le tue tasse", testo: "Inserisci reddito e regione per avere una stima dell'IRPEF dovuta e di quanto ti resta netto." },
  ];
  const p = passi[step];
  return (
    <div style={{ position: "fixed", inset: 0, background: C.navy, display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "40px 24px 30px", zIndex: 50 }}>
      <div />
      <div style={{ textAlign: "center" }}>
        <div style={{ width: 84, height: 84, borderRadius: 24, background: "rgba(255,255,255,0.12)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 26px" }}>
          <Icon name={p.icon} size={38} color={C.white} strokeWidth={1.6} />
        </div>
        <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", color: C.white, fontSize: 22, margin: "0 0 12px" }}>{p.titolo}</h2>
        <p style={{ color: "#C9D6E3", fontSize: 15, lineHeight: 1.5, maxWidth: 280, margin: "0 auto" }}>{p.testo}</p>
      </div>
      <div>
        <div style={{ display: "flex", justifyContent: "center", gap: 6, marginBottom: 22 }}>
          {passi.map((_, i) => <div key={i} style={{ width: i === step ? 20 : 7, height: 7, borderRadius: 4, background: i === step ? C.white : "rgba(255,255,255,0.35)", transition: "all .2s" }} />)}
        </div>
        <button onClick={() => (step < 2 ? setStep(step + 1) : onDone())} style={{ width: "100%", background: C.white, color: C.navy, border: "none", borderRadius: 12, padding: "14px 0", fontSize: 15, fontWeight: 700, cursor: "pointer" }}>
          {step < 2 ? "Avanti" : "Inizia"}
        </button>
      </div>
    </div>
  );
}

/* ---------- STILI CONDIVISI ---------- */
const overlayStyle = { position: "fixed", inset: 0, background: "rgba(22,50,79,0.45)", display: "flex", alignItems: "flex-end", zIndex: 40 };
const sheetStyle = { background: C.bg, width: "100%", maxHeight: "88vh", overflowY: "auto", borderRadius: "20px 20px 0 0", padding: "18px 18px 26px" };
const labelUploadStyle = { display: "flex", flexDirection: "column", alignItems: "center", gap: 4, border: `1.5px dashed ${C.blue}`, borderRadius: 12, padding: "16px 10px", cursor: "pointer", background: C.blueSoft, textAlign: "center" };
const fieldLabel = { display: "block", fontSize: 12, color: C.grayMed, fontWeight: 600, marginBottom: 4 };
const inputStyleRef = { width: "100%", boxSizing: "border-box", border: `1px solid ${C.line}`, borderRadius: 10, padding: "10px 12px", fontSize: 14, background: C.white, color: C.grayDark };
const inputStyle = inputStyleRef;
const btnPrimary = { width: "100%", background: C.navy, color: C.white, border: "none", borderRadius: 12, padding: "13px 0", fontSize: 15, fontWeight: 700, cursor: "pointer" };
const btnSecondary = { width: "100%", background: "none", color: C.navy, border: `1px solid ${C.line}`, borderRadius: 12, padding: "13px 0", fontSize: 15, fontWeight: 600, cursor: "pointer" };

/* ---------- MODALE AGGIUNGI SPESA ---------- */
function ModaleSpesa({ categorie, onClose, onSalva, bloccato, onUpsell }) {
  const [foto, setFoto] = useState(null);
  const [data, setData] = useState(oggiISO());
  const [importo, setImporto] = useState("");
  const [negozio, setNegozio] = useState("");
  const [categoria, setCategoria] = useState(categorie[0] ? categorie[0].id : "altro");
  const [errore, setErrore] = useState("");

  if (bloccato) {
    return (
      <div style={overlayStyle}>
        <div style={{ ...sheetStyle, textAlign: "center", padding: "28px 24px" }}>
          <Icon name="lock" size={30} color={C.amber} style={{ marginBottom: 10 }} />
          <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", color: C.navy, margin: "0 0 8px" }}>Limite piano gratuito raggiunto</h3>
          <p style={{ color: C.grayMed, fontSize: 14, margin: "0 0 18px" }}>Hai registrato 30 spese questo mese. Passa a Premium per spese illimitate.</p>
          <button onClick={onUpsell} style={{ ...btnPrimary, marginBottom: 10 }}>Scopri Premium</button>
          <button onClick={onClose} style={btnSecondary}>Chiudi</button>
        </div>
      </div>
    );
  }
  function gestisciFoto(e) {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setFoto(reader.result);
    reader.readAsDataURL(file);
  }
  function salva() {
    if (!importo || Number(importo) <= 0) { setErrore("Inserisci un importo valido."); return; }
    if (!negozio.trim()) { setErrore("Inserisci il nome del negozio o una descrizione."); return; }
    onSalva({ id: Date.now().toString(), data, importo: Number(importo), negozio: negozio.trim(), categoria });
  }

  return (
    <div style={overlayStyle}>
      <div style={sheetStyle}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
          <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", color: C.navy, margin: 0, fontSize: 18 }}>Aggiungi spesa</h3>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer" }}><Icon name="close" size={20} color={C.grayMed} /></button>
        </div>

        <label style={labelUploadStyle} htmlFor="foto-scontrino">
          {foto ? <img src={foto} alt="Scontrino allegato" style={{ width: "100%", height: 110, objectFit: "cover", borderRadius: 10 }} /> : (
            <>
              <Icon name="camera" size={22} color={C.blue} />
              <span style={{ fontSize: 13, color: C.blue, fontWeight: 600 }}>Scatta foto scontrino/fattura</span>
              <span style={{ fontSize: 11, color: C.grayMed }}>Facoltativo: usala come promemoria, poi conferma i dati sotto</span>
            </>
          )}
        </label>
        <input id="foto-scontrino" type="file" accept="image/*" capture="environment" onChange={gestisciFoto} style={{ display: "none" }} />

        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 14 }}>
          <div><span style={fieldLabel}>Data</span><input type="date" value={data} onChange={(e) => setData(e.target.value)} style={inputStyle} /></div>
          <div><span style={fieldLabel}>Importo (EUR)</span><input type="number" inputMode="decimal" placeholder="0,00" value={importo} onChange={(e) => setImporto(e.target.value)} style={{ ...inputStyle, fontFamily: "'IBM Plex Mono', monospace" }} /></div>
          <div><span style={fieldLabel}>Negozio / descrizione</span><input type="text" placeholder="Es. Esselunga, Enel, Autofficina..." value={negozio} onChange={(e) => setNegozio(e.target.value)} style={inputStyle} /></div>
          <div>
            <span style={fieldLabel}>Categoria</span>
            <SelectCategoria categorie={categorie} value={categoria} onChange={setCategoria} style={inputStyle} />
          </div>
        </div>

        {errore && <p style={{ color: C.red, fontSize: 13, marginTop: 10 }}>{errore}</p>}
        <button onClick={salva} style={{ ...btnPrimary, marginTop: 16 }}>Salva spesa</button>
      </div>
    </div>
  );
}

/* ---------- SCHERMATA HOME ---------- */
function SchermataHome({ spese, fisse, categorie, settings, aggiornaEntrate, apriModale, vaiASpeseFisse }) {
  const meseCorrente = meseChiave(oggiISO());
  const entrate = settings.entrate || [];
  const totaleEntrate = entrate.reduce((t, e) => t + e.importo, 0);
  const totaleFisse = fisse.reduce((t, f) => t + f.importo, 0);
  const utile = totaleEntrate - totaleFisse;

  const speseVariabiliMese = spese.filter((s) => meseChiave(s.data) === meseCorrente).reduce((t, s) => t + s.importo, 0);
  const saldo = totaleEntrate - totaleFisse - speseVariabiliMese;

  const tutteLeSpeseMese = speseDelMese(spese, fisse, meseCorrente, meseCorrente);
  const perCategoria = useMemo(() => {
    const somme = {};
    tutteLeSpeseMese.forEach((s) => {
      const top = topLevelId(categorie, s.categoria);
      somme[top] = (somme[top] || 0) + s.importo;
    });
    return Object.entries(somme).map(([id, value]) => { const n = nodeById(categorie, id); return { name: n.nome, value, color: n.colore }; });
  }, [tutteLeSpeseMese, categorie]);

  const [editEntrateApri, setEditEntrateApri] = useState(false);
  const recenti = [...spese].sort((a, b) => b.data.localeCompare(a.data) || Number(b.id) - Number(a.id)).slice(0, 6);

  return (
    <div style={{ paddingBottom: 90 }}>
      <Header title="TasseFacile" right={<Pill bg={settings.piano === "premium" ? "#EFE4FA" : C.blueSoft} color={settings.piano === "premium" ? "#6B3FA0" : C.blue}>{settings.piano === "premium" ? "Premium" : "Free"}</Pill>} />
      <div style={{ padding: "6px 18px" }}>
        <Card style={{ background: C.navy, border: "none" }}>
          <span style={{ color: "#AEC4D9", fontSize: 12, fontWeight: 600 }}>Saldo mensile stimato</span>
          <div style={{ display: "flex", alignItems: "baseline", gap: 8, margin: "4px 0 10px" }}>
            <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 28, fontWeight: 700, color: saldo >= 0 ? "#8FE3BB" : "#F3A7A7" }}>{eur(saldo)}</span>
            <Icon name={saldo >= 0 ? "trendUp" : "trendDown"} size={18} color={saldo >= 0 ? "#8FE3BB" : "#F3A7A7"} />
          </div>
          <div style={{ height: 1, background: "rgba(255,255,255,0.15)", margin: "8px 0" }} />
          <div style={{ display: "flex", flexDirection: "column", gap: 5, fontSize: 12, color: "#C9D6E3" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}><span>Entrate totali</span><b style={{ color: C.white, fontFamily: "'IBM Plex Mono', monospace" }}>{eur(totaleEntrate)}</b></div>
            <div style={{ display: "flex", justifyContent: "space-between" }}><span>Spese fisse (automatiche)</span><b style={{ color: "#F3A7A7", fontFamily: "'IBM Plex Mono', monospace" }}>−{eur(totaleFisse)}</b></div>
            <div style={{ display: "flex", justifyContent: "space-between", paddingTop: 3, borderTop: "1px dashed rgba(255,255,255,0.2)" }}><span style={{ fontWeight: 700, color: C.white }}>Utile dopo spese fisse</span><b style={{ color: "#8FE3BB", fontFamily: "'IBM Plex Mono', monospace" }}>{eur(utile)}</b></div>
            <div style={{ display: "flex", justifyContent: "space-between" }}><span>Spese variabili (questo mese)</span><b style={{ color: "#F3A7A7", fontFamily: "'IBM Plex Mono', monospace" }}>−{eur(speseVariabiliMese)}</b></div>
          </div>
        </Card>

        <Card style={{ marginTop: 14 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: editEntrateApri ? 10 : 0 }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: C.navy }}>Entrate mensili</span>
            <button onClick={() => setEditEntrateApri(!editEntrateApri)} style={{ background: "none", border: "none", color: C.blue, fontSize: 12, fontWeight: 700, cursor: "pointer" }}>{editEntrateApri ? "Fatto" : "Gestisci"}</button>
          </div>
          {!editEntrateApri ? (
            entrate.length === 0 ? <p style={{ color: C.grayMed, fontSize: 13, margin: "8px 0 0" }}>Nessuna entrata impostata.</p> : (
              <div style={{ marginTop: 8, display: "flex", flexDirection: "column", gap: 4 }}>
                {entrate.map((e) => (
                  <div key={e.id} style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
                    <span style={{ color: C.grayDark }}>{e.nome}</span>
                    <span style={{ fontFamily: "'IBM Plex Mono', monospace", color: C.grayDark, fontWeight: 600 }}>{eur(e.importo)}</span>
                  </div>
                ))}
              </div>
            )
          ) : (
            <GestioneEntrate entrate={entrate} onCambia={aggiornaEntrate} />
          )}
        </Card>

        <button onClick={apriModale} style={{ ...btnPrimary, marginTop: 14, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
          <Icon name="plus" size={18} color={C.white} /> Aggiungi spesa
        </button>

        <Card style={{ marginTop: 14, display: "flex", alignItems: "center", gap: 10 }} dashed>
          <div onClick={vaiASpeseFisse} style={{ display: "flex", alignItems: "center", gap: 10, flex: 1, cursor: "pointer" }}>
            <div style={{ width: 34, height: 34, borderRadius: 10, background: C.blueSoft, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Icon name="repeat" size={16} color={C.blue} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: C.navy }}>Spese fisse ricorrenti</div>
              <div style={{ fontSize: 11, color: C.grayMed }}>{fisse.length} {fisse.length === 1 ? "voce" : "voci"} · {eur(totaleFisse)}/mese</div>
            </div>
            <Icon name="chevronRight" size={18} color={C.grayMed} />
          </div>
        </Card>

        <Card style={{ marginTop: 14 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
            <Icon name="pie" size={16} color={C.navy} />
            <span style={{ fontSize: 13, fontWeight: 700, color: C.navy, textTransform: "capitalize" }}>Spese per categoria — {nomeMese(meseCorrente)}</span>
          </div>
          {perCategoria.length === 0 ? (
            <p style={{ color: C.grayMed, fontSize: 13, textAlign: "center", padding: "18px 0" }}>Nessuna spesa registrata questo mese.</p>
          ) : (
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <PieChartCustom data={perCategoria} size={130} />
              <div style={{ display: "flex", flexDirection: "column", gap: 5, flex: 1 }}>
                {perCategoria.map((c) => (
                  <div key={c.name} style={{ display: "flex", justifyContent: "space-between", fontSize: 12 }}>
                    <span style={{ display: "flex", alignItems: "center", gap: 5, color: C.grayDark }}><span style={{ width: 8, height: 8, borderRadius: 4, background: c.color, display: "inline-block" }} />{c.name}</span>
                    <span style={{ fontFamily: "'IBM Plex Mono', monospace", color: C.grayDark }}>{eur(c.value)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          <p style={{ fontSize: 11, color: C.grayMed, marginTop: 8, marginBottom: 0 }}>Include le spese fisse ricorrenti del mese.</p>
        </Card>

        <div style={{ marginTop: 16, marginBottom: 6, fontSize: 13, fontWeight: 700, color: C.navy }}>Spese recenti</div>
        {recenti.length === 0 && <p style={{ color: C.grayMed, fontSize: 13 }}>Ancora nessuna spesa. Aggiungine una per iniziare.</p>}
        {recenti.map((s) => {
          const cat = nodeById(categorie, s.categoria);
          return (
            <Card key={s.id} dashed style={{ marginBottom: 8, display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 34, height: 34, borderRadius: 10, background: cat.colore + "22", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Icon name={cat.icona || "folder"} size={16} color={cat.colore} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: C.grayDark, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{s.negozio}</div>
                <div style={{ fontSize: 11, color: C.grayMed }}>{dataIT(s.data)} · {pathLabel(categorie, s.categoria)}</div>
              </div>
              <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontWeight: 700, color: C.grayDark, fontSize: 14 }}>{eur(s.importo)}</div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

function GestioneEntrate({ entrate, onCambia }) {
  const [nome, setNome] = useState("");
  const [importo, setImporto] = useState("");
  function aggiungi() {
    if (!nome.trim() || !importo || Number(importo) <= 0) return;
    onCambia([...entrate, { id: Date.now().toString(), nome: nome.trim(), importo: Number(importo) }]);
    setNome(""); setImporto("");
  }
  function elimina(id) { onCambia(entrate.filter((e) => e.id !== id)); }
  function modificaImporto(id, val) { onCambia(entrate.map((e) => (e.id === id ? { ...e, importo: Number(val) || 0 } : e))); }
  return (
    <div>
      {entrate.map((e) => (
        <div key={e.id} style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
          <span style={{ flex: 1, fontSize: 13, color: C.grayDark, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{e.nome}</span>
          <input type="number" value={e.importo} onChange={(ev) => modificaImporto(e.id, ev.target.value)} style={{ width: 80, border: `1px solid ${C.line}`, borderRadius: 8, padding: "5px 7px", fontSize: 12, fontFamily: "'IBM Plex Mono', monospace" }} />
          <button onClick={() => elimina(e.id)} style={{ background: "none", border: "none", cursor: "pointer" }}><Icon name="trash" size={15} color={C.red} /></button>
        </div>
      ))}
      <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
        <input type="text" placeholder="Es. Stipendio" value={nome} onChange={(e) => setNome(e.target.value)} style={{ ...inputStyle, flex: 1.4 }} />
        <input type="number" placeholder="€" value={importo} onChange={(e) => setImporto(e.target.value)} style={{ ...inputStyle, flex: 1, fontFamily: "'IBM Plex Mono', monospace" }} />
        <button onClick={aggiungi} style={{ background: C.navy, border: "none", borderRadius: 10, padding: "0 12px", cursor: "pointer" }}><Icon name="plus" size={16} color={C.white} /></button>
      </div>
    </div>
  );
}

/* ---------- SCHERMATA SPESE FISSE ---------- */
function SchermataSpeseFisse({ fisse, categorie, onChiudi, onAggiungi, onElimina }) {
  const [apriForm, setApriForm] = useState(false);
  const [nome, setNome] = useState("");
  const [importo, setImporto] = useState("");
  const [categoria, setCategoria] = useState(categorie[0] ? categorie[0].id : "altro");
  const totale = fisse.reduce((t, f) => t + f.importo, 0);

  function salva() {
    if (!nome.trim() || !importo || Number(importo) <= 0) return;
    onAggiungi({ id: Date.now().toString(), nome: nome.trim(), importo: Number(importo), categoria });
    setNome(""); setImporto(""); setApriForm(false);
  }

  return (
    <div style={{ paddingBottom: 90 }}>
      <Header title="Spese fisse ricorrenti" onBack={onChiudi} />
      <div style={{ padding: "6px 18px" }}>
        <p style={{ color: C.grayMed, fontSize: 13, marginBottom: 14 }}>Spese fisse mensili (affitto, bollette, abbonamenti...). Vengono sottratte in automatico dalle entrate ogni mese, senza doverle reinserire.</p>
        <Card style={{ marginBottom: 14 }}>
          <span style={{ fontSize: 12, color: C.grayMed, fontWeight: 600 }}>Totale spese fisse mensili</span>
          <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 22, fontWeight: 700, color: C.navy, margin: "4px 0" }}>{eur(totale)}</div>
        </Card>

        {fisse.map((f) => {
          const cat = nodeById(categorie, f.categoria);
          return (
            <Card key={f.id} dashed style={{ marginBottom: 8, display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 34, height: 34, borderRadius: 10, background: cat.colore + "22", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Icon name={cat.icona || "folder"} size={16} color={cat.colore} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: C.grayDark }}>{f.nome}</div>
                <div style={{ fontSize: 11, color: C.grayMed }}>{pathLabel(categorie, f.categoria)}</div>
              </div>
              <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontWeight: 700, color: C.grayDark, fontSize: 14 }}>{eur(f.importo)}</div>
              <button onClick={() => onElimina(f.id)} style={{ background: "none", border: "none", cursor: "pointer" }}><Icon name="trash" size={15} color={C.red} /></button>
            </Card>
          );
        })}

        {!apriForm ? (
          <button onClick={() => setApriForm(true)} style={{ ...btnPrimary, marginTop: 10, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
            <Icon name="plus" size={18} color={C.white} /> Aggiungi spesa fissa
          </button>
        ) : (
          <Card style={{ marginTop: 10 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <div><span style={fieldLabel}>Nome</span><input type="text" placeholder="Es. Affitto" value={nome} onChange={(e) => setNome(e.target.value)} style={inputStyle} /></div>
              <div><span style={fieldLabel}>Importo mensile (EUR)</span><input type="number" inputMode="decimal" placeholder="0,00" value={importo} onChange={(e) => setImporto(e.target.value)} style={{ ...inputStyle, fontFamily: "'IBM Plex Mono', monospace" }} /></div>
              <div><span style={fieldLabel}>Categoria</span><SelectCategoria categorie={categorie} value={categoria} onChange={setCategoria} style={inputStyle} /></div>
            </div>
            <div style={{ display: "flex", gap: 8, marginTop: 14 }}>
              <button onClick={() => setApriForm(false)} style={{ ...btnSecondary, flex: 1 }}>Annulla</button>
              <button onClick={salva} style={{ ...btnPrimary, flex: 1 }}>Salva</button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}

/* ---------- SCHERMATA BUDGET (ad albero) ---------- */
function NodoBudget({ node, categorie, budgets, setBudget, spese, fisse, meseCorrente, onAggiungiFiglio, onElimina, depth }) {
  const [espanso, setEspanso] = useState(true);
  const figli = childrenOf(categorie, node.id);
  const idsSottoAlbero = descendantIds(categorie, node.id);
  const tutteLeSpese = speseDelMese(spese, fisse, meseCorrente, meseCorrente);
  const speso = tutteLeSpese.filter((s) => idsSottoAlbero.includes(s.categoria)).reduce((t, s) => t + s.importo, 0);
  const budget = budgets[node.id] || 0;
  const pct = budget > 0 ? (speso / budget) * 100 : 0;
  const colore = pct >= 100 ? C.red : pct >= 80 ? C.amber : C.green;
  const eliminabile = node.id !== "altro";

  return (
    <div style={{ marginLeft: depth * 14, marginBottom: 8 }}>
      <Card>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
          {figli.length > 0 ? (
            <button onClick={() => setEspanso(!espanso)} style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}>
              <Icon name={espanso ? "chevronDown" : "chevronRight"} size={16} color={C.grayMed} />
            </button>
          ) : <span style={{ width: 16 }} />}
          <Icon name={node.icona || "folder"} size={15} color={node.colore} />
          <span style={{ flex: 1, fontSize: 13, fontWeight: 700, color: C.grayDark }}>{node.nome}</span>
          <input type="number" value={budget || ""} placeholder="0" onChange={(e) => setBudget(node.id, Number(e.target.value) || 0)} style={{ width: 60, border: `1px solid ${C.line}`, borderRadius: 8, padding: "4px 5px", fontSize: 12, fontFamily: "'IBM Plex Mono', monospace" }} />
          <button onClick={() => onAggiungiFiglio(node.id)} title="Aggiungi sottocartella" style={{ background: "none", border: "none", cursor: "pointer" }}><Icon name="plus" size={15} color={C.blue} /></button>
          {eliminabile && <button onClick={() => onElimina(node.id)} title="Elimina" style={{ background: "none", border: "none", cursor: "pointer" }}><Icon name="trash" size={14} color={C.red} /></button>}
        </div>
        <BarraProgresso pct={pct} colore={colore} />
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6, fontSize: 12, fontFamily: "'IBM Plex Mono', monospace", color: C.grayMed }}>
          <span>{eur(speso)} spesi{figli.length > 0 ? " (con sottocartelle)" : ""}</span>
          {budget > 0 && <span>{Math.round(pct)}%</span>}
        </div>
        {budget > 0 && pct >= 80 && pct < 100 && <div style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 8, color: C.amber, fontSize: 12 }}><Icon name="alert" size={13} color={C.amber} /> Hai superato l'80% del budget.</div>}
        {budget > 0 && pct >= 100 && <div style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 8, color: C.red, fontSize: 12 }}><Icon name="alert" size={13} color={C.red} /> Budget superato.</div>}
      </Card>
      {espanso && figli.map((f) => (
        <NodoBudget key={f.id} node={f} categorie={categorie} budgets={budgets} setBudget={setBudget} spese={spese} fisse={fisse} meseCorrente={meseCorrente} onAggiungiFiglio={onAggiungiFiglio} onElimina={onElimina} depth={depth + 1} />
      ))}
    </div>
  );
}
function SchermataBudget({ spese, fisse, categorie, budgets, setBudget, onAggiungiCartella, onEliminaCartella }) {
  const meseCorrente = meseChiave(oggiISO());
  const radici = childrenOf(categorie, null);
  return (
    <div style={{ paddingBottom: 90 }}>
      <Header title="Budget mensile" />
      <div style={{ padding: "6px 18px" }}>
        <p style={{ color: C.grayMed, fontSize: 13, marginBottom: 12 }}>Organizza il budget in cartelle e sottocartelle. Il totale di una cartella include automaticamente le sue sottocartelle.</p>
        <button onClick={() => onAggiungiCartella(null)} style={{ ...btnSecondary, marginBottom: 14, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
          <Icon name="plus" size={16} color={C.navy} /> Nuova cartella
        </button>
        {radici.map((n) => (
          <NodoBudget key={n.id} node={n} categorie={categorie} budgets={budgets} setBudget={setBudget} spese={spese} fisse={fisse} meseCorrente={meseCorrente} onAggiungiFiglio={onAggiungiCartella} onElimina={onEliminaCartella} depth={0} />
        ))}
      </div>
    </div>
  );
}

/* ---------- SCHERMATA TASSE ---------- */
function SchermataTasse({ settings, setSettings }) {
  const REGIONI = ["Abruzzo","Basilicata","Calabria","Campania","Emilia-Romagna","Friuli-Venezia Giulia","Lazio","Liguria","Lombardia","Marche","Molise","Piemonte","Puglia","Sardegna","Sicilia","Toscana","Trentino-Alto Adige","Umbria","Valle d'Aosta","Veneto"];
  const [reddito, setReddito] = useState(settings.reddito || "");
  const [regione, setRegione] = useState(settings.regione || REGIONI[8]);
  const [comune, setComune] = useState(settings.comune || "");
  const [detrazioni, setDetrazioni] = useState(settings.detrazioni || "");
  const [risultato, setRisultato] = useState(null);

  function calcola() {
    if (!reddito || Number(reddito) <= 0) return;
    setSettings({ ...settings, reddito, regione, comune, detrazioni });
    setRisultato(calcolaIrpef({ reddito, detrazioni }));
  }

  return (
    <div style={{ paddingBottom: 90 }}>
      <Header title="Stima IRPEF" />
      <div style={{ padding: "6px 18px" }}>
        <Card>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div><span style={fieldLabel}>Reddito lordo annuo (EUR)</span><input type="number" inputMode="decimal" placeholder="Es. 28000" value={reddito} onChange={(e) => setReddito(e.target.value)} style={{ ...inputStyle, fontFamily: "'IBM Plex Mono', monospace" }} /></div>
            <div><span style={fieldLabel}>Regione</span><select value={regione} onChange={(e) => setRegione(e.target.value)} style={inputStyle}>{REGIONI.map((r) => <option key={r} value={r}>{r}</option>)}</select></div>
            <div><span style={fieldLabel}>Comune</span><input type="text" placeholder="Es. Milano" value={comune} onChange={(e) => setComune(e.target.value)} style={inputStyle} /></div>
            <div><span style={fieldLabel}>Detrazioni base (EUR, facoltativo)</span><input type="number" inputMode="decimal" placeholder="0" value={detrazioni} onChange={(e) => setDetrazioni(e.target.value)} style={{ ...inputStyle, fontFamily: "'IBM Plex Mono', monospace" }} /></div>
          </div>
          <button onClick={calcola} style={{ ...btnPrimary, marginTop: 14 }}>Calcola stima</button>
        </Card>

        {risultato && (
          <Card style={{ marginTop: 14, background: C.navy, border: "none" }}>
            <span style={{ color: "#AEC4D9", fontSize: 12, fontWeight: 600 }}>Quanto potresti pagare di tasse</span>
            <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 24, fontWeight: 700, color: "#F3A7A7", margin: "4px 0 10px" }}>{eur(risultato.totaleTasse)}</div>
            <div style={{ height: 1, background: "rgba(255,255,255,0.15)", margin: "10px 0" }} />
            <span style={{ color: "#AEC4D9", fontSize: 12, fontWeight: 600 }}>Quanto ti resta netto (annuo)</span>
            <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 24, fontWeight: 700, color: "#8FE3BB", margin: "4px 0 10px" }}>{eur(risultato.nettoAnnuo)}</div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#C9D6E3", marginTop: 6 }}>
              <span>Netto mensile: <b style={{ color: C.white }}>{eur(risultato.nettoMensile)}</b></span>
              <span>Aliquota media: <b style={{ color: C.white }}>{risultato.aliquotaMedia.toFixed(1)}%</b></span>
            </div>
          </Card>
        )}
        <p style={{ color: C.grayMed, fontSize: 11, marginTop: 12, lineHeight: 1.5 }}>Stima indicativa basata sugli scaglioni IRPEF nazionali e su una media forfettaria di addizionali regionali e comunali. Non sostituisce una consulenza fiscale professionale.</p>
      </div>
    </div>
  );
}

/* ---------- SCHERMATA REPORT ---------- */
function SchermataReport({ spese, fisse, categorie, settings, onUpsell }) {
  const meseCorrente = meseChiave(oggiISO());
  const mesiDisponibili = useMemo(() => { const set = new Set(spese.map((s) => meseChiave(s.data))); set.add(meseCorrente); return [...set].sort().reverse(); }, [spese]);
  const [meseSel, setMeseSel] = useState(mesiDisponibili[0]);
  const speseMeseCompleto = speseDelMese(spese, fisse, meseSel, meseCorrente);
  const totMese = speseMeseCompleto.reduce((t, s) => t + s.importo, 0);
  const anno = meseSel.slice(0, 4);
  const mesiAnno = mesiDisponibili.filter((m) => m.startsWith(anno));
  const speseAnnoCompleto = mesiAnno.flatMap((m) => speseDelMese(spese, fisse, m, meseCorrente));
  const totAnno = speseAnnoCompleto.reduce((t, s) => t + s.importo, 0);

  const perCategoriaAnno = useMemo(() => {
    const somme = {};
    speseAnnoCompleto.forEach((s) => { const top = topLevelId(categorie, s.categoria); somme[top] = (somme[top] || 0) + s.importo; });
    return Object.entries(somme).map(([id, tot]) => ({ ...nodeById(categorie, id), tot }));
  }, [speseAnnoCompleto, categorie]);

  function esportaCSV() {
    if (settings.piano !== "premium") { onUpsell(); return; }
    const speseReali = spese.filter((s) => s.data.startsWith(anno));
    const righe = [["Data", "Negozio", "Categoria", "Importo"]];
    speseReali.forEach((s) => righe.push([dataIT(s.data), s.negozio, pathLabel(categorie, s.categoria), s.importo.toFixed(2).replace(".", ",")]));
    const csv = righe.map((r) => r.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(";")).join("\n");
    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `spese_${anno}.csv`; a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div style={{ paddingBottom: 90 }}>
      <Header title="Report" />
      <div style={{ padding: "6px 18px" }}>
        <select value={meseSel} onChange={(e) => setMeseSel(e.target.value)} style={{ ...inputStyle, marginBottom: 14, textTransform: "capitalize" }}>
          {mesiDisponibili.map((m) => <option key={m} value={m} style={{ textTransform: "capitalize" }}>{nomeMese(m)}</option>)}
        </select>
        <Card>
          <span style={{ fontSize: 12, color: C.grayMed, fontWeight: 600, textTransform: "capitalize" }}>Totale spese — {nomeMese(meseSel)}</span>
          <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 22, fontWeight: 700, color: C.navy, margin: "4px 0" }}>{eur(totMese)}</div>
        </Card>
        <Card style={{ marginTop: 10 }}>
          <span style={{ fontSize: 12, color: C.grayMed, fontWeight: 600 }}>Totale spese — anno {anno}</span>
          <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 22, fontWeight: 700, color: C.navy, margin: "4px 0 10px" }}>{eur(totAnno)}</div>
          {perCategoriaAnno.map((c) => (
            <div key={c.id} style={{ display: "flex", justifyContent: "space-between", fontSize: 12, padding: "4px 0", borderTop: `1px solid ${C.line}` }}>
              <span style={{ color: C.grayDark }}>{c.nome}</span>
              <span style={{ fontFamily: "'IBM Plex Mono', monospace", color: C.grayDark }}>{eur(c.tot)}</span>
            </div>
          ))}
        </Card>
        <button onClick={esportaCSV} style={{ ...btnPrimary, marginTop: 16, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
          {settings.piano !== "premium" && <Icon name="lock" size={15} color={C.white} />}
          <Icon name="download" size={16} color={C.white} /> Esporta CSV per il commercialista
        </button>
        {settings.piano !== "premium" && <p style={{ fontSize: 11, color: C.grayMed, textAlign: "center", marginTop: 6 }}>Funzione riservata al piano Premium.</p>}
        <p style={{ fontSize: 11, color: C.grayMed, marginTop: 6 }}>Il CSV contiene le spese registrate manualmente; le spese fisse ricorrenti non generano una riga per ogni mese.</p>
      </div>
    </div>
  );
}

/* ---------- SCHERMATA IMPOSTAZIONI ---------- */
function RigaImpostazione({ label, valore }) {
  return <div style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", fontSize: 13 }}><span style={{ color: C.grayMed }}>{label}</span><span style={{ color: C.grayDark, fontWeight: 600 }}>{valore}</span></div>;
}
function SchermataImpostazioni({ settings, setSettings, spese, onCancellaTutto }) {
  const [confermaCancella, setConfermaCancella] = useState(false);
  const meseCorrente = meseChiave(oggiISO());
  const usoMensile = spese.filter((s) => meseChiave(s.data) === meseCorrente).length;
  return (
    <div style={{ paddingBottom: 90 }}>
      <Header title="Profilo e impostazioni" />
      <div style={{ padding: "6px 18px", display: "flex", flexDirection: "column", gap: 10 }}>
        <Card>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: C.navy }}>Piano {settings.piano === "premium" ? "Premium" : "Gratuito"}</div>
              <div style={{ fontSize: 12, color: C.grayMed }}>{settings.piano === "premium" ? "Spese illimitate, report PDF/CSV" : `${usoMensile}/30 spese usate questo mese`}</div>
            </div>
            <button onClick={() => setSettings({ ...settings, piano: settings.piano === "premium" ? "free" : "premium" })} style={{ background: settings.piano === "premium" ? C.redSoft : C.navy, color: settings.piano === "premium" ? C.red : C.white, border: "none", borderRadius: 10, padding: "8px 12px", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>
              {settings.piano === "premium" ? "Disattiva" : "Passa a Premium"}
            </button>
          </div>
        </Card>
        <Card>
          <div style={{ fontSize: 12, color: C.grayMed, fontWeight: 600, marginBottom: 8 }}>Preferenze</div>
          <RigaImpostazione label="Lingua" valore="Italiano" />
          <RigaImpostazione label="Valuta" valore="EUR (€)" />
          <RigaImpostazione label="Formato data" valore="GG/MM/AAAA" />
        </Card>
        {!confermaCancella ? (
          <button onClick={() => setConfermaCancella(true)} style={{ ...btnSecondary, color: C.red, borderColor: C.red, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
            <Icon name="trash" size={16} color={C.red} /> Cancella tutti i dati
          </button>
        ) : (
          <Card style={{ borderColor: C.red }}>
            <p style={{ fontSize: 13, color: C.grayDark, margin: "0 0 10px" }}>Confermi di voler cancellare tutte le spese, i budget e le impostazioni? L'operazione non è reversibile.</p>
            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={() => setConfermaCancella(false)} style={{ ...btnSecondary, flex: 1 }}>Annulla</button>
              <button onClick={() => { onCancellaTutto(); setConfermaCancella(false); }} style={{ ...btnPrimary, flex: 1, background: C.red }}>Cancella</button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}

/* ---------- APP PRINCIPALE ---------- */
function migraSettings(s) {
  if (!s) return { piano: "free", entrate: [], onboardingDone: false };
  if (!s.entrate) {
    const entrate = s.entrateMensili ? [{ id: "principale", nome: "Entrata principale", importo: s.entrateMensili }] : [];
    const { entrateMensili, ...resto } = s;
    return { ...resto, entrate };
  }
  return s;
}

function App() {
  const [spese, setSpese] = useState(() => store.get("tf-expenses", []));
  const [fisse, setFisse] = useState(() => store.get("tf-fisse", []));
  const [categorie, setCategorie] = useState(() => store.get("tf-categorie", CATEGORIE_DEFAULT));
  const [budgets, setBudgets] = useState(() => store.get("tf-budgets", {}));
  const [settings, setSettingsState] = useState(() => migraSettings(store.get("tf-settings", null)));
  const [tab, setTab] = useState("home");
  const [modaleAperto, setModaleAperto] = useState(false);

  const setSettings = useCallback((next) => { setSettingsState(next); store.set("tf-settings", next); }, []);
  const aggiornaEntrate = useCallback((nuoveEntrate) => setSettings({ ...settings, entrate: nuoveEntrate }), [settings, setSettings]);
  const setBudget = useCallback((catId, val) => { const next = { ...budgets, [catId]: val }; setBudgets(next); store.set("tf-budgets", next); }, [budgets]);

  const meseCorrente = meseChiave(oggiISO());
  const usoMensile = spese.filter((s) => meseChiave(s.data) === meseCorrente).length;
  const bloccatoDaPiano = settings.piano !== "premium" && usoMensile >= 30;

  function aggiungiSpesa(spesa) {
    const next = [...spese, spesa];
    setSpese(next); store.set("tf-expenses", next);
    setModaleAperto(false);
  }
  function aggiungiFissa(f) { const next = [...fisse, f]; setFisse(next); store.set("tf-fisse", next); }
  function eliminaFissa(id) { const next = fisse.filter((f) => f.id !== id); setFisse(next); store.set("tf-fisse", next); }

  function aggiungiCartella(parentId) {
    const nome = window.prompt(parentId ? "Nome della nuova sottocartella:" : "Nome della nuova cartella:");
    if (!nome || !nome.trim()) return;
    const id = "cat-" + Date.now().toString(36);
    const colore = PALETTE[categorie.length % PALETTE.length];
    const nuovo = { id, nome: nome.trim(), parentId: parentId || null, colore, icona: "folder" };
    const next = [...categorie, nuovo];
    setCategorie(next); store.set("tf-categorie", next);
  }
  function eliminaCartella(id) {
    if (id === "altro") { window.alert("La cartella 'Altro' non può essere eliminata."); return; }
    const daRimuovere = descendantIds(categorie, id);
    if (!window.confirm("Eliminare questa cartella" + (daRimuovere.length > 1 ? " e le sue sottocartelle" : "") + "? Le spese collegate verranno spostate in 'Altro'.")) return;
    const nextCategorie = categorie.filter((c) => !daRimuovere.includes(c.id));
    const nextSpese = spese.map((s) => (daRimuovere.includes(s.categoria) ? { ...s, categoria: "altro" } : s));
    const nextFisse = fisse.map((f) => (daRimuovere.includes(f.categoria) ? { ...f, categoria: "altro" } : f));
    const nextBudgets = Object.fromEntries(Object.entries(budgets).filter(([k]) => !daRimuovere.includes(k)));
    setCategorie(nextCategorie); store.set("tf-categorie", nextCategorie);
    setSpese(nextSpese); store.set("tf-expenses", nextSpese);
    setFisse(nextFisse); store.set("tf-fisse", nextFisse);
    setBudgets(nextBudgets); store.set("tf-budgets", nextBudgets);
  }

  function cancellaTutto() {
    setSpese([]); setFisse([]); setBudgets({}); setCategorie(CATEGORIE_DEFAULT);
    const nuove = { piano: "free", entrate: [], onboardingDone: true };
    setSettingsState(nuove);
    store.set("tf-expenses", []); store.set("tf-fisse", []); store.set("tf-budgets", {}); store.set("tf-categorie", CATEGORIE_DEFAULT); store.set("tf-settings", nuove);
  }
  function completaOnboarding() { setSettings({ ...settings, onboardingDone: true }); }

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: C.bg, minHeight: "100vh", maxWidth: 480, margin: "0 auto", position: "relative" }}>
      {!settings.onboardingDone && <Onboarding onDone={completaOnboarding} />}
      {tab === "home" && <SchermataHome spese={spese} fisse={fisse} categorie={categorie} settings={settings} aggiornaEntrate={aggiornaEntrate} apriModale={() => setModaleAperto(true)} vaiASpeseFisse={() => setTab("spese-fisse")} />}
      {tab === "spese-fisse" && <SchermataSpeseFisse fisse={fisse} categorie={categorie} onChiudi={() => setTab("home")} onAggiungi={aggiungiFissa} onElimina={eliminaFissa} />}
      {tab === "budget" && <SchermataBudget spese={spese} fisse={fisse} categorie={categorie} budgets={budgets} setBudget={setBudget} onAggiungiCartella={aggiungiCartella} onEliminaCartella={eliminaCartella} />}
      {tab === "tasse" && <SchermataTasse settings={settings} setSettings={setSettings} />}
      {tab === "report" && <SchermataReport spese={spese} fisse={fisse} categorie={categorie} settings={settings} onUpsell={() => setTab("impostazioni")} />}
      {tab === "impostazioni" && <SchermataImpostazioni settings={settings} setSettings={setSettings} spese={spese} onCancellaTutto={cancellaTutto} />}
      <BottomNav tab={tab} setTab={setTab} />
      {modaleAperto && <ModaleSpesa categorie={categorie} onClose={() => setModaleAperto(false)} onSalva={aggiungiSpesa} bloccato={bloccatoDaPiano} onUpsell={() => { setModaleAperto(false); setTab("impostazioni"); }} />}
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
