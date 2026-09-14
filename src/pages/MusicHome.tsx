import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { BookOpen, Download, ExternalLink, Headphones, Music2, Play, Sparkles } from "lucide-react";
import EmailCapture from "@/components/EmailCapture";
import SingleReleasePromo from "@/components/SingleReleasePromo";
import { emailService } from "@/lib/emailService";
import { stories, streamingLinks, tracks } from "@/data/tracks";
import { toast } from "sonner";

const FREE_ALBUM_ZIP = "/bad-actors-volume-1.zip";

const MusicHome = () => {
  const [currentTrack, setCurrentTrack] = useState(1);
  const [isDownloadOpen, setIsDownloadOpen] = useState(false);
  const [downloadReadyUrl, setDownloadReadyUrl] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    emailService.init();
  }, []);

  const playTrack = (trackNumber: number) => {
    setCurrentTrack(trackNumber);
    setIsPlaying(true);
  };

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const raw = searchParams.get("play");
    if (!raw) return;
    const n = Number.parseInt(raw, 10);
    if (!Number.isFinite(n) || n < 1 || n > tracks.length) return;
    playTrack(n);
    requestAnimationFrame(() => {
      document.getElementById("volume-one")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
    const next = new URLSearchParams(searchParams);
    next.delete("play");
    setSearchParams(next, { replace: true });
    // Honor deep link once on mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const storyByTrack = useMemo(() => {
    const map = new Map<number, (typeof stories)[number]>();
    stories.forEach((story) => {
      if (story.trackNumber) map.set(story.trackNumber, story);
    });
    return map;
  }, []);

  const activeTrack = tracks.find((track) => track.number === currentTrack) ?? tracks[0];
  const originStory = stories.find((story) => !story.trackNumber);

  useEffect(() => {
    const el = audioRef.current;
    if (!el || !activeTrack.audioSrc) return;
    if (!isPlaying) {
      el.pause();
      return;
    }
    const attempt = el.play();
    if (attempt) {
      attempt.catch(() => setIsPlaying(false));
    }
  }, [currentTrack, isPlaying, activeTrack.audioSrc]);


  const handleEmailSubmit = async (email: string, name?: string) => {
    const result = await emailService.saveSubscriber(email, name, "music-home-free-album");
    const url = result.downloadUrl || FREE_ALBUM_ZIP;
    setDownloadReadyUrl(url);
    // Volume 1 must stay downloadable even if the subscriber DB / API is down.
    if (!result.success) {
      toast.message("Download ready", {
        description: "Your free album is ready — email signup could not be saved right now.",
      });
      return;
    }
    toast.success("Your Bad Actors Volume 1 download is ready.");
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-police-red selection:text-white">
      <Helmet>
        <title>Bad Actors by Don Matthews | True Stories Turned Into Music</title>
        <meta
          name="description"
          content="Bad Actors is Don Matthews' documentary music project: true stories about power, corruption, retaliation and accountability turned into songs. Download Volume 1 free, read the stories behind all 17 tracks, hear special releases, and follow Volumes 2 and 3."
        />
      </Helmet>

      <header className="border-b border-white/10 bg-black/95 sticky top-0 z-40 backdrop-blur">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between gap-4">
          <a href="#top" className="text-lg sm:text-xl font-semibold tracking-[0.14em]">BAD ACTORS</a>
          <nav className="hidden md:flex items-center gap-7 text-sm text-zinc-300">
            <a href="#volume-one" className="hover:text-white transition-colors">Volume 1</a>
            <a href="#stories" className="hover:text-white transition-colors">Stories</a>
            <a href="#special-releases" className="hover:text-white transition-colors">Special releases</a>
            <a href="#whats-next" className="hover:text-white transition-colors">Volumes 2 & 3</a>
          </nav>
          <button
            onClick={() => setIsDownloadOpen(true)}
            className="inline-flex items-center gap-2 border border-police-red/70 px-4 py-2 text-sm font-semibold hover:bg-police-red/15 transition-colors"
          >
            <Download className="w-4 h-4" />
            Free album
          </button>
        </div>
      </header>

      <main id="top">
        <section className="relative overflow-hidden border-b border-white/10">
          <div className="absolute inset-0">
            <img src="/got-a-dolla.jpg" alt="" className="w-full h-full object-cover object-top opacity-20 grayscale" />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-black/50" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30" />
          </div>

          <div className="container mx-auto px-4 py-16 sm:py-24 lg:py-28 relative z-10">
            <div className="grid lg:grid-cols-[1.15fr_.85fr] gap-12 items-center max-w-7xl mx-auto">
              <div className="max-w-3xl">
                <p className="text-police-red text-sm font-semibold tracking-[0.18em] uppercase mb-5">Don Matthews presents</p>
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-semibold tracking-tight leading-[0.95] mb-7">
                  Bad Actors
                </h1>
                <p className="text-xl sm:text-2xl text-zinc-200 leading-relaxed max-w-2xl mb-6">
                  True stories about power, corruption, retaliation and accountability — turned into songs.
                </p>
                <p className="text-base sm:text-lg text-zinc-400 leading-relaxed max-w-2xl mb-9">
                  This is the music side of Don Matthews' nearly decade-long saga. The records, court fights, encounters, losses and documented battles are the source material; the songs are how the story travels.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => setIsDownloadOpen(true)}
                    className="inline-flex items-center justify-center gap-2 bg-police-red px-6 py-3.5 font-semibold hover:bg-red-700 transition-colors"
                  >
                    <Download className="w-5 h-5" />
                    Download Volume 1 free
                  </button>
                  <a
                    href="#stories"
                    className="inline-flex items-center justify-center gap-2 border border-white/20 px-6 py-3.5 font-medium text-zinc-200 hover:border-white/50 hover:text-white transition-colors"
                  >
                    <BookOpen className="w-5 h-5" />
                    Read the stories behind the songs
                  </a>
                </div>
              </div>

              <div className="max-w-md mx-auto w-full">
                <div className="border border-white/15 bg-zinc-950/85 p-3 shadow-2xl">
                  <img src="/bad-actors-cover.jpg" alt="Bad Actors Volume 1 album cover" className="w-full aspect-square object-cover" />
                </div>
                <div className="mt-5 flex items-center justify-between text-sm text-zinc-400">
                  <span>Volume 1 · 17 tracks</span>
                  <span>Available now</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="volume-one" className="py-16 sm:py-24 border-b border-white/10">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="grid lg:grid-cols-[.8fr_1.2fr] gap-12 lg:gap-16 items-start">
              <div className="lg:sticky lg:top-28">
                <p className="text-police-red text-sm font-semibold uppercase tracking-[0.18em] mb-3">Bad Actors Volume 1</p>
                <h2 className="text-4xl sm:text-5xl font-semibold tracking-tight mb-5">The first chapter is out now.</h2>
                <p className="text-zinc-400 leading-relaxed mb-7">
                  Listen to the album here, open any song's dedicated page, or download the complete Volume 1 release free. Every track is paired with the real-world story that inspired it.
                </p>

                <div className="border border-white/15 bg-zinc-950 p-5 mb-7">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 shrink-0 bg-police-red/15 border border-police-red/40 flex items-center justify-center">
                      <Headphones className="w-5 h-5 text-police-red" />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[0.16em] text-zinc-500 mb-1">Now selected</p>
                      <p className="text-lg font-semibold">{activeTrack.number}. {activeTrack.title}</p>
                      <p className="text-sm text-zinc-500">{activeTrack.duration}</p>
                    </div>
                  </div>
                  {activeTrack.audioSrc ? (
                    <audio
                      ref={audioRef}
                      key={activeTrack.audioSrc}
                      controls
                      preload="metadata"
                      className="w-full"
                      src={activeTrack.audioSrc}
                      onPlay={() => setIsPlaying(true)}
                      onPause={() => setIsPlaying(false)}
                      onEnded={() => {
                        const idx = tracks.findIndex((t) => t.number === currentTrack);
                        if (idx >= 0 && idx < tracks.length - 1) {
                          playTrack(tracks[idx + 1].number);
                        } else {
                          setIsPlaying(false);
                        }
                      }}
                    />
                  ) : (
                    <p className="text-sm text-zinc-500">Audio preview unavailable for this track.</p>
                  )}
                </div>

                <div className="flex flex-wrap gap-2">
                  {streamingLinks.map((link) => (
                    <a
                      key={link.platform}
                      href={link.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 border border-white/15 px-3 py-2 text-sm text-zinc-300 hover:text-white hover:border-white/40 transition-colors"
                    >
                      {link.platform}<ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                {tracks.map((track) => {
                  const story = storyByTrack.get(track.number);
                  const selected = track.number === currentTrack;
                  return (
                    <article
                      key={track.number}
                      className={`border transition-colors ${selected ? "border-police-red/70 bg-police-red/5" : "border-white/10 bg-zinc-950/40 hover:border-white/25"}`}
                    >
                      <div className="flex items-center gap-3 p-4 sm:p-5">
                        <button
                          onClick={() => playTrack(track.number)}
                          className={`w-10 h-10 shrink-0 flex items-center justify-center border ${selected ? "border-police-red bg-police-red text-white" : "border-white/15 text-zinc-400 hover:text-white"}`}
                          aria-label={`Play ${track.title}`}
                        >
                          <Play className="w-4 h-4" fill="currentColor" />
                        </button>
                        <div className="min-w-0 flex-1">
                          <p className="text-xs text-zinc-500 mb-1">Track {track.number}</p>
                          <h3 className="text-lg sm:text-xl font-medium leading-tight">{track.title}</h3>
                        </div>
                        <span className="text-sm font-mono text-zinc-500">{track.duration}</span>
                      </div>
                      <div className="px-4 sm:px-5 pb-4 sm:pb-5 flex flex-wrap gap-3 ml-0 sm:ml-[52px]">
                        <Link to={`/track/${track.slug}`} className="text-sm text-police-red hover:text-red-300 transition-colors">
                          Open song page →
                        </Link>
                        {story && (
                          <a href={`#story-${track.number}`} className="text-sm text-zinc-400 hover:text-white transition-colors">
                            Story behind the song →
                          </a>
                        )}
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section id="stories" className="py-16 sm:py-24 border-b border-white/10 bg-zinc-950/35">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="max-w-3xl mb-12">
              <p className="text-police-red text-sm font-semibold uppercase tracking-[0.18em] mb-3">The stories behind the songs</p>
              <h2 className="text-4xl sm:text-5xl font-semibold tracking-tight mb-5">The music is the entry point. The story is the record.</h2>
              <p className="text-zinc-400 leading-relaxed">
                {originStory?.content.split("\n\n")[0]}
              </p>
            </div>

            <div className="space-y-6">
              {tracks.map((track) => {
                const story = storyByTrack.get(track.number);
                if (!story) return null;
                return (
                  <article
                    id={`story-${track.number}`}
                    key={track.number}
                    className="scroll-mt-28 border border-white/10 border-l-4 border-l-police-red bg-black p-5 sm:p-8"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-6 mb-5">
                      <span className="text-sm font-mono text-police-red w-10 shrink-0 pt-1">{String(track.number).padStart(2, "0")}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs uppercase tracking-[0.16em] text-zinc-500 mb-2">True story behind the song</p>
                        <h3 className="text-xl sm:text-2xl font-semibold leading-tight">{story.title}</h3>
                      </div>
                      <BookOpen className="w-5 h-5 text-police-red shrink-0" />
                    </div>
                    <div className="sm:pl-16 max-w-4xl text-zinc-300 leading-7 whitespace-pre-line">{story.content}</div>
                    <div className="sm:pl-16 mt-6 flex flex-wrap gap-4">
                      <button onClick={() => playTrack(track.number)} className="text-sm font-medium text-police-red hover:text-red-300">
                        Play this track
                      </button>
                      <Link to={`/track/${track.slug}`} className="text-sm text-zinc-400 hover:text-white">
                        Open full song page →
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
        <div id="special-releases">
          <SingleReleasePromo
            trackSlug="happy-fuck-the-cops-day"
            title="Happy Fuck The Cops Day"
            audioSrc="/audio/happy-fuck-the-cops-day.mp3"
            countEndpoint="/api/single-download-count"
            claimEndpoint="/api/single-download"
            checkoutEndpoint="/api/single-checkout"
            checkoutVerifyEndpoint="/api/single-checkout-verify"
            cap={100}
            price="$1.99"
            coverImage="/images/happy-fuck-the-cops-day-cover.jpg"
          />
        </div>


        <section className="py-16 sm:py-24 border-b border-white/10 bg-zinc-950/35">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid lg:grid-cols-[.85fr_1.15fr] gap-12 items-start">
              <div>
                <p className="text-police-red text-sm font-semibold uppercase tracking-[0.18em] mb-3">Nearly a decade in the making</p>
                <h2 className="text-4xl sm:text-5xl font-semibold tracking-tight mb-5">A continuing saga, documented in records and carried by music.</h2>
              </div>
              <div className="space-y-6 text-zinc-300 leading-8">
                <p>
                  Bad Actors grew out of years of lived encounters with police, courts, prosecutors, jails, public agencies and the people caught inside those systems. The music does not replace the underlying record; it gives that record another form.
                </p>
                <p>
                  Some songs are personal. Some follow specific officials, incidents or documents. Others step outside Don Matthews' own story to spotlight people whose experiences fit the same larger pattern. Together, the songs build a serialized documentary account meant to be heard, read and revisited.
                </p>
                <p>
                  Volume 1 is the opening chapter — not the conclusion.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="whats-next" className="py-16 sm:py-24 border-b border-white/10">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="max-w-3xl mb-10">
              <p className="text-police-red text-sm font-semibold uppercase tracking-[0.18em] mb-3">What comes next</p>
              <h2 className="text-4xl sm:text-5xl font-semibold tracking-tight">The catalog is still being written.</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-5">
              <div className="border border-police-red/35 bg-police-red/5 p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-5"><Music2 className="w-5 h-5 text-police-red" /><span className="text-sm text-police-red uppercase tracking-[0.15em] font-semibold">Coming soon</span></div>
                <h3 className="text-3xl font-medium mb-4">Bad Actors Volume 2</h3>
                <p className="text-zinc-400 leading-relaxed">The next full chapter is in production, continuing the same documentary approach with new stories, recordings and accountability targets.</p>
              </div>
              <div className="border border-white/15 bg-zinc-950 p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-5"><Sparkles className="w-5 h-5 text-crime-yellow" /><span className="text-sm text-crime-yellow uppercase tracking-[0.15em] font-semibold">Already underway</span></div>
                <h3 className="text-3xl font-medium mb-4">Bad Actors Volume 3</h3>
                <p className="text-zinc-400 leading-relaxed">Volume 3 is already well in the works, expanding the project beyond a single album cycle into a continuing body of documentary music.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-20">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid lg:grid-cols-[1fr_auto] gap-8 items-center border border-white/15 bg-zinc-950 p-7 sm:p-10">
              <div>
                <p className="text-sm text-zinc-500 uppercase tracking-[0.16em] mb-2">Keep the full project</p>
                <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight mb-3">Download Bad Actors Volume 1 free.</h2>
                <p className="text-zinc-400">Seventeen songs. Seventeen stories. One continuing record of accountability.</p>
              </div>
              <button onClick={() => setIsDownloadOpen(true)} className="inline-flex items-center justify-center gap-2 bg-police-red px-6 py-3.5 font-semibold hover:bg-red-700 transition-colors">
                <Download className="w-5 h-5" /> Free download
              </button>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 py-10 bg-black">
        <div className="container mx-auto px-4 max-w-6xl flex flex-col md:flex-row gap-5 justify-between md:items-center">
          <div>
            <p className="font-semibold tracking-[0.12em]">BAD ACTORS</p>
            <p className="text-sm text-zinc-500 mt-1">Documentary music by Don Matthews.</p>
          </div>
          <div className="flex flex-wrap gap-5 text-sm text-zinc-400">
            <Link to="/tracks" className="hover:text-white">All tracks</Link>
            <Link to="/about" className="hover:text-white">About Don Matthews</Link>
            <a href="https://wtpnews.org" target="_blank" rel="noreferrer" className="hover:text-white">We The People News</a>
          </div>
        </div>
      </footer>

      <EmailCapture
        isOpen={isDownloadOpen}
        onClose={() => {
          setIsDownloadOpen(false);
          setDownloadReadyUrl(null);
        }}
        onSubmit={handleEmailSubmit}
        downloadUrl={downloadReadyUrl ?? undefined}
      />
    </div>
  );
};

export default MusicHome;
