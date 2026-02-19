import { BookOpen, FileText, Filter, Zap, Play, Music, Volume2 } from "lucide-react";
import { useState } from "react";

interface Track {
  number: number;
  title: string;
  duration: string;
  youtubeId?: string;
}

interface Story {
  title: string;
  content: string;
  trackNumber?: number;
}

interface TrackListProps {
  tracks: Track[];
  stories: Story[];
  currentTrack: number;
  onTrackSelect: (trackNumber: number) => void;
}

type FilterType = "all" | "withStories" | "comingSoon";

const AnimatedBars = () => (
  <div className="flex items-end gap-0.5 h-4">
    <div className="w-1 bg-police-red animate-[bar1_0.8s_ease-in-out_infinite]" />
    <div className="w-1 bg-police-red animate-[bar2_0.8s_ease-in-out_infinite_0.2s]" />
    <div className="w-1 bg-police-red animate-[bar3_0.8s_ease-in-out_infinite_0.4s]" />
    <div className="w-1 bg-police-red animate-[bar4_0.8s_ease-in-out_infinite_0.1s]" />
  </div>
);

const EvidenceMarker = ({ number, isActive }: { number: number; isActive: boolean }) => (
  <div className={`relative flex items-center justify-center w-10 h-10 transition-all duration-300 ${isActive ? 'scale-110' : ''}`}>
    <div className={`absolute inset-0 ${isActive ? 'bg-police-red' : 'bg-crime-yellow'} transform rotate-45 transition-colors duration-300`} />
    <div className={`absolute inset-1 ${isActive ? 'bg-police-red' : 'bg-black'} transform rotate-45 border ${isActive ? 'border-white/30' : 'border-crime-yellow'}`} />
    <span className={`relative z-10 font-black text-sm ${isActive ? 'text-white' : 'text-crime-yellow'} transition-colors duration-300`}>
      {number}
    </span>
    {isActive && (
      <div className="absolute -inset-1 bg-police-red/30 animate-pulse rotate-45" />
    )}
  </div>
);

const TrackList = ({ tracks, stories, currentTrack, onTrackSelect }: TrackListProps) => {
  const [filter, setFilter] = useState<FilterType>("all");
  const [clickedTrack, setClickedTrack] = useState<number | null>(null);

  const trackStoryMap = new Map<number, Story>();
  stories.forEach(story => {
    if (story.trackNumber) {
      trackStoryMap.set(story.trackNumber, story);
    }
  });

  const handleTrackClick = (trackNumber: number) => {
    onTrackSelect(trackNumber);
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    setClickedTrack(trackNumber);
    setTimeout(() => setClickedTrack(null), 600);
  };

  const scrollToStory = (trackNumber: number, event: React.MouseEvent) => {
    event.stopPropagation();
    setClickedTrack(trackNumber);
    setTimeout(() => setClickedTrack(null), 600);

    const storyElement = document.getElementById(`story-track-${trackNumber}`);
    if (storyElement) {
      const offset = 100;
      const elementPosition = storyElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const filteredTracks = tracks.filter(track => {
    if (filter === "all") return true;
    if (filter === "withStories") return trackStoryMap.has(track.number);
    if (filter === "comingSoon") return !trackStoryMap.has(track.number);
    return true;
  });

  const storiesCount = trackStoryMap.size;
  const totalTracks = tracks.length;
  const percentComplete = Math.round((storiesCount / totalTracks) * 100);
  const remainingStories = totalTracks - storiesCount;

  return (
    <section className="py-24 relative bg-black overflow-hidden">
      <style>{`
        @keyframes bar1 {
          0%, 100% { height: 4px; }
          50% { height: 16px; }
        }
        @keyframes bar2 {
          0%, 100% { height: 8px; }
          50% { height: 4px; }
        }
        @keyframes bar3 {
          0%, 100% { height: 6px; }
          50% { height: 14px; }
        }
        @keyframes bar4 {
          0%, 100% { height: 10px; }
          50% { height: 6px; }
        }
        @keyframes scanline {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 5px rgba(220, 38, 38, 0.5); }
          50% { box-shadow: 0 0 20px rgba(220, 38, 38, 0.8), 0 0 40px rgba(220, 38, 38, 0.4); }
        }
      `}</style>

      <div className="absolute inset-x-0 top-0 h-1 bg-police-red" />
      <div className="absolute inset-x-0 bottom-0 h-1 bg-police-red" />

      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(255,255,255,0.03) 2px,
            rgba(255,255,255,0.03) 4px
          )`
        }} />
      </div>

      <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-police-red/20 to-transparent" />
      <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-police-red/20 to-transparent" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-6">
            <Zap className="w-12 h-12 text-police-red" fill="currentColor" />
            <h2 className="text-5xl md:text-6xl font-black tracking-tight text-police-red">
              EVIDENCE LOG
            </h2>
            <Zap className="w-12 h-12 text-police-red" fill="currentColor" />
          </div>
          <div className="flex items-center justify-center gap-2 mb-4">
            <FileText className="w-5 h-5 text-crime-yellow" />
            <p className="text-crime-yellow font-mono text-sm uppercase tracking-widest">
              Case File #BA-2024 · Track Documentation
            </p>
          </div>
          <p className="text-muted-foreground text-xl max-w-3xl mx-auto mb-8">
            <span className="text-police-red font-bold">Click any track to play it</span> in the player above. Tracks with the <BookOpen className="w-5 h-5 inline mx-1 text-police-red" /> icon have detailed stories below.
          </p>

          <div className="max-w-2xl mx-auto mb-8">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-bold text-foreground uppercase tracking-wider">Documentation Progress</span>
              <span className="text-sm font-black text-police-red">{percentComplete}% Complete</span>
            </div>
            <div className="h-3 bg-black border-2 border-police-red overflow-hidden relative">
              <div
                className="h-full bg-police-red transition-all duration-1000 relative"
                style={{ width: `${percentComplete}%` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
              </div>
            </div>
            <p className="text-muted-foreground text-sm mt-3">
              <span className="text-crime-yellow font-bold">{remainingStories} more stories</span> being documented. The reckoning continues...
            </p>
          </div>

          <div className="flex items-center justify-center gap-3 flex-wrap">
            <Filter className="w-5 h-5 text-police-red" />
            <button
              onClick={() => setFilter("all")}
              className={`px-5 py-2 font-bold uppercase text-sm tracking-wider transition-all duration-300 border-2 ${
                filter === "all"
                  ? 'bg-police-red text-white border-police-red shadow-[0_0_15px_rgba(220,38,38,0.5)]'
                  : 'bg-black text-muted-foreground border-border hover:border-police-red hover:text-police-red'
              }`}
            >
              All Tracks ({totalTracks})
            </button>
            <button
              onClick={() => setFilter("withStories")}
              className={`px-5 py-2 font-bold uppercase text-sm tracking-wider transition-all duration-300 border-2 ${
                filter === "withStories"
                  ? 'bg-police-red text-white border-police-red shadow-[0_0_15px_rgba(220,38,38,0.5)]'
                  : 'bg-black text-muted-foreground border-border hover:border-police-red hover:text-police-red'
              }`}
            >
              <BookOpen className="w-4 h-4 inline mr-2" />
              With Stories ({storiesCount})
            </button>
            <button
              onClick={() => setFilter("comingSoon")}
              className={`px-5 py-2 font-bold uppercase text-sm tracking-wider transition-all duration-300 border-2 ${
                filter === "comingSoon"
                  ? 'bg-police-red text-white border-police-red shadow-[0_0_15px_rgba(220,38,38,0.5)]'
                  : 'bg-black text-muted-foreground border-border hover:border-police-red hover:text-police-red'
              }`}
            >
              Coming Soon ({remainingStories})
            </button>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-black border-2 border-police-red overflow-hidden relative">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-crime-yellow/50 to-transparent" />

            {filteredTracks.map((track, index) => {
              const hasStory = trackStoryMap.has(track.number);
              const isFlashing = clickedTrack === track.number;
              const isCurrentTrack = currentTrack === track.number;

              return (
                <div
                  id={`track-${track.number}`}
                  key={track.number}
                  onClick={() => handleTrackClick(track.number)}
                  className={`flex items-center gap-4 p-4 border-b border-border/50 last:border-b-0 transition-all duration-300 group relative cursor-pointer ${
                    isCurrentTrack
                      ? 'bg-police-red/15 border-l-4 border-l-police-red'
                      : 'hover:bg-police-red/5 border-l-4 border-l-transparent hover:border-l-crime-yellow'
                  } ${isFlashing ? 'bg-police-red/30' : ''}`}
                  style={{
                    animationDelay: `${index * 50}ms`
                  }}
                >
                  {isCurrentTrack && (
                    <div className="absolute inset-0 pointer-events-none">
                      <div className="absolute inset-0 bg-gradient-to-r from-police-red/5 via-transparent to-police-red/5" />
                    </div>
                  )}

                  <EvidenceMarker number={track.number} isActive={isCurrentTrack} />

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3">
                      <h3 className={`font-bold text-lg truncate transition-all duration-300 ${
                        isCurrentTrack
                          ? 'text-police-red drop-shadow-[0_0_10px_rgba(220,38,38,0.5)]'
                          : 'text-foreground group-hover:text-police-red'
                      }`}>
                        {track.title}
                      </h3>
                      {hasStory && (
                        <button
                          onClick={(e) => scrollToStory(track.number, e)}
                          className="flex-shrink-0 hover:scale-125 transition-transform duration-200"
                          title="Read track story"
                        >
                          <BookOpen className="w-5 h-5 text-police-red" />
                        </button>
                      )}
                    </div>
                    <div className="flex items-center gap-3 mt-1">
                      {isCurrentTrack && (
                        <div className="flex items-center gap-2">
                          <AnimatedBars />
                          <span className="text-police-red font-bold text-sm uppercase tracking-wider animate-pulse">
                            Now Playing
                          </span>
                        </div>
                      )}
                      {!isCurrentTrack && !hasStory && (
                        <p className="text-sm text-muted-foreground italic">Story pending...</p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className={`text-base font-mono font-semibold transition-colors duration-300 ${
                      isCurrentTrack ? 'text-police-red' : 'text-muted-foreground group-hover:text-foreground'
                    }`}>{track.duration}</span>

                    {isCurrentTrack ? (
                      <div className="w-10 h-10 flex items-center justify-center bg-police-red rounded-sm shadow-[0_0_15px_rgba(220,38,38,0.6)]" style={{ animation: 'pulse-glow 2s infinite' }}>
                        <Volume2 className="w-5 h-5 text-white" />
                      </div>
                    ) : (
                      <div className="w-10 h-10 flex items-center justify-center bg-transparent border-2 border-muted-foreground/30 group-hover:bg-crime-yellow group-hover:border-crime-yellow transition-all duration-300 rounded-sm">
                        <Play className="w-5 h-5 text-muted-foreground/50 group-hover:text-black transition-colors duration-300" fill="currentColor" />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-crime-yellow/50 to-transparent" />
          </div>

          {filteredTracks.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p className="text-xl">No tracks match this filter</p>
            </div>
          )}
        </div>

        <div className="text-center mt-8">
          <p className="text-muted-foreground/50 text-xs font-mono uppercase tracking-widest">
            End of Evidence Log · {filteredTracks.length} items displayed
          </p>
        </div>
      </div>
    </section>
  );
};

export default TrackList;
