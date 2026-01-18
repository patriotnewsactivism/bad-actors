import { BookOpen } from "lucide-react";

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
    <section className="py-24 relative bg-black overflow-hidden">
      {/* Crime scene borders */}
      <div className="absolute inset-x-0 top-0 h-1 bg-crime-yellow" />
      <div className="absolute inset-x-0 bottom-0 h-1 bg-crime-yellow" />
      <div className="absolute inset-x-0 top-4 h-0.5 bg-police-red" />
      <div className="absolute inset-x-0 bottom-4 h-0.5 bg-police-red" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex items-center justify-center gap-4 mb-12">
          <BookOpen className="w-12 h-12 text-police-red" strokeWidth={2.5} fill="currentColor" />
          <h2 className="text-5xl md:text-6xl font-black tracking-tight text-police-red">
            THE TESTIMONY
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
              className="group bg-black border-2 border-police-red p-8 hover:bg-police-red/5 transition-all duration-300 scroll-mt-24"
            >
              {story.trackNumber && (
                <div className="inline-block px-5 py-2 bg-police-red text-base font-black mb-6 uppercase tracking-wider">
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
          ))}
        </div>
      </div>
    </section>
  );
};

export default StoriesSection;
