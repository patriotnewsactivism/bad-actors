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
      {/* Hard border lines */}
      <div className="absolute inset-x-0 top-0 h-1 bg-police-red" />
      <div className="absolute inset-x-0 bottom-0 h-1 bg-police-red" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-6">
            <Zap className="w-12 h-12 text-police-red" fill="currentColor" />
            <h2 className="text-5xl md:text-6xl font-black tracking-tight text-police-red">
              TRACK STORIES
            </h2>
            <Zap className="w-12 h-12 text-police-red" fill="currentColor" />
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
            <div className="h-3 bg-black border-2 border-police-red overflow-hidden">
              <div
                className="h-full bg-police-red transition-all duration-1000"
                style={{ width: `${percentComplete}%` }}
              />
            </div>
            <p className="text-muted-foreground text-sm mt-3">
              <span className="text-crime-yellow font-bold">{remainingStories} more stories</span> being documented. The reckoning continues...
            </p>
          </div>

          {/* Filter Controls */}
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <Filter className="w-5 h-5 text-police-red" />
            <button
              onClick={() => setFilter("all")}
              className={`px-5 py-2 font-bold uppercase text-sm tracking-wider transition-all duration-300 border-2 ${
                filter === "all"
                  ? 'bg-police-red text-white border-police-red'
                  : 'bg-black text-muted-foreground border-border hover:border-police-red'
              }`}
            >
              All Tracks ({totalTracks})
            </button>
            <button
              onClick={() => setFilter("withStories")}
              className={`px-5 py-2 font-bold uppercase text-sm tracking-wider transition-all duration-300 border-2 ${
                filter === "withStories"
                  ? 'bg-police-red text-white border-police-red'
                  : 'bg-black text-muted-foreground border-border hover:border-police-red'
              }`}
            >
              <BookOpen className="w-4 h-4 inline mr-2" />
              With Stories ({storiesCount})
            </button>
            <button
              onClick={() => setFilter("comingSoon")}
              className={`px-5 py-2 font-bold uppercase text-sm tracking-wider transition-all duration-300 border-2 ${
                filter === "comingSoon"
                  ? 'bg-police-red text-white border-police-red'
                  : 'bg-black text-muted-foreground border-border hover:border-police-red'
              }`}
            >
              Coming Soon ({remainingStories})
            </button>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-black border-2 border-police-red overflow-hidden">
            {filteredTracks.map((track) => {
              const hasStory = trackStoryMap.has(track.number);
              const isFlashing = clickedTrack === track.number;

              return (
                <div
                  id={`track-${track.number}`}
                  key={track.number}
                  onClick={() => hasStory && scrollToStory(track.number)}
                  className={`flex items-center gap-4 p-5 border-b-2 border-border last:border-b-0 transition-all duration-300 group relative ${
                    hasStory
                      ? 'cursor-pointer hover:bg-police-red/10'
                      : 'opacity-60'
                  } ${isFlashing ? 'bg-police-red/20' : ''}`}
                >
                  <div className={`flex-shrink-0 w-12 h-12 flex items-center justify-center transition-all border-2 ${
                    hasStory
                      ? 'bg-police-red border-police-red group-hover:scale-110'
                      : 'bg-muted border-muted-foreground'
                  } ${isFlashing ? 'scale-125' : ''}`}>
                    <span className="text-base font-black text-white">{track.number}</span>
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
                        <BookOpen className="w-5 h-5 text-police-red flex-shrink-0" />
                      )}
                    </div>
                    {!hasStory && (
                      <p className="text-sm text-muted-foreground mt-1">Story coming soon</p>
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
