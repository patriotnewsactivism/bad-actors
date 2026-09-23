// RightsDesk-approved personal-listening license copy (2026-09-22).
// Keep in sync with src/lib/licenseCopy.ts — exact strings only.

export const FREE_DOWNLOAD_LICENSE =
  "© Outlawed Productions / Bad Actors. All rights reserved. Free download is for personal listening only. No redistribution, commercial use, sampling, or public-domain claim.";

export const PAID_DOWNLOAD_LICENSE =
  "Your purchase is a personal-listening download. It does not include commercial, sync, sampling, or redistribution rights.";

/** HTML paragraph(s) for confirmation emails. */
export function licenseEmailHtml({ paid = false } = {}) {
  const shared = `<p style="font-size:12px;color:#666;line-height:1.5;margin-top:24px;">${FREE_DOWNLOAD_LICENSE}</p>`;
  if (!paid) return shared;
  return `${shared}<p style="font-size:12px;color:#666;line-height:1.5;">${PAID_DOWNLOAD_LICENSE}</p>`;
}
