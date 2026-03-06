import { BookOpen, Play } from "lucide-react";

interface Story {
  title: string;
  content: string;
  trackNumber?: number;
}

interface StoriesSectionProps {
  stories: Story[];
  onTrackSelect?: (trackNumber: number) => void;
}

const StoriesSection = ({ stories, onTrackSelect }: StoriesSectionProps) => {
  const handlePlayClick = (trackNumber: number) => {
    if (onTrackSelect) {
      onTrackSelect(trackNumber);
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="py-16 md:py-24 relative bg-black overflow-hidden">
      {/* Crime scene borders */}
      <div className="absolute inset-x-0 top-0 h-1 bg-crime-yellow" />
      <div className="absolute inset-x-0 bottom-0 h-1 bg-crime-yellow" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex items-center justify-center gap-2 sm:gap-4 mb-8 md:mb-12">
          <BookOpen className="w-8 h-8 sm:w-12 sm:h-12 text-police-red" strokeWidth={2.5} />
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-black tracking-tight text-police-red uppercase italic italic">
            The Testimony
          </h2>
        </div>

        <p className="text-center text-base sm:text-xl text-zinc-400 max-w-3xl mx-auto mb-10 md:mb-16 font-medium italic px-2">
          "Every track tells a true story. Every word is backed by evidence. This is accountability set to music."
        </p>

        <div className="max-w-4xl mx-auto space-y-8 md:space-y-12">
          {stories.map((story, index) => (
            <div
              key={index}
              id={story.trackNumber ? `story-track-${story.trackNumber}` : undefined}
              className="group bg-zinc-950 border-l-4 border-police-red p-5 sm:p-8 md:p-10 hover:bg-zinc-900 transition-all duration-500 scroll-mt-24 shadow-[12px_12px_0px_0px_rgba(220,38,38,0.1)] md:shadow-[20px_20px_0px_0px_rgba(220,38,38,0.1)] hover:shadow-[12px_12px_0px_0px_rgba(220,38,38,0.2)] md:hover:shadow-[20px_20px_0px_0px_rgba(220,38,38,0.2)]"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-6 mb-6 md:mb-8">
                <div className="flex items-center gap-3 sm:gap-4">
                  {story.trackNumber && (
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-police-red flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-black text-base sm:text-xl">{story.trackNumber}</span>
                    </div>
                  )}
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-white uppercase tracking-tighter group-hover:text-police-red transition-colors">
                    {story.title}
                  </h3>
                </div>
                
                {story.trackNumber && (
                  <button
                    onClick={() => handlePlayClick(story.trackNumber!)}
                    className="w-full md:w-auto justify-center flex items-center gap-2 px-6 py-3 bg-white text-black font-black uppercase tracking-widest text-xs hover:bg-police-red hover:text-white transition-all transform hover:scale-105"
                  >
                    <Play className="w-4 h-4" fill="currentColor" />
                    Play Track
                  </button>
                )}
              </div>
              
              <div className="prose prose-invert prose-lg max-w-none">
                <p className="text-zinc-400 leading-relaxed whitespace-pre-line font-medium text-sm sm:text-base">
                  {story.content}
                </p>
              </div>
              
              <div className="mt-8 pt-8 border-t border-white/5 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-police-red animate-pulse" />
                <span className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.3em]">Affidavit Statement #{index + 1}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StoriesSection;
