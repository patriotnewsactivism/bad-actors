import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Music, Home, Play, BookOpen } from "lucide-react";
import { tracks, stories } from "@/data/tracks";

const TracksIndex = () => {
  const pageTitle = "All Tracks — Bad Actors Volume 1 | Don Matthews";
  const pageDescription = "Explore all 17 tracks from Bad Actors Volume 1 by Don Matthews. Each song documents real corruption, tells a true story, and demands accountability. Stream free.";

  const trackListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Bad Actors Volume 1 — Complete Tracklist",
    "description": pageDescription,
    "numberOfItems": tracks.length,
    "itemListElement": tracks.map((track) => ({
      "@type": "ListItem",
      "position": track.number,
      "url": `https://badactors.online/track/${track.slug}`,
      "name": track.title,
      "item": {
        "@type": "MusicRecording",
        "name": track.title,
        "url": `https://badactors.online/track/${track.slug}`,
        "duration": track.durationISO,
        "inAlbum": {
          "@type": "MusicAlbum",
          "name": "Bad Actors Volume 1",
          "url": "https://badactors.online/"
        },
        "byArtist": {
          "@type": "Person",
          "name": "Don Matthews"
        }
      }
    }))
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-police-red selection:text-white">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <link rel="canonical" href="https://badactors.online/tracks" />
        <meta name="keywords" content="Bad Actors tracklist, Bad Actors album tracks, Don Matthews songs, protest music, corruption music, Mississippi, evidence album" />

        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:type" content="music.album" />
        <meta property="og:url" content="https://badactors.online/tracks" />
        <meta property="og:image" content="https://badactors.online/bad-actors-cover.avif" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />

        <script type="application/ld+json">{JSON.stringify(trackListSchema)}</script>
      </Helmet>

      {/* Nav */}
      <nav className="bg-zinc-950 border-b-2 border-police-red/30 py-4 px-4 sticky top-0 z-50">
        <div className="container mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-white hover:text-police-red transition-colors">
            <Home className="w-5 h-5" />
            <span className="font-black tracking-tighter text-lg">BAD ACTORS</span>
          </Link>
          <span className="text-zinc-500 text-sm font-mono">{tracks.length} Tracks</span>
        </div>
      </nav>

      {/* Header */}
      <header className="py-16 sm:py-24 bg-gradient-to-b from-police-red/10 to-black">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tighter text-white mb-4 uppercase italic">
            The <span className="text-police-red">Evidence</span>
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            17 tracks. 17 true stories. Every word backed by evidence and documentation. Explore the full dossier of <strong className="text-white">Bad Actors Volume 1</strong> by Don Matthews.
          </p>
        </div>
      </header>

      {/* Track Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-3">
            {tracks.map((track) => {
              const story = stories.find(s => s.trackNumber === track.number);
              return (
                <Link
                  key={track.number}
                  to={`/track/${track.slug}`}
                  className="group block bg-zinc-950 border-l-4 border-police-red/50 hover:border-police-red p-5 sm:p-6 hover:bg-zinc-900 transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    {/* Track Number */}
                    <div className="flex-shrink-0 w-12 h-12 bg-police-red/10 flex items-center justify-center group-hover:bg-police-red transition-colors">
                      <span className="font-black text-police-red group-hover:text-white transition-colors">
                        {String(track.number).padStart(2, "0")}
                      </span>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-4 mb-2">
                        <h2 className="text-xl sm:text-2xl font-black text-white group-hover:text-police-red transition-colors tracking-tight truncate">
                          {track.title}
                        </h2>
                        <span className="text-zinc-600 font-mono text-sm flex-shrink-0">{track.duration}</span>
                      </div>
                      {story && (
                        <p className="text-zinc-500 text-sm line-clamp-2 leading-relaxed">
                          {story.content.split("\n")[0].slice(0, 200)}…
                        </p>
                      )}
                      <div className="flex items-center gap-4 mt-3">
                        <span className="text-police-red text-xs font-bold uppercase flex items-center gap-1">
                          <Play className="w-3 h-3" /> Listen
                        </span>
                        {story && (
                          <span className="text-crime-yellow text-xs font-bold uppercase flex items-center gap-1">
                            <BookOpen className="w-3 h-3" /> Read Story
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-12 border-t-4 border-police-red bg-zinc-950">
        <div className="container mx-auto px-4 text-center">
          <Link
            to="/"
            className="inline-block bg-police-red text-white px-8 py-4 font-black uppercase tracking-wider hover:bg-red-700 transition-colors"
          >
            ← Stream the Full Album Free
          </Link>
        </div>
      </section>
    </div>
  );
};

export default TracksIndex;
