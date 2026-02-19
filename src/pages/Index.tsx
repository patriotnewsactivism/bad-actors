import { useEffect, useState } from "react";
import AlbumHero from "@/components/AlbumHero";
import TrackList from "@/components/TrackList";
import StoriesSection from "@/components/StoriesSection";
import UpcomingAlbums from "@/components/UpcomingAlbums";
import EmailCapture from "@/components/EmailCapture";
import { emailService } from "@/lib/emailService";

const Index = () => {
  const [currentTrack, setCurrentTrack] = useState<number>(1);
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);

  useEffect(() => {
    emailService.init();
  }, []);

  const tracks = [
    { number: 1, title: "Silence Ain't Consent", duration: "3:33", youtubeId: "dQw4w9WgXcQ" },
    { number: 2, title: "Unbroken", duration: "5:04", youtubeId: "dQw4w9WgXcQ" },
    { number: 3, title: "In the Shadows Tonight", duration: "4:19", youtubeId: "dQw4w9WgXcQ" },
    { number: 4, title: "Double Dipped", duration: "4:17", youtubeId: "dQw4w9WgXcQ" },
    { number: 5, title: "Morgan County Blues", duration: "4:04", youtubeId: "dQw4w9WgXcQ" },
    { number: 6, title: "The Osteen Files (Exhibit L)", duration: "3:50", youtubeId: "dQw4w9WgXcQ" },
    { number: 7, title: "A Warrant For A Lie", duration: "3:34", youtubeId: "dQw4w9WgXcQ" },
    { number: 8, title: "The Crowder Files", duration: "3:33", youtubeId: "dQw4w9WgXcQ" },
    { number: 9, title: "Eleven Months Too Long", duration: "3:48", youtubeId: "dQw4w9WgXcQ" },
    { number: 10, title: "Caught Red Handed", duration: "4:00", youtubeId: "dQw4w9WgXcQ" },
    { number: 11, title: "Osteen Lied", duration: "3:36", youtubeId: "dQw4w9WgXcQ" },
    { number: 12, title: "Land of the Free, Unless Its Me", duration: "4:12", youtubeId: "dQw4w9WgXcQ" },
    { number: 13, title: "She Called The State", duration: "3:55", youtubeId: "dQw4w9WgXcQ" },
    { number: 14, title: "Osteen's Fall", duration: "3:27", youtubeId: "dQw4w9WgXcQ" },
    { number: 15, title: "The Gaslight Anthem", duration: "2:29", youtubeId: "dQw4w9WgXcQ" },
    { number: 16, title: "Governors Gone Too Far", duration: "3:22", youtubeId: "dQw4w9WgXcQ" },
    { number: 17, title: "Scandalous", duration: "3:14", youtubeId: "dQw4w9WgXcQ" },
  ];

  const handleEmailSubmit = async (email: string, name?: string) => {
    const downloadUrl = import.meta.env.VITE_DOWNLOAD_URL || "https://distrokid.com/hyperfollow/donmatthews/bad-actors-volume-1";
    await emailService.sendDownloadEmail(email, name, downloadUrl);
    
    const storedEmails = localStorage.getItem("captured_emails");
    const emails = storedEmails ? JSON.parse(storedEmails) : [];
    if (!emails.includes(email)) {
      emails.push(email);
      localStorage.setItem("captured_emails", JSON.stringify(emails));
    }
  };

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
      title: "In the Shadows Tonight",
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
      title: "The Osteen Files (Exhibit L)",
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
      trackNumber: 8,
      title: "The Crowder Files",
      content: `"The Crowder Files" serves as the documentary centerpiece of the album's exposure of Phyllis "Liz" Crowder's role in the coordinated campaign against Don Matthews. This track compiles the receipts—the false statements, the manipulated legal filings, the weaponized agencies, and the trail of destruction left in the wake of personal vendetta transformed into state action.

The song lays out chronologically how Crowder's actions escalated from private disputes to federal-level involvement, implicating multiple agencies and officials along the way. It documents the pattern of behavior: false accusations followed by official responses, manufactured emergencies used to trigger arrests, and a consistent strategy of using government machinery as a tool of personal revenge.

"The Crowder Files" doesn't speculate—it archives. Every claim in the track is rooted in documented evidence, court records, and verifiable events. This is accountability set to music, a permanent record that ensures the truth cannot be buried, altered, or forgotten.`
    },
    {
      trackNumber: 9,
      title: "Eleven Months Too Long",
      content: `"Eleven Months Too Long" documents one of the most egregious examples of pretrial detention abuse in the Bad Actors saga. This track chronicles the nearly year-long imprisonment endured without conviction—eleven months of freedom stolen, life suspended, and constitutional rights trampled.

The song examines how the justice system weaponizes delay, using prolonged detention as punishment before any verdict is rendered. It exposes the calculated cruelty of a system that knows pretrial incarceration destroys jobs, relationships, mental health, and reputations—then uses that destruction as leverage.

Every day counted. Every month documented. Eleven months too long is eleven months of proof that the system isn't broken—it's working exactly as designed for those it wants to crush.`
    },
    {
      trackNumber: 10,
      title: "Caught Red Handed",
      content: `"Caught Red Handed" is the receipts track—the moment when all the documentation, all the evidence, all the contradictions come together to prove what was always true: they lied, and they got caught.

This track celebrates the vindication that comes when corrupt actors slip up, when their stories contradict each other, when the paper trail reveals the truth they tried to bury. It's the documentation of that moment when the lies become undeniable, when even the cover-up can't cover it up anymore.

"Caught Red Handed" transforms legal victories into musical testimony, proving that persistence in the pursuit of truth eventually pays off. The corrupt may delay justice, but they can't escape it forever.`
    },
    {
      trackNumber: 11,
      title: "Osteen Lied",
      content: `Three words. Undeniable truth. Documented proof. Osteen lied. Not once. Not by accident. Not a misunderstanding. A calculated, deliberate, provable lie that destroyed lives and perverted justice.

This track lays out the timeline, the contradictions, the evidence, and the receipts. When someone in power lies, they must be held accountable. This is that accountability, set to music.`
    },
    {
      trackNumber: 12,
      title: "Land of the Free, Unless Its Me",
      content: `"Land of the Free, Unless Its Me" confronts the bitter irony at the heart of American justice: the freedoms we celebrate don't apply equally to everyone. This track examines how constitutional protections evaporate when you become a target, how rights become privileges revoked at the discretion of those in power.

The song documents the systematic denial of due process, the selective enforcement of laws, and the two-tiered justice system that protects the powerful while crushing those who challenge them. It's a meditation on what freedom really means when your freedom depends on who you are, who you know, and who you've dared to expose.

Every American should be able to trust that "liberty and justice for all" means exactly that. This track is for everyone who learned the hard way that the promise was never meant for them.`
    },
    {
      trackNumber: 13,
      title: "She Called The State",
      content: `"She Called The State" documents the moment when personal conflict became state-sponsored persecution. This track examines how a single phone call can activate an entire apparatus of government power against an individual—transforming a domestic dispute into a coordinated multi-agency assault on freedom.

The song traces the chain of events from that initial call through the escalating responses: police involvement, child protective services, interstate coordination, and eventually federal attention. It exposes how easily the machinery of the state can be weaponized by those who know how to manipulate it.

"She Called The State" serves as a warning and a record. It shows how vulnerable any citizen becomes when someone with malicious intent understands how to pull the right governmental strings. The state became the weapon; the call was just the trigger.`
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
      title: "Governors Gone Too Far",
      content: `When corruption reaches the highest levels of state government, when the governor's office itself becomes complicit in covering up injustice, someone has to say it out loud: The Governor's Gone Too Far.

This track pulls no punches. It connects the dots from local corruption to state-level complicity. It names the failures of leadership that allowed bad actors to operate with impunity. This is the call for accountability at every level of government. The reckoning doesn't stop at county lines.`
    },
    {
      trackNumber: 17,
      title: "Scandalous",
      content: `"Scandalous" closes the album with the most personal betrayal of all—the scandalous acts committed by the woman I married and had three children with. This track documents the calculated destruction that came from within my own home.

This isn't about a failed marriage. It's about weaponized lies, false accusations, and the systematic demolition of a father's relationship with his children. It's about watching someone you trusted become the architect of your persecution—filing false reports, manipulating agencies, and using the children as pawns in a campaign of destruction.

"Scandalous" names the behavior for what it is: a betrayal so complete, so calculated, and so devastating that it became the foundation for everything else that followed. The corruption of government actors was built on the lies that started at home. This is the truth that could no longer stay silent.`
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
        youtubePlaylistId="OLAK5uy_lQdVnTChfibpXLzkkT_BcrpjPxxqcx5fs"
        currentTrack={currentTrack}
        tracks={tracks}
        streamingLinks={[
          { platform: "Apple Music", url: "https://music.apple.com/au/album/bad-actors-volume-1/1863402949" },
          { platform: "Spotify", url: "https://open.spotify.com/album/bad-actors-volume-1" },
          { platform: "YouTube Music", url: "https://music.youtube.com/playlist?list=OLAK5uy_lQdVnTChfibpXLzkkT_BcrpjPxxqcx5fs" },
          { platform: "DistroKid", url: "https://distrokid.com/hyperfollow/donmatthews/bad-actors-volume-1" },
        ]}
        onDownloadClick={() => setIsDownloadModalOpen(true)}
      />

      <TrackList
        tracks={tracks}
        stories={stories}
        currentTrack={currentTrack}
        onTrackSelect={setCurrentTrack}
      />
      
      <StoriesSection stories={stories} />
      
      <UpcomingAlbums albums={upcomingAlbums} />

      <EmailCapture
        isOpen={isDownloadModalOpen}
        onClose={() => setIsDownloadModalOpen(false)}
        onSubmit={handleEmailSubmit}
        downloadUrl={import.meta.env.VITE_DOWNLOAD_URL || "https://distrokid.com/hyperfollow/donmatthews/bad-actors-volume-1"}
      />
      
      <footer className="py-16 border-t-2 border-police-red bg-black">
        <div className="container mx-auto px-4 text-center">
          <p className="text-foreground font-bold text-lg">
            © 2025 Don Matthews - Bad Actors. All rights reserved.
          </p>
          <p className="text-crime-yellow font-black text-xl mt-3 tracking-wider uppercase">
            Truth. Justice. Accountability.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
