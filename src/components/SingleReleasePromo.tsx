import { useEffect, useRef, useState } from "react";
import { Play, Pause, Download, Loader2, CheckCircle, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface SingleReleasePromoProps {
  trackSlug: string;
  title: string;
  audioSrc: string;
  countEndpoint: string;
  claimEndpoint: string;
  cap?: number;
}

const SingleReleasePromo = ({
  trackSlug,
  title,
  audioSrc,
  countEndpoint,
  claimEndpoint,
  cap = 100,
}: SingleReleasePromoProps) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [remaining, setRemaining] = useState<number | null>(null);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [alreadyClaimed, setAlreadyClaimed] = useState(false);

  useEffect(() => {
    fetch(`${countEndpoint}?track=${trackSlug}`)
      .then((r) => r.json())
      .then((d) => {
        if (typeof d.remaining === "number") setRemaining(d.remaining);
      })
      .catch(() => {});
  }, [countEndpoint, trackSlug]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch(() => {});
    }
  };

  const soldOut = remaining !== null && remaining <= 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || soldOut) return;
    setStatus("loading");
    try {
      const res = await fetch(claimEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name, track: trackSlug, source: "single-promo" }),
      });
      const data = await res.json();
      if (data.soldOut) {
        setRemaining(0);
        setStatus("error");
        return;
      }
      if (!res.ok || !data.success) throw new Error(data.error || "Failed");
      setDownloadUrl(data.downloadUrl);
      setAlreadyClaimed(!!data.alreadyClaimed);
      if (typeof data.remaining === "number") setRemaining(data.remaining);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="relative w-full bg-gradient-to-b from-zinc-950 via-black to-zinc-950 border-y-4 border-crime-yellow py-12 sm:py-16 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-crime-yellow/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10 max-w-3xl">
        <div className="flex items-center justify-center gap-2 mb-3">
          <Flame className="w-5 h-5 text-crime-yellow" />
          <span className="text-crime-yellow font-black uppercase tracking-[0.2em] text-xs sm:text-sm">
            Happy Fuck The Cops Day
          </span>
          <Flame className="w-5 h-5 text-crime-yellow" />
        </div>

        <h2 className="text-3xl sm:text-5xl font-black italic tracking-tighter text-white uppercase text-center leading-tight mb-2">
          {title}
        </h2>
        <p className="text-police-red font-bold uppercase tracking-widest text-center text-sm mb-8">
          Free Digital Download — First {cap} Only
        </p>

        <audio
          ref={audioRef}
          src={audioSrc}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onEnded={() => setIsPlaying(false)}
        />

        <div className="bg-black border-2 border-police-red p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-4">
            <button
              onClick={togglePlay}
              className="flex-shrink-0 w-14 h-14 rounded-full bg-crime-yellow text-black flex items-center justify-center hover:bg-crime-yellow/90 transition-colors"
              aria-label={isPlaying ? "Pause preview" : "Play preview"}
            >
              {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
            </button>
            <div>
              <p className="text-white font-bold uppercase tracking-wide">{title}</p>
              <p className="text-muted-foreground text-xs uppercase tracking-widest">Tap to preview</p>
            </div>
          </div>

          <div className="text-center">
            {remaining === null ? (
              <p className="text-zinc-500 text-xs uppercase tracking-widest">Checking availability&hellip;</p>
            ) : soldOut ? (
              <p className="text-police-red font-black uppercase tracking-widest text-sm">
                All {cap} free downloads claimed
              </p>
            ) : (
              <p className="text-crime-yellow font-bold uppercase tracking-widest text-sm">
                {remaining} of {cap} free downloads left
              </p>
            )}
          </div>

          {status === "success" ? (
            <div className="flex flex-col items-center gap-4 py-4">
              <CheckCircle className="w-12 h-12 text-crime-yellow" />
              <p className="text-white font-bold uppercase tracking-wide text-center">
                {alreadyClaimed ? "Here's your download again" : "You're in — check your email"}
              </p>
              {downloadUrl && (
                <a
                  href={downloadUrl}
                  className="flex items-center gap-2 px-8 py-3 bg-crime-yellow text-black font-bold uppercase tracking-wide hover:bg-crime-yellow/90 transition-all border-2 border-crime-yellow"
                >
                  <Download className="w-5 h-5" />
                  Download Now
                </a>
              )}
            </div>
          ) : soldOut ? (
            <div className="text-center py-2">
              <a
                href="https://www.bandlab.com/badactors"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-6 py-3 bg-black border-2 border-crime-yellow text-crime-yellow font-bold uppercase tracking-wide hover:bg-crime-yellow hover:text-black transition-all"
              >
                Stream It Instead
              </a>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              <Input
                type="email"
                required
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-black border-2 border-police-red text-white placeholder:text-muted-foreground focus-visible:ring-police-red focus-visible:border-crime-yellow"
              />
              <Input
                type="text"
                placeholder="Name (optional)"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-black border-2 border-police-red text-white placeholder:text-muted-foreground focus-visible:ring-police-red focus-visible:border-crime-yellow"
              />
              <Button
                type="submit"
                disabled={status === "loading"}
                className="w-full bg-crime-yellow text-black font-bold uppercase tracking-wide hover:bg-crime-yellow/90 border-2 border-crime-yellow disabled:opacity-50"
              >
                {status === "loading" ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" /> Sending&hellip;
                  </>
                ) : (
                  <>
                    <Download className="w-5 h-5" /> Get Free Download
                  </>
                )}
              </Button>
              {status === "error" && !soldOut && (
                <p className="text-police-red text-xs font-bold uppercase text-center">
                  Something went wrong. Please try again.
                </p>
              )}
              <p className="text-muted-foreground text-xs text-center uppercase tracking-wide">
                We respect your privacy. No spam, ever.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default SingleReleasePromo;
