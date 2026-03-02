import { Calendar, Disc3, ChevronRight } from "lucide-react";

interface Album {
  title: string;
  status: string;
  description: string;
  updates?: string[];
}

interface UpcomingAlbumsProps {
  albums: Album[];
}

const UpcomingAlbums = ({ albums }: UpcomingAlbumsProps) => {
  return (
    <div className="bg-zinc-900 border-2 border-crime-yellow p-8">
      <div className="flex items-center gap-3 mb-6">
        <Disc3 className="w-8 h-8 text-crime-yellow animate-spin" style={{ animationDuration: '4s' }} />
        <h3 className="text-2xl font-black text-crime-yellow uppercase tracking-tighter italic">In Progress</h3>
      </div>

      {albums.map((album, index) => (
        <div key={index} className="space-y-6">
          <div>
            <h4 className="text-xl font-black text-white mb-2 uppercase tracking-tight">{album.title}</h4>
            <div className="inline-block bg-crime-yellow text-black text-[10px] font-black uppercase px-2 py-0.5 mb-3">
              {album.status}
            </div>
            <p className="text-zinc-400 text-sm leading-relaxed">
              {album.description}
            </p>
          </div>

          {album.updates && (
            <div className="space-y-3 pt-4 border-t border-white/10">
              <p className="text-xs font-black text-zinc-500 uppercase tracking-widest">Latest Updates</p>
              <ul className="space-y-2">
                {album.updates.map((update, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-zinc-300">
                    <ChevronRight className="w-4 h-4 text-crime-yellow flex-shrink-0 mt-0.5" />
                    <span>{update}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="pt-4">
            <div className="bg-black/40 p-3 border border-white/5">
              <p className="text-[10px] text-police-red font-black uppercase tracking-[0.2em] mb-1">Status Report</p>
              <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                <div className="h-full bg-police-red w-[65%] animate-pulse" />
              </div>
              <p className="text-[10px] text-zinc-500 mt-2 text-right font-mono">65% COMPILED</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UpcomingAlbums;
