import { useState, useEffect } from "react";
import { Music, ExternalLink, Download, Play, Pause, Disc3 } from "lucide-react";

interface StreamingLink {
  platform: string;
  url: string;
}

interface Track {
  number: number;
  title: string;
  duration: string;
  youtubeId?: string;
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
}

const FloatingParticle = ({ delay, size, left, duration }: { delay: number; size: number; left: string; duration: number }) => (
  <div
    className="absolute rounded-full bg-police-red/30 animate-float"
    style={{
      width: size,
      height: size,
      left,
      animationDelay: `${delay}s`,
      animationDuration: `${duration}s`,
    }}
  />
);

const AudioVisualizer = () => (
  <div className="flex items-end gap-1 h-8">
    {[...Array(5)].map((_, i) => (
      <div
        key={i}
        className="w-1 bg-crime-yellow animate-pulse"
        style={{
          height: `${Math.random() * 100}%`,
          animationDelay: `${i * 0.1}s`,
          animationDuration: '0.5s',
        }}
      />
    ))}
  </div>
);

const AlbumHero = ({
  title,
  artist,
  releaseDate,
  currentTrack,
  tracks,
  youtubePlaylistId,
  streamingLinks,
  onDownloadClick,
}: AlbumHeroProps) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentTrackData = tracks.find((t) => t.number === currentTrack);

  const getYouTubeEmbedUrl = () => {
    if (currentTrackData?.youtubeId) {
      return `https://www.youtube.com/embed/${currentTrackData.youtubeId}?autoplay=1&rel=0`;
    }
    if (youtubePlaylistId) {
      return `https://www.youtube.com/embed/videoseries?list=${youtubePlaylistId}&index=${currentTrack - 1}&autoplay=1`;
    }
    return null;
  };

  const embedUrl = getYouTubeEmbedUrl();
  const embedKey = currentTrackData?.youtubeId
    ? `video-${currentTrackData.youtubeId}`
    : `playlist-${currentTrack}`;

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-black">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 right-0 h-1 bg-crime-yellow" />
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-crime-yellow" />
        <div className="absolute top-8 left-0 right-0 h-0.5 bg-police-red/60" />
        <div className="absolute bottom-8 left-0 right-0 h-0.5 bg-police-red/60" />
      </div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <FloatingParticle
            key={i}
            delay={i * 0.5}
            size={Math.random() * 6 + 2}
            left={`${Math.random() * 100}%`}
            duration={Math.random() * 4 + 3}
          />
        ))}
      </div>

      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-police-red/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-crime-yellow/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

      <div className="container mx-auto px-4 relative z-10 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className={`space-y-6 ${mounted ? 'animate-fade-in' : 'opacity-0'}`}>
              <div className="relative mx-auto lg:mx-0 w-72 h-72 md:w-80 md:h-80">
                <div className="absolute inset-0 bg-gradient-to-br from-police-red/50 to-crime-yellow/50 rounded-sm blur-xl animate-pulse" />
                <div className="absolute inset-0 rounded-sm animate-spin-slow">
                  <div className="absolute inset-0 rounded-sm border-2 border-police-red" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }} />
                </div>
                <div className="absolute -inset-1 rounded-sm">
                  <div className="w-full h-full rounded-sm border-2 border-police-red animate-border-glow" />
                </div>
                <div className="relative w-full h-full bg-black rounded-sm overflow-hidden border-2 border-crime-yellow/50 shadow-[0_0_60px_hsl(var(--police-red)/0.4)]">
                  <img
                    src="/bad-actors-cover.avif"
                    alt="Bad Actors Album Cover"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                </div>
                <div className="absolute -bottom-4 -right-4 p-3 bg-black border-2 border-crime-yellow shadow-[0_0_20px_hsl(var(--crime-yellow)/0.3)]">
                  <Disc3 className="w-6 h-6 text-crime-yellow animate-spin" style={{ animationDuration: '3s' }} />
                </div>
              </div>

              <div className="text-center lg:text-left space-y-4">
                <div className="flex items-center justify-center lg:justify-start gap-3">
                  <AudioVisualizer />
                  <span className="text-crime-yellow font-bold text-sm uppercase tracking-widest">Now Playing</span>
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight">
                  <span className="text-police-red drop-shadow-[0_0_20px_hsl(var(--police-red)/0.5)]">
                    {title}
                  </span>
                </h1>

                <p className="text-crime-yellow text-xl font-bold uppercase tracking-widest">
                  Truth | Justice | Accountability
                </p>

                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 text-lg">
                  <span className="font-bold text-foreground">{artist}</span>
                  <span className="text-police-red">|</span>
                  <span className="text-muted-foreground">{releaseDate}</span>
                </div>

                {currentTrackData && (
                  <div className="p-4 bg-black/80 border-2 border-police-red inline-block mx-auto lg:mx-0">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-police-red">
                        <span className="text-white font-black text-lg">{currentTrackData.number}</span>
                      </div>
                      <div className="text-left">
                        <p className="text-foreground font-bold text-lg">{currentTrackData.title}</p>
                        <p className="text-muted-foreground text-sm">{currentTrackData.duration}</p>
                      </div>
                      <button
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="ml-4 p-2 bg-crime-yellow text-black hover:bg-crime-yellow/80 transition-colors"
                      >
                        {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                <button
                  onClick={onDownloadClick}
                  className="flex items-center gap-2 px-6 py-3 bg-crime-yellow text-black font-bold uppercase tracking-wide hover:bg-crime-yellow/90 transition-all duration-300 border-2 border-crime-yellow shadow-[0_0_20px_hsl(var(--crime-yellow)/0.3)] hover:shadow-[0_0_30px_hsl(var(--crime-yellow)/0.5)]"
                >
                  <Download className="w-5 h-5" />
                  Free Download
                </button>
                {streamingLinks.slice(0, 2).map((link) => (
                  <a
                    key={link.platform}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-5 py-3 bg-black border-2 border-police-red text-foreground font-bold uppercase tracking-wide hover:bg-police-red hover:text-white transition-all duration-300"
                  >
                    {link.platform}
                    <ExternalLink className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>

            <div className={`${mounted ? 'animate-fade-in' : 'opacity-0'}`} style={{ animationDelay: '0.2s' }}>
              <div className="relative">
                <div className="absolute -inset-2 bg-gradient-to-r from-police-red via-crime-yellow to-police-red rounded-sm opacity-75 blur-sm animate-gradient-x" />
                <div className="absolute -inset-1 bg-gradient-to-r from-police-red via-crime-yellow to-police-red rounded-sm opacity-50 animate-pulse" />

                <div className="relative bg-black border-2 border-police-red overflow-hidden shadow-[0_0_60px_hsl(var(--police-red)/0.4)]">
                  {embedUrl ? (
                    <iframe
                      key={embedKey}
                      width="100%"
                      height="400"
                      src={embedUrl}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full"
                      title={`${title} - Track ${currentTrack}`}
                    />
                  ) : (
                    <div className="w-full h-[400px] flex items-center justify-center bg-black border-2 border-police-red">
                      <div className="text-center space-y-4">
                        <Music className="w-16 h-16 text-police-red mx-auto animate-pulse" />
                        <p className="text-muted-foreground font-bold uppercase tracking-wide">
                          Player Unavailable
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-4 flex items-center justify-between p-3 bg-black border-2 border-crime-yellow/50">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-crime-yellow animate-pulse" />
                    <span className="text-crime-yellow font-bold text-sm uppercase tracking-wide">
                      {tracks.length} Tracks
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Music className="w-4 h-4 text-police-red" />
                    <span className="text-muted-foreground text-sm uppercase tracking-wide">
                      Select track below
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <p className="text-crime-yellow font-bold text-lg uppercase tracking-widest mb-2">
              Available Now On All Major Platforms
            </p>
            <p className="text-muted-foreground">
              Spotify • Apple Music • YouTube Music • Amazon Music • Tidal • Deezer • and more
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); opacity: 0.3; }
          50% { transform: translateY(-100px) translateX(20px); opacity: 0.6; }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes border-glow {
          0%, 100% { box-shadow: 0 0 20px hsl(var(--police-red) / 0.5); }
          50% { box-shadow: 0 0 40px hsl(var(--crime-yellow) / 0.5); }
        }
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-float { animation: float ease-in-out infinite; }
        .animate-spin-slow { animation: spin-slow 20s linear infinite; }
        .animate-border-glow { animation: border-glow 2s ease-in-out infinite; }
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 3s ease infinite;
        }
      `}</style>
    </section>
  );
};

export default AlbumHero;
