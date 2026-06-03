/**
 * Popcorn microsite — single place to change URLs, version, and external links.
 * Edit this file when renaming pages or bumping the highlighted version string.
 *
 * data-popcorn-page on #site-shell must be one of: landing | about | kernel | source
 */
window.POPCORN_SITE = {
    version: "0.6",

    /** Portfolio home (relative to each Popcorn HTML file at site root). */
    portfolioHref: "index.html",

    /** Internal Popcorn pages (filenames relative to site root). */
    pages: {
        landing: "popcorn.html",
        about: "aboutpopcorn.html",
        kernel: "popcorn-kernel.html",
        source: "popcorn-source.html",
    },

    external: {
        repo: "https://github.com/knivier/Popcorn",
        roadmap: "https://github.com/knivier/Popcorn/blob/main/roadmap.md",
        changelog: "https://github.com/knivier/Popcorn/blob/main/CHANGELOG-0.6.md",
    },

    /**
     * If you move Popcorn under a subfolder (e.g. popcorn/index.html), set to "../"
     * and update `pages` paths accordingly so assets + nav still resolve.
     */
    pathPrefix: "",
};
