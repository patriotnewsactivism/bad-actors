import { BookOpen, FileText, Filter, Zap } from "lucide-react";
import { useState } from "react";

interface Track {
  number: number;
  title: string;
  duration: string;
}

interface Story {
  title: string;
  content: string;
  trackNumber?: number;
}

interface TrackListProps {
  tracks: Track[];
  stories: Story[];
}

type FilterType = "all" | "withStories" | "comingSoon";

const TrackList = ({ tracks, stories }: TrackListProps) => {
  const [filter, setFilter] = useState<FilterType>("all");
  const [clickedTrack, setClickedTrack] = useState<number | null>(null);

  // Create a map of track numbers that have stories
  const trackStoryMap = new Map<number, Story>();
  stories.forEach(story => {
    if (story.trackNumber) {
      trackStoryMap.set(story.trackNumber, story);
    }
  });

  const scrollToStory = (trackNumber: number) => {
    // Trigger flash animation
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

  // Filter tracks based on selected filter
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
    <section className="py-24 relative bg-gradient-to-b from-background via-reckoning-dark to-background overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-police-red rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-justice-blue rounded-full blur-[120px] animate-pulse" style={{ animationDelay: "1.5s" }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-6">
            <Zap className="w-12 h-12 text-police-red animate-pulse" fill="currentColor" />
            <h2 className="text-5xl md:text-6xl font-black tracking-tight">
              <span className="bg-gradient-to-r from-police-red via-warning-red to-justice-blue bg-clip-text text-transparent">
                TRACK STORIES
              </span>
            </h2>
            <Zap className="w-12 h-12 text-justice-blue animate-pulse" fill="currentColor" style={{ animationDelay: "0.5s" }} />
          </div>
          <p className="text-muted-foreground text-xl max-w-3xl mx-auto mb-8">
            Explore the testimony behind each track. <span className="text-police-red font-bold">Click tracks with the book icon</span> to read their stories below.
          </p>

          {/* Progress Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-bold text-foreground uppercase tracking-wider">Documentation Progress</span>
              <span className="text-sm font-black text-police-red">{percentComplete}% Complete</span>
            </div>
            <div className="h-3 bg-black/80 rounded-full border-2 border-police-red/30 overflow-hidden shadow-inner">
              <div
                className="h-full bg-gradient-to-r from-police-red via-warning-red to-police-red transition-all duration-1000 shadow-[0_0_20px_rgba(255,0,0,0.6)]"
                style={{ width: `${percentComplete}%` }}
              />
            </div>
            <p className="text-muted-foreground text-sm mt-3">
              <span className="text-justice-blue font-bold">{remainingStories} more stories</span> being documented. The reckoning continues...
            </p>
          </div>

          {/* Filter Controls */}
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <Filter className="w-5 h-5 text-police-red" />
            <button
              onClick={() => setFilter("all")}
              className={`px-5 py-2 rounded-sm font-bold uppercase text-sm tracking-wider transition-all duration-300 ${
                filter === "all"
                  ? 'bg-gradient-to-r from-police-red to-blood-red text-white shadow-[0_0_20px_rgba(255,0,0,0.4)]'
                  : 'bg-black/60 text-muted-foreground border-2 border-border hover:border-police-red/50'
              }`}
            >
              All Tracks ({totalTracks})
            </button>
            <button
              onClick={() => setFilter("withStories")}
              className={`px-5 py-2 rounded-sm font-bold uppercase text-sm tracking-wider transition-all duration-300 ${
                filter === "withStories"
                  ? 'bg-gradient-to-r from-police-red to-blood-red text-white shadow-[0_0_20px_rgba(255,0,0,0.4)]'
                  : 'bg-black/60 text-muted-foreground border-2 border-border hover:border-police-red/50'
              }`}
            >
              <BookOpen className="w-4 h-4 inline mr-2" />
              With Stories ({storiesCount})
            </button>
            <button
              onClick={() => setFilter("comingSoon")}
              className={`px-5 py-2 rounded-sm font-bold uppercase text-sm tracking-wider transition-all duration-300 ${
                filter === "comingSoon"
                  ? 'bg-gradient-to-r from-police-red to-blood-red text-white shadow-[0_0_20px_rgba(255,0,0,0.4)]'
                  : 'bg-black/60 text-muted-foreground border-2 border-border hover:border-police-red/50'
              }`}
            >
              Coming Soon ({remainingStories})
            </button>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-black/60 backdrop-blur-sm rounded-xl border-2 border-police-red/30 overflow-hidden shadow-[0_0_40px_rgba(255,0,0,0.2)]">
            {filteredTracks.map((track) => {
              const hasStory = trackStoryMap.has(track.number);
              const isFlashing = clickedTrack === track.number;

              return (
                <div
                  id={`track-${track.number}`}
                  key={track.number}
                  onClick={() => hasStory && scrollToStory(track.number)}
                  className={`flex items-center gap-4 p-5 border-b-2 border-border/30 last:border-b-0 transition-all duration-300 group relative ${
                    hasStory
                      ? 'cursor-pointer hover:bg-police-red/10 hover:border-police-red/50'
                      : 'opacity-60'
                  } ${isFlashing ? 'animate-justice-flash' : ''}`}
                >
                  {/* Justice Flash Effect */}
                  {isFlashing && (
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-police-red/30 to-transparent animate-flash-slide pointer-events-none" />
                  )}

                  <div className={`flex-shrink-0 w-12 h-12 rounded-sm flex items-center justify-center transition-all shadow-[0_0_15px_rgba(255,0,0,0.4)] ${
                    hasStory
                      ? 'bg-gradient-to-br from-police-red to-blood-red group-hover:scale-110 group-hover:rotate-3'
                      : 'bg-gradient-to-br from-muted to-muted-foreground/40'
                  } ${isFlashing ? 'scale-125 rotate-6' : ''}`}>
                    <span className="text-base font-black">{track.number}</span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3">
                      <h3 className={`font-bold text-lg truncate transition-colors ${
                        hasStory
                          ? 'text-foreground group-hover:text-police-red'
                          : 'text-muted-foreground'
                      }`}>
                        {track.title}
                      </h3>
                      {hasStory && (
                        <BookOpen className="w-5 h-5 text-police-red flex-shrink-0 animate-pulse" />
                      )}
                    </div>
                    {!hasStory && (
                      <p className="text-sm text-muted-foreground/70 mt-1">Story coming soon</p>
                    )}
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="text-muted-foreground text-base font-mono font-semibold">{track.duration}</span>
                    {hasStory && (
                      <FileText className="w-6 h-6 text-police-red opacity-0 group-hover:opacity-100 transition-opacity" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {filteredTracks.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              <p className="text-xl">No tracks match this filter</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default TrackList;
