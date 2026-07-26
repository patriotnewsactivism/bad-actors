import { useState, useEffect, useRef, useMemo } from "react";
import { Music, ExternalLink, Download, Play, Pause, Disc3 } from "lucide-react";
import YouTube, { YouTubeEvent, YouTubePlayer } from "react-youtube";

interface StreamingLink {
  platform: string;
  url: string;
}

interface Track {
  number: number;
  title: string;
  duration: string;
  youtubeId?: string;
  audioSrc?: string;
}

interface AlbumHeroProps {
  title: string;
  artist: string;
  releaseDate: string;
  currentTrack: number;
  tracks: Track[];
  youtubePlaylistId?: string;
  streamingLinks: StreamingLink[];
  onDownloadClick: () => void;
  // Playback state now lives in the parent (Index.tsx) so the hero player and
  // the persistent mini player that follows on scroll share one <audio> element.
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
  progress: number;
  onSeek: (ratio: number) => void;
}

const AlbumHero = ({
  title,
  artist,
  releaseDate,
  currentTrack,
  tracks,
  youtubePlaylistId,
  streamingLinks,
  onDownloadClick,
  isPlaying,
  setIsPlaying,
  progress,
  onSeek,
}: AlbumHeroProps) => {
  const [mounted, setMounted] = useState(false);
  const playerRef = useRef<YouTubePlayer | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentTrackData = tracks.find((t) => t.number === currentTrack);
  const hasNativeAudio = Boolean(currentTrackData?.audioSrc);

  // Sync play/pause state with YouTube player (only used when no native audio source exists)
  useEffect(() => {
    if (hasNativeAudio) return;
    if (playerRef.current) {
      if (isPlaying) {
        playerRef.current.playVideo();
      } else {
        playerRef.current.pauseVideo();
      }
    }
  }, [isPlaying, hasNativeAudio]);

  // Handle track changes (YouTube path only)
  useEffect(() => {
    if (hasNativeAudio) return;
    if (playerRef.current) {
      if (currentTrackData?.youtubeId) {
        playerRef.current.loadVideoById(currentTrackData.youtubeId);
      } else if (youtubePlaylistId) {
        playerRef.current.playVideoAt(currentTrack - 1);
      }
    }
  }, [currentTrack, currentTrackData, youtubePlaylistId, hasNativeAudio]);

  const onPlayerReady = (event: YouTubeEvent) => {
    playerRef.current = event.target;
  };

  const onPlayerStateChange = (event: YouTubeEvent) => {
    if (event.data === 1) {
      setIsPlaying(true);
    } else if (event.data === 2) {
      setIsPlaying(false);
    }
  };

  const opts = useMemo(() => ({
    height: '360',
    width: '100%',
    playerVars: {
      autoplay: 0,
      listType: youtubePlaylistId ? 'playlist' : undefined,
      list: youtubePlaylistId,
      modestbranding: 1,
      rel: 0,
    },
  }), [youtubePlaylistId]);

  const formatTime = (seconds: number) => {
    if (!Number.isFinite(seconds)) return "0:00";
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-black">
      {/* --- CINEMATIC BACKGROUND WITH IMAGE --- */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <img 
          src="/got-a-dolla.jpg" 
          alt="Don Matthews Background" 
          className="w-full h-full object-cover object-top opacity-30 mix-blend-luminosity"
        />
        {/* Dark gradients to ensure buttons and text pop and remain readable */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-black lg:via-black/50 to-black" />
        
        {/* Red Accent Lines */}
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-police-red/30" />
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-police-red/30" />
        <div className="absolute top-8 left-0 right-0 h-0.25 bg-police-red/20" />
        <div className="absolute bottom-8 left-0 right-0 h-0.25 bg-police-red/20" />
      </div>

      <div className="absolute top-1/4 left-1/4 w-56 h-56 md:w-96 md:h-96 bg-police-red/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-48 h-48 md:w-80 md:h-80 bg-crime-yellow/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10 py-10 md:py-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className={`space-y-6 md:space-y-8 ${mounted ? 'animate-fade-in' : 'opacity-0'}`}>
              <div className="relative mx-auto lg:mx-0 w-60 h-60 sm:w-72 sm:h-72 md:w-80 md:h-80">
                <div className="absolute inset-0 bg-gradient-to-br from-police-red/20 to-crime-yellow/10 rounded-sm blur-xl" />
                <div className="relative w-full h-full bg-black rounded-sm overflow-hidden border border-police-red/50 shadow-[0_0_30px_hsl(var(--police-red)/0.2)]">
                  <img
                    src="/bad-actors-cover.jpg"
                    alt="Bad Actors Album Cover"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                </div>
                <div className="absolute -bottom-3 -right-3 md:-bottom-4 md:-right-4 p-2.5 md:p-3 bg-black border border-police-red/50">
                  <Disc3 className="w-5 h-5 md:w-6 md:h-6 text-police-red" />
                </div>
              </div>

              <div className="text-center lg:text-left space-y-4 md:space-y-6">
                <div className="flex items-center justify-center lg:justify-start gap-3">
                  <span className="text-police-red font-semibold text-sm uppercase tracking-wider">Now Playing</span>
                </div>

                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
                  <span className="text-foreground">
                    {title}
                  </span>
                </h1>

                <p className="text-police-red text-base sm:text-lg font-semibold uppercase tracking-wider">
                  Truth | Justice | Accountability
                </p>

                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 sm:gap-3 text-base sm:text-lg">
                  <span className="font-semibold text-foreground">{artist}</span>
                  <span className="text-police-red/50">|</span>
                  <span className="text-muted-foreground">{releaseDate}</span>
                </div>

                {currentTrackData && (
                  <div className="p-3 md:p-4 bg-black/80 border border-police-red/50 inline-block mx-auto lg:mx-0 max-w-full w-full sm:w-auto">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="p-2 bg-police-red/20 shrink-0">
                        <span className="text-white font-bold text-base sm:text-lg">{currentTrackData.number}</span>
                      </div>
                      <div className="text-left min-w-0 flex-1">
                        <p className="text-foreground font-semibold text-base sm:text-lg leading-tight break-words">{currentTrackData.title}</p>
                        <p className="text-muted-foreground text-sm">{currentTrackData.duration}</p>
                      </div>
                      <button
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="ml-1 sm:ml-3 p-2 bg-police-red/20 text-white hover:bg-police-red/30 transition-colors shrink-0"
                      >
                        {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                      </button>
                    </div>
                    {hasNativeAudio && (
                      <div
                        className="mt-3 h-1.5 bg-white/10 cursor-pointer relative"
                        onClick={(e) => {
                          const rect = e.currentTarget.getBoundingClientRect();
                          onSeek((e.clientX - rect.left) / rect.width);
                        }}
                      >
                        <div
                          className="h-full bg-police-red transition-[width] duration-150"
                          style={{ width: `${progress * 100}%` }}
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 sm:flex sm:flex-wrap gap-3 justify-center lg:justify-start">
                <button
                  onClick={onDownloadClick}
                  className="w-full sm:w-auto justify-center flex items-center gap-2 px-6 py-3 bg-police-red/20 text-white font-semibold uppercase tracking-wide hover:bg-police-red/30 transition-all duration-300 border border-police-red/50"
                >
                  <Download className="w-5 h-5" />
                  Free Download
                </button>
                {/* DIGITAL BUSINESS CARD BUTTON */}
                <a
                  href="https://popl.co/card/MigDFcPV/2/preview?sho"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto justify-center flex items-center gap-2 px-5 py-3 bg-crime-yellow text-black font-bold uppercase tracking-wide hover:bg-crime-yellow/80 transition-all duration-300 border border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                >
                  Digital Business Card
                  <ExternalLink className="w-4 h-4" />
                </a>
                {streamingLinks.map((link) => (
                  <a
                    key={link.platform}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto justify-center flex items-center gap-2 px-5 py-3 bg-black border border-police-red/50 text-foreground font-semibold uppercase tracking-wide hover:bg-police-red/10 hover:text-white transition-all duration-300"
                  >
                    {link.platform}
                    <ExternalLink className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>

            <div className={`${mounted ? 'animate-fade-in' : 'opacity-0'}`} style={{ animationDelay: '0.2s' }}>
              <div className="relative">
                <div className="relative bg-black border border-police-red/50 overflow-hidden shadow-[0_0_30px_hsl(var(--police-red)/0.2)]">
                  {hasNativeAudio ? (
                    <div className="w-full h-[220px] sm:h-[300px] md:h-[360px] lg:h-[400px] flex flex-col items-center justify-center bg-black border border-police-red/50 gap-6 p-6">
                      <img
                        src="/bad-actors-cover.jpg"
                        alt="Bad Actors Album Cover"
                        className="w-28 h-28 sm:w-36 sm:h-36 object-cover border border-police-red/50"
                      />
                      <button
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="w-16 h-16 rounded-full bg-police-red/20 border-2 border-police-red text-white flex items-center justify-center hover:bg-police-red/30 transition-colors"
                        aria-label={isPlaying ? "Pause" : "Play"}
                      >
                        {isPlaying ? <Pause className="w-7 h-7" /> : <Play className="w-7 h-7 ml-1" />}
                      </button>
                      <div className="w-full max-w-sm">
                        <div
                          className="h-1.5 bg-white/10 cursor-pointer relative"
                          onClick={(e) => {
                            const rect = e.currentTarget.getBoundingClientRect();
                            onSeek((e.clientX - rect.left) / rect.width);
                          }}
                        >
                          <div
                            className="h-full bg-police-red transition-[width] duration-150"
                            style={{ width: `${progress * 100}%` }}
                          />
                        </div>
                        <div className="flex justify-between mt-1 text-xs text-muted-foreground font-mono">
                          <span>{currentTrackData?.duration}</span>
                        </div>
                      </div>
                    </div>
                  ) : youtubePlaylistId || currentTrackData?.youtubeId ? (
                    <YouTube
                      videoId={currentTrackData?.youtubeId}
                      opts={opts}
                      onReady={onPlayerReady}
                      onStateChange={onPlayerStateChange}
                      className="w-full"
                      iframeClassName="w-full h-[220px] sm:h-[300px] md:h-[360px] lg:h-[400px]"
                    />
                  ) : (
                    <div className="w-full h-[220px] sm:h-[300px] md:h-[360px] lg:h-[400px] flex items-center justify-center bg-black border border-police-red/50">
                      <div className="text-center space-y-4">
                        <Music className="w-16 h-16 text-police-red/50 mx-auto" />
                        <p className="text-muted-foreground font-semibold uppercase tracking-wide">
                          Player Unavailable
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-4 p-3 bg-black border border-police-red/30">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-police-red/50" />
                      <span className="text-police-red font-semibold text-sm uppercase tracking-wide">
                        {tracks.length} Tracks
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Music className="w-4 h-4 text-police-red/50" />
                      <span className="text-muted-foreground text-sm uppercase tracking-wide">
                        Select track below
                      </span>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-xs text-center">
                    Click any track below to play it right here — no redirect.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 md:mt-12 text-center animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <p className="text-police-red font-semibold text-base sm:text-lg uppercase tracking-wider mb-2">
              Available Now On All Major Platforms
            </p>
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
              Spotify • Apple Music • YouTube Music • BandLab • SoundCloud • and more
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AlbumHero;
