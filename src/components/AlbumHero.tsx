import { Music, ExternalLink, Play, Pause } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface StreamingLink {
  platform: string;
  url: string;
}

interface AlbumHeroProps {
  title: string;
  artist: string;
  releaseDate: string;
  youtubePlaylistId: string;
  currentTrack: number;
  streamingLinks: StreamingLink[];
}

// Declare YouTube IFrame API types
declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

const AlbumHero = ({ title, artist, releaseDate, youtubePlaylistId, currentTrack, streamingLinks }: AlbumHeroProps) => {
  const playerRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playerError, setPlayerError] = useState(false);

  // Load YouTube IFrame API
  useEffect(() => {
    // Check if API is already loaded
    if (window.YT && window.YT.Player) {
      initializePlayer();
      return;
    }

    // Load the API
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

    // API ready callback
    window.onYouTubeIframeAPIReady = () => {
      initializePlayer();
    };
  }, []);

  const initializePlayer = () => {
    if (!containerRef.current || playerRef.current) return;

    try {
      playerRef.current = new window.YT.Player('youtube-player', {
        height: '450',
        width: '100%',
        playerVars: {
          listType: 'playlist',
          list: youtubePlaylistId,
          index: 0,
          autoplay: 0,
          controls: 1,
          modestbranding: 1,
          rel: 0,
        },
        events: {
          onReady: (event: any) => {
            setIsPlayerReady(true);
            setPlayerError(false);
          },
          onStateChange: (event: any) => {
            setIsPlaying(event.data === window.YT.PlayerState.PLAYING);
          },
          onError: () => {
            setPlayerError(true);
          }
        },
      });
    } catch (error) {
      console.error('Error initializing YouTube player:', error);
      setPlayerError(true);
    }
  };

  // Handle track changes
  useEffect(() => {
    if (isPlayerReady && playerRef.current && currentTrack > 0) {
      try {
        playerRef.current.playVideoAt(currentTrack - 1);
      } catch (error) {
        console.error('Error changing track:', error);
      }
    }
  }, [currentTrack, isPlayerReady]);

  const togglePlayPause = () => {
    if (!isPlayerReady || !playerRef.current) return;

    try {
      if (isPlaying) {
        playerRef.current.pauseVideo();
      } else {
        playerRef.current.playVideo();
      }
    } catch (error) {
      console.error('Error toggling playback:', error);
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-black via-reckoning-dark to-black">
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'repeating-linear-gradient(0deg, hsl(var(--police-red)) 0px, transparent 1px, transparent 40px)',
        }} />
      </div>

      {/* Crime scene tape pattern */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-transparent via-crime-yellow to-transparent animate-pulse" />
        <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-transparent via-crime-yellow to-transparent animate-pulse" />
        <div className="absolute top-12 left-0 right-0 h-px bg-police-red opacity-40" />
        <div className="absolute bottom-12 left-0 right-0 h-px bg-police-red opacity-40" />
      </div>

      <div className="container mx-auto px-4 relative z-10 py-20">
        <div className="max-w-6xl mx-auto">
          {/* Accountability symbol */}
          <div className="flex justify-center mb-10 animate-fade-in">
            <div className="relative p-6 rounded-lg bg-gradient-to-br from-blood-red to-steel-blue border-4 border-police-red shadow-[0_0_40px_hsl(var(--police-red)/0.6)] animate-pulse-red">
              <Music className="w-16 h-16 text-white" strokeWidth={3} />
              <div className="absolute inset-0 rounded-lg bg-police-red opacity-20 animate-pulse" />
            </div>
          </div>

          {/* Title - Bold and confrontational */}
          <h1 className="text-6xl md:text-9xl font-black text-center mb-8 animate-fade-in tracking-tighter leading-none" style={{ animationDelay: "0.1s" }}>
            <span className="bg-gradient-to-r from-police-red via-warning-red to-police-red bg-clip-text text-transparent drop-shadow-[0_0_30px_hsl(var(--police-red)/0.8)] animate-pulse-red">
              {title}
            </span>
          </h1>

          {/* Tagline */}
          <div className="text-center mb-10 animate-fade-in" style={{ animationDelay: "0.15s" }}>
            <p className="text-crime-yellow text-2xl md:text-3xl font-black tracking-widest uppercase drop-shadow-[0_0_10px_hsl(var(--crime-yellow)/0.5)]">
              Truth • Justice • Accountability
            </p>
          </div>

          {/* Artist & Release */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-12 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <span className="text-3xl font-black text-white tracking-wide">{artist}</span>
            <span className="hidden md:inline text-police-red text-2xl">●</span>
            <span className="text-xl font-bold text-muted-foreground tracking-wide">{releaseDate}</span>
          </div>

          {/* Streaming Links - Enhanced */}
          <div className="flex flex-wrap justify-center gap-4 mb-16 animate-fade-in" style={{ animationDelay: "0.25s" }}>
            {streamingLinks.map((link) => (
              <a
                key={link.platform}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-black via-blood-red to-black border-3 border-police-red text-white font-black uppercase tracking-wider hover:scale-105 hover:shadow-[0_0_30px_hsl(var(--police-red)/0.8)] transition-all duration-300 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-police-red to-warning-red opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative z-10">{link.platform}</span>
                <ExternalLink className="w-5 h-5 relative z-10 group-hover:rotate-12 transition-transform" />
              </a>
            ))}
          </div>

          {/* Enhanced YouTube Player */}
          <div className="relative animate-fade-in mb-8" style={{ animationDelay: "0.3s" }} ref={containerRef}>
            <div className="relative bg-gradient-to-br from-black via-blood-red to-steel-blue p-2 border-4 border-police-red overflow-hidden shadow-[0_0_60px_hsl(var(--police-red)/0.5)]">
              {/* Animated border glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-police-red via-warning-red to-justice-blue opacity-30 animate-pulse" />

              <div className="relative bg-black">
                {!playerError ? (
                  <div id="youtube-player" className="w-full aspect-video" />
                ) : (
                  <div className="w-full aspect-video flex items-center justify-center bg-black border-2 border-police-red">
                    <div className="text-center p-8">
                      <Music className="w-16 h-16 text-police-red mx-auto mb-4" />
                      <p className="text-white font-bold text-xl mb-4">Player Error</p>
                      <p className="text-muted-foreground mb-6">Stream directly from your preferred platform</p>
                      <div className="flex flex-wrap justify-center gap-3">
                        {streamingLinks.slice(0, 3).map((link) => (
                          <a
                            key={link.platform}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-6 py-2 bg-police-red text-white font-bold hover:bg-warning-red transition-colors"
                          >
                            {link.platform}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Current Track Display */}
            {isPlayerReady && !playerError && (
              <div className="mt-6 text-center">
                <div className="inline-flex items-center gap-4 px-8 py-4 bg-black border-2 border-police-red shadow-[0_0_20px_hsl(var(--police-red)/0.3)]">
                  <button
                    onClick={togglePlayPause}
                    className="p-3 bg-police-red hover:bg-warning-red transition-colors rounded-full"
                    disabled={!isPlayerReady}
                  >
                    {isPlaying ? (
                      <Pause className="w-6 h-6 text-white" fill="white" />
                    ) : (
                      <Play className="w-6 h-6 text-white" fill="white" />
                    )}
                  </button>
                  <div className="text-left">
                    <p className="text-sm text-muted-foreground font-bold uppercase tracking-wider">Now Playing</p>
                    <p className="text-xl text-police-red font-black">Track {currentTrack}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Available Everywhere Notice */}
          <div className="text-center animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <p className="text-crime-yellow font-black text-xl uppercase tracking-widest mb-3 drop-shadow-[0_0_10px_hsl(var(--crime-yellow)/0.5)]">
              Stream Now On All Major Platforms
            </p>
            <p className="text-muted-foreground text-lg font-semibold">
              Spotify • Apple Music • YouTube Music • Amazon Music • Tidal • Deezer • and more
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AlbumHero;
