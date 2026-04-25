/**
 * Builds breadcrumb + nav from POPCORN_SITE (popcorn-site-config.js).
 * Expects: <header id="site-shell" class="site-shell" data-popcorn-page="…">
 */
(function () {
    var SITE = window.POPCORN_SITE;
    var shell = document.getElementById("site-shell");
    if (!SITE || !shell) return;

    var page = (shell.getAttribute("data-popcorn-page") || "landing").toLowerCase();
    var prefix = SITE.pathPrefix || "";
    var pages = SITE.pages || {};
    var ext = SITE.external || {};

    function esc(s) {
        return String(s)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/"/g, "&quot;");
    }

    function href(key) {
        if (key === "portfolio") return prefix + (SITE.portfolioHref || "index.html");
        return prefix + (pages[key] || "#");
    }

    var trail = {
        landing: [
            { href: href("portfolio"), label: "Portfolio" },
            { here: true, label: "Popcorn" },
        ],
        about: [
            { href: href("portfolio"), label: "Portfolio" },
            { href: href("landing"), label: "Popcorn" },
            { here: true, label: "About" },
        ],
        kernel: [
            { href: href("portfolio"), label: "Portfolio" },
            { href: href("landing"), label: "Popcorn" },
            { here: true, label: "Operation map" },
        ],
        source: [
            { href: href("portfolio"), label: "Portfolio" },
            { href: href("landing"), label: "Popcorn" },
            { here: true, label: "Source catalog" },
        ],
    };

    function renderBreadcrumb(list) {
        var html = [];
        for (var i = 0; i < list.length; i++) {
            var c = list[i];
            if (i) html.push('<span class="crumb-sep">/</span>');
            if (c.here) html.push('<span class="crumb--here">' + esc(c.label) + "</span>");
            else html.push('<a href="' + esc(c.href) + '">' + esc(c.label) + "</a>");
        }
        return html.join("");
    }

    var navDefs = [
        { page: "landing", label: "Popcorn" },
        { page: "about", label: "About" },
        { page: "kernel", label: "Operation map" },
        { page: "source", label: "Source" },
        { ext: "repo", label: "Repository" },
        { ext: "roadmap", label: "Roadmap" },
    ];

    function renderNav() {
        var out = [];
        for (var i = 0; i < navDefs.length; i++) {
            var d = navDefs[i];
            if (d.ext) {
                var url = ext[d.ext] || "#";
                out.push(
                    '<a class="nav-pill nav-pill--external" href="' +
                        esc(url) +
                        '" rel="noopener noreferrer" target="_blank">' +
                        esc(d.label) +
                        "</a>"
                );
            } else {
                var h = href(d.page);
                var accent = d.page === page ? " nav-pill--accent" : "";
                out.push('<a class="nav-pill' + accent + '" href="' + esc(h) + '">' + esc(d.label) + "</a>");
            }
        }
        return out.join("");
    }

    var bc = shell.querySelector(".site-breadcrumb");
    var nav = shell.querySelector(".site-nav-pills");
    var crumbList = trail[page] || trail.landing;
    if (bc) {
        bc.setAttribute("aria-label", "You are here");
        bc.innerHTML = renderBreadcrumb(crumbList);
    }
    if (nav) {
        nav.setAttribute("aria-label", "Popcorn pages");
        nav.innerHTML = renderNav();
    }

    var vp = document.querySelector(".version-pill");
    if (vp && SITE.version) {
        vp.textContent = "v" + SITE.version + " · pre-1.0";
    }

    document.querySelectorAll("[data-popcorn-page-href]").forEach(function (el) {
        var key = el.getAttribute("data-popcorn-page-href");
        if (key && pages[key]) {
            el.setAttribute("href", prefix + pages[key]);
        }
    });

    window.addEventListener(
        "scroll",
        function () {
            if (window.scrollY > 80) shell.classList.add("site-shell--compact");
            else shell.classList.remove("site-shell--compact");
        },
        { passive: true }
    );
})();
