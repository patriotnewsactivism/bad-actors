import { useEffect, useRef, useState } from "react";
import { Play, Pause, Download, Loader2, CheckCircle, Flame, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface SingleReleasePromoProps {
  trackSlug: string;
  title: string;
  audioSrc: string;
  countEndpoint: string;
  claimEndpoint: string;
  checkoutEndpoint: string;
  checkoutVerifyEndpoint: string;
  cap?: number;
  price?: string;
  coverImage?: string;
}

const SingleReleasePromo = ({
  trackSlug,
  title,
  audioSrc,
  countEndpoint,
  claimEndpoint,
  checkoutEndpoint,
  checkoutVerifyEndpoint,
  cap = 100,
  price = "$1.99",
  coverImage,
}: SingleReleasePromoProps) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [remaining, setRemaining] = useState<number | null>(null);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error" | "checking-out">("idle");
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [alreadyClaimed, setAlreadyClaimed] = useState(false);
  const [isPaidPurchase, setIsPaidPurchase] = useState(false);

  useEffect(() => {
    fetch(`${countEndpoint}?track=${trackSlug}`)
      .then((r) => r.json())
      .then((d) => {
        if (typeof d.remaining === "number") setRemaining(d.remaining);
      })
      .catch(() => {});

    // Returning from Stripe Checkout? Verify server-side before showing anything.
    const params = new URLSearchParams(window.location.search);
    const sessionId = params.get("single_checkout_session_id");
    if (sessionId) {
      setStatus("loading");
      fetch(`${checkoutVerifyEndpoint}?session_id=${sessionId}`)
        .then((r) => r.json())
        .then((d) => {
          if (d.paid && d.downloadUrl) {
            setDownloadUrl(d.downloadUrl);
            setIsPaidPurchase(true);
            setStatus("success");
          } else {
            setStatus("idle");
          }
        })
        .catch(() => setStatus("idle"));
    }
  }, [countEndpoint, checkoutVerifyEndpoint, trackSlug]);

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

  const handleFreeSubmit = async (e: React.FormEvent) => {
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
        setStatus("idle");
        return;
      }
      if (!res.ok || !data.success) throw new Error(data.error || "Failed");
      setDownloadUrl(data.downloadUrl);
      setAlreadyClaimed(!!data.alreadyClaimed);
      setIsPaidPurchase(false);
      if (typeof data.remaining === "number") setRemaining(data.remaining);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  const handleBuyClick = async () => {
    setStatus("checking-out");
    try {
      const res = await fetch(checkoutEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email || undefined, track: trackSlug }),
      });
      const data = await res.json();
      if (!res.ok || !data.url) throw new Error(data.error || "Failed");
      window.location.href = data.url;
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
          {price} Digital Download — First {cap} Free
        </p>

        {coverImage && (
          <div className="max-w-sm mx-auto mb-8 border-2 border-crime-yellow/60 shadow-2xl">
            <img
              src={coverImage}
              alt={`${title} — free download, first ${cap} only`}
              className="w-full aspect-square object-cover"
              loading="eager"
            />
          </div>
        )}

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
                All {cap} free downloads claimed — now {price}
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
                {isPaidPurchase
                  ? "Thanks for your purchase — check your email"
                  : alreadyClaimed
                  ? "Here's your download again"
                  : "You're in — check your email"}
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
            <div className="space-y-3">
              <Input
                type="email"
                placeholder="your@email.com (for your receipt)"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-black border-2 border-police-red text-white placeholder:text-muted-foreground focus-visible:ring-police-red focus-visible:border-crime-yellow"
              />
              <Button
                onClick={handleBuyClick}
                disabled={status === "checking-out" || status === "loading"}
                className="w-full bg-crime-yellow text-black font-bold uppercase tracking-wide hover:bg-crime-yellow/90 border-2 border-crime-yellow disabled:opacity-50"
              >
                {status === "checking-out" ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" /> Redirecting to checkout&hellip;
                  </>
                ) : (
                  <>
                    <CreditCard className="w-5 h-5" /> Buy for {price}
                  </>
                )}
              </Button>
              {status === "error" && (
                <p className="text-police-red text-xs font-bold uppercase text-center">
                  Something went wrong. Please try again.
                </p>
              )}
            </div>
          ) : (
            <form onSubmit={handleFreeSubmit} className="space-y-3">
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
              {status === "error" && (
                <p className="text-police-red text-xs font-bold uppercase text-center">
                  Something went wrong. Please try again.
                </p>
              )}
              <p className="text-muted-foreground text-xs text-center uppercase tracking-wide">
                We respect your privacy. No spam, ever. {price} after the first {cap} claims.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default SingleReleasePromo;
