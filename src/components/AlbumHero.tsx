import { Music } from "lucide-react";

interface AlbumHeroProps {
  title: string;
  artist: string;
  releaseDate: string;
  embedUrl: string;
}

const AlbumHero = ({ title, artist, releaseDate, embedUrl }: AlbumHeroProps) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-reckoning-dark via-background to-reckoning-dark">
      {/* Intense red warning lines */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-police-red to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-police-red to-transparent" />
      </div>
      
      {/* Aggressive glow effects */}
      <div className="absolute top-20 left-10 w-[600px] h-[600px] bg-police-red/30 rounded-full blur-[150px] animate-pulse" />
      <div className="absolute bottom-20 right-10 w-[600px] h-[600px] bg-justice-blue/30 rounded-full blur-[150px] animate-pulse" style={{ animationDelay: "1s" }} />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Accountability symbol */}
          <div className="flex justify-center mb-8 animate-fade-in">
            <div className="p-5 rounded-sm bg-black/80 border-2 border-police-red shadow-[0_0_30px_rgba(255,0,0,0.5)]">
              <Music className="w-14 h-14 text-police-red" strokeWidth={2.5} />
            </div>
          </div>

          {/* Title - Bold and confrontational */}
          <h1 className="text-6xl md:text-8xl font-black text-center mb-6 animate-fade-in tracking-tight" style={{ animationDelay: "0.1s" }}>
            <span className="bg-gradient-to-r from-police-red via-warning-red to-justice-blue bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(255,0,0,0.5)]">
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
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-14 text-muted-foreground animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <span className="text-2xl font-semibold text-foreground">{artist}</span>
            <span className="hidden md:inline text-police-red">|</span>
            <span className="text-xl font-medium">{releaseDate}</span>
          </div>

          {/* Embedded Player - Single authoritative source */}
          <div className="relative animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <div className="absolute -inset-4 bg-gradient-to-r from-police-red/40 via-blood-red/40 to-justice-blue/40 rounded-xl blur-2xl" />
            <div className="relative bg-black/90 backdrop-blur-sm rounded-xl border-2 border-police-red/50 overflow-hidden shadow-[0_0_50px_rgba(255,0,0,0.3)]">
              <iframe 
                width="100%" 
                height="450" 
                src={embedUrl}
                allow="autoplay"
                className="w-full"
                title="Bad Actors Album Player"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AlbumHero;

