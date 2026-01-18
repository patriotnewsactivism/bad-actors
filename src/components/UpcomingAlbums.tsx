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
    <section className="py-24 relative bg-reckoning-dark overflow-hidden">
      {/* Stark borders */}
      <div className="absolute inset-x-0 top-0 h-0.5 bg-justice-blue" />
      <div className="absolute inset-x-0 bottom-0 h-0.5 bg-police-red" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_hsl(210_100%_35%/0.1)_0%,_transparent_60%)]" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex items-center justify-center gap-4 mb-12">
          <Calendar className="w-12 h-12 text-justice-blue animate-pulse" strokeWidth={2.5} />
          <h2 className="text-5xl md:text-6xl font-black tracking-tight">
            <span className="bg-gradient-to-r from-justice-blue via-steel-blue to-police-red bg-clip-text text-transparent">
              THE RECKONING CONTINUES
            </span>
          </h2>
        </div>

        <p className="text-center text-xl text-muted-foreground max-w-3xl mx-auto mb-16">
          The fight for truth and accountability doesn't stop here. <span className="text-police-red font-bold">More evidence is being compiled. More stories will be told.</span>
        </p>

        <div className="max-w-3xl mx-auto">
          {albums.map((album, index) => (
            <div
              key={index}
              className="group relative bg-black/80 backdrop-blur-sm rounded-xl border-2 border-justice-blue/40 p-10 hover:border-justice-blue/80 hover:shadow-[0_0_60px_rgba(33,150,243,0.4)] transition-all duration-500 overflow-hidden"
            >
              {/* Animated glow on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-justice-blue/20 to-police-red/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute -inset-1 bg-gradient-to-r from-justice-blue via-police-red to-justice-blue opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500" />

              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <Disc3 className="w-12 h-12 text-justice-blue group-hover:rotate-180 transition-transform duration-700" />
                  <span className="text-lg font-black text-justice-blue uppercase tracking-wider border-2 border-justice-blue/60 px-4 py-2 rounded-sm shadow-[0_0_20px_rgba(33,150,243,0.3)]">
                    {album.status}
                  </span>
                </div>

                <h3 className="text-4xl md:text-5xl font-black mb-6 text-foreground group-hover:text-justice-blue transition-colors">
                  {album.title}
                </h3>

                <p className="text-muted-foreground leading-relaxed text-xl">
                  {album.description}
                </p>

                <div className="mt-8 pt-8 border-t-2 border-justice-blue/20">
                  <p className="text-police-red font-bold text-lg uppercase tracking-wider">
                    Justice delayed is justice denied. But justice is coming.
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UpcomingAlbums;
