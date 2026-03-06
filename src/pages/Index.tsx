import { useEffect, useState } from "react";
import AlbumHero from "@/components/AlbumHero";
import TrackList from "@/components/TrackList";
import StoriesSection from "@/components/StoriesSection";
import UpcomingAlbums from "@/components/UpcomingAlbums";
import EmailCapture from "@/components/EmailCapture";
import { emailService } from "@/lib/emailService";
import { toast } from "sonner";

const Index = () => {
  const [currentTrack, setCurrentTrack] = useState<number>(1);
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);

  useEffect(() => {
    emailService.init();
    // Check for success message from download
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('download') === 'success') {
      toast.success("Check your email for the download link!");
    }
  }, []);

  const tracks = [
    { number: 1, title: "Silence Ain't Consent", duration: "3:33" },
    { number: 2, title: "Unbroken", duration: "5:04" },
    { number: 3, title: "In the Shadows Tonight", duration: "4:19" },
    { number: 4, title: "Double Dipped", duration: "4:17" },
    { number: 5, title: "Morgan County Blues", duration: "4:04" },
    { number: 6, title: "The Osteen Files (Exhibit L)", duration: "3:50" },
    { number: 7, title: "A Warrant For A Lie", duration: "3:34" },
    { number: 8, title: "The Crowder Files", duration: "3:33" },
    { number: 9, title: "Eleven Months Too Long", duration: "3:48" },
    { number: 10, title: "Caught Red Handed", duration: "4:00" },
    { number: 11, title: "Osteen Lied", duration: "3:36" },
    { number: 12, title: "Land of the Free, Unless Its Me", duration: "4:12" },
    { number: 13, title: "She Called The State", duration: "3:55" },
    { number: 14, title: "Osteen's Fall", duration: "3:27" },
    { number: 15, title: "The Gaslight Anthem", duration: "2:29" },
    { number: 16, title: "Governors Gone Too Far", duration: "3:22" },
    { number: 17, title: "Scandalous", duration: "3:14" },
  ];

  const streamingLinks = [
    { platform: "Apple Music", url: "https://music.apple.com/au/album/bad-actors-volume-1/1863402949" },
    { platform: "Spotify", url: "https://open.spotify.com/album/bad-actors-volume-1" },
    { platform: "YouTube Music", url: "https://music.youtube.com/playlist?list=OLAK5uy_m5AmZDrY2kX__kNhYE1jkhmY1LLTZi1cE&si=dyuOTX4AcfYaUuo0" },
    { platform: "Amazon Music", url: "https://music.amazon.com/albums/B0DFV8Y7X5" },
    { platform: "Tidal", url: "https://tidal.com/browse/album/384265741" },
    { platform: "Deezer", url: "https://www.deezer.com/album/636845241" },
  ];

  const handleEmailSubmit = async (email: string, name?: string) => {
    const downloadUrl = import.meta.env.VITE_DOWNLOAD_URL || "https://distrokid.com/hyperfollow/donmatthews/bad-actors-volume-1";
    
    try {
      // Send the email via EmailJS (which acts as our "save" mechanism for now)
      await emailService.sendDownloadEmail(email, name, downloadUrl);
      
      // Also store in localStorage as a backup
      const storedEmails = localStorage.getItem("captured_emails");
      const emails = storedEmails ? JSON.parse(storedEmails) : [];
      if (!emails.some((e: any) => e.email === email)) {
        emails.push({ email, name, date: new Date().toISOString() });
        localStorage.setItem("captured_emails", JSON.stringify(emails));
      }
      
      toast.success("Thank you! Your download link has been sent to " + email);
    } catch (error) {
      console.error("Failed to save email:", error);
      toast.error("There was an error saving your email. Please try again.");
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

"Unbroken" is the declaration that no matter how many times they tried to disappear your voice — in a cell, in a hospital, in a courtroom, on a sidewalk outside a governor's mansion — you walked out stronger. The hook hits like a verdict: you're still here, and you're not bending for anyone.`
    },
    {
      trackNumber: 3,
      title: "In the Shadows Tonight",
      content: `"In the Shadows Tonight (The Reckoning)" stands as one of the most confrontational and revealing tracks on Bad Actors. Rather than focusing solely on systemic actors or government power, this song turns its gaze toward a more intimate origin of destruction: Phyllis "Liz" Crowder, the artist's ex, whose false accusations and manipulative actions set in motion many of the legal battles and human-rights violations that followed.

The track chronicles the pattern of personal betrayal that grew into institutional harm. It highlights how misleading claims, emotional manipulation, and weaponized allegations did not remain private conflicts — they ignited a chain reaction that spiraled into police involvement, custody warfare, interstate surveillance, and coordinated retaliation.`
    },
    {
      trackNumber: 4,
      title: "Double Dipped",
      content: `"Double Dipped" is one of the album's most pointed indictments of personal betrayal colliding with state-enabled corruption. In this track, Don Matthews pulls back the curtain on a specific form of fraud that reshaped his life: Phyllis Crowder's repeated attempts to "double dip" on child support by claiming she never received payments that, in fact, had already been issued.

The song dissects how Crowder submitted a false affidavit while the artist was in prison, misrepresenting her payment history to trigger a manufactured arrearage. Instead of correcting the deception, the Mississippi Attorney General's Office and state child-support agencies let the fraud stand — effectively transforming a private lie into a state-backed weapon of oppression.`
    },
    {
      trackNumber: 5,
      title: "Morgan County Blues",
      content: `"Morgan County Blues" is one of the most haunting narrative tracks on Bad Actors, and it steps outside Don Matthews' own battles to spotlight another victim of manufactured criminality: Joshua Grover, a Utah real estate photographer whose only "crime" was doing his job.

The song recounts how Grover was arrested in Morgan County while lawfully photographing a property. The track exposes how fragile a person's freedom becomes when officers choose narrative over truth, and how quickly a livelihood can be destroyed by a single dishonest report.`
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
      content: `They swore an oath. They signed their names. They stood before a judge and declared it was the truth. But it wasn't. This is the story of a warrant built on fabrications—a legal document that should represent justice, instead weaponized to destroy an innocent life.`
    },
    {
      trackNumber: 8,
      title: "The Crowder Files",
      content: `"The Crowder Files" serves as the documentary centerpiece of the album's exposure of Phyllis "Liz" Crowder's role in the coordinated campaign against Don Matthews. This track compiles the receipts—the false statements, the manipulated legal filings, the weaponized agencies, and the trail of destruction left in the wake of personal vendetta transformed into state action.`
    },
    {
      trackNumber: 9,
      title: "Eleven Months Too Long",
      content: `"Eleven Months Too Long" documents one of the most egregious examples of pretrial detention abuse in the Bad Actors saga. This track chronicles the nearly year-long imprisonment endured without conviction—eleven months of freedom stolen, life suspended, and constitutional rights trampled.`
    },
    {
      trackNumber: 10,
      title: "Caught Red Handed",
      content: `"Caught Red Handed" is the receipts track—the moment when all the documentation, all the evidence, all the contradictions come together to prove what was always true: they lied, and they got caught.`
    },
    {
      trackNumber: 11,
      title: "Osteen Lied",
      content: `Three words. Undeniable truth. Documented proof. Osteen lied. Not once. Not by accident. Not a misunderstanding. A calculated, deliberate, provable lie that destroyed lives and perverted justice.`
    },
    {
      trackNumber: 12,
      title: "Land of the Free, Unless Its Me",
      content: `"Land of the Free, Unless Its Me" confronts the bitter irony at the heart of American justice: the freedoms we celebrate don't apply equally to everyone. This track examines how constitutional protections evaporate when you become a target, how rights become privileges revoked at the discretion of those in power.`
    },
    {
      trackNumber: 13,
      title: "She Called The State",
      content: `"She Called The State" documents the moment when personal conflict became state-sponsored persecution. This track examines how a single phone call can activate an entire apparatus of government power against an individual.`
    },
    {
      trackNumber: 14,
      title: "Osteen's Fall",
      content: `Every corrupt empire eventually crumbles. Every bad actor eventually faces their reckoning. This track chronicles the downfall—when the evidence became overwhelming, when the lies could no longer be sustained, when justice finally began to turn its gaze toward the guilty.`
    },
    {
      trackNumber: 15,
      title: "The Gaslight Anthem",
      content: `"You're crazy. That didn't happen. You're misremembering. Nobody will believe you." The anthem of the gaslighter. This track reclaims reality. It documents the gaslighting tactics used by those in power to make victims question their own truth.`
    },
    {
      trackNumber: 16,
      title: "Governors Gone Too Far",
      content: `When corruption reaches the highest levels of state government, when the governor's office itself becomes complicit in covering up injustice, someone has to say it out loud: The Governor's Gone Too Far.`
    },
    {
      trackNumber: 17,
      title: "Scandalous",
      content: `"Scandalous" closes the album with the most personal betrayal of all—the scandalous acts committed by the woman I married and had three children with. This track documents the calculated destruction that came from within my own home.`
    },
  ];

  const upcomingAlbums = [
    {
      title: "Bad Actors Volume 2",
      status: "In Production",
      description: "The story continues with even more documented cases of corruption, injustice, and the fight for accountability. Volume 2 features direct recordings from courtrooms and police interactions that were previously suppressed.",
      updates: [
        "New single 'The Extradition' coming next month",
        "Behind-the-scenes footage from the Mississippi State Capitol",
        "Early access available for email subscribers",
      ]
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white selection:bg-police-red selection:text-white">
      {/* Top Banner */}
      <div className="bg-police-red text-white py-2 px-4 text-center font-bold text-[11px] sm:text-sm tracking-wide sm:tracking-widest uppercase">
        Now Streaming on all platforms • Deploying to badactors.online
      </div>

      <AlbumHero
        title="Bad Actors - Volume 1"
        artist="Don Matthews"
        releaseDate="September 1, 2025"
        youtubePlaylistId="OLAK5uy_m5AmZDrY2kX__kNhYE1jkhmY1LLTZi1cE"
        currentTrack={currentTrack}
        tracks={tracks}
        streamingLinks={streamingLinks}
        onDownloadClick={() => setIsDownloadModalOpen(true)}
      />

      <div className="container mx-auto px-4 py-8 sm:py-12">
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
          <div className="lg:col-span-2 space-y-16 md:space-y-24">
            <TrackList
              tracks={tracks}
              stories={stories}
              currentTrack={currentTrack}
              onTrackSelect={setCurrentTrack}
            />
            
            <StoriesSection stories={stories} onTrackSelect={setCurrentTrack} />
          </div>
          
          <div className="space-y-10 md:space-y-12">
            <div className="lg:sticky lg:top-8 space-y-10 md:space-y-12">
              <div className="bg-zinc-900 border-2 border-police-red p-5 sm:p-8">
                <h3 className="text-xl sm:text-2xl font-black text-police-red mb-5 sm:mb-6 uppercase tracking-tighter italic">Streaming Platforms</h3>
                <div className="grid grid-cols-1 gap-3">
                  {streamingLinks.map((link) => (
                    <a
                      key={link.platform}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-3 sm:p-4 bg-black border border-white/10 hover:border-police-red transition-all group"
                    >
                      <span className="font-bold group-hover:text-police-red">{link.platform}</span>
                      <div className="w-8 h-8 rounded-full bg-police-red/10 flex items-center justify-center group-hover:bg-police-red transition-all">
                        <span className="text-police-red group-hover:text-white">→</span>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              <UpcomingAlbums albums={upcomingAlbums} />

              <div className="bg-crime-yellow text-black p-5 sm:p-8 border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                <h3 className="text-xl sm:text-2xl font-black mb-4 uppercase tracking-tighter">Volume 2 Sneak Peek</h3>
                <p className="font-bold mb-6 italic leading-snug">
                  "They thought the first volume was the end. It was just the introduction."
                </p>
                <div className="aspect-video bg-black flex items-center justify-center border-2 border-black group cursor-pointer relative overflow-hidden">
                  <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-40 group-hover:scale-110 transition-transform duration-700" />
                  <div className="relative z-10 text-center">
                    <div className="w-12 h-12 rounded-full bg-crime-yellow flex items-center justify-center mx-auto mb-2 border-2 border-black">
                      <div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-black border-b-[6px] border-b-transparent ml-1" />
                    </div>
                    <span className="text-xs font-black uppercase">Play Teaser</span>
                  </div>
                </div>
                <button 
                  onClick={() => setIsDownloadModalOpen(true)}
                  className="w-full mt-6 py-4 bg-black text-white font-black uppercase tracking-widest hover:bg-zinc-800 transition-colors"
                >
                  Get Early Access
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <EmailCapture
        isOpen={isDownloadModalOpen}
        onClose={() => setIsDownloadModalOpen(false)}
        onSubmit={handleEmailSubmit}
        downloadUrl={import.meta.env.VITE_DOWNLOAD_URL || "https://distrokid.com/hyperfollow/donmatthews/bad-actors-volume-1"}
      />
      
      <footer className="py-14 sm:py-24 border-t-4 border-police-red bg-zinc-950 mt-14 sm:mt-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="text-center md:text-left">
              <h2 className="text-3xl sm:text-4xl font-black text-white mb-4 tracking-tighter italic">BAD ACTORS</h2>
              <p className="text-zinc-500 max-w-md mx-auto md:mx-0">
                A documentary music project by Don Matthews. Exposing institutional corruption, one track at a time. North Mississippi and beyond.
              </p>
            </div>
            <div className="text-center md:text-right">
              <p className="text-white font-bold text-base sm:text-lg">
                © 2025 Don Matthews. All rights reserved.
              </p>
              <p className="text-police-red font-black text-lg sm:text-xl mt-2 tracking-tighter uppercase italic">
                Truth. Justice. Accountability.
              </p>
              <p className="text-zinc-600 text-sm mt-4 font-mono">
                Deploying to badactors.online
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
