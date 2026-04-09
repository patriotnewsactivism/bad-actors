import { useParams, Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Play, ArrowLeft, ArrowRight, Music, ExternalLink, Home } from "lucide-react";
import { tracks, stories, streamingLinks, getTrackBySlug, getStoryByTrackNumber } from "@/data/tracks";

const TrackPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const track = getTrackBySlug(slug || "");

  if (!track) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-black mb-4">Track Not Found</h1>
          <Link to="/" className="text-police-red hover:underline">← Back to Album</Link>
        </div>
      </div>
    );
  }

  const story = getStoryByTrackNumber(track.number);
  const prevTrack = tracks.find(t => t.number === track.number - 1);
  const nextTrack = tracks.find(t => t.number === track.number + 1);

  const pageTitle = `${track.title} — Bad Actors Volume 1 | Don Matthews`;
  const pageDescription = story
    ? story.content.slice(0, 155).replace(/\n/g, " ").trim() + "…"
    : `Listen to "${track.title}" from Bad Actors Volume 1 by Don Matthews. Track ${track.number} of 17 — evidence-based protest music exposing corruption in North Mississippi.`;
  const canonicalUrl = `https://badactors.online/track/${track.slug}`;

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "MusicRecording",
    "name": track.title,
    "url": canonicalUrl,
    "duration": track.durationISO,
    "position": track.number,
    "inAlbum": {
      "@type": "MusicAlbum",
      "name": "Bad Actors Volume 1",
      "url": "https://badactors.online/",
      "image": "https://badactors.online/bad-actors-cover.avif",
      "numTracks": 17,
      "datePublished": "2025-09-01",
      "byArtist": {
        "@type": "Person",
        "name": "Don Matthews",
        "alternateName": "Matthew Reardon",
        "url": "https://badactors.online/about",
        "sameAs": [
          "https://www.wtpnews.org/about-matthew-reardon-don-matthews/",
          "https://www.youtube.com/@BadActors",
          "https://www.instagram.com/badactorsjustice"
        ]
      }
    },
    "byArtist": {
      "@type": "Person",
      "name": "Don Matthews",
      "alternateName": "Matthew Reardon"
    },
    "genre": ["Hip hop", "Protest music", "Documentary storytelling"],
    "description": story?.content?.slice(0, 300) || pageDescription,
    "isAccessibleForFree": true
  };

  // BreadcrumbList schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Bad Actors",
        "item": "https://badactors.online/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Tracks",
        "item": "https://badactors.online/tracks"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": track.title,
        "item": canonicalUrl
      }
    ]
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-police-red selection:text-white">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <link rel="canonical" href={canonicalUrl} />
        <meta name="keywords" content={`${track.title}, Bad Actors album, Don Matthews, Matthew Reardon, protest music, corruption, Mississippi, documentary music, accountability`} />

        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:type" content="music.song" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content="https://badactors.online/bad-actors-cover.avif" />
        <meta property="og:site_name" content="Bad Actors" />
        <meta property="music:musician" content="https://badactors.online/about" />
        <meta property="music:album" content="https://badactors.online/" />
        <meta property="music:album:track" content={String(track.number)} />
        <meta property="music:duration" content={String(convertDurationToSeconds(track.duration))} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content="https://badactors.online/bad-actors-cover.avif" />

        <script type="application/ld+json">{JSON.stringify(schemaData)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      {/* Navigation Bar */}
      <nav className="bg-zinc-950 border-b-2 border-police-red/30 py-4 px-4 sticky top-0 z-50">
        <div className="container mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-white hover:text-police-red transition-colors group">
            <Home className="w-5 h-5" />
            <span className="font-black tracking-tighter text-lg">BAD ACTORS</span>
          </Link>
          <div className="flex items-center gap-4">
            {prevTrack && (
              <Link to={`/track/${prevTrack.slug}`} className="flex items-center gap-1 text-zinc-400 hover:text-white transition-colors text-sm">
                <ArrowLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Prev</span>
              </Link>
            )}
            <span className="text-police-red font-bold text-sm">
              Track {track.number} / 17
            </span>
            {nextTrack && (
              <Link to={`/track/${nextTrack.slug}`} className="flex items-center gap-1 text-zinc-400 hover:text-white transition-colors text-sm">
                <span className="hidden sm:inline">Next</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative py-16 sm:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-police-red/10 via-black to-black" />
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-police-red/5 rounded-full blur-[120px]" />

        <div className="container mx-auto px-4 relative z-10">
          {/* Breadcrumb */}
          <nav className="mb-8 text-sm" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-zinc-500">
              <li><Link to="/" className="hover:text-white transition-colors">Bad Actors</Link></li>
              <li>/</li>
              <li><Link to="/tracks" className="hover:text-white transition-colors">Tracks</Link></li>
              <li>/</li>
              <li className="text-police-red font-bold">{track.title}</li>
            </ol>
          </nav>

          <div className="grid lg:grid-cols-3 gap-8 lg:gap-16 items-start">
            {/* Album Art */}
            <div className="lg:col-span-1">
              <div className="relative group max-w-sm mx-auto lg:mx-0">
                <div className="absolute -inset-1 bg-gradient-to-r from-police-red to-crime-yellow/50 rounded-sm blur opacity-25 group-hover:opacity-50 transition" />
                <div className="relative bg-black border-2 border-police-red/50 overflow-hidden">
                  <img
                    src="/bad-actors-cover.jpg"
                    alt={`Bad Actors Volume 1 album cover — ${track.title}`}
                    className="w-full h-auto"
                    width={500}
                    height={500}
                    loading="eager"
                  />
                </div>
                <div className="absolute -top-3 -left-3 w-10 h-10 border-t-4 border-l-4 border-police-red" />
                <div className="absolute -bottom-3 -right-3 w-10 h-10 border-b-4 border-r-4 border-police-red" />
              </div>
            </div>

            {/* Track Info */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-police-red text-white px-3 py-1 font-black text-sm uppercase tracking-wider">
                  Track {track.number}
                </div>
                <span className="text-zinc-500 font-mono text-sm">{track.duration}</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter text-white mb-6 leading-tight">
                {track.title}
              </h1>

              <p className="text-xl text-zinc-400 mb-2">
                from <Link to="/" className="text-police-red hover:underline font-bold">Bad Actors Volume 1</Link>
              </p>
              <p className="text-lg text-zinc-500 mb-8">
                by <Link to="/about" className="text-white hover:text-police-red transition-colors font-bold">Don Matthews</Link>
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4">
                <Link
                  to={`/?play=${track.number}`}
                  className="flex items-center gap-2 bg-police-red text-white px-6 py-3 font-black uppercase tracking-wider hover:bg-red-700 transition-colors"
                >
                  <Play className="w-5 h-5" fill="white" />
                  Play Track
                </Link>
                <a
                  href={streamingLinks[0]?.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 border-2 border-white/20 text-white px-6 py-3 font-bold hover:border-police-red hover:text-police-red transition-colors"
                >
                  <ExternalLink className="w-5 h-5" />
                  Stream on Apple Music
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Story Section */}
      {story && (
        <section className="py-16 bg-zinc-950 border-t border-zinc-800">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl sm:text-4xl font-black text-police-red mb-8 uppercase tracking-tighter italic">
                The Story Behind the Track
              </h2>
              <div className="prose prose-invert prose-lg max-w-none">
                {story.content.split("\n\n").map((paragraph, i) => (
                  <p key={i} className="text-zinc-300 leading-relaxed text-lg mb-6">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Streaming Platforms */}
      <section className="py-16 bg-black border-t border-zinc-800">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-black text-white mb-8 uppercase tracking-tighter">
              Stream "{track.title}"
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {streamingLinks.map((link) => (
                <a
                  key={link.platform}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 bg-zinc-900 border border-white/10 hover:border-police-red transition-all group"
                >
                  <span className="font-bold group-hover:text-police-red transition-colors">{link.platform}</span>
                  <div className="w-8 h-8 rounded-full bg-police-red/10 flex items-center justify-center group-hover:bg-police-red transition-all">
                    <span className="text-police-red group-hover:text-white">→</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Track Navigation */}
      <section className="py-12 bg-zinc-950 border-t border-zinc-800">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-xl font-black text-zinc-400 mb-6 uppercase tracking-tighter">
              More from Bad Actors Volume 1
            </h2>
            <div className="grid gap-2">
              {tracks.map((t) => (
                <Link
                  key={t.number}
                  to={`/track/${t.slug}`}
                  className={`flex items-center gap-4 p-3 transition-all ${
                    t.number === track.number
                      ? "bg-police-red/20 border-l-4 border-police-red"
                      : "hover:bg-zinc-900 border-l-4 border-transparent"
                  }`}
                >
                  <span className={`font-mono text-sm w-6 text-right ${
                    t.number === track.number ? "text-police-red font-bold" : "text-zinc-600"
                  }`}>
                    {t.number}
                  </span>
                  <span className={`font-bold flex-1 ${
                    t.number === track.number ? "text-white" : "text-zinc-400"
                  }`}>
                    {t.title}
                  </span>
                  <span className="text-zinc-600 text-sm font-mono">{t.duration}</span>
                  {t.number === track.number && (
                    <Music className="w-4 h-4 text-police-red animate-pulse" />
                  )}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="py-16 bg-black border-t-4 border-police-red">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-black text-white mb-4 tracking-tighter">
            The Full Dossier
          </h2>
          <p className="text-zinc-400 max-w-lg mx-auto mb-8">
            17 tracks. 17 true stories. Every word backed by evidence. Stream the full album free.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/"
              className="bg-police-red text-white px-8 py-4 font-black uppercase tracking-wider hover:bg-red-700 transition-colors"
            >
              Listen to Full Album
            </Link>
            <a
              href="https://wtpnews.org"
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-white/20 text-white px-8 py-4 font-bold hover:border-police-red transition-colors"
            >
              Read the Investigations →
            </a>
          </div>
          <p className="text-zinc-600 text-sm mt-8 font-mono">
            © 2025 Don Matthews. All rights reserved. Truth. Justice. Accountability.
          </p>
        </div>
      </section>
    </div>
  );
};

function convertDurationToSeconds(duration: string): number {
  const [min, sec] = duration.split(":").map(Number);
  return min * 60 + sec;
}

export default TrackPage;
