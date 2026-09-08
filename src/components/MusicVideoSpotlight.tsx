/**
 * "Caught Red Handed" — official Bad Actors music video.
 *
 * Self-hosted MP4 in a native <video> element — no third-party embed that can
 * rot (YouTube/Facebook links flap or die), and playback stays entirely
 * in-page per the standing site rule. Click-to-play keeps the 35MB file off
 * the homepage's initial payload: nothing loads until the visitor presses
 * play (poster frame is a ~23KB JPEG).
 */

const VIDEO_SRC =
  "https://base44.app/api/apps/6a989933e9ce9588d8c0e8a7/files/mp/public/6a989933e9ce9588d8c0e8a7/01e02f0a2_0d253d827_EPICNewMusicVideoReleaseCaughtRedHandeddropsthehammeronMulti-StateConspiracy.mp4";
const POSTER_SRC =
  "https://base44.app/api/apps/6a989933e9ce9588d8c0e8a7/files/mp/public/6a989933e9ce9588d8c0e8a7/654ef940b_caught-red-handed-poster.jpg";

const MusicVideoSpotlight = () => {
  return (
    <section className="relative bg-black py-10 sm:py-14 border-y-2 border-police-red/40">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-6 sm:mb-8">
          <p className="text-police-red font-semibold text-xs sm:text-sm uppercase tracking-widest">
            New Music Video
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight text-foreground mt-2 italic uppercase">
            Caught Red Handed
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base mt-3">
            Dropping the hammer on the multi-state conspiracy. Track 10 — Bad Actors Volume 1.
          </p>
        </div>

        <div
          className="mx-auto bg-black border-2 border-police-red/60 shadow-[0_0_40px_rgba(220,38,38,0.25)] overflow-hidden"
          style={{ width: "min(100%, 960px)" }}
        >
          <video
            controls
            preload="none"
            poster={POSTER_SRC}
            playsInline
            className="block h-auto w-full"
            style={{ aspectRatio: "16 / 9" }}
            title="Caught Red Handed — Bad Actors music video"
          >
            <source src={VIDEO_SRC} type="video/mp4" />
            Your browser does not support embedded video.
          </video>
        </div>

        <p className="text-center text-[11px] sm:text-xs text-muted-foreground mt-4 uppercase tracking-wider">
          Evidence on film · Volume 1 out now
        </p>
      </div>
    </section>
  );
};

export default MusicVideoSpotlight;
