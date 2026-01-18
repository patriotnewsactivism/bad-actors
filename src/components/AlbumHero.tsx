import { Music, ExternalLink } from "lucide-react";

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

const AlbumHero = ({ title, artist, releaseDate, youtubePlaylistId, currentTrack, streamingLinks }: AlbumHeroProps) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Crime scene tape pattern */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 right-0 h-1 bg-crime-yellow" />
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-crime-yellow" />
        <div className="absolute top-8 left-0 right-0 h-0.5 bg-police-red opacity-60" />
        <div className="absolute bottom-8 left-0 right-0 h-0.5 bg-police-red opacity-60" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10 py-20">
        <div className="max-w-5xl mx-auto">
          {/* Accountability symbol */}
          <div className="flex justify-center mb-8 animate-fade-in">
            <div className="p-5 rounded-sm bg-black border-2 border-police-red shadow-[0_0_30px_hsl(var(--police-red)/0.5)]">
              <Music className="w-14 h-14 text-police-red" strokeWidth={2.5} />
            </div>
          </div>

          {/* Title - Bold and confrontational */}
          <h1 className="text-6xl md:text-8xl font-black text-center mb-6 animate-fade-in tracking-tight" style={{ animationDelay: "0.1s" }}>
            <span className="text-police-red drop-shadow-[0_0_20px_hsl(var(--police-red)/0.5)]">
              {title}
            </span>
          </h1>
          
          {/* Tagline */}
          <div className="text-center mb-8 animate-fade-in" style={{ animationDelay: "0.15s" }}>
            <p className="text-police-red text-xl md:text-2xl font-bold tracking-wider uppercase">
              Truth | Justice | Accountability
            </p>
          </div>
          
          {/* Artist & Release */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-10 text-muted-foreground animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <span className="text-2xl font-semibold text-foreground">{artist}</span>
            <span className="hidden md:inline text-police-red">|</span>
            <span className="text-xl font-medium">{releaseDate}</span>
          </div>

          {/* Streaming Links */}
          <div className="flex flex-wrap justify-center gap-4 mb-12 animate-fade-in" style={{ animationDelay: "0.25s" }}>
            {streamingLinks.map((link) => (
              <a
                key={link.platform}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 bg-black border-2 border-police-red text-foreground font-bold uppercase tracking-wide hover:bg-police-red hover:text-white transition-all duration-300"
              >
                {link.platform}
                <ExternalLink className="w-4 h-4" />
              </a>
            ))}
          </div>

          {/* YouTube Player */}
          <div className="relative animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <div className="relative bg-black border-2 border-police-red overflow-hidden shadow-[0_0_50px_hsl(var(--police-red)/0.3)]">
              <iframe
                key={`track-${currentTrack}`}
                width="100%"
                height="450"
                src={`https://www.youtube.com/embed/videoseries?list=${youtubePlaylistId}&index=${currentTrack}&autoplay=1`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full"
                title="Bad Actors Album - YouTube Playlist"
              />
            </div>
          </div>

          {/* Available Everywhere Notice */}
          <div className="mt-10 text-center animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <p className="text-crime-yellow font-bold text-lg uppercase tracking-widest mb-2">
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
