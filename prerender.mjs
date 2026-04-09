/**
 * Pre-render script for SEO
 * 
 * Generates individual HTML files for each route with:
 * - Unique <title>, meta description, OG tags, Twitter cards
 * - Per-page JSON-LD schema markup
 * - Visible text content for crawlers (rendered in <noscript> and as initial HTML)
 * - The same React bundle loads and hydrates on top
 * 
 * Run after `vite build`: node prerender.mjs
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.join(__dirname, 'dist');

// Read the built index.html as template
const template = fs.readFileSync(path.join(distDir, 'index.html'), 'utf-8');

const SITE_URL = 'https://badactors.online';
const COVER_IMG = `${SITE_URL}/bad-actors-cover.avif`;
const COVER_JPG = `${SITE_URL}/bad-actors-cover.jpg`;

const tracks = [
  { number: 1, title: "Silence Ain't Consent", slug: "silence-aint-consent", duration: "3:33", iso: "PT3M33S",
    story: "This opening track sets the tone for everything that follows. When communities stay silent in the face of corruption, that silence is often mistaken for consent. But make no mistake—silence is not agreement. It's often fear, exhaustion, or learned helplessness. This is North Mississippi's warning: we're not staying silent anymore." },
  { number: 2, title: "Unbroken", slug: "unbroken", duration: "5:04", iso: "PT5M4S",
    story: "\"Unbroken\" is the heartbeat of the Bad Actors album — the moment where the storytelling stops whispering and starts roaring. This track is Matthew Reardon, a.k.a. Don Matthews, stripped down to the bone and refusing to fold. It's the sound of a man who's been shoved, jailed, smeared, surveilled, extradited, and assaulted — and still shows up with the camera rolling and the Constitution in hand." },
  { number: 3, title: "In the Shadows Tonight", slug: "in-the-shadows-tonight", duration: "4:19", iso: "PT4M19S",
    story: "\"In the Shadows Tonight (The Reckoning)\" stands as one of the most confrontational and revealing tracks on Bad Actors. This song turns its gaze toward a more intimate origin of destruction, chronicling the pattern of personal betrayal that grew into institutional harm." },
  { number: 4, title: "Double Dipped", slug: "double-dipped", duration: "4:17", iso: "PT4M17S",
    story: "\"Double Dipped\" is one of the album's most pointed indictments of personal betrayal colliding with state-enabled corruption. Don Matthews pulls back the curtain on a specific form of fraud that reshaped his life." },
  { number: 5, title: "Morgan County Blues", slug: "morgan-county-blues", duration: "4:04", iso: "PT4M4S",
    story: "\"Morgan County Blues\" is one of the most haunting narrative tracks on Bad Actors, spotlighting another victim of manufactured criminality: Joshua Grover, a Utah real estate photographer whose only \"crime\" was doing his job." },
  { number: 6, title: "The Osteen Files (Exhibit L)", slug: "the-osteen-files-exhibit-l", duration: "3:50", iso: "PT3M50S",
    story: "Exhibit L. Just one letter. One piece of evidence in a mountain of documentation that reveals a pattern of misconduct so extensive, it required its own filing system. This track chronicles the beginning of the Osteen investigation." },
  { number: 7, title: "A Warrant For A Lie", slug: "a-warrant-for-a-lie", duration: "3:34", iso: "PT3M34S",
    story: "They swore an oath. They signed their names. They stood before a judge and declared it was the truth. But it wasn't. This is the story of a warrant built on fabrications—a legal document that should represent justice, instead weaponized to destroy an innocent life." },
  { number: 8, title: "The Crowder Files", slug: "the-crowder-files", duration: "3:33", iso: "PT3M33S",
    story: "\"The Crowder Files\" serves as the documentary centerpiece of the album's exposure, compiling the receipts—the false statements, the manipulated legal filings, the weaponized agencies, and the trail of destruction left in the wake of personal vendetta transformed into state action." },
  { number: 9, title: "Eleven Months Too Long", slug: "eleven-months-too-long", duration: "3:48", iso: "PT3M48S",
    story: "\"Eleven Months Too Long\" documents one of the most egregious examples of pretrial detention abuse. This track chronicles the nearly year-long imprisonment endured without conviction—eleven months of freedom stolen, life suspended, and constitutional rights trampled." },
  { number: 10, title: "Caught Red Handed", slug: "caught-red-handed", duration: "4:00", iso: "PT4M0S",
    story: "\"Caught Red Handed\" is the receipts track—the moment when all the documentation, all the evidence, all the contradictions come together to prove what was always true: they lied, and they got caught." },
  { number: 11, title: "Osteen Lied", slug: "osteen-lied", duration: "3:36", iso: "PT3M36S",
    story: "Three words. Undeniable truth. Documented proof. Osteen lied. Not once. Not by accident. Not a misunderstanding. A calculated, deliberate, provable lie that destroyed lives and perverted justice." },
  { number: 12, title: "Land of the Free, Unless Its Me", slug: "land-of-the-free-unless-its-me", duration: "4:12", iso: "PT4M12S",
    story: "\"Land of the Free, Unless Its Me\" confronts the bitter irony at the heart of American justice: the freedoms we celebrate don't apply equally to everyone. This track examines how constitutional protections evaporate when you become a target." },
  { number: 13, title: "She Called The State", slug: "she-called-the-state", duration: "3:55", iso: "PT3M55S",
    story: "\"She Called The State\" documents the moment when personal conflict became state-sponsored persecution. This track examines how a single phone call can activate an entire apparatus of government power against an individual." },
  { number: 14, title: "Osteen's Fall", slug: "osteens-fall", duration: "3:27", iso: "PT3M27S",
    story: "Every corrupt empire eventually crumbles. Every bad actor eventually faces their reckoning. This track chronicles the downfall—when the evidence became overwhelming, when the lies could no longer be sustained." },
  { number: 15, title: "The Gaslight Anthem", slug: "the-gaslight-anthem", duration: "2:29", iso: "PT2M29S",
    story: "\"You're crazy. That didn't happen. You're misremembering. Nobody will believe you.\" The anthem of the gaslighter. This track reclaims reality and documents the gaslighting tactics used by those in power." },
  { number: 16, title: "Governors Gone Too Far", slug: "governors-gone-too-far", duration: "3:22", iso: "PT3M22S",
    story: "When corruption reaches the highest levels of state government, when the governor's office itself becomes complicit in covering up injustice, someone has to say it out loud: The Governor's Gone Too Far." },
  { number: 17, title: "Scandalous", slug: "scandalous", duration: "3:14", iso: "PT3M14S",
    story: "\"Scandalous\" closes the album with the most personal betrayal of all—the scandalous acts committed by those who were supposed to be family. This track documents the calculated destruction that came from within." },
];

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function generatePage(routePath, { title, description, ogType, schema, keywords, content }) {
  const canonical = `${SITE_URL}${routePath}`;
  
  let html = template;
  
  // Replace title
  html = html.replace(
    /<title>[^<]*<\/title>/,
    `<title>${escapeHtml(title)}</title>`
  );
  
  // Replace/add canonical
  html = html.replace(
    /<link rel="canonical"[^>]*>/,
    `<link rel="canonical" href="${canonical}" />`
  );
  
  // Replace meta description
  html = html.replace(
    /<meta name="description"[^>]*>/,
    `<meta name="description" content="${escapeHtml(description)}" />`
  );
  
  // Replace keywords
  if (keywords) {
    html = html.replace(
      /<meta name="keywords"[^>]*>/,
      `<meta name="keywords" content="${escapeHtml(keywords)}" />`
    );
  }
  
  // Replace OG tags
  html = html.replace(/<meta property="og:title"[^>]*>/, `<meta property="og:title" content="${escapeHtml(title)}" />`);
  html = html.replace(/<meta property="og:description"[^>]*>/, `<meta property="og:description" content="${escapeHtml(description)}" />`);
  html = html.replace(/<meta property="og:type"[^>]*>/, `<meta property="og:type" content="${ogType || 'website'}" />`);
  html = html.replace(/<meta property="og:url"[^>]*>/, `<meta property="og:url" content="${canonical}" />`);
  
  // Replace Twitter tags
  html = html.replace(/<meta name="twitter:title"[^>]*>/, `<meta name="twitter:title" content="${escapeHtml(title)}" />`);
  html = html.replace(/<meta name="twitter:description"[^>]*>/, `<meta name="twitter:description" content="${escapeHtml(description)}" />`);
  
  // Replace schema JSON-LD
  if (schema) {
    html = html.replace(
      /<script type="application\/ld\+json">[\s\S]*?<\/script>/,
      `<script type="application/ld+json">${JSON.stringify(schema)}</script>`
    );
  }
  
  // Add pre-rendered content inside the root div for crawlers
  if (content) {
    html = html.replace(
      '<div id="root"></div>',
      `<div id="root">${content}</div>`
    );
  }
  
  return html;
}

function generateTrackSchema(track) {
  return {
    "@context": "https://schema.org",
    "@type": "MusicRecording",
    "name": track.title,
    "url": `${SITE_URL}/track/${track.slug}`,
    "duration": track.iso,
    "position": track.number,
    "description": track.story,
    "isAccessibleForFree": true,
    "genre": ["Hip hop", "Protest music", "Documentary storytelling"],
    "inAlbum": {
      "@type": "MusicAlbum",
      "name": "Bad Actors Volume 1",
      "url": SITE_URL + "/",
      "image": COVER_IMG,
      "numTracks": 17,
      "datePublished": "2025-09-01"
    },
    "byArtist": {
      "@type": "Person",
      "name": "Don Matthews",
      "alternateName": "Matthew Reardon",
      "url": `${SITE_URL}/about`,
      "sameAs": [
        "https://www.wtpnews.org/about-matthew-reardon-don-matthews/",
        "https://www.youtube.com/@BadActors"
      ]
    }
  };
}

function generateTrackContent(track) {
  return `
    <article>
      <h1>${escapeHtml(track.title)} — Bad Actors Volume 1</h1>
      <p>Track ${track.number} of 17 · ${track.duration} · by Don Matthews</p>
      <h2>The Story Behind "${escapeHtml(track.title)}"</h2>
      <p>${escapeHtml(track.story)}</p>
      <p>From the album <a href="/">Bad Actors Volume 1</a> by <a href="/about">Don Matthews</a></p>
      <h3>Stream on All Platforms</h3>
      <ul>
        <li><a href="https://music.apple.com/au/album/bad-actors-volume-1/1863402949">Apple Music</a></li>
        <li><a href="https://open.spotify.com/album/bad-actors-volume-1">Spotify</a></li>
        <li><a href="https://music.youtube.com/playlist?list=OLAK5uy_m5AmZDrY2kX__kNhYE1jkhmY1LLTZi1cE">YouTube Music</a></li>
        <li><a href="https://soundcloud.com/don-matthews-268378810/sets/bad-actors-volume-1">SoundCloud</a></li>
      </ul>
      <h3>All Tracks</h3>
      <ol>${tracks.map(t => `<li><a href="/track/${t.slug}">${escapeHtml(t.title)}</a> (${t.duration})</li>`).join('')}</ol>
    </article>
  `;
}

// ---- Generate all pages ----

console.log('🔨 Pre-rendering pages for SEO...\n');

// 1. Track pages
for (const track of tracks) {
  const dir = path.join(distDir, 'track', track.slug);
  fs.mkdirSync(dir, { recursive: true });
  
  const title = `${track.title} — Bad Actors Volume 1 | Don Matthews`;
  const desc = track.story.slice(0, 155) + '…';
  
  const html = generatePage(`/track/${track.slug}`, {
    title,
    description: desc,
    ogType: 'music.song',
    schema: generateTrackSchema(track),
    keywords: `${track.title}, Bad Actors album, Don Matthews, Matthew Reardon, protest music, corruption, Mississippi, documentary music`,
    content: generateTrackContent(track),
  });
  
  fs.writeFileSync(path.join(dir, 'index.html'), html);
  console.log(`  ✅ /track/${track.slug}`);
}

// 2. Tracks index
{
  const dir = path.join(distDir, 'tracks');
  fs.mkdirSync(dir, { recursive: true });
  
  const trackListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Bad Actors Volume 1 — Complete Tracklist",
    "numberOfItems": tracks.length,
    "itemListElement": tracks.map(t => ({
      "@type": "ListItem",
      "position": t.number,
      "url": `${SITE_URL}/track/${t.slug}`,
      "name": t.title
    }))
  };
  
  const content = `
    <article>
      <h1>Bad Actors Volume 1 — All 17 Tracks</h1>
      <p>17 tracks. 17 true stories. Every word backed by evidence. By Don Matthews.</p>
      <ol>${tracks.map(t => `<li><a href="/track/${t.slug}">${escapeHtml(t.title)}</a> — ${t.duration}. ${escapeHtml(t.story.slice(0, 100))}…</li>`).join('')}</ol>
      <p><a href="/">Stream the full album free</a> | <a href="/about">About Don Matthews</a></p>
    </article>
  `;
  
  const html = generatePage('/tracks', {
    title: 'All Tracks — Bad Actors Volume 1 | Don Matthews',
    description: 'Explore all 17 tracks from Bad Actors Volume 1 by Don Matthews. Each song documents real corruption, tells a true story, and demands accountability.',
    ogType: 'music.album',
    schema: trackListSchema,
    keywords: 'Bad Actors tracklist, Bad Actors all tracks, Don Matthews songs, protest music tracklist, corruption music',
    content,
  });
  
  fs.writeFileSync(path.join(dir, 'index.html'), html);
  console.log('  ✅ /tracks');
}

// 3. About page
{
  const dir = path.join(distDir, 'about');
  fs.mkdirSync(dir, { recursive: true });
  
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Don Matthews",
    "alternateName": ["Matthew Reardon"],
    "description": "Investigative journalist, songwriter, civil rights activist, web developer, and founder of We The People News, Bad Actors Music, Civil Rights Hub, and Tyrant Cam.",
    "url": `${SITE_URL}/about`,
    "image": COVER_IMG,
    "jobTitle": ["Investigative Journalist", "Songwriter", "Civil Rights Activist", "Web Developer"],
    "sameAs": [
      "https://www.wtpnews.org/about-matthew-reardon-don-matthews/",
      SITE_URL,
      "https://www.youtube.com/@BadActors",
      "https://www.youtube.com/@WeThePeopleNews",
      "https://www.youtube.com/@PatriotNewsActivism",
      "https://www.instagram.com/badactorsjustice"
    ],
    "worksFor": { "@type": "Organization", "name": "We The People News", "url": "https://www.wtpnews.org" },
    "founder": [
      { "@type": "Organization", "name": "We The People News", "url": "https://www.wtpnews.org" },
      { "@type": "Organization", "name": "Bad Actors Music", "url": SITE_URL },
      { "@type": "Organization", "name": "Civil Rights Hub" },
      { "@type": "Organization", "name": "Tyrant Cam" }
    ],
    "knowsAbout": ["Investigative Journalism", "Civil Rights", "First Amendment", "Surveillance Technology", "Songwriting", "Police Accountability", "Government Corruption"]
  };
  
  const content = `
    <article>
      <h1>About Don Matthews (Matthew Reardon)</h1>
      <p>Investigative Journalist · Songwriter · Civil Rights Activist · Web Developer · Founder</p>
      <p>Matthew Reardon, also known as Don Matthews, is an investigative journalist, songwriter, civil rights activist, web developer, and the founder of We The People News, Civil Rights Hub, Tyrant Cam, and Bad Actors Music. Based in Mississippi, he has dedicated his career to exposing civil rights violations, holding institutions accountable, and amplifying the voices of citizens whose stories go untold by mainstream media.</p>
      <h2>Bad Actors Music</h2>
      <p>The Bad Actors album is a 17-track sonic case file documenting named corruption across North Mississippi and the Southeast. Released September 1, 2025 as a free digital download. <a href="/tracks">Explore all 17 tracks</a>.</p>
      <h2>Founded Projects</h2>
      <ul>
        <li><a href="https://wtpnews.org">We The People News</a> — Independent investigative news platform</li>
        <li><a href="https://badactors.online">Bad Actors Music</a> — 17-track investigative album and dossier</li>
        <li>Civil Rights Hub — Civil rights education and advocacy</li>
        <li>Tyrant Cam — Real-time documentation of government interactions</li>
      </ul>
    </article>
  `;
  
  const html = generatePage('/about', {
    title: 'About Don Matthews (Matthew Reardon) — Investigative Journalist, Songwriter, Activist',
    description: 'Don Matthews, a.k.a. Matthew Reardon: investigative journalist, songwriter, civil rights activist, web developer, and founder of We The People News, Bad Actors Music, Civil Rights Hub, and Tyrant Cam.',
    ogType: 'profile',
    schema: personSchema,
    keywords: 'Don Matthews, Matthew Reardon, investigative journalist, songwriter, civil rights activist, We The People News, Bad Actors, Mississippi',
    content,
  });
  
  fs.writeFileSync(path.join(dir, 'index.html'), html);
  console.log('  ✅ /about');
}

// Count total pages
const totalPages = tracks.length + 3; // tracks + tracks index + about + home
console.log(`\n🎯 Pre-rendered ${totalPages} pages (${tracks.length} track pages + /tracks + /about + /)`);
console.log('📁 Output: dist/');
console.log('🔍 Google will now see real HTML content for every page');
