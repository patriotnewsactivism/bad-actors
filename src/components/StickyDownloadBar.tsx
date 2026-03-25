import { useState, useEffect } from "react";
import { Download, X } from "lucide-react";

interface StickyDownloadBarProps {
  onDownloadClick: () => void;
}

const StickyDownloadBar = ({ onDownloadClick }: StickyDownloadBarProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // Check if user already submitted email
    const storedEmails = localStorage.getItem("captured_emails");
    if (storedEmails) {
      const emails = JSON.parse(storedEmails);
      if (emails.length > 0) return; // Don't show if already subscribed
    }

    const handleScroll = () => {
      // Show after scrolling past 600px (roughly past the hero)
      setIsVisible(window.scrollY > 600);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (isDismissed || !isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 animate-in slide-in-from-bottom duration-300">
      <div className="bg-black/95 backdrop-blur-sm border-t-2 border-police-red shadow-[0_-4px_30px_rgba(255,0,0,0.2)]">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <div className="hidden sm:flex w-8 h-8 bg-police-red/20 items-center justify-center shrink-0">
              <Download className="w-4 h-4 text-police-red" />
            </div>
            <div className="min-w-0">
              <p className="text-white font-black text-sm sm:text-base uppercase tracking-tight truncate">
                Get Bad Actors Volume 1 <span className="text-crime-yellow">FREE</span>
              </p>
              <p className="text-zinc-500 text-xs hidden sm:block">
                17 tracks exposing corruption. Enter your email to download.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={onDownloadClick}
              className="px-5 py-2.5 bg-police-red text-white font-black text-sm uppercase tracking-wider hover:bg-red-700 transition-all"
            >
              Download Free
            </button>
            <button
              onClick={() => setIsDismissed(true)}
              className="p-2 text-zinc-500 hover:text-white transition-colors"
              aria-label="Dismiss"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StickyDownloadBar;
