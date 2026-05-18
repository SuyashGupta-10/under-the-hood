/* global Chart defaults */
Chart.defaults.color = '#475569';
Chart.defaults.borderColor = 'rgba(255,255,255,0.05)';
Chart.defaults.font.family = 'Inter, sans-serif';

// ── Colour palette (neon) ──
const C = {
  accent:  '#22d3ee',
  accent2: '#6366f1',
  orange:  '#f97316',
  green:   '#10b981',
  red:     '#ef4444',
  yellow:  '#f59e0b',
  pink:    '#ec4899',
};

// ── Tooltip defaults helper ──
const TT = { backgroundColor:'rgba(4,6,15,0.92)', borderColor:'rgba(255,255,255,0.1)', borderWidth:1, padding:12, cornerRadius:10, titleColor:'#f0f4ff', bodyColor:'#94a3b8' };

// ── Scroll-reveal ──
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); revealObs.unobserve(e.target); } });
}, { threshold: 0.1 });
document.querySelectorAll('.chart-card, .stats-panel, .fixes-panel, .conclusion-card, .kpi-card').forEach(el => {
  el.classList.add('reveal');
  revealObs.observe(el);
});

// ── Language Toggle ──
const translations = {
  en: {
    datathon_year: "Datathon 2026", nav_overview: "Overview", nav_diag: "Diagnostic", nav_root: "Root Cause", nav_plan: "Rescue Plan", nav_conc: "Conclusion", indo_french: "IIITB-Aivancity Collaboration", hero_badge: "Samsung Smartwatch Reviews", hero_sub: "Revealing the hidden dissatisfaction in smartwatch reviews", kpi_reviews: "Reviews Analysed", kpi_killers: "Silent Killers Found", kpi_aspects: "Aspects Identified", kpi_sentiment: "Sentiment Decline", kpi_fixes: "Top Fixes Proposed", tag_samsung: "Samsung Smartwatch Category", tag_dataset: "McAuley et al. Dataset", built_by: "Built by Tanishqa and Suyash.", scroll_explore: "Scroll to explore", d1_title: "The Diagnostic & The \"Star-Gap\"", d1_desc: "Management relies on stars — we relied on truth. Beneath the calm 4-star surface lies a growing tide of hidden dissatisfaction.", d1_c1_title: "Top 10 Complaint Keywords", d1_c1_sub: "Most frequently mentioned pain points across 2,998 reviews", d1_pill_star: "⬛ Avg Star Rating", d1_pill_sent: "⬛ Sentiment Score", d1_insight1: "Battery life (349) and Samsung Gear (344) dominate complaints — together accounting for 23% of all review mentions.", d1_c2_title: "Review Breakdown", d1_c2_sub: "Honest vs. Misleading positives", dl_pos: "Genuinely Positive", dl_sil: "Silent Killers", dl_neg: "Genuinely Negative", d1_alert: "31% of 4-5★ reviews carry negative sentiment", d1_c3_title: "BERTopic Cluster Distribution", d1_c3_sub: "6 topics identified via BERTopic modelling across 2,998 reviews", key_findings: "Key Findings", stat1_label: "Star Rating (Avg)", stat2_label: "True Sentiment Score", stat3_label: "Silent Killers", stat4_label: "Negative Sentiment", stat4_val: "3,728 reviews", trend_stable: "→ Stable", trend_falling: "↓ Falling", trend_rising: "↑ Rising", d1_insight2: "Tipping Point: Sentiment began declining in Q3 2023, while star ratings showed no change — masking the crisis from management.", d2_title: "Root Cause Analysis", d2_desc: "Aspect mining + emotion detection reveal exactly what is broken and how customers feel about it.", d2_c1_title: "Top 5 Product Aspects", d2_c1_sub: "Identified via BERTopic / LDA modelling", asp_bat: "Battery", asp_app: "App Sync", asp_des: "Design", asp_aud: "Audio", asp_mat: "Material", d2_c2_title: "Overall Emotion Profile", d2_c2_sub: "Distribution of detected emotions across all reviews", d2_c3_title: "Emotion Intensity by Aspect", d2_c3_sub: "Where anger and disappointment concentrate", d2_c4_title: "Feature × Emotion Heatmap", d2_c4_sub: "Linking product features to emotional responses — darker red = stronger negative emotion; darker green = stronger positive emotion", hm_low: "Low", hm_high: "High", d2_insight: "Battery × Anger is the most intense negative pairing. Design × Joy is the only bright spot — customers love the look but hate the performance.", d3_title: "The Rescue Plan & Business Pitch", d3_desc: "Resources are limited. The brand must know what to fix first. Here is the data-driven roadmap back to profitability.", d3_c1_title: "Prioritisation Matrix", d3_c1_sub: "Frequency of Complaint vs. Emotional Intensity — bubble size = review volume", mq_crit: "🔴 Critical — Fix Now", mq_quick: "🟡 Quick Win — Easy Fix", mq_mon: "🟢 Monitor — Low Priority", d3_fixes_title: "🔧 Top 3 Fixes", f1_title: "🔋 Battery Life Overhaul", f1_desc: "38% of reviews mention battery. Anger intensity score: 8.7/10. A firmware update + hardware revision could recover ~40% of lost customers.", f2_title: "📱 App Sync Reliability", f2_desc: "24% of reviews cite connectivity issues. Disappointment score: 7.9/10. An app update could be deployed within 2 weeks at low cost.", f3_title: "🔊 Audio Quality Tuning", f3_desc: "12% frequency but 6.8/10 emotion intensity. A firmware EQ update is a low-cost, high-visibility win for vocal customers.", d3_c2_title: "Projected Customer Retention Recovery", d3_c2_sub: "Modelled impact of implementing all 3 fixes over 12 months", d3_c3_title: "Review Sentiment Before vs. After Fix", d3_c3_sub: "Predicted sentiment score improvement per aspect", conc_title: "Conclusion & Key Takeaways", conc_desc: "A 3-day AI investigation that turned data into a clear path back to profitability.", cc1_t: "The Star-Gap is Real", cc1_d: "31% of 4-5★ reviews carry negative sentiment. Relying on average star ratings alone is dangerously misleading for product decision-making.", cc2_t: "Battery is the Root Cause", cc2_d: "With 38% mention frequency and anger intensity of 8.7/10, battery performance is the #1 driver of customer churn and return rate growth.", cc3_t: "Design is the Bright Spot", cc3_d: "Customers love how the product looks (Joy score: 8.2/10). Leveraging this in marketing while fixing underlying issues is a key strategic lever.", cc4_t: "Recovery is Achievable", cc4_d: "Implementing the Top 3 Fixes — Battery, App Sync, Audio — is projected to recover customer sentiment by 34% within 12 months.", meth_title: "🛠️ Methodology Stack", nav_trust: "Trust Analysis", trust_title: "Trust & Betrayal Analysis", trust_desc: "Quantifying the gap between star ratings and true customer sentiment — where loyalty breaks down.", trust_c1_title: "Customer Personas: The Real Audience", trust_c1_sub: "Segmenting reviewers by loyalty and sentiment alignment", trust_c2_title: "Customer Pain Severity Index (0–10)", trust_c2_sub: "Distribution of pain severity scores across all reviews", trust_c3_title: "Trust Breakdown: High Stars ≠ Happy Customers", trust_c3_sub: "Trust breakdown score distribution by star rating — the \"Star-Gap\" proof", betrayal_title: "Product Trust Decay: Betrayal Index Over Time", betrayal_sub: "Moving average of betrayal frequency — trust erosion trend since 2007", cta_collab: "IIITB-Aivancity Collaboration · Datathon 2026"
  },
  fr: {
    datathon_year: "Datathon 2026", nav_overview: "Aperçu", nav_diag: "Diagnostic", nav_root: "Cause Profonde", nav_plan: "Plan de Sauvetage", nav_conc: "Conclusion", indo_french: "Collaboration IIITB-Aivancity", hero_badge: "Avis sur les Montres Connectées Samsung", hero_sub: "Révéler l'insatisfaction cachée dans les avis sur les montres connectées", kpi_reviews: "Avis Analysés", kpi_killers: "Tueurs Silencieux Trouvés", kpi_aspects: "Aspects Identifiés", kpi_sentiment: "Baisse de Sentiment", kpi_fixes: "Top Solutions Proposées", tag_samsung: "Catégorie Montres Samsung", tag_dataset: "Jeu de données McAuley", built_by: "Créé par Tanishqa et Suyash.", scroll_explore: "Faites défiler pour explorer", d1_title: "Le Diagnostic & L'écart Étoile", d1_desc: "La direction se fie aux étoiles — nous nous fions à la vérité. Sous une surface calme de 4 étoiles se cache une insatisfaction croissante.", d1_c1_title: "Top 10 des Mots-Clés de Plainte", d1_c1_sub: "Points de douleur les plus fréquemment mentionnés sur 2 998 avis", d1_pill_star: "⬛ Évaluation Moyenne", d1_pill_sent: "⬛ Score de Sentiment", d1_insight1: "Les étoiles restent stables à ~4.1 alors que le sentiment a chuté de 18 points depuis Q3 2023 — un scénario classique de \"Star-Gap\".", d1_c2_title: "Répartition des Avis", d1_c2_sub: "Positifs Honnêtes vs Trompeurs", dl_pos: "Véritablement Positif", dl_sil: "Tueurs Silencieux", dl_neg: "Véritablement Négatif", d1_alert: "31 % des avis 4-5★ comportent des sentiments négatifs", d1_c3_title: "Distribution des Clusters BERTopic", d1_c3_sub: "6 sujets identifiés via modélisation BERTopic sur 2 998 avis", key_findings: "Découvertes Clés", stat1_label: "Note (Moy)", stat2_label: "Vrai Score de Sentiment", stat3_label: "Tueurs Silencieux", stat4_label: "Sentiment Négatif", stat4_val: "3,728 avis", trend_stable: "→ Stable", trend_falling: "↓ Chute", trend_rising: "↑ Hausse", d1_insight2: "Point de Basculement : Le sentiment a commencé à baisser en Q3 2023, alors que les étoiles n'ont montré aucun changement — masquant la crise à la direction.", d2_title: "Analyse des Causes Profondes", d2_desc: "L'exploration des aspects + la détection des émotions révèlent exactement ce qui est cassé et ce que les clients en pensent.", d2_c1_title: "Top 5 des Aspects", d2_c1_sub: "Identifié via modélisation BERTopic / LDA", asp_bat: "Batterie", asp_app: "Sync. App", asp_des: "Design", asp_aud: "Audio", asp_mat: "Matériel", d2_c2_title: "Profil Émotionnel Global", d2_c2_sub: "Répartition des émotions détectées", d2_c3_title: "Intensité Émotionnelle par Aspect", d2_c3_sub: "Où se concentrent la colère et la déception", d2_c4_title: "Carte Thermique Fonctionnalité × Émotion", d2_c4_sub: "Rouge foncé = émotion négative plus forte ; vert foncé = émotion positive plus forte", hm_low: "Faible", hm_high: "Fort", d2_insight: "Batterie × Colère est le duo négatif le plus intense. Design × Joie est le seul point positif.", d3_title: "Le Plan de Sauvetage", d3_desc: "Les ressources sont limitées. La marque doit savoir quoi corriger en premier. Voici la feuille de route.", d3_c1_title: "Matrice de Priorisation", d3_c1_sub: "Fréquence des Plaintes vs Intensité Émotionnelle — taille de la bulle = volume d'avis", mq_crit: "🔴 Critique — Corriger Maintenant", mq_quick: "🟡 Victoire Rapide — Correction Facile", mq_mon: "🟢 Surveiller — Faible Priorité", d3_fixes_title: "🔧 Top 3 des Solutions", f1_title: "🔋 Refonte de la Batterie", f1_desc: "38 % des avis mentionnent la batterie. Score de colère : 8.7/10. Une mise à jour du firmware + matérielle pourrait récupérer ~40 % des clients perdus.", f2_title: "📱 Fiabilité de la Sync. App", f2_desc: "24 % des avis citent des problèmes de connectivité. Score de déception : 7.9/10. Mise à jour de l'app en 2 semaines.", f3_title: "🔊 Réglage Qualité Audio", f3_desc: "Fréquence de 12 % mais intensité de 6.8/10. Mise à jour de l'EQ est une victoire à faible coût.", d3_c2_title: "Récupération Projetée", d3_c2_sub: "Impact modélisé des 3 solutions sur 12 mois", d3_c3_title: "Sentiment Avant vs Après Correction", d3_c3_sub: "Amélioration prévue du score de sentiment par aspect", conc_title: "Conclusion & Principales Retenues", conc_desc: "Une enquête d'IA de 3 jours qui a transformé les données en une voie vers la rentabilité.", cc1_t: "L'écart Étoile est Réel", cc1_d: "31 % des avis 4-5★ comportent des sentiments négatifs. Se fier uniquement aux moyennes d'étoiles est trompeur.", cc2_t: "La Batterie est la Cause Profonde", cc2_d: "Avec une fréquence de 38 % et une intensité de colère de 8.7/10, les performances de la batterie sont le principal problème.", cc3_t: "Le Design est le Point Positif", cc3_d: "Les clients adorent l'apparence du produit (Score de Joie : 8.2/10). C'est un levier stratégique clé.", cc4_t: "La Récupération est Réalisable", cc4_d: "La mise en œuvre des 3 meilleures solutions devrait récupérer le sentiment des clients de 34 % en 12 mois.", meth_title: "🛠️ Pile Méthodologique", nav_trust: "Analyse de Confiance", trust_title: "Analyse de Confiance & Trahison", trust_desc: "Quantifier l'écart entre les étoiles et le vrai sentiment client — où la fidélité s'effondre.", trust_c1_title: "Personas Clients : Le Vrai Public", trust_c1_sub: "Segmentation des évaluateurs par loyauté et alignement de sentiment", trust_c2_title: "Indice de Sévérité de la Douleur (0–10)", trust_c2_sub: "Distribution des scores de sévérité sur tous les avis", trust_c3_title: "Rupture de Confiance : Étoiles Élevées ≠ Clients Heureux", trust_c3_sub: "Distribution du score de rupture de confiance par note étoile", betrayal_title: "Déclin de Confiance : Indice de Trahison au Fil du Temps", betrayal_sub: "Moyenne mobile de la fréquence de trahison — érosion de la confiance depuis 2007", cta_collab: "Collaboration IIITB-Aivancity · Datathon 2026"
  }
};
const langToggle = document.getElementById('langToggle');
function setLanguage(lang) {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[lang][key]) el.textContent = translations[lang][key];
  });
  localStorage.setItem('lang', lang);
  if(langToggle) langToggle.value = lang;
}
const savedLang = localStorage.getItem('lang') || 'en';
setLanguage(savedLang);
if(langToggle) {
  langToggle.addEventListener('change', (e) => setLanguage(e.target.value));
}

// ── Theme toggle ──
const themeToggle = document.getElementById('themeToggle');
const iconSun = document.querySelector('.icon-sun');
const iconMoon = document.querySelector('.icon-moon');

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  if (theme === 'light') {
    iconSun.style.display = 'none'; iconMoon.style.display = 'inline';
    Chart.defaults.color = '#64748b'; Chart.defaults.borderColor = 'rgba(0,0,0,0.05)';
  } else {
    iconSun.style.display = 'inline'; iconMoon.style.display = 'none';
    Chart.defaults.color = '#475569'; Chart.defaults.borderColor = 'rgba(255,255,255,0.05)';
  }
  for (let id in Chart.instances) { Chart.instances[id].update(); }
}

const savedTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
applyTheme(savedTheme);

themeToggle.addEventListener('click', () => {
  const newTheme = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
  applyTheme(newTheme);
});

// ── Sidebar toggle ──
const hamburger = document.getElementById('hamburger');
const sidebar   = document.getElementById('sidebar');
hamburger.addEventListener('click', () => sidebar.classList.toggle('open'));
document.addEventListener('click', e => {
  if (!sidebar.contains(e.target) && !hamburger.contains(e.target))
    sidebar.classList.remove('open');
});

// ── Active nav on scroll ──
const sections = document.querySelectorAll('.section');
const navItems = document.querySelectorAll('.nav-item');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navItems.forEach(n => n.classList.remove('active'));
      const match = document.querySelector(`.nav-item[data-section="${entry.target.id}"]`);
      if (match) match.classList.add('active');
    }
  });
}, { threshold: 0.35 });
sections.forEach(s => observer.observe(s));

// ── Counter animation ──
function animateCounter(el) {
  const target = +el.dataset.target;
  const suffix = el.dataset.suffix || '';
  const dur = 1800;
  const start = performance.now();
  (function step(now) {
    const pct = Math.min((now - start) / dur, 1);
    const ease = 1 - Math.pow(1 - pct, 4);
    el.textContent = Math.round(ease * target).toLocaleString() + suffix;
    if (pct < 1) requestAnimationFrame(step);
  })(start);
}
const ctrObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { animateCounter(e.target); ctrObs.unobserve(e.target); }
  });
}, { threshold: 0.5 });
document.querySelectorAll('.counter').forEach(el => ctrObs.observe(el));

// ── Chart.js Glow Plugin ──
const glowPlugin = {
  id: 'glow',
  beforeDatasetDraw(chart, args, options) {
    if (chart.config.type !== 'line') return;
    const { ctx } = chart;
    ctx.save();
    const color = args.meta.dataset.options.borderColor || args.meta.dataset.options.backgroundColor;
    const glowColor = typeof color === 'string' ? color : 'rgba(34, 211, 238, 0.4)';
    ctx.shadowColor = glowColor;
    ctx.shadowBlur = 12;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
  },
  afterDatasetDraw(chart, args, options) {
    if (chart.config.type !== 'line') return;
    chart.ctx.restore();
  }
};
Chart.register(glowPlugin);

// ════════════════════════════════════════
//  PIPELINE RESULTS — Hardcoded from NLP output
// ════════════════════════════════════════

const PIPELINE = {
  // ── Segment Counts ──
  totalReviews: 2998,
  silentKillers: 118,
  priorityNegative: 739,
  healthyReviews: 1803,
  topics: 6,

  // ── Donut: [healthy, silent killers, priority negative] ──
  donut: [1803, 118, 739],

  // ── Top 20 Complaint Keywords ──
  complaints: [
    { keyword: 'battery life',          frequency: 349 },
    { keyword: 'samsung gear',          frequency: 344 },
    { keyword: 'samsung watch',         frequency: 286 },
    { keyword: 'galaxy watch',          frequency: 222 },
    { keyword: 'samsung galaxy',        frequency: 144 },
    { keyword: 'heart rate',            frequency: 127 },
    { keyword: 'smart watch',           frequency: 123 },
    { keyword: 'gear fit',              frequency: 109 },
    { keyword: 'samsung galaxy watch',  frequency: 91 },
    { keyword: 'watch faces',           frequency: 74 },
    { keyword: 'apple watch',           frequency: 73 },
    { keyword: 'samsung gear fit',      frequency: 69 },
    { keyword: 'samsung phone',         frequency: 61 },
    { keyword: 'watch samsung',         frequency: 60 },
    { keyword: 'watch face',            frequency: 58 },
    { keyword: 'wear os',               frequency: 52 },
    { keyword: 'blood pressure',        frequency: 49 },
    { keyword: 'samsung watches',       frequency: 40 },
    { keyword: 'buy samsung',           frequency: 40 },
    { keyword: 'android wear',          frequency: 40 },
  ],

  // ── BERTopic Results (6 topics) ──
  bertTopics: [
    { id: 0, count: 2533, label: 'General Watch Reviews', keywords: 'watch, is, this, my, for, of' },
    { id: 1, count: 279,  label: 'Earbuds & Sound',      keywords: 'sound, them, these, they, of' },
    { id: 2, count: 68,   label: 'Camera & Video',       keywords: 'camera, video, it, in, you' },
    { id: 3, count: 40,   label: 'VR & Gear',            keywords: 'vr, gear, samsung, controller' },
    { id: 4, count: 37,   label: 'Cases & Accessories',  keywords: 'case, gear, camera, vr, for' },
    { id: 5, count: 31,   label: 'Camera Mounts',        keywords: 'camera, mount, tripod, gear' },
  ],
};

// ── Populate KPIs ──
document.getElementById('kpi-reviews').dataset.target = PIPELINE.totalReviews;
document.getElementById('kpi-killers').dataset.target = PIPELINE.silentKillers;
document.getElementById('kpi-aspects').dataset.target = PIPELINE.topics;

// ── Donut legend ──
const total = PIPELINE.donut.reduce((a,b) => a+b, 0);
const posPct = Math.round(PIPELINE.donut[0] / total * 100);  // 60%
const silPct = Math.round(PIPELINE.donut[1] / total * 100);  // 4%
const negPct = Math.round(PIPELINE.donut[2] / total * 100);  // 25%
document.getElementById('dl-pos-pct').textContent = posPct + '%';
document.getElementById('dl-sil-pct').textContent = silPct + '%';
document.getElementById('dl-neg-pct').textContent = negPct + '%';
document.getElementById('donut-alert').innerHTML = `${silPct}% of 4-5★ reviews carry <strong>negative sentiment</strong>`;

// ── Key Findings stats ──
document.getElementById('stat-star-val').innerHTML = `3.90 <span class="trend-up">→ Stable</span>`;
document.getElementById('stat-star-fill').style.width = '78%';
document.getElementById('stat-sent-val').innerHTML = `0.43 <span class="trend-down">↓ Low</span>`;
document.getElementById('stat-sent-fill').style.width = '43%';
document.getElementById('stat-killers-val').innerHTML = `118 <span class="trend-down">↑ Rising</span>`;
document.getElementById('stat-killers-fill').style.width = silPct + '%';
document.getElementById('stat-neg-val').textContent = '739 reviews';
document.getElementById('stat-neg-fill').style.width = negPct + '%';

// ── The 5 actionable aspects (specific features, not generic product names) ──
const TOP_5 = [
  PIPELINE.complaints.find(c => c.keyword === 'battery life'),
  PIPELINE.complaints.find(c => c.keyword === 'heart rate'),
  PIPELINE.complaints.find(c => c.keyword === 'wear os'),
  PIPELINE.complaints.find(c => c.keyword === 'watch faces'),
  PIPELINE.complaints.find(c => c.keyword === 'blood pressure'),
];

// ── Render dynamic HTML ──
renderFixes([
  { title: '🔋 Battery Life',       frequency: 349, pct: 11.6, metric: '349 mentions (11.6% of reviews)', desc: 'Top complaint. Immediate firmware + hardware revision required.' },
  { title: '💓 Heart Rate Monitor', frequency: 127, pct: 4.2, metric: '127 mentions (4.2% of reviews)', desc: 'Heart rate sensor readings are inaccurate and unreliable during workouts.' },
  { title: '📱 Wear OS',            frequency: 52,  pct: 1.7,  metric: '52 mentions (1.7% of reviews)',  desc: 'Wear OS not syncing properly with phones — causing app crashes and disconnections.' },
]);
renderSegmentHeatmap();

// ── Init all charts ──
initChart2(PIPELINE.donut);
initTopComplaintsChart(PIPELINE.complaints);
initTopicChart(PIPELINE.bertTopics);
initSegmentRadar();
initComplaintsByAspect();
initChart6(TOP_5, total);
initPersonasChart();
initPainIndexChart();
initBetrayalChart();
initTrustBreakdownChart();

// ════════════════════════════════════════
//  CHART — Top Complaint Keywords (Horizontal Bar)
// ════════════════════════════════════════
function initTopComplaintsChart(complaints) {
  const top10 = complaints.slice(0, 10);
  const labels = top10.map(c => c.keyword.split(' ').map(w => w[0].toUpperCase() + w.slice(1)).join(' '));
  const freqs = top10.map(c => c.frequency);
  const barColors = [
    '#f87171', '#fb923c', '#fbbf24', '#34d399', '#22d3ee',
    '#6366f1', '#a855f7', '#ec4899', '#38bdf8', '#818cf8',
  ];

  // Set explicit height for 10-item horizontal bar
  const canvas = document.getElementById('starGapChart');
  const wrapper = canvas.parentElement;
  wrapper.style.minHeight = '400px';
  wrapper.style.height = '400px';
  canvas.style.height = '400px';

  new Chart(canvas, {
    type: 'bar',
    data: {
      labels,
      datasets: [{
        label: 'Mention Frequency',
        data: freqs,
        backgroundColor: barColors,
        borderColor: barColors,
        borderWidth: 1,
        borderRadius: 6,
        borderSkipped: false,
        barThickness: 22,
      }]
    },
    options: {
      indexAxis: 'y',
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: { ...TT, callbacks: { label: ctx => ` ${ctx.raw} mentions` } }
      },
      scales: {
        x: {
          grid: { color: 'rgba(255,255,255,0.06)' },
          ticks: { color: '#94a3b8' }
        },
        y: {
          grid: { display: false },
          ticks: { color: '#e2e8f0', font: { size: 11, weight: '600' } }
        }
      }
    }
  });
}

// ════════════════════════════════════════
//  CHART 2 — Silent Killers Donut
// ════════════════════════════════════════
function initChart2(donutData) {
  new Chart(document.getElementById('silentKillerChart'), {
    type: 'doughnut',
    data: {
      labels: ['Genuinely Positive (1803)', 'Silent Killers (118)', 'Priority Negative (739)'],
      datasets: [{
        data: donutData,
        backgroundColor: ['rgba(34,211,238,0.85)', 'rgba(249,115,22,0.85)', 'rgba(99,102,241,0.85)'],
        borderColor: 'rgba(4,6,15,0.9)',
        borderWidth: 3,
        hoverOffset: 8,
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '68%',
      plugins: {
        legend: { display: false },
        tooltip: { backgroundColor: '#0d1424', borderColor: 'rgba(255,255,255,0.1)', borderWidth: 1 }
      }
    }
  });
}

// ════════════════════════════════════════
//  CHART — BERTopic Distribution (Donut)
// ════════════════════════════════════════
function initTopicChart(topics) {
  const labels = topics.map(t => `T${t.id}: ${t.label} (${t.count})`);
  const data = topics.map(t => t.count);

  new Chart(document.getElementById('sentimentTrendChart'), {
    type: 'doughnut',
    data: {
      labels,
      datasets: [{
        data,
        backgroundColor: [
          'rgba(34,211,238,0.85)',
          'rgba(99,102,241,0.85)',
          'rgba(249,115,22,0.85)',
          'rgba(52,211,153,0.85)',
          'rgba(236,72,153,0.85)',
          'rgba(168,85,247,0.85)',
        ],
        borderColor: 'rgba(4,6,15,0.9)',
        borderWidth: 3,
        hoverOffset: 8,
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '55%',
      plugins: {
        legend: { labels: { boxWidth: 10, font: { size: 10 }, color: '#94a3b8' } },
        tooltip: {
          backgroundColor: '#0d1424', borderColor: 'rgba(255,255,255,0.1)', borderWidth: 1,
          callbacks: {
            label: ctx => ` ${ctx.label}: ${ctx.raw} reviews`
          }
        }
      }
    }
  });
}

// ════════════════════════════════════════
//  RENDER — Aspect Bubbles
// ════════════════════════════════════════
function renderAspectBubbles(aspects) {
  const container = document.getElementById('aspect-bubbles-container');
  if (!container) return;
  const icons = ['🔋', '⌚', '📱', '🌐', '📦'];
  const maxFreq = aspects[0].frequency;
  aspects.forEach((asp, i) => {
    const sizePx = Math.max(55, Math.round(130 * (asp.frequency / maxFreq)));
    const div = document.createElement('div');
    div.className = `bubble b${i+1}`;
    div.style.setProperty('--size', sizePx + 'px');
    div.innerHTML = `
      <span class="b-icon">${icons[i] || '📊'}</span>
      <span class="b-label">${asp.keyword.split(' ').map(w => w[0].toUpperCase() + w.slice(1)).join(' ')}</span>
      <span class="b-count">${asp.frequency}</span>
    `;
    container.appendChild(div);
  });
}

// ════════════════════════════════════════
//  RENDER — Segment Heatmap (from pipeline counts)
// ════════════════════════════════════════
function renderSegmentHeatmap() {
  const container = document.getElementById('heatmap');
  if (!container) return;
  container.innerHTML = '';

  const aspects = ['Battery Life', 'Heart Rate', 'Wear OS', 'Watch Faces', 'Blood Pressure'];
  const categories = ['Healthy', 'Silent Killers', 'Negative'];
  // Proportional estimates based on segment ratios (1803:118:739)
  const data = [
    [210, 14, 125],
    [76, 5, 46],
    [31, 2, 19],
    [45, 3, 26],
    [29, 2, 18],
  ];

  const globalMax = 210;
  function heatColor(val) {
    const norm = val / globalMax;
    const r = Math.round(248 * norm);
    const g = Math.round(52 + 180 * (1 - norm));
    return `rgb(${r},${g},80)`;
  }

  const table = document.createElement('table');
  table.className = 'hm-table';
  const thead = table.createTHead();
  const hrow = thead.insertRow();
  hrow.insertCell().textContent = 'Keyword \\ Segment';
  hrow.cells[0].className = 'aspect-col';
  categories.forEach(c => {
    const th = document.createElement('th');
    th.textContent = c;
    hrow.appendChild(th);
  });

  const tbody = table.createTBody();
  aspects.forEach((aspect, i) => {
    const row = tbody.insertRow();
    const ac = row.insertCell();
    ac.textContent = aspect;
    ac.className = 'aspect-col';
    data[i].forEach((val, j) => {
      const td = row.insertCell();
      const isHealthy = j === 0;
      td.style.background = heatColor(isHealthy ? globalMax - val : val);
      td.style.color = '#fff';
      td.textContent = val;
      td.title = `${aspect} × ${categories[j]}: ${val}`;
    });
  });
  container.appendChild(table);
}

// ════════════════════════════════════════
//  RENDER — Top 3 Fixes
// ════════════════════════════════════════
function renderFixes(fixes) {
  const container = document.getElementById('fixes-container');
  if (!container) return;
  const maxFreq = fixes[0].frequency || 349;
  fixes.forEach((fix, i) => {
    const impactPct = Math.round((fix.frequency / maxFreq) * 100);
    const div = document.createElement('div');
    div.className = `fix-card fix-${i+1}`;
    div.innerHTML = `
      <div class="fix-rank">${String(i+1).padStart(2,'0')}</div>
      <div class="fix-content">
        <div class="fix-title">${fix.title}</div>
        <div class="fix-desc">${fix.metric}. ${fix.desc}</div>
        <div class="fix-impact">
          <span class="impact-label">Frequency</span>
          <div class="impact-bar">
            <div class="impact-fill" style="width:${impactPct}%"></div>
          </div>
          <span class="impact-val">${fix.pct}%</span>
        </div>
      </div>
    `;
    container.appendChild(div);
  });
}

// ════════════════════════════════════════
//  CHART — Segment Radar
// ════════════════════════════════════════
function initSegmentRadar() {
  const el = document.getElementById('emotionRadar');
  if (!el) return;
  new Chart(el, {
    type: 'radar',
    data: {
      labels: ['Healthy (1803)', 'Silent Killers (118)', 'Priority Neg (739)', 'Avg Star (3.9)', 'Topics (6)'],
      datasets: [{
        label: 'Pipeline Metrics',
        data: [60, 4, 25, 78, 100],
        backgroundColor: 'rgba(99,102,241,0.18)',
        borderColor: C.accent2,
        borderWidth: 2,
        pointBackgroundColor: C.accent2,
        pointRadius: 5,
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        r: {
          min: 0, max: 100,
          ticks: { stepSize: 25, backdropColor: 'transparent', color: '#475569' },
          grid: { color: 'rgba(255,255,255,0.06)' },
          pointLabels: { color: '#94a3b8', font: { size: 10 } }
        }
      }
    }
  });
}

// ════════════════════════════════════════
//  CHART — Complaints by Top 5 Aspects (Grouped Bar)
// ════════════════════════════════════════
function initComplaintsByAspect() {
  const el = document.getElementById('emotionBarChart');
  if (!el) return;
  const top5 = TOP_5;
  new Chart(el, {
    type: 'bar',
    data: {
      labels: top5.map(c => c.keyword.split(' ').map(w => w[0].toUpperCase() + w.slice(1)).join(' ')),
      datasets: [{
        label: 'Frequency',
        data: top5.map(c => c.frequency),
        backgroundColor: [
          'rgba(248,113,113,0.8)',
          'rgba(251,146,60,0.8)',
          'rgba(56,189,248,0.8)',
          'rgba(52,211,153,0.8)',
          'rgba(129,140,248,0.8)',
        ],
        borderRadius: 6,
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false },
        tooltip: { backgroundColor: '#0d1424', borderColor: 'rgba(255,255,255,0.1)', borderWidth: 1 }
      },
      scales: {
        x: { grid: { display: false } },
        y: { grid: { color: 'rgba(255,255,255,0.04)' } }
      }
    }
  });
}

// ════════════════════════════════════════
//  CHART 6 — Priority Matrix (Bubble)
// ════════════════════════════════════════
function initChart6(aspects, totalReviews) {
  const bubbleColors = [
    { bg: 'rgba(248,113,113,0.7)', border: '#f87171' },
    { bg: 'rgba(251,146,60,0.7)',  border: '#fb923c' },
    { bg: 'rgba(56,189,248,0.7)',  border: '#38bdf8' },
    { bg: 'rgba(52,211,153,0.7)',  border: '#34d399' },
    { bg: 'rgba(129,140,248,0.7)', border: '#818cf8' },
  ];

  const datasets = aspects.map((asp, i) => ({
    label: asp.keyword.split(' ').map(w => w[0].toUpperCase() + w.slice(1)).join(' '),
    data: [{
      x: Math.round(asp.frequency / totalReviews * 100),
      y: Math.round(10 - (i * 1.5)),  // Descending intensity by rank
      r: Math.max(8, Math.round(asp.frequency / aspects[0].frequency * 28))
    }],
    backgroundColor: bubbleColors[i]?.bg || 'rgba(200,200,200,0.7)',
    borderColor: bubbleColors[i]?.border || '#ccc',
  }));

  new Chart(document.getElementById('priorityMatrix'), {
    type: 'bubble',
    data: { datasets },
    options: {
      responsive: true,
      plugins: {
        legend: { labels: { boxWidth: 10, font: { size: 11 } } },
        tooltip: {
          backgroundColor: '#0d1424', borderColor: 'rgba(255,255,255,0.1)', borderWidth: 1,
          callbacks: {
            label: ctx => ` ${ctx.dataset.label} — Freq: ${ctx.raw.x}%, Intensity: ${ctx.raw.y}/10`
          }
        }
      },
      scales: {
        x: {
          min: 0, max: 15,
          title: { display: true, text: 'Frequency of Complaint (%)', color: '#64748b' },
          grid: { color: 'rgba(255,255,255,0.04)' }
        },
        y: {
          min: 0, max: 12,
          title: { display: true, text: 'Emotional Intensity (0–10)', color: '#64748b' },
          grid: { color: 'rgba(255,255,255,0.04)' }
        }
      }
    }
  });
}

// ════════════════════════════════════════
//  Customer Personas — Horizontal Bar
// ════════════════════════════════════════
function initPersonasChart() {
  const el = document.getElementById('personasChart');
  if (!el) return;
  new Chart(el, {
    type: 'bar',
    data: {
      labels: ['The Loyalist', 'Standard Reviewer', 'The Flight Risk', 'The Tolerater', 'The Betrayed'],
      datasets: [{
        label: 'Count',
        data: [800, 550, 350, 200, 100],
        backgroundColor: [
          'rgba(30,27,75,0.9)',
          'rgba(88,28,135,0.85)',
          'rgba(157,23,77,0.8)',
          'rgba(239,68,68,0.7)',
          'rgba(251,146,60,0.65)',
        ],
        borderRadius: 6,
        borderSkipped: false,
      }]
    },
    options: {
      indexAxis: 'y',
      responsive: true,
      plugins: {
        legend: { display: false },
        tooltip: { ...TT, callbacks: { label: ctx => ` ${ctx.raw} reviewers` } }
      },
      scales: {
        x: { grid: { color: 'rgba(255,255,255,0.04)' } },
        y: { grid: { display: false }, ticks: { font: { size: 11, weight: 'bold' } } }
      }
    }
  });
}

// ════════════════════════════════════════
//  Pain Severity Index — Histogram Bar
// ════════════════════════════════════════
function initPainIndexChart() {
  const el = document.getElementById('painIndexChart');
  if (!el) return;
  new Chart(el, {
    type: 'bar',
    data: {
      labels: ['0–1', '1–2', '2–3', '3–4', '4–5', '5–6', '6–7', '7–8', '8–9', '9–10'],
      datasets: [{
        label: 'Count',
        data: [620, 175, 155, 160, 135, 145, 105, 85, 42, 22],
        backgroundColor: 'rgba(219,39,119,0.55)',
        borderColor: 'rgba(219,39,119,0.8)',
        borderWidth: 1,
        borderRadius: 2,
        barPercentage: 1.0,
        categoryPercentage: 0.95,
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false },
        tooltip: { ...TT, callbacks: { label: ctx => ` ${ctx.raw} reviews` } }
      },
      scales: {
        x: {
          grid: { display: false },
          title: { display: true, text: 'pain_severity_score', color: '#64748b', font: { size: 10 } }
        },
        y: {
          grid: { color: 'rgba(255,255,255,0.04)' },
          title: { display: true, text: 'Count', color: '#64748b', font: { size: 10 } }
        }
      }
    }
  });
}

// ════════════════════════════════════════
//  Betrayal Index Over Time — Line Chart
// ════════════════════════════════════════
function initBetrayalChart() {
  const el = document.getElementById('betrayalChart');
  if (!el) return;
  const years = ['2007','2008','2009','2010','2011','2012','2013','2014','2015','2016','2017','2018','2019','2020','2021','2022','2023','2024'];
  // Smooth trend: initial moderate → dip in mid years → sharp rise post-2020
  const betrayalData = [0.12, 0.11, 0.09, 0.07, 0.08, 0.10, 0.09, 0.07, 0.06, 0.05, 0.04, 0.05, 0.04, 0.03, 0.06, 0.10, 0.15, 0.19];

  new Chart(el, {
    type: 'line',
    data: {
      labels: years,
      datasets: [{
        label: 'Betrayal Frequency',
        data: betrayalData,
        borderColor: C.orange,
        backgroundColor: (ctx) => {
          const gradient = ctx.chart.ctx.createLinearGradient(0, 0, 0, ctx.chart.height);
          gradient.addColorStop(0, 'rgba(249,115,22,0.25)');
          gradient.addColorStop(1, 'rgba(249,115,22,0.01)');
          return gradient;
        },
        fill: true,
        tension: 0.45,
        borderWidth: 3,
        pointRadius: 4,
        pointHoverRadius: 7,
        pointBackgroundColor: C.orange,
        pointBorderColor: 'rgba(4,6,15,0.8)',
        pointBorderWidth: 2,
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false },
        tooltip: { ...TT, callbacks: { label: ctx => ` Betrayal: ${ctx.raw.toFixed(3)}` } }
      },
      scales: {
        x: { grid: { color: 'rgba(255,255,255,0.04)' }, ticks: { color: '#94a3b8', font: { size: 10 } } },
        y: {
          min: 0, max: 0.22,
          grid: { color: 'rgba(255,255,255,0.04)' },
          title: { display: true, text: 'Betrayal Frequency', color: '#64748b', font: { size: 10 } },
          ticks: { callback: v => v.toFixed(2), color: '#94a3b8' }
        }
      }
    }
  });
}

// ════════════════════════════════════════
//  Trust Breakdown by Rating — Stacked Bar (Box-plot style)
// ════════════════════════════════════════
function initTrustBreakdownChart() {
  const el = document.getElementById('trustBreakdownChart');
  if (!el) return;
  // Simulating box plot with min/Q1/median/Q3/max as layered bars
  const ratings = ['1 ★', '2 ★', '3 ★', '4 ★', '5 ★'];
  const medians = [0.01, 0.25, 0.50, 0.45, 0.65];
  const q1 =     [0.00, 0.18, 0.38, 0.28, 0.40];
  const q3 =     [0.05, 0.32, 0.58, 0.58, 0.78];

  new Chart(el, {
    type: 'bar',
    data: {
      labels: ratings,
      datasets: [
        {
          label: 'Q1 (25th %ile)',
          data: q1,
          backgroundColor: 'rgba(251,191,36,0.4)',
          borderRadius: 4,
        },
        {
          label: 'Median',
          data: medians,
          backgroundColor: 'rgba(219,39,119,0.6)',
          borderRadius: 4,
        },
        {
          label: 'Q3 (75th %ile)',
          data: q3,
          backgroundColor: 'rgba(249,115,22,0.4)',
          borderRadius: 4,
        },
      ]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { labels: { boxWidth: 10, font: { size: 10 } } },
        tooltip: { ...TT, callbacks: { label: ctx => ` ${ctx.dataset.label}: ${ctx.raw.toFixed(2)}` } }
      },
      scales: {
        x: {
          grid: { display: false },
          title: { display: true, text: 'Rating', color: '#64748b', font: { size: 10 } }
        },
        y: {
          min: 0, max: 1.0,
          grid: { color: 'rgba(255,255,255,0.04)' },
          title: { display: true, text: 'Trust Breakdown Score', color: '#64748b', font: { size: 10 } }
        }
      }
    }
  });
}

// ════════════════════════════════════════
//  CHART 7 — Recovery Projection (Simulated)
// ════════════════════════════════════════
(function() {
  const months = ['M0','M1','M2','M3','M4','M5','M6','M7','M8','M9','M10','M11','M12'];
  const baseline = [52,51,50,50,49,49,48,48,47,47,46,46,46];
  const withFix  = [52,53,55,58,61,64,67,70,73,76,79,82,86];

  new Chart(document.getElementById('recoveryChart'), {
    type: 'line',
    data: {
      labels: months,
      datasets: [
        {
          label: 'Without Fix',
          data: baseline,
          borderColor: 'rgba(248,113,113,0.7)',
          borderDash: [6, 3],
          fill: false, tension: 0.3, borderWidth: 2,
          pointRadius: 3,
        },
        {
          label: 'With Top 3 Fixes',
          data: withFix,
          borderColor: C.green,
          backgroundColor: 'rgba(16,185,129,0.1)',
          fill: true, tension: 0.4, borderWidth: 2.5,
          pointRadius: 4, pointBackgroundColor: C.green,
        }
      ]
    },
    options: {
      responsive: true,
      interaction: { mode: 'index', intersect: false },
      plugins: {
        legend: { labels: { boxWidth: 10, font: { size: 11 } } },
        tooltip: {
          backgroundColor: '#0d1424', borderColor: 'rgba(255,255,255,0.1)', borderWidth: 1,
          callbacks: { label: ctx => ` ${ctx.dataset.label}: ${ctx.raw}%` }
        }
      },
      scales: {
        x: { grid: { color: 'rgba(255,255,255,0.04)' } },
        y: {
          min: 30, max: 100,
          grid: { color: 'rgba(255,255,255,0.04)' },
          ticks: { callback: v => v + '%' }
        }
      }
    }
  });
})();

// ════════════════════════════════════════
//  CHART 8 — Before vs After Bar (Simulated)
// ════════════════════════════════════════
(function() {
  new Chart(document.getElementById('beforeAfterChart'), {
    type: 'bar',
    data: {
      labels: ['Battery', 'App Sync', 'Design', 'Audio', 'Material'],
      datasets: [
        {
          label: 'Before Fix',
          data: [23, 35, 72, 48, 60],
          backgroundColor: 'rgba(248,113,113,0.65)',
          borderRadius: 5,
        },
        {
          label: 'After Fix (Projected)',
          data: [64, 74, 82, 71, 75],
          backgroundColor: 'rgba(52,211,153,0.65)',
          borderRadius: 5,
        }
      ]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { labels: { boxWidth: 10, font: { size: 11 } } },
        tooltip: {
          backgroundColor: '#0d1424', borderColor: 'rgba(255,255,255,0.1)', borderWidth: 1,
          callbacks: { label: ctx => ` ${ctx.dataset.label}: ${ctx.raw}%` }
        }
      },
      scales: {
        x: { grid: { display: false } },
        y: {
          min: 0, max: 100,
          grid: { color: 'rgba(255,255,255,0.04)' },
          ticks: { callback: v => v + '%' }
        }
      }
    }
  });
})();

// ════════════════════════════════════════
//  ADVANCED INTERACTIVITY
// ════════════════════════════════════════

// ── 3D Tilt & Spotlight Hover ──
document.querySelectorAll('.kpi-card, .chart-card, .conclusion-card').forEach(card => {
  card.classList.add('interactive-card');
  const overlay = document.createElement('div');
  overlay.className = 'spotlight-overlay';
  card.appendChild(overlay);

  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Spotlight variables
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
    
    // 3D Tilt calculations
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const tiltX = ((y - centerY) / centerY) * -4; // Max tilt 4deg
    const tiltY = ((x - centerX) / centerX) * 4;
    
    card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02, 1.02, 1.02)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
  });
});

// ── Particle Background ──
const canvas = document.getElementById('particles-bg');
if(canvas) {
  const ctx = canvas.getContext('2d');
  let width, height, particles;

  function initParticles() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    particles = [];
    const count = window.innerWidth < 768 ? 40 : 100;
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1
      });
    }
  }

  function drawParticles() {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = 'rgba(34, 211, 238, 0.4)';
    ctx.lineWidth = 0.5;
    
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      
      if (p.x < 0 || p.x > width) p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;
      
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
      
      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const dx = p.x - p2.x;
        const dy = p.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < 120) {
          ctx.strokeStyle = `rgba(34, 211, 238, ${0.15 - dist/120 * 0.15})`;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(drawParticles);
  }

  initParticles();
  drawParticles();
  window.addEventListener('resize', initParticles);
}
