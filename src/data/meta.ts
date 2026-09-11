/**
 * Single source of truth for the site's identity and dating.
 *
 * Public debate needs an accountable author and a citable date: the footer
 * and the press-kit exports read this file, so a content update is one edit.
 */

export const META = {
  version: "0.3.0",
  /** When the data was last meaningfully updated. */
  dataAsOf: "2026-09-11",
  author: {
    name: "Cristian Nichifor",
    email: "cristian@cristian-nichifor.com",
  },
  repo: "https://github.com/CristianNichifor/digital-romania-atlas",
  issues: "https://github.com/CristianNichifor/digital-romania-atlas/issues",
} as const;
