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
      trackNumber: 2,
      title: "Unbroken",
      content: `"Unbroken" is the heartbeat of the Bad Actors album — the moment where the storytelling stops whispering and starts roaring. This track is Matthew Reardon, a.k.a. Don Matthews, stripped down to the bone and refusing to fold. It's the sound of a man who's been shoved, jailed, smeared, surveilled, extradited, and assaulted — and still shows up with the camera rolling and the Constitution in hand.

The song doesn't glorify survival; it documents it. Every verse is pulled from the wreckage of real events: corrupt cops filing false reports, officials crossing state lines to retaliate, a system that chose power over truth. But instead of breaking, the pressure forged steel.

"Unbroken" is the declaration that no matter how many times they tried to disappear your voice — in a cell, in a hospital, in a courtroom, on a sidewalk outside a governor's mansion — you walked out stronger. The hook hits like a verdict: you're still here, and you're not bending for anyone.

Musically, the track blends defiance with resilience, creating an anthem not just for one person, but for anyone who's ever been told to sit down and shut up by those in power. This is what accountability sounds like when it refuses to be silenced.`
    },
    {
      trackNumber: 3,
      title: "In the Shadows Tonight (The Reckoning)",
      content: `"In the Shadows Tonight (The Reckoning)" stands as one of the most confrontational and revealing tracks on Bad Actors. Rather than focusing solely on systemic actors or government power, this song turns its gaze toward a more intimate origin of destruction: Phyllis "Liz" Crowder, the artist's ex, whose false accusations and manipulative actions set in motion many of the legal battles and human-rights violations that followed.

The track chronicles the pattern of personal betrayal that grew into institutional harm. It highlights how misleading claims, emotional manipulation, and weaponized allegations did not remain private conflicts — they ignited a chain reaction that spiraled into police involvement, custody warfare, interstate surveillance, and coordinated retaliation. The song holds not just Crowder accountable, but the wider circle of individuals who amplified her claims and contributed to the ongoing campaign against him.

"In the Shadows Tonight (The Reckoning)" exposes the hidden motivations, the coordinated lies, and the personal vendettas that were laundered through official channels to appear legitimate. It's a reminder that corruption doesn't always start in a government office — sometimes it starts in a living room, with someone willing to destroy another person's life to maintain control or avoid accountability themselves.

This track is unflinching, personal, and necessary. It names the source and refuses to let the narrative be controlled by those who started the fire.`
    },
    {
      trackNumber: 4,
      title: "Double Dipped",
      content: `"Double Dipped" is one of the album's most pointed indictments of personal betrayal colliding with state-enabled corruption. In this track, Don Matthews pulls back the curtain on a specific form of fraud that reshaped his life: Phyllis Crowder's repeated attempts to "double dip" on child support by claiming she never received payments that, in fact, had already been issued.

The song dissects how Crowder submitted a false affidavit while the artist was in prison, misrepresenting her payment history to trigger a manufactured arrearage. Instead of correcting the deception, the Mississippi Attorney General's Office and state child-support agencies let the fraud stand — effectively transforming a private lie into a state-backed weapon of oppression.

"Double Dipped" exposes that dynamic with surgical precision. The track frames Crowder's false filings not as clerical errors or misunderstandings, but as a deliberate act of exploitation — one that the state then embraced to keep a targeted individual financially trapped, legally cornered, and politically silenced. It illustrates how a fraudulent affidavit can snowball into long-term financial harm, damaged credit, ongoing state pressure, and systemic retaliation.

Musically and lyrically, the track stays focused on accountability. It calls out the individual who initiated the deceit, the institutions that validated it, and the bureaucratic machinery that allowed a lie to become law. The result is a song that treats financial fraud not as paperwork but as a human-rights violation carried out through the façade of "child support enforcement."

"Double Dipped" stands as a record of what happens when personal vindictiveness meets government power — and how easily an entire system can be weaponized against someone it already wants to keep down.`
    },
    {
      trackNumber: 5,
      title: "Morgan County Blues",
      content: `"Morgan County Blues" is one of the most haunting narrative tracks on Bad Actors, and it steps outside Don Matthews' own battles to spotlight another victim of manufactured criminality: Joshua Grover, a Utah real estate photographer whose only "crime" was doing his job.

The song recounts how Grover was arrested in Morgan County while lawfully photographing a property — a routine part of his professional work. But routine shattered when the lies of another individual collided with the false statements of a police officer, transforming an innocent man into a criminal defendant overnight. The track exposes how fragile a person's freedom becomes when officers choose narrative over truth, and how quickly a livelihood can be destroyed by a single dishonest report.

"Morgan County Blues" balances sorrow with outrage. It documents the emotional toll on Grover — the disbelief, the humiliation, the sudden violence done to his reputation — while indicting the culture of policing that permits fabricated charges to stand unchallenged. This track is a reminder that the abuse of power isn't isolated to one person's story. It's systemic. It's happening everywhere.

By dedicating an entire song to Grover's case, Matthews amplifies a voice that the system tried to silence, proving that accountability music isn't just personal — it's communal. Justice for one is justice for all.`
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
        releaseDate="Released September 1, 2025"
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
