import { Play, Pause, SkipBack, SkipForward } from "lucide-react";

interface Track {
  number: number;
  title: string;
  duration: string;
  audioSrc?: string;
}

interface MiniPlayerProps {
  visible: boolean;
  track?: Track;
  tracks: Track[];
  isPlaying: boolean;
  onTogglePlay: () => void;
  onSelectTrack: (trackNumber: number) => void;
  progress: number;
  onSeek: (ratio: number) => void;
}

const MiniPlayer = ({
  visible,
  track,
  tracks,
  isPlaying,
  onTogglePlay,
  onSelectTrack,
  progress,
  onSeek,
}: MiniPlayerProps) => {
  if (!track) return null;

  const goToOffset = (offset: number) => {
    const idx = tracks.findIndex((t) => t.number === track.number);
    if (idx === -1) return;
    const nextIdx = (idx + offset + tracks.length) % tracks.length;
    onSelectTrack(tracks[nextIdx].number);
  };

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 bg-black/95 backdrop-blur border-t border-police-red/50 shadow-[0_-4px_20px_rgba(0,0,0,0.6)] transition-transform duration-300 ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
      role="region"
      aria-label="Mini player"
    >
      <div
        className="h-1 bg-white/10 cursor-pointer relative"
        onClick={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          onSeek((e.clientX - rect.left) / rect.width);
        }}
      >
        <div className="h-full bg-police-red transition-[width] duration-150" style={{ width: `${progress * 100}%` }} />
      </div>

      <div className="container mx-auto px-3 sm:px-4 py-2 sm:py-3 flex items-center gap-3 sm:gap-4">
        <img
          src="/bad-actors-cover.jpg"
          alt="Bad Actors Album Cover"
          className="w-10 h-10 sm:w-12 sm:h-12 object-cover border border-police-red/50 shrink-0"
        />
        <div className="min-w-0 flex-1">
          <p className="text-foreground font-semibold text-sm sm:text-base truncate">{track.title}</p>
          <p className="text-muted-foreground text-xs sm:text-sm font-mono">{track.duration}</p>
        </div>
        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          <button
            onClick={() => goToOffset(-1)}
            className="p-2 text-muted-foreground hover:text-white transition-colors"
            aria-label="Previous track"
          >
            <SkipBack className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
          <button
            onClick={onTogglePlay}
            className="p-2 sm:p-3 bg-police-red/20 text-white hover:bg-police-red/30 transition-colors rounded-full"
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
          </button>
          <button
            onClick={() => goToOffset(1)}
            className="p-2 text-muted-foreground hover:text-white transition-colors"
            aria-label="Next track"
          >
            <SkipForward className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MiniPlayer;
