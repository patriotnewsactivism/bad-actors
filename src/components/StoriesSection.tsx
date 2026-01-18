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
    <section className="py-24 relative bg-reckoning-dark overflow-hidden">
      {/* Crime scene borders */}
      <div className="absolute inset-x-0 top-0 h-1 bg-crime-yellow" />
      <div className="absolute inset-x-0 bottom-0 h-1 bg-crime-yellow" />
      <div className="absolute inset-x-0 top-4 h-0.5 bg-police-red" />
      <div className="absolute inset-x-0 bottom-4 h-0.5 bg-police-red" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex items-center justify-center gap-4 mb-12">
          <BookOpen className="w-12 h-12 text-police-red animate-pulse" strokeWidth={2.5} fill="currentColor" />
          <h2 className="text-5xl md:text-6xl font-black tracking-tight">
            <span className="bg-gradient-to-r from-police-red via-warning-red to-justice-blue bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(255,0,0,0.3)]">
              THE TESTIMONY
            </span>
          </h2>
        </div>

        <p className="text-center text-xl text-muted-foreground max-w-3xl mx-auto mb-16">
          Every track tells a true story. Every word is backed by evidence. <span className="text-police-red font-bold">This is accountability set to music.</span>
        </p>

        <div className="max-w-4xl mx-auto space-y-8">
          {stories.map((story, index) => (
            <div
              key={index}
              id={story.trackNumber ? `story-track-${story.trackNumber}` : undefined}
              className="group bg-black/80 backdrop-blur-sm rounded-xl border-2 border-police-red/30 p-8 hover:border-police-red/70 hover:shadow-[0_0_40px_rgba(255,0,0,0.3)] transition-all duration-500 scroll-mt-24 relative overflow-hidden"
            >
              {/* Glow effect on hover */}
              <div className="absolute -inset-1 bg-gradient-to-r from-police-red via-warning-red to-blood-red opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500" />

              <div className="relative z-10">
                {story.trackNumber && (
                  <div className="inline-block px-5 py-2 rounded-sm bg-gradient-to-r from-police-red to-blood-red text-base font-black mb-6 shadow-[0_0_25px_rgba(255,0,0,0.4)] uppercase tracking-wider">
                    Track {story.trackNumber}
                  </div>
                )}
                <h3 className="text-3xl md:text-4xl font-black mb-6 text-foreground group-hover:text-police-red transition-colors">
                  {story.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed whitespace-pre-line text-lg">
                  {story.content}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StoriesSection;
