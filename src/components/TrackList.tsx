import { Play } from "lucide-react";

interface Track {
  number: number;
  title: string;
  duration: string;
}

interface TrackListProps {
  tracks: Track[];
}

const TrackList = ({ tracks }: TrackListProps) => {
  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-12 text-center">
          <span className="bg-gradient-to-r from-police-red to-justice-blue bg-clip-text text-transparent">
            Track Listing
          </span>
        </h2>
        
        <div className="max-w-3xl mx-auto">
          <div className="bg-card/50 backdrop-blur-sm rounded-lg border border-border overflow-hidden">
            {tracks.map((track, index) => (
              <div 
                key={track.number}
                className="flex items-center gap-4 p-4 border-b border-border last:border-b-0 hover:bg-muted/30 transition-all duration-300 group"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-police-red to-justice-blue flex items-center justify-center group-hover:scale-110 transition-transform">
                  <span className="text-sm font-bold">{track.number}</span>
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-foreground truncate group-hover:text-primary transition-colors">
                    {track.title}
                  </h3>
                </div>
                
                <div className="flex items-center gap-3">
                  <span className="text-muted-foreground text-sm">{track.duration}</span>
                  <Play className="w-5 h-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrackList;
