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
    <section className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center gap-3 mb-12">
          <Calendar className="w-10 h-10 text-secondary" />
          <h2 className="text-4xl font-bold">
            <span className="bg-gradient-to-r from-justice-blue to-police-red bg-clip-text text-transparent">
              Coming Soon
            </span>
          </h2>
        </div>

        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6">
          {albums.map((album, index) => (
            <div 
              key={index}
              className="group relative bg-card/30 backdrop-blur-sm rounded-lg border border-border p-8 hover:border-secondary/50 transition-all duration-300 overflow-hidden"
            >
              {/* Animated background on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-justice-blue/5 to-police-red/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <Disc3 className="w-8 h-8 text-secondary group-hover:rotate-180 transition-transform duration-700" />
                  <span className="text-sm font-semibold text-secondary uppercase tracking-wider">
                    {album.status}
                  </span>
                </div>
                
                <h3 className="text-2xl font-bold mb-3 text-foreground group-hover:text-secondary transition-colors">
                  {album.title}
                </h3>
                
                <p className="text-muted-foreground leading-relaxed">
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
