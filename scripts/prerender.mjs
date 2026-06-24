// scripts/prerender.mjs
//
// This runs after `vite build`. Vite already produces dist/index.html with the
// JS app bundled. This script makes copies of that file for every real route
// (e.g. dist/kurslar/autocad/index.html), each with:
//   - the correct <title> and <meta name="description">
//   - the correct <link rel="canonical">
//   - real, visible text content injected into #root, so a crawler that never
//     runs JavaScript still sees genuine page content immediately.
//
// Once the JS bundle loads in a real browser, React takes over and replaces
// the prerendered HTML with the fully interactive app (this handoff is called
// "hydration"). The prerendered markup is intentionally simple - it does not
// need to be pixel-identical to the live app, it only needs to contain the
// real text/structure so search engines can index it.

import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const distDir = path.join(root, 'dist');

// --- Course + topic data (kept in sync with src/data/courses and src/app/navigation/routes.ts) ---
// We re-declare a trimmed version here in plain JS so this script has zero
// dependency on the TS build step or path aliases.

const COURSES = [
  { slug: 'autocad', title: 'Autodesk® AutoCAD®', short: 'AutoCAD' },
  { slug: 'revit', title: 'Autodesk® Revit®', short: 'Revit' },
  { slug: '3ds-max-vray', title: '3ds Max + V-Ray', short: '3ds Max + V-Ray' },
  { slug: 'rhino-vray', title: 'Rhino + V-Ray', short: 'Rhino + V-Ray' },
  { slug: 'grasshopper', title: 'Grasshopper', short: 'Grasshopper' },
  { slug: 'photoshop', title: 'Photoshop', short: 'Photoshop' },
  { slug: 'illustrator', title: 'Illustrator', short: 'Illustrator' },
];

function loadCourseData() {
  // Read the actual TS data files with a light regex extraction, so the
  // prerendered HTML always reflects the real body/duration/price/curriculum
  // without us having to hand-maintain a duplicate copy of the content.
  const dataDir = path.join(root, 'src', 'data', 'courses');
  const fileMap = {
    autocad: 'autocad.ts',
    revit: 'revit.ts',
    '3ds-max-vray': 'max-vray.ts',
    'rhino-vray': 'rhino-vray.ts',
    grasshopper: 'grasshopper.ts',
    photoshop: 'photoshop.ts',
    illustrator: 'illustrator.ts',
  };

  const result = {};
  for (const course of COURSES) {
    const filePath = path.join(dataDir, fileMap[course.slug]);
    const src = fs.readFileSync(filePath, 'utf-8');

    const body = (src.match(/body:\s*'([^']*)'/) || [])[1] || '';
    const duration = (src.match(/duration:\s*'([^']*)'/) || [])[1] || '';
    const priceOnline = (src.match(/online:\s*'([^']*)'/) || [])[1] || '';
    const priceOrgun = (src.match(/örgün:\s*'([^']*)'/) || [])[1] || '';

    // Pull week titles for a lightweight curriculum outline.
    const weekTitles = [...src.matchAll(/title:\s*'(Hafta[^']*)'/g)].map((m) => m[1]);

    result[course.slug] = { ...course, body, duration, priceOnline, priceOrgun, weekTitles };
  }
  return result;
}

const courseData = loadCourseData();

const TEAM_MEMBERS = [
  { name: 'Tayfun Bilgi', role: 'Hesaplamalı Tasarımcı' },
  { name: 'Aybüke Karaman', role: 'İç Mimar' },
  { name: 'Ali Kaptan', role: 'Mimar' },
  { name: 'Erkut Sırdaş', role: 'UI/UX Tasarım Şefi' },
  { name: 'Erdal Kaytaz', role: 'Hizmet Proje Amiri' },
];

const SITE_URL = 'https://kargaburga.com';

const TOPIC_META = {
  values: {
    path: '/',
    title: 'Kargaburga | İşin Uzmanından, İşin Kendisi',
    description:
      'Kargaburga, mimari tasarım yazılımlarında (AutoCAD, Revit, 3ds Max, Rhino, V-Ray, Grasshopper, Photoshop, Illustrator) sektör profesyonellerinden eğitim sunar.',
  },
  courses: {
    path: '/kurslar',
    title: 'Kargaburga | Kurslarımız',
    description:
      'AutoCAD, Revit, 3ds Max, V-Ray, Rhino, Grasshopper, Photoshop ve Illustrator kursları. Mimarlık öğrencileri ve profesyoneller için uygulamalı eğitim.',
  },
  team: {
    path: '/ekibimiz',
    title: 'Kargaburga | Ekibimiz',
    description: 'Kargaburga eğitmen kadrosu: alanında deneyimli mimar ve tasarımcılardan oluşan ekibimizle tanışın.',
  },
  contact: {
    path: '/iletisim',
    title: 'Kargaburga | İletişim',
    description: 'Kargaburga ile iletişime geçin: adres, telefon ve eğitim merkezi konum bilgileri.',
  },
  login: {
    path: '/giris',
    title: 'Kargaburga | Giriş',
    description: 'Kargaburga öğrenci girişi.',
  },
};

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function renderCourseContent(course) {
  const weeksHtml = course.weekTitles.map((w) => `<li>${escapeHtml(w)}</li>`).join('');
  return `
    <main>
      <h1>${escapeHtml(course.title)} Kursu</h1>
      <p>${escapeHtml(course.body)}</p>
      <p><strong>Süre:</strong> ${escapeHtml(course.duration)}</p>
      <p><strong>Online Fiyat:</strong> ${escapeHtml(course.priceOnline)} &mdash; <strong>Örgün Fiyat:</strong> ${escapeHtml(course.priceOrgun)}</p>
      <h2>Müfredat</h2>
      <ul>${weeksHtml}</ul>
    </main>
  `;
}

function renderCoursesOverviewContent() {
  const items = COURSES.map(
    (c) => `<li><a href="/kurslar/${c.slug}">${escapeHtml(courseData[c.slug].title)} Kursu</a></li>`
  ).join('');
  return `
    <main>
      <h1>Kurslarımız</h1>
      <ul>${items}</ul>
    </main>
  `;
}

function renderTeamContent() {
  const items = TEAM_MEMBERS.map((m) => `<li><strong>${escapeHtml(m.name)}</strong> &mdash; ${escapeHtml(m.role)}</li>`).join('');
  return `
    <main>
      <h1>Ekibimiz</h1>
      <ul>${items}</ul>
    </main>
  `;
}

function renderContactContent() {
  return `
    <main>
      <h1>İletişim</h1>
      <p>Kadıköy / İstanbul</p>
      <p>info@kargaburga.com</p>
    </main>
  `;
}

function renderValuesContent() {
  return `
    <main>
      <h1>Kargaburga'ya Hoş Geldiniz</h1>
      <p>Eğitimlerimiz, dünya çapındaki projelerin tasarım ve uygulama süreçlerini yöneten uzmanlar tarafından doğrudan sahadaki tecrübeyle verilmektedir.</p>
    </main>
  `;
}

function renderLoginContent() {
  return `<main><h1>Giriş</h1></main>`;
}

function buildPage({ urlPath, title, description, bodyHtml, template }) {
  const canonical = `${SITE_URL}${urlPath}`;

  let html = template;
  html = html.replace(/<title>.*?<\/title>/, `<title>${escapeHtml(title)}</title>`);
  html = html.replace(/<meta name="title" content=".*?"\s*\/>/, `<meta name="title" content="${escapeHtml(title)}" />`);
  html = html.replace(/<meta name="description" content=".*?"\s*\/>/, `<meta name="description" content="${escapeHtml(description)}" />`);
  html = html.replace(/<link rel="canonical" href=".*?"\s*\/>/, `<link rel="canonical" href="${canonical}" />`);
  html = html.replace('<div id="root"></div>', `<div id="root">${bodyHtml}</div>`);

  return html;
}

function writePage(urlPath, html) {
  const outDir = urlPath === '/' ? distDir : path.join(distDir, urlPath.replace(/^\//, ''));
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, 'index.html'), html, 'utf-8');
  console.log(`  ✓ ${urlPath === '/' ? '/' : urlPath + '/'}`);
}

function run() {
  console.log('Prerendering static routes...');

  // Read the clean, JS-bundled template exactly once. We must NOT re-read
  // dist/index.html after writing the homepage there, since that write
  // overwrites the very file at distDir/index.html - every later page would
  // otherwise inherit the homepage's content instead of the original shell.
  const template = fs.readFileSync(path.join(distDir, 'index.html'), 'utf-8');

  // Homepage / values
  writePage(
    TOPIC_META.values.path,
    buildPage({
      urlPath: TOPIC_META.values.path,
      title: TOPIC_META.values.title,
      description: TOPIC_META.values.description,
      bodyHtml: renderValuesContent(),
      template,
    })
  );

  // Courses overview
  writePage(
    TOPIC_META.courses.path,
    buildPage({
      urlPath: TOPIC_META.courses.path,
      title: TOPIC_META.courses.title,
      description: TOPIC_META.courses.description,
      bodyHtml: renderCoursesOverviewContent(),
      template,
    })
  );

  // Each individual course
  for (const course of COURSES) {
    const data = courseData[course.slug];
    const urlPath = `/kurslar/${course.slug}`;
    const title = `Kargaburga | ${data.title} Kursu`;
    const description = `${data.title} kursu: ${data.body} Süre: ${data.duration}.`;
    writePage(
      urlPath,
      buildPage({ urlPath, title, description, bodyHtml: renderCourseContent(data), template })
    );
  }

  // Team
  writePage(
    TOPIC_META.team.path,
    buildPage({
      urlPath: TOPIC_META.team.path,
      title: TOPIC_META.team.title,
      description: TOPIC_META.team.description,
      bodyHtml: renderTeamContent(),
      template,
    })
  );

  // Contact
  writePage(
    TOPIC_META.contact.path,
    buildPage({
      urlPath: TOPIC_META.contact.path,
      title: TOPIC_META.contact.title,
      description: TOPIC_META.contact.description,
      bodyHtml: renderContactContent(),
      template,
    })
  );

  // Login
  writePage(
    TOPIC_META.login.path,
    buildPage({
      urlPath: TOPIC_META.login.path,
      title: TOPIC_META.login.title,
      description: TOPIC_META.login.description,
      bodyHtml: renderLoginContent(),
      template,
    })
  );

  console.log('Prerendering complete.');
}

run();
