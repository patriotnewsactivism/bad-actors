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
    <section className="py-24 relative bg-gradient-to-b from-background via-reckoning-dark to-background">
      <div className="container mx-auto px-4">
        <h2 className="text-5xl md:text-6xl font-black mb-16 text-center tracking-tight">
          <span className="bg-gradient-to-r from-police-red via-warning-red to-justice-blue bg-clip-text text-transparent">
            THE EVIDENCE
          </span>
        </h2>
        
        <div className="max-w-4xl mx-auto">
          <div className="bg-black/60 backdrop-blur-sm rounded-xl border-2 border-police-red/30 overflow-hidden shadow-[0_0_40px_rgba(255,0,0,0.2)]">
            {tracks.map((track, index) => (
              <div 
                key={track.number}
                className="flex items-center gap-4 p-5 border-b-2 border-border/30 last:border-b-0 hover:bg-police-red/10 hover:border-police-red/50 transition-all duration-300 group"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-sm bg-gradient-to-br from-police-red to-blood-red flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all shadow-[0_0_15px_rgba(255,0,0,0.4)]">
                  <span className="text-base font-black">{track.number}</span>
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-foreground text-lg truncate group-hover:text-police-red transition-colors">
                    {track.title}
                  </h3>
                </div>
                
                <div className="flex items-center gap-4">
                  <span className="text-muted-foreground text-base font-mono font-semibold">{track.duration}</span>
                  <Play className="w-6 h-6 text-police-red opacity-0 group-hover:opacity-100 transition-opacity" fill="currentColor" />
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
