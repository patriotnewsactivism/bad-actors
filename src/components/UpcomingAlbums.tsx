import { Calendar, Disc3 } from "lucide-react";
import { Button } from "./ui/button";

interface Album {
  title: string;
  status: string;
  description: string;
}

interface UpcomingAlbumsProps {
  albums: Album[];
}

const UpcomingAlbums = ({ albums }: UpcomingAlbumsProps) => {
  return (
    <section className="py-24 relative bg-gradient-to-b from-background via-reckoning-dark to-background">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center gap-4 mb-16">
          <Calendar className="w-12 h-12 text-justice-blue" strokeWidth={2.5} />
          <h2 className="text-5xl md:text-6xl font-black tracking-tight">
            <span className="bg-gradient-to-r from-justice-blue via-steel-blue to-police-red bg-clip-text text-transparent">
              THE RECKONING CONTINUES
            </span>
          </h2>
        </div>

        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
          {albums.map((album, index) => (
            <div 
              key={index}
              className="group relative bg-black/70 backdrop-blur-sm rounded-xl border-2 border-justice-blue/30 p-8 hover:border-justice-blue/70 hover:shadow-[0_0_40px_rgba(33,150,243,0.3)] transition-all duration-300 overflow-hidden"
            >
              {/* Animated glow on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-justice-blue/10 to-police-red/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <Disc3 className="w-10 h-10 text-justice-blue group-hover:rotate-180 transition-transform duration-700" />
                  <span className="text-base font-black text-justice-blue uppercase tracking-wider border border-justice-blue/50 px-3 py-1 rounded-sm">
                    {album.status}
                  </span>
                </div>
                
                <h3 className="text-3xl font-black mb-4 text-foreground group-hover:text-justice-blue transition-colors">
                  {album.title}
                </h3>
                
                <p className="text-muted-foreground leading-relaxed text-lg">
                  {album.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UpcomingAlbums;
