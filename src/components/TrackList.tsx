import { BookOpen, FileText } from "lucide-react";

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

const TrackList = ({ tracks, stories }: TrackListProps) => {
  // Create a map of track numbers that have stories
  const trackStoryMap = new Map<number, Story>();
  stories.forEach(story => {
    if (story.trackNumber) {
      trackStoryMap.set(story.trackNumber, story);
    }
  });

  const scrollToStory = (trackNumber: number) => {
    const storyElement = document.getElementById(`story-track-${trackNumber}`);
    if (storyElement) {
      const offset = 100; // Offset for fixed headers if any
      const elementPosition = storyElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="py-24 relative bg-gradient-to-b from-background via-reckoning-dark to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-5xl md:text-6xl font-black mb-6 tracking-tight">
            <span className="bg-gradient-to-r from-police-red via-warning-red to-justice-blue bg-clip-text text-transparent">
              TRACK STORIES
            </span>
          </h2>
          <p className="text-muted-foreground text-xl max-w-3xl mx-auto">
            Explore the testimony behind each track. <span className="text-police-red font-bold">Click tracks with the book icon</span> to read their stories below.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-black/60 backdrop-blur-sm rounded-xl border-2 border-police-red/30 overflow-hidden shadow-[0_0_40px_rgba(255,0,0,0.2)]">
            {tracks.map((track) => {
              const hasStory = trackStoryMap.has(track.number);

              return (
                <div
                  key={track.number}
                  onClick={() => hasStory && scrollToStory(track.number)}
                  className={`flex items-center gap-4 p-5 border-b-2 border-border/30 last:border-b-0 transition-all duration-300 group ${
                    hasStory
                      ? 'cursor-pointer hover:bg-police-red/10 hover:border-police-red/50'
                      : 'opacity-60'
                  }`}
                >
                  <div className={`flex-shrink-0 w-12 h-12 rounded-sm flex items-center justify-center transition-all shadow-[0_0_15px_rgba(255,0,0,0.4)] ${
                    hasStory
                      ? 'bg-gradient-to-br from-police-red to-blood-red group-hover:scale-110 group-hover:rotate-3'
                      : 'bg-gradient-to-br from-muted to-muted-foreground/40'
                  }`}>
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

          <div className="mt-8 text-center">
            <p className="text-muted-foreground text-sm">
              <span className="text-police-red font-bold">{trackStoryMap.size}</span> of <span className="font-bold">{tracks.length}</span> tracks have stories available
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrackList;
