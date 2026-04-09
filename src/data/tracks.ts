export interface Track {
  number: number;
  title: string;
  slug: string;
  duration: string;
  durationISO: string;
  youtubeId?: string;
}

export interface Story {
  title: string;
  content: string;
  trackNumber?: number;
}

export interface StreamingLink {
  platform: string;
  url: string;
}

export const tracks: Track[] = [
  { number: 1, title: "Silence Ain't Consent", slug: "silence-aint-consent", duration: "3:33", durationISO: "PT3M33S" },
  { number: 2, title: "Unbroken", slug: "unbroken", duration: "5:04", durationISO: "PT5M4S" },
  { number: 3, title: "In the Shadows Tonight", slug: "in-the-shadows-tonight", duration: "4:19", durationISO: "PT4M19S" },
  { number: 4, title: "Double Dipped", slug: "double-dipped", duration: "4:17", durationISO: "PT4M17S" },
  { number: 5, title: "Morgan County Blues", slug: "morgan-county-blues", duration: "4:04", durationISO: "PT4M4S" },
  { number: 6, title: "The Osteen Files (Exhibit L)", slug: "the-osteen-files-exhibit-l", duration: "3:50", durationISO: "PT3M50S" },
  { number: 7, title: "A Warrant For A Lie", slug: "a-warrant-for-a-lie", duration: "3:34", durationISO: "PT3M34S" },
  { number: 8, title: "The Crowder Files", slug: "the-crowder-files", duration: "3:33", durationISO: "PT3M33S" },
  { number: 9, title: "Eleven Months Too Long", slug: "eleven-months-too-long", duration: "3:48", durationISO: "PT3M48S" },
  { number: 10, title: "Caught Red Handed", slug: "caught-red-handed", duration: "4:00", durationISO: "PT4M0S" },
  { number: 11, title: "Osteen Lied", slug: "osteen-lied", duration: "3:36", durationISO: "PT3M36S" },
  { number: 12, title: "Land of the Free, Unless Its Me", slug: "land-of-the-free-unless-its-me", duration: "4:12", durationISO: "PT4M12S" },
  { number: 13, title: "She Called The State", slug: "she-called-the-state", duration: "3:55", durationISO: "PT3M55S" },
  { number: 14, title: "Osteen's Fall", slug: "osteens-fall", duration: "3:27", durationISO: "PT3M27S" },
  { number: 15, title: "The Gaslight Anthem", slug: "the-gaslight-anthem", duration: "2:29", durationISO: "PT2M29S" },
  { number: 16, title: "Governors Gone Too Far", slug: "governors-gone-too-far", duration: "3:22", durationISO: "PT3M22S" },
  { number: 17, title: "Scandalous", slug: "scandalous", duration: "3:14", durationISO: "PT3M14S" },
];

export const streamingLinks: StreamingLink[] = [
  { platform: "Apple Music", url: "https://music.apple.com/au/album/bad-actors-volume-1/1863402949" },
  { platform: "Spotify", url: "https://open.spotify.com/album/bad-actors-volume-1" },
  { platform: "YouTube Music", url: "https://music.youtube.com/playlist?list=OLAK5uy_m5AmZDrY2kX__kNhYE1jkhmY1LLTZi1cE&si=dyuOTX4AcfYaUuo0" },
  { platform: "BandLab", url: "https://www.bandlab.com/badactors" },
  { platform: "SoundCloud", url: "https://soundcloud.com/don-matthews-268378810/sets/bad-actors-volume-1" },
];

export const stories: Story[] = [
  {
    title: "The Birth of Bad Actors",
    content: `This album represents more than just music—it's a testimony to truth and justice in a system that often fails both. Each track tells a real story, documents real corruption, and demands real accountability.\n\nThe title "Bad Actors" refers to those in positions of power who abuse their authority, betray the public trust, and escape consequences. This is my way of shining a light into the darkest corners of institutional corruption in North Mississippi and beyond.`
  },
  {
    trackNumber: 1,
    title: "Silence Ain't Consent",
    content: `This opening track sets the tone for everything that follows. When communities stay silent in the face of corruption, that silence is often mistaken for consent. But make no mistake—silence is not agreement. It's often fear, exhaustion, or learned helplessness.\n\nThis is North Mississippi's warning: we're not staying silent anymore.`
  },
  {
    trackNumber: 2,
    title: "Unbroken",
    content: `"Unbroken" is the heartbeat of the Bad Actors album — the moment where the storytelling stops whispering and starts roaring. This track is Matthew Reardon, a.k.a. Don Matthews, stripped down to the bone and refusing to fold. It's the sound of a man who's been shoved, jailed, smeared, surveilled, extradited, and assaulted — and still shows up with the camera rolling and the Constitution in hand.\n\nThe song doesn't glorify survival; it documents it. Every verse is pulled from the wreckage of real events: corrupt cops filing false reports, officials crossing state lines to retaliate, a system that chose power over truth. But instead of breaking, the pressure forged steel.\n\n"Unbroken" is the declaration that no matter how many times they tried to disappear your voice — in a cell, in a hospital, in a courtroom, on a sidewalk outside a governor's mansion — you walked out stronger. The hook hits like a verdict: you're still here, and you're not bending for anyone.`
  },
  {
    trackNumber: 3,
    title: "In the Shadows Tonight",
    content: `"In the Shadows Tonight (The Reckoning)" stands as one of the most confrontational and revealing tracks on Bad Actors. Rather than focusing solely on systemic actors or government power, this song turns its gaze toward a more intimate origin of destruction: Phyllis "Liz" Crowder, the artist's ex, whose false accusations and manipulative actions set in motion many of the legal battles and human-rights violations that followed.\n\nThe track chronicles the pattern of personal betrayal that grew into institutional harm. It highlights how misleading claims, emotional manipulation, and weaponized allegations did not remain private conflicts — they ignited a chain reaction that spiraled into police involvement, custody warfare, interstate surveillance, and coordinated retaliation.`
  },
  {
    trackNumber: 4,
    title: "Double Dipped",
    content: `"Double Dipped" is one of the album's most pointed indictments of personal betrayal colliding with state-enabled corruption. In this track, Don Matthews pulls back the curtain on a specific form of fraud that reshaped his life: Phyllis Crowder's repeated attempts to "double dip" on child support by claiming she never received payments that, in fact, had already been issued.\n\nThe song dissects how Crowder submitted a false affidavit while the artist was in prison, misrepresenting her payment history to trigger a manufactured arrearage. Instead of correcting the deception, the Mississippi Attorney General's Office and state child-support agencies let the fraud stand — effectively transforming a private lie into a state-backed weapon of oppression.`
  },
  {
    trackNumber: 5,
    title: "Morgan County Blues",
    content: `"Morgan County Blues" is one of the most haunting narrative tracks on Bad Actors, and it steps outside Don Matthews' own battles to spotlight another victim of manufactured criminality: Joshua Grover, a Utah real estate photographer whose only "crime" was doing his job.\n\nThe song recounts how Grover was arrested in Morgan County while lawfully photographing a property. The track exposes how fragile a person's freedom becomes when officers choose narrative over truth, and how quickly a livelihood can be destroyed by a single dishonest report.`
  },
  {
    trackNumber: 6,
    title: "The Osteen Files (Exhibit L)",
    content: `Exhibit L. Just one letter. One piece of evidence in a mountain of documentation that reveals a pattern of misconduct so extensive, it required its own filing system.\n\nThis track chronicles the beginning of the Osteen investigation—where the first documents surfaced, where the lies began to unravel, and where the truth started demanding attention. When you need to alphabetize your corruption, you know the reckoning is coming.`
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

export function getTrackBySlug(slug: string): Track | undefined {
  return tracks.find(t => t.slug === slug);
}

export function getStoryByTrackNumber(trackNumber: number): Story | undefined {
  return stories.find(s => s.trackNumber === trackNumber);
}

export function getTrackByNumber(num: number): Track | undefined {
  return tracks.find(t => t.number === num);
}
