import { Music } from "lucide-react";

interface AlbumHeroProps {
  title: string;
  artist: string;
  releaseDate: string;
  embedUrl: string;
}

const AlbumHero = ({ title, artist, releaseDate, embedUrl }: AlbumHeroProps) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-police-red/10 via-urban-dark to-justice-blue/10" />
      
      {/* Glow effects */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-police-red/20 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-justice-blue/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: "1s" }} />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Album icon */}
          <div className="flex justify-center mb-8 animate-fade-in">
            <div className="p-4 rounded-full bg-card/50 backdrop-blur-sm border border-border">
              <Music className="w-12 h-12 text-primary" />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-5xl md:text-7xl font-bold text-center mb-4 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <span className="bg-gradient-to-r from-police-red via-foreground to-justice-blue bg-clip-text text-transparent">
              {title}
            </span>
          </h1>
          
          {/* Artist & Release */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-12 text-muted-foreground animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <span className="text-xl">{artist}</span>
            <span className="hidden md:inline">•</span>
            <span className="text-xl">{releaseDate}</span>
          </div>

          {/* Embedded Player */}
          <div className="relative animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <div className="absolute inset-0 bg-gradient-to-r from-police-red/20 to-justice-blue/20 rounded-lg blur-xl" />
            <div className="relative bg-card/80 backdrop-blur-sm rounded-lg border border-border overflow-hidden shadow-2xl">
              <iframe 
                width="100%" 
                height="450" 
                src={embedUrl}
                allow="autoplay"
                className="w-full"
                title="Album Player"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AlbumHero;
