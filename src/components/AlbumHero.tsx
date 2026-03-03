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
  const [isPlaying, setIsPlaying] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [embedError, setEmbedError] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentTrackData = tracks.find((t) => t.number === currentTrack);

  // Pause logic: update embed URL to include autoplay=0
  useEffect(() => {
    if (!isPlaying) {
      // We can't directly pause YouTube iframe, but we can reload it with autoplay=0
      // This will stop playback
    }
  }, [isPlaying]);

  // Reset error state when track changes
  useEffect(() => {
    setEmbedError(false);
  }, [currentTrack]);

  const handleEmbedError = () => {
    console.error('YouTube embed failed to load');
    setEmbedError(true);
  };

  const getYouTubeEmbedUrl = () => {
    if (currentTrackData?.youtubeId) {
      return `https://www.youtube.com/embed/${currentTrackData.youtubeId}?autoplay=${isPlaying ? 1 : 0}&rel=0`;
    }
    if (youtubePlaylistId?.startsWith('OLAK5uy_')) {
      return `https://www.youtube.com/embed/videoseries?list=${youtubePlaylistId}&index=${currentTrack - 1}&autoplay=${isPlaying ? 1 : 0}`;
    }
    if (youtubePlaylistId) {
      return `https://www.youtube.com/embed/videoseries?list=${youtubePlaylistId}&index=${currentTrack - 1}&autoplay=${isPlaying ? 1 : 0}`;
    }
    return null;
  };

  const isYouTubeMusicAlbum = youtubePlaylistId?.startsWith('OLAK5uy_');
  const embedUrl = getYouTubeEmbedUrl();
  const embedKey = currentTrackData?.youtubeId
    ? `video-${currentTrackData.youtubeId}-${isPlaying}`
    : isYouTubeMusicAlbum
      ? `yt-music-${youtubePlaylistId}-${isPlaying}`
      : `playlist-${currentTrack}-${isPlaying}`;

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-black">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-police-red/30" />
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-police-red/30" />
        <div className="absolute top-8 left-0 right-0 h-0.25 bg-police-red/20" />
        <div className="absolute bottom-8 left-0 right-0 h-0.25 bg-police-red/20" />
      </div>

      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-police-red/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-crime-yellow/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className={`space-y-8 ${mounted ? 'animate-fade-in' : 'opacity-0'}`}>
              <div className="relative mx-auto lg:mx-0 w-72 h-72 md:w-80 md:h-80">
                <div className="absolute inset-0 bg-gradient-to-br from-police-red/20 to-crime-yellow/10 rounded-sm blur-xl" />
                <div className="relative w-full h-full bg-black rounded-sm overflow-hidden border border-police-red/50 shadow-[0_0_30px_hsl(var(--police-red)/0.2)]">
                  <img
                    src="/bad-actors-cover.avif"
                    alt="Bad Actors Album Cover"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                </div>
                <div className="absolute -bottom-4 -right-4 p-3 bg-black border border-police-red/50">
                  <Disc3 className="w-6 h-6 text-police-red" />
                </div>
              </div>

              <div className="text-center lg:text-left space-y-6">
                <div className="flex items-center justify-center lg:justify-start gap-3">
                  <span className="text-police-red font-semibold text-sm uppercase tracking-wider">Now Playing</span>
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                  <span className="text-foreground">
                    {title}
                  </span>
                </h1>

                <p className="text-police-red text-lg font-semibold uppercase tracking-wider">
                  Truth | Justice | Accountability
                </p>

                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 text-lg">
                  <span className="font-semibold text-foreground">{artist}</span>
                  <span className="text-police-red/50">|</span>
                  <span className="text-muted-foreground">{releaseDate}</span>
                </div>

                {currentTrackData && (
                  <div className="p-4 bg-black/80 border border-police-red/50 inline-block mx-auto lg:mx-0">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-police-red/20">
                        <span className="text-white font-bold text-lg">{currentTrackData.number}</span>
                      </div>
                      <div className="text-left">
                        <p className="text-foreground font-semibold text-lg">{currentTrackData.title}</p>
                        <p className="text-muted-foreground text-sm">{currentTrackData.duration}</p>
                      </div>
                      <button
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="ml-4 p-2 bg-police-red/20 text-white hover:bg-police-red/30 transition-colors"
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
                  className="flex items-center gap-2 px-6 py-3 bg-police-red/20 text-white font-semibold uppercase tracking-wide hover:bg-police-red/30 transition-all duration-300 border border-police-red/50"
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
                    className="flex items-center gap-2 px-5 py-3 bg-black border border-police-red/50 text-foreground font-semibold uppercase tracking-wide hover:bg-police-red/10 hover:text-white transition-all duration-300"
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
                    <div className="w-full h-[400px] flex items-center justify-center bg-black border border-police-red/50">
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
                  {isYouTubeMusicAlbum && (
                    <p className="text-muted-foreground text-xs text-center">
                      Click tracks in the player to switch songs
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <p className="text-police-red font-semibold text-lg uppercase tracking-wider mb-2">
              Available Now On All Major Platforms
            </p>
            <p className="text-muted-foreground">
              Spotify • Apple Music • YouTube Music • Amazon Music • Tidal • Deezer • and more
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AlbumHero;
