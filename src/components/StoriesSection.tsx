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
    <section className="py-20 relative">
      {/* Background effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/20 to-transparent" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex items-center justify-center gap-3 mb-12">
          <BookOpen className="w-10 h-10 text-primary" />
          <h2 className="text-4xl font-bold">
            <span className="bg-gradient-to-r from-police-red to-justice-blue bg-clip-text text-transparent">
              Stories Behind the Music
            </span>
          </h2>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {stories.map((story, index) => (
            <div 
              key={index}
              className="bg-card/50 backdrop-blur-sm rounded-lg border border-border p-8 hover:border-primary/50 transition-all duration-300"
            >
              {story.trackNumber && (
                <div className="inline-block px-3 py-1 rounded-full bg-gradient-to-r from-police-red/20 to-justice-blue/20 text-sm font-semibold mb-4">
                  Track {story.trackNumber}
                </div>
              )}
              <h3 className="text-2xl font-bold mb-4 text-foreground">
                {story.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
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
