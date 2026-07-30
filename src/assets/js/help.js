(function () {
    const catalog = window.SITE_MAP;
    if (!catalog) {
        console.warn("SITE_MAP catalog missing");
        return;
    }

    const grid = document.getElementById("navigation-grid");
    const searchInput = document.getElementById("searchInput");
    const resultMeta = document.getElementById("search-meta");
    const emptyState = document.getElementById("search-empty");

    let entries = [...catalog.entries];
    let categories = [...catalog.categories];

    function normalize(text) {
        return String(text || "")
            .toLowerCase()
            .normalize("NFKD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/[^a-z0-9/#.\s_-]+/g, " ")
            .replace(/\s+/g, " ")
            .trim();
    }

    function tokenize(query) {
        return normalize(query).split(" ").filter(Boolean);
    }

    function haystack(entry) {
        return normalize([
            entry.title,
            entry.description,
            entry.href,
            entry.category,
            ...(entry.tags || []),
            entry.keywords || ""
        ].join(" "));
    }

    function scoreEntry(entry, tokens) {
        if (!tokens.length) return 1;
        const hay = haystack(entry);
        const title = normalize(entry.title);
        let score = 0;

        for (const token of tokens) {
            if (!hay.includes(token)) return 0;
            score += 1;
            if (title.startsWith(token)) score += 3;
            else if (title.includes(token)) score += 2;
            if ((entry.tags || []).some((tag) => normalize(tag).includes(token))) score += 1.5;
            if (normalize(entry.href).includes(token)) score += 1;
        }

        return score;
    }

    function pathToTitle(pathname) {
        const file = pathname.split("/").filter(Boolean).pop() || "Home";
        return file
            .replace(/\.html?$/i, "")
            .replace(/[-_]+/g, " ")
            .replace(/\b\w/g, (c) => c.toUpperCase());
    }

    function sitePathFromLoc(loc) {
        try {
            const url = new URL(loc);
            let path = url.pathname.replace(/^\//, "");
            if (!path || path.endsWith("/")) path = path + "index.html";
            if (!path.endsWith(".html") && !path.includes(".")) path = path.replace(/\/?$/, "/index.html");
            return path.replace(/^\/+/, "");
        } catch {
            return null;
        }
    }

    function knownPaths() {
        return new Set(
            entries
                .filter((e) => !e.external && !/^https?:/i.test(e.href))
                .map((e) => e.href.split("#")[0].replace(/^\.\//, ""))
        );
    }

    async function mergeSitemapDiscoveries() {
        try {
            const res = await fetch("sitemap.xml", { cache: "no-store" });
            if (!res.ok) return;
            const xml = await res.text();
            const locs = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1].trim());
            const known = knownPaths();
            let added = 0;

            for (const loc of locs) {
                const path = sitePathFromLoc(loc);
                if (!path || known.has(path) || path === "index.html") continue;
                // index is already covered; skip roots mapped to index
                if (path === "" || path === "/") continue;
                known.add(path);
                entries.push({
                    title: pathToTitle(path),
                    href: path,
                    description: "Discovered from sitemap.xml",
                    category: "discovered",
                    tags: ["sitemap", "auto"]
                });
                added += 1;
            }

            if (added > 0) render();
        } catch {
            // Offline / file:// - catalog-only is fine
        }
    }

    function render(activeEntries = entries, query = "") {
        const tokens = tokenize(query);
        const byCategory = new Map(categories.map((c) => [c.id, []]));

        const ranked = activeEntries
            .map((entry) => ({ entry, score: scoreEntry(entry, tokens) }))
            .filter((row) => row.score > 0)
            .sort((a, b) => b.score - a.score || a.entry.title.localeCompare(b.entry.title));

        for (const { entry } of ranked) {
            if (!byCategory.has(entry.category)) byCategory.set(entry.category, []);
            byCategory.get(entry.category).push(entry);
        }

        grid.innerHTML = "";
        let visibleCount = 0;

        for (const category of categories) {
            const list = byCategory.get(category.id) || [];
            if (!list.length) continue;
            if (category.id === "discovered" && !list.length) continue;

            visibleCount += list.length;

            const section = document.createElement("section");
            section.className = "nav-section glass";
            section.dataset.category = category.id;

            const header = document.createElement("div");
            header.className = "section-header";
            header.innerHTML = `<h2 class="section-title">${escapeHtml(category.title)}</h2>`;

            const desc = document.createElement("p");
            desc.className = "section-description";
            desc.textContent = category.description;

            const ul = document.createElement("ul");
            ul.className = "page-list";

            for (const entry of list) {
                const li = document.createElement("li");
                li.className = "page-item";
                li.dataset.search = haystack(entry);

                const isExternal = entry.external || /^https?:/i.test(entry.href);
                const a = document.createElement("a");
                a.className = "page-link";
                a.href = entry.href;
                a.textContent = entry.title;
                if (isExternal) {
                    a.target = "_blank";
                    a.rel = "noopener noreferrer";
                }

                const p = document.createElement("p");
                p.className = "page-description";
                p.textContent = entry.description;

                li.appendChild(a);
                li.appendChild(p);
                ul.appendChild(li);
            }

            section.appendChild(header);
            section.appendChild(desc);
            section.appendChild(ul);
            grid.appendChild(section);
        }

        if (resultMeta) {
            if (!query.trim()) {
                resultMeta.textContent = `${entries.length} pages & links`;
            } else {
                resultMeta.textContent = `${visibleCount} result${visibleCount === 1 ? "" : "s"} for "${query.trim()}"`;
            }
        }

        if (emptyState) {
            emptyState.hidden = visibleCount > 0;
        }
    }

    function escapeHtml(str) {
        return String(str)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;");
    }

    function applySearch() {
        const q = searchInput.value;
        render(entries, q);
    }

    searchInput.addEventListener("input", applySearch);

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            searchInput.value = "";
            applySearch();
            searchInput.blur();
        }
        if (e.key === "/" && document.activeElement !== searchInput && document.activeElement?.tagName !== "INPUT") {
            e.preventDefault();
            searchInput.focus();
        }
    });

    window.goBack = function goBack() {
        if (document.referrer && document.referrer.includes(window.location.hostname)) {
            window.history.back();
        } else {
            window.location.href = "index.html";
        }
    };

    render();
    mergeSitemapDiscoveries();
})();
