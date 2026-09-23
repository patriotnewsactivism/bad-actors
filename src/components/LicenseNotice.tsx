import { FREE_DOWNLOAD_LICENSE, PAID_DOWNLOAD_LICENSE } from "@/lib/licenseCopy";

interface LicenseNoticeProps {
  /** "paid" shows the shared line plus the HFCD paid-path add-on. */
  variant?: "free" | "paid";
  className?: string;
}

/**
 * Visible personal-listening license notice for free / paid download CTAs.
 * Single-sourced from src/lib/licenseCopy.ts.
 */
const LicenseNotice = ({ variant = "free", className = "" }: LicenseNoticeProps) => {
  return (
    <div className={`space-y-1.5 ${className}`}>
      <p className="text-zinc-500 text-[11px] sm:text-xs leading-relaxed text-center">
        {FREE_DOWNLOAD_LICENSE}
      </p>
      {variant === "paid" && (
        <p className="text-zinc-500 text-[11px] sm:text-xs leading-relaxed text-center">
          {PAID_DOWNLOAD_LICENSE}
        </p>
      )}
    </div>
  );
};

export default LicenseNotice;
