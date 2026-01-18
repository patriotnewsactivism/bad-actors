import { Calendar, Disc3 } from "lucide-react";

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
    <section className="py-24 relative bg-black overflow-hidden">
      {/* Stark borders */}
      <div className="absolute inset-x-0 top-0 h-1 bg-crime-yellow" />
      <div className="absolute inset-x-0 bottom-0 h-0.5 bg-police-red" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex items-center justify-center gap-4 mb-12">
          <Calendar className="w-12 h-12 text-crime-yellow" strokeWidth={2.5} />
          <h2 className="text-5xl md:text-6xl font-black tracking-tight text-crime-yellow">
            THE RECKONING CONTINUES
          </h2>
        </div>

        <p className="text-center text-xl text-muted-foreground max-w-3xl mx-auto mb-16">
          The fight for truth and accountability doesn't stop here. <span className="text-police-red font-bold">More evidence is being compiled. More stories will be told.</span>
        </p>

        <div className="max-w-3xl mx-auto">
          {albums.map((album, index) => (
            <div
              key={index}
              className="group bg-black border-2 border-crime-yellow p-10 hover:bg-crime-yellow/5 transition-all duration-300"
            >
              <div className="flex items-center gap-4 mb-6">
                <Disc3 className="w-12 h-12 text-crime-yellow group-hover:rotate-180 transition-transform duration-700" />
                <span className="text-lg font-black text-black bg-crime-yellow uppercase tracking-wider px-4 py-2">
                  {album.status}
                </span>
              </div>

              <h3 className="text-4xl md:text-5xl font-black mb-6 text-foreground group-hover:text-crime-yellow transition-colors">
                {album.title}
              </h3>

              <p className="text-muted-foreground leading-relaxed text-xl">
                {album.description}
              </p>

              <div className="mt-8 pt-8 border-t-2 border-crime-yellow/30">
                <p className="text-police-red font-bold text-lg uppercase tracking-wider">
                  Justice delayed is justice denied. But justice is coming.
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
