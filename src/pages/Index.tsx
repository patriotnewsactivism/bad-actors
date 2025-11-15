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
    {
      trackNumber: 6,
      title: "The Osteen Files - Exhibit L",
      content: `Exhibit L. Just one letter. One piece of evidence in a mountain of documentation that reveals a pattern of misconduct so extensive, it required its own filing system.

This track chronicles the beginning of the Osteen investigation—where the first documents surfaced, where the lies began to unravel, and where the truth started demanding attention. When you need to alphabetize your corruption, you know the reckoning is coming.`
    },
    {
      trackNumber: 7,
      title: "A Warrant For A Lie",
      content: `They swore an oath. They signed their names. They stood before a judge and declared it was the truth. But it wasn't. This is the story of a warrant built on fabrications—a legal document that should represent justice, instead weaponized to destroy an innocent life.

When law enforcement lies under oath to obtain a warrant, they don't just break the law—they break the very foundation of justice itself. This track names names and presents facts.`
    },
    {
      trackNumber: 11,
      title: "Osteen Lied",
      content: `Three words. Undeniable truth. Documented proof. Osteen lied. Not once. Not by accident. Not a misunderstanding. A calculated, deliberate, provable lie that destroyed lives and perverted justice.

This track lays out the timeline, the contradictions, the evidence, and the receipts. When someone in power lies, they must be held accountable. This is that accountability, set to music.`
    },
    {
      trackNumber: 14,
      title: "Osteen's Fall",
      content: `Every corrupt empire eventually crumbles. Every bad actor eventually faces their reckoning. This track chronicles the downfall—when the evidence became overwhelming, when the lies could no longer be sustained, when justice finally began to turn its gaze toward the guilty.

This isn't about revenge. It's about accountability. It's about watching corruption collapse under the weight of its own deception. The fall is inevitable when you build your career on lies.`
    },
    {
      trackNumber: 15,
      title: "The Gaslight Anthem",
      content: `"You're crazy. That didn't happen. You're misremembering. Nobody will believe you." The anthem of the gaslighter. The song of the corrupt who rely on confusion, doubt, and psychological manipulation to escape accountability.

This track reclaims reality. It documents the gaslighting tactics used by those in power to make victims question their own truth. But when you have evidence, when you have documentation, when you have receipts—the gaslighting stops working.`
    },
    {
      trackNumber: 16,
      title: "Governor's Gone Too Far",
      content: `When corruption reaches the highest levels of state government, when the governor's office itself becomes complicit in covering up injustice, someone has to say it out loud: The Governor's Gone Too Far.

This closing track pulls no punches. It connects the dots from local corruption to state-level complicity. It names the failures of leadership that allowed bad actors to operate with impunity. This is the call for accountability at every level of government. The reckoning doesn't stop at county lines.`
    },
  ];

  const upcomingAlbums = [
    {
      title: "Bad Actors Volume 2",
      status: "In Production",
      description: "The story continues with even more documented cases of corruption, injustice, and the fight for accountability. More names. More evidence. More truth."
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
      
      <TrackList tracks={tracks} stories={stories} />
      
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
