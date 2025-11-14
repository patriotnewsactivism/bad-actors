import AlbumHero from "@/components/AlbumHero";
import TrackList from "@/components/TrackList";
import StoriesSection from "@/components/StoriesSection";
import UpcomingAlbums from "@/components/UpcomingAlbums";

const Index = () => {
  const tracks = [
    { number: 1, title: "Silence Ain't Consent (North Mississippi's Warning)", duration: "3:32" },
    { number: 2, title: "Unbroken", duration: "5:03" },
    { number: 3, title: "In The Shadows Tonight (The Reconing)", duration: "4:18" },
    { number: 4, title: "Double Dipped", duration: "4:16" },
    { number: 5, title: "Morgan County Blues", duration: "4:03" },
    { number: 6, title: "The Osteen Files - Exhibit L", duration: "3:49" },
    { number: 7, title: "A Warrant For A Lie", duration: "3:33" },
    { number: 8, title: "The Crowder Files", duration: "3:32" },
    { number: 9, title: "Eleven Months Too Long", duration: "3:47" },
    { number: 10, title: "Caught Red Handed", duration: "3:59" },
    { number: 11, title: "Osteen Lied", duration: "3:35" },
    { number: 12, title: "Land of the Free, Unless its me", duration: "3:38" },
    { number: 13, title: "She Called The State", duration: "3:42" },
    { number: 14, title: "Osteen's Fall", duration: "3:51" },
    { number: 15, title: "The Gaslight Anthem", duration: "4:05" },
    { number: 16, title: "Governor's Gone Too Far", duration: "3:55" },
  ];

  const stories = [
    {
      title: "The Birth of Bad Actors",
      content: `This album represents more than just music—it's a testimony to truth and justice in a system that often fails both. Each track tells a real story, documents real corruption, and demands real accountability.

The title "Bad Actors" refers to those in positions of power who abuse their authority, betray the public trust, and escape consequences. This is my way of shining a light into the darkest corners of institutional corruption in North Mississippi and beyond.`
    },
    {
      trackNumber: 1,
      title: "Silence Ain't Consent",
      content: `This opening track sets the tone for everything that follows. When communities stay silent in the face of corruption, that silence is often mistaken for consent. But make no mistake—silence is not agreement. It's often fear, exhaustion, or learned helplessness.

This is North Mississippi's warning: we're not staying silent anymore.`
    },
  ];

  const upcomingAlbums = [
    {
      title: "Bad Actors Volume 2",
      status: "In Production",
      description: "The story continues with even more documented cases of corruption, injustice, and the fight for accountability. More names. More evidence. More truth."
    },
    {
      title: "Untitled Project",
      status: "Planning",
      description: "The movement is growing. Stay tuned for announcements about the next chapter in this journey for justice and truth in music."
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <AlbumHero 
        title="Bad Actors - The Album"
        artist="Don Matthews"
        releaseDate="Released January 2025"
        embedUrl="https://www.bandlab.com/embed/collection/?id=8ea7105d-acc1-f011-8195-6045bd30a4b0"
      />
      
      <TrackList tracks={tracks} />
      
      <StoriesSection stories={stories} />
      
      <UpcomingAlbums albums={upcomingAlbums} />
      
      <footer className="py-16 border-t-2 border-police-red/30 bg-gradient-to-b from-background to-reckoning-dark">
        <div className="container mx-auto px-4 text-center">
          <p className="text-foreground font-bold text-lg">
            © 2025 Don Matthews - Bad Actors. All rights reserved.
          </p>
          <p className="text-police-red font-black text-xl mt-3 tracking-wider uppercase">
            Truth. Justice. Accountability.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
