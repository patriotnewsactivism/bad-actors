import { BookOpen } from "lucide-react";
import { Button } from "./ui/button";

interface Story {
  title: string;
  content: string;
  trackNumber?: number;
}

interface StoriesSectionProps {
  stories: Story[];
}

const StoriesSection = ({ stories }: StoriesSectionProps) => {
  return (
    <section className="py-24 relative bg-gradient-to-b from-reckoning-dark via-background to-reckoning-dark">
      {/* Red accent lines */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-police-red to-transparent opacity-50" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-police-red to-transparent opacity-50" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex items-center justify-center gap-4 mb-16">
          <BookOpen className="w-12 h-12 text-police-red" strokeWidth={2.5} />
          <h2 className="text-5xl md:text-6xl font-black tracking-tight">
            <span className="bg-gradient-to-r from-police-red via-warning-red to-justice-blue bg-clip-text text-transparent">
              THE TESTIMONY
            </span>
          </h2>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {stories.map((story, index) => (
            <div
              key={index}
              id={story.trackNumber ? `story-track-${story.trackNumber}` : undefined}
              className="bg-black/70 backdrop-blur-sm rounded-xl border-2 border-police-red/20 p-8 hover:border-police-red/60 hover:shadow-[0_0_30px_rgba(255,0,0,0.2)] transition-all duration-500 scroll-mt-24"
            >
              {story.trackNumber && (
                <div className="inline-block px-4 py-2 rounded-sm bg-gradient-to-r from-police-red to-blood-red text-sm font-black mb-6 shadow-[0_0_20px_rgba(255,0,0,0.3)] uppercase tracking-wider">
                  Track {story.trackNumber}
                </div>
              )}
              <h3 className="text-3xl font-black mb-5 text-foreground">
                {story.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed whitespace-pre-line text-lg">
                {story.content}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StoriesSection;
