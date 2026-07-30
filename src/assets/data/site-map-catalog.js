/**
 * Site map catalog - single place to add/edit pages for help.html.
 * Search indexes title, description, href, tags, and keywords automatically.
 * Entries also merge with sitemap.xml at runtime for any URLs not listed here.
 */
window.SITE_MAP = {
    categories: [
        {
            id: "home",
            title: "Home & this site",
            description: "Main portfolio page, in-page sections, and this directory."
        },
        {
            id: "popcorn",
            title: "Popcorn kernel",
            description: "Learn-by-reading x86-64 kernel microsite (v0.6)."
        },
        {
            id: "activerse",
            title: "Activerse",
            description: "2D Java game engine - marketing site, version log, and wiki."
        },
        {
            id: "tools",
            title: "Other on-site pages",
            description: "Standalone utilities hosted in this repo."
        },
        {
            id: "external",
            title: "GitHub & external",
            description: "Repos and sites linked from the portfolio (open in a new tab)."
        },
        {
            id: "discovered",
            title: "Also on this site",
            description: "Pages found via sitemap.xml that are not listed above."
        }
    ],
    entries: [
        // Home
        {
            title: "Home (portfolio)",
            href: "index.html",
            description: "Hero, about, stats, skills, featured projects, timeline, and contact.",
            category: "home",
            tags: ["knivier", "agniva", "portfolio", "main"]
        },
        {
            title: "Site map / help",
            href: "help.html",
            description: "You are here - searchable directory of the whole site.",
            category: "home",
            tags: ["sitemap", "help", "navigation"]
        },
        {
            title: "About me",
            href: "index.html#about",
            description: "Jump to About - University of Michigan, Computer Engineering BSE.",
            category: "home",
            tags: ["about", "umich", "ann arbor"]
        },
        {
            title: "Quick stats",
            href: "index.html#stats",
            description: "Years of experience and project counts.",
            category: "home",
            tags: ["stats"]
        },
        {
            title: "Skill tree",
            href: "index.html#skills",
            description: "Web, backend languages, Python, and platforms.",
            category: "home",
            tags: ["skills"]
        },
        {
            title: "Featured projects",
            href: "index.html#projects",
            description: "Activerse, Popcorn, Stressor, and Fenrirwatch.",
            category: "home",
            tags: ["projects", "featured"]
        },
        {
            title: "Project timeline",
            href: "index.html#timeline",
            description: "Chronological highlights with links to repos and external sites.",
            category: "home",
            tags: ["timeline"]
        },
        {
            title: "Contact",
            href: "index.html#contact",
            description: "Email, Discord handle, GitHub, and YouTube.",
            category: "home",
            tags: ["contact", "email", "discord"]
        },

        // Popcorn
        {
            title: "Popcorn home",
            href: "popcorn.html",
            description: "Landing, spec chips, and demo terminal (shell / build tabs).",
            category: "popcorn",
            tags: ["kernel", "os", "qemu"]
        },
        {
            title: "About Popcorn",
            href: "aboutpopcorn.html",
            description: "What it is, features, pops, build requirements, status.",
            category: "popcorn",
            tags: ["about"]
        },
        {
            title: "Operation map",
            href: "popcorn-kernel.html",
            description: "Boot chain, init order, interactive tree, and Mermaid diagrams.",
            category: "popcorn",
            tags: ["boot", "vmm", "scheduler"]
        },
        {
            title: "Source catalog",
            href: "popcorn-source.html",
            description: "Every core/ and pops/ file with a dependency graph.",
            category: "popcorn",
            tags: ["source", "catalog", "graph"]
        },
        {
            title: "Popcorn on GitHub",
            href: "https://github.com/knivier/Popcorn",
            description: "Source repository and roadmap.",
            category: "popcorn",
            tags: ["github", "repo"],
            external: true
        },

        // Activerse
        {
            title: "Activerse home",
            href: "activerseinfo.html",
            description: "Main product / engine overview page.",
            category: "activerse",
            tags: ["java", "game engine"]
        },
        {
            title: "Version log",
            href: "actversions.html",
            description: "Release and version history for Activerse.",
            category: "activerse",
            tags: ["changelog", "versions"]
        },
        {
            title: "ActiWiki home",
            href: "ActiWiki/wiki.html",
            description: "Wiki table of contents and hub.",
            category: "activerse",
            tags: ["wiki"]
        },
        {
            title: "Wiki - Chapter 1",
            href: "ActiWiki/chapter1.html",
            description: "First wiki chapter.",
            category: "activerse",
            tags: ["wiki", "chapter"]
        },
        {
            title: "Wiki - Chapter 2",
            href: "ActiWiki/chapter2.html",
            description: "Second wiki chapter.",
            category: "activerse",
            tags: ["wiki", "chapter"]
        },
        {
            title: "Wiki - Chapter 3",
            href: "ActiWiki/chapter3.html",
            description: "Third wiki chapter.",
            category: "activerse",
            tags: ["wiki", "chapter"]
        },
        {
            title: "Wiki - Chapter X",
            href: "ActiWiki/chapterX.html",
            description: "Extra / extended wiki chapter.",
            category: "activerse",
            tags: ["wiki", "chapter"]
        },

        // Tools
        {
            title: "School countdown",
            href: "countdown.html",
            description: "Holiday / break countdown page.",
            category: "tools",
            tags: ["countdown", "calendar"]
        },

        // External
        {
            title: "GitHub - knivier",
            href: "https://github.com/knivier",
            description: "Main profile; most projects live here.",
            category: "external",
            tags: ["github", "profile"],
            external: true
        },
        {
            title: "Kinera",
            href: "https://github.com/knivier/Kinera",
            description: "Form grading / CV project (Spartahack 11).",
            category: "external",
            tags: ["github", "cv", "hackathon"],
            external: true
        },
        {
            title: "Fenrirwatch",
            href: "https://github.com/knivinstitute/fenrirwatch",
            description: "Windows security / auditing tool (Rust).",
            category: "external",
            tags: ["github", "rust", "security"],
            external: true
        },
        {
            title: "Stressor",
            href: "https://github.com/knivinstitute/Stressor",
            description: "Windows stress-testing tool (Rust).",
            category: "external",
            tags: ["github", "rust"],
            external: true
        },
        {
            title: "SkyCell",
            href: "https://github.com/knivier/SkyCell",
            description: "Disaster-relief communications (Apex Hackathon).",
            category: "external",
            tags: ["github", "hackathon"],
            external: true
        },
        {
            title: "WizViz",
            href: "https://github.com/knivier/WizViz",
            description: "Computer-vision wizard game (Spartahack X).",
            category: "external",
            tags: ["github", "game", "cv"],
            external: true
        },
        {
            title: "DockyMe",
            href: "https://github.com/knivier/DockyMe",
            description: "USB device logging utility.",
            category: "external",
            tags: ["github", "usb"],
            external: true
        },
        {
            title: "PiHi CompSci",
            href: "https://pihicompsci.org",
            description: "High school coding club site.",
            category: "external",
            tags: ["external", "club"],
            external: true
        },
        {
            title: "Troll Game",
            href: "https://github.com/knivier/trollgame",
            description: "Text adventure (discontinued).",
            category: "external",
            tags: ["github", "game"],
            external: true
        },
        {
            title: "Pal Bot",
            href: "https://github.com/knivier/PalBot",
            description: "Discord bot template.",
            category: "external",
            tags: ["github", "discord", "bot"],
            external: true
        },
        {
            title: "EduSpire",
            href: "https://eduspire.pages.dev/",
            description: "Spartahack 8 project (hosted on Pages).",
            category: "external",
            tags: ["hackathon", "pages"],
            external: true
        },
        {
            title: "YouTube",
            href: "https://www.youtube.com/@Knivier",
            description: "Channel link from the home page.",
            category: "external",
            tags: ["youtube", "social"],
            external: true
        }
    ]
};
