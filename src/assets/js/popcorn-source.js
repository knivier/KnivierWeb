/**
 * Renders POPCORN_SOURCE_CATALOG into explorer, detail panel, SVG graph, and index table.
 * Depends on: window.POPCORN_SOURCE_CATALOG (popcorn-source-catalog.js)
 */
(function () {
    const catalog = window.POPCORN_SOURCE_CATALOG;
    if (!catalog || !Array.isArray(catalog.files)) {
        console.error("POPCORN_SOURCE_CATALOG missing");
        return;
    }

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const explorerEl = document.getElementById("src-explorer-list");
    const detailPath = document.getElementById("src-detail-path");
    const detailExt = document.getElementById("src-detail-ext");
    const detailBody = document.getElementById("src-detail-body");
    const graphRoot = document.getElementById("src-graph-root");
    const idxTbody = document.getElementById("src-index-tbody");

    const fileById = {};
    catalog.files.forEach(function (f) {
        fileById[f.id] = f;
    });

    const VIEW = { w: 920, h: 560 };

    function layoutPositions() {
        const core = catalog.files.filter(function (f) {
            return f.folder === "core";
        });
        const pops = catalog.files.filter(function (f) {
            return f.folder === "pops";
        });
        const pos = {};
        const dyC = (VIEW.h - 56) / Math.max(1, core.length - 0.35);
        core.forEach(function (f, i) {
            pos[f.id] = { x: 115, y: 36 + i * Math.min(38, dyC) };
        });
        const dyP = (VIEW.h - 56) / Math.max(1, pops.length - 0.35);
        pops.forEach(function (f, i) {
            pos[f.id] = { x: VIEW.w - 115, y: 40 + i * Math.min(52, dyP) };
        });
        return pos;
    }

    const positions = layoutPositions();

    function edgeClass(kind) {
        if (kind === "entry") return "k-entry";
        if (kind === "calls") return "k-calls";
        if (kind === "uses") return "k-uses";
        if (kind === "registers") return "k-reg";
        if (kind === "irq") return "k-irq";
        if (kind === "data") return "k-data";
        return "k-uses";
    }

    function buildGraph() {
        const ns = "http://www.w3.org/2000/svg";
        const svg = document.createElementNS(ns, "svg");
        svg.setAttribute("viewBox", "0 0 " + VIEW.w + " " + VIEW.h);
        svg.setAttribute("class", "src-graph-svg");
        svg.setAttribute("role", "img");
        svg.setAttribute("aria-label", "Module dependency graph");

        const edgesG = document.createElementNS(ns, "g");
        edgesG.setAttribute("class", "graph-edges");

        (catalog.links || []).forEach(function (link, idx) {
            const a = positions[link.from];
            const b = positions[link.to];
            if (!a || !b) return;
            const path = document.createElementNS(ns, "path");
            const mx = (a.x + b.x) / 2;
            const d =
                "M " +
                a.x +
                " " +
                a.y +
                " C " +
                (a.x + (mx - a.x) * 0.65) +
                " " +
                a.y +
                " " +
                (b.x - (b.x - mx) * 0.65) +
                " " +
                b.y +
                " " +
                b.x +
                " " +
                b.y;
            path.setAttribute("d", d);
            path.setAttribute("class", "graph-edge");
            path.dataset.from = link.from;
            path.dataset.to = link.to;
            path.dataset.kind = link.kind || "uses";
            path.setAttribute("data-edge-idx", String(idx));
            edgesG.appendChild(path);
        });

        const nodesG = document.createElementNS(ns, "g");
        nodesG.setAttribute("class", "graph-nodes");

        catalog.files.forEach(function (f) {
            const p = positions[f.id];
            if (!p) return;
            const g = document.createElementNS(ns, "g");
            g.setAttribute("class", "graph-node");
            g.dataset.id = f.id;
            g.setAttribute("role", "button");
            g.setAttribute("tabindex", "0");
            g.style.cursor = "pointer";

            const c = document.createElementNS(ns, "circle");
            c.setAttribute("cx", String(p.x));
            c.setAttribute("cy", String(p.y));
            c.setAttribute("r", "10");

            const t = document.createElementNS(ns, "text");
            t.setAttribute("x", String(p.x));
            t.setAttribute("y", String(p.y + 22));
            t.setAttribute("text-anchor", "middle");
            var shortName = f.name.length > 14 ? f.name.slice(0, 12) + "…" : f.name;
            t.textContent = shortName;

            g.appendChild(c);
            g.appendChild(t);

            g.addEventListener("click", function (e) {
                e.stopPropagation();
                selectFile(f.id);
            });
            g.addEventListener("keydown", function (e) {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    selectFile(f.id);
                }
            });

            nodesG.appendChild(g);
        });

        svg.appendChild(edgesG);
        svg.appendChild(nodesG);
        graphRoot.innerHTML = "";
        graphRoot.appendChild(svg);
    }

    function neighborsOf(id) {
        const set = {};
        set[id] = true;
        (catalog.links || []).forEach(function (l) {
            if (l.from === id) set[l.to] = true;
            if (l.to === id) set[l.from] = true;
        });
        return set;
    }

    function selectFile(id) {
        const f = fileById[id];
        if (!f) return;

        document.querySelectorAll(".src-file.is-active").forEach(function (el) {
            el.classList.remove("is-active");
        });
        document.querySelectorAll(".src-file").forEach(function (b) {
            if (b.dataset.id === id) b.classList.add("is-active");
        });

        detailPath.textContent = "src/" + f.folder + "/" + f.name;
        detailExt.textContent = f.ext.toUpperCase();

        var html = "";
        html += '<p class="src-detail__role">' + escapeHtml(f.role) + "</p>";
        html += '<p class="src-detail__one">' + escapeHtml(f.oneLine) + "</p>";
        if (f.bullets && f.bullets.length) {
            html += "<ul class=\"src-detail__list\">";
            f.bullets.forEach(function (b) {
                html += "<li>" + escapeHtml(b) + "</li>";
            });
            html += "</ul>";
        }
        if (f.exports && f.exports.length) {
            html += '<div class="src-detail__exports"><strong style="font-size:0.72rem;color:rgba(255,255,255,0.5)">Exports</strong><br>';
            f.exports.forEach(function (ex) {
                html += "<span>" + escapeHtml(ex) + "</span>";
            });
            html += "</div>";
        }
        if (f.notes && f.notes.length) {
            html += '<p class="src-detail__notes">' + f.notes.map(escapeHtml).join(" ") + "</p>";
        }
        detailBody.innerHTML = html;

        var neigh = neighborsOf(id);
        document.querySelectorAll(".graph-node").forEach(function (node) {
            var nid = node.dataset.id;
            node.classList.toggle("is-active", nid === id);
            node.classList.toggle("is-neighbor", nid !== id && neigh[nid]);
            node.classList.toggle("is-dimmed", !neigh[nid]);
        });

        document.querySelectorAll(".graph-edge").forEach(function (path) {
            var rel =
                neigh[path.dataset.from] &&
                neigh[path.dataset.to];
            path.classList.toggle("is-related", !!rel);
            path.classList.toggle("is-dimmed", !rel);
        });
    }

    function escapeHtml(s) {
        return String(s)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;");
    }

    function buildExplorer() {
        var byFolder = { core: [], pops: [] };
        catalog.files.forEach(function (f) {
            byFolder[f.folder].push(f);
        });

        function folderBlock(folder, label) {
            var wrap = document.createElement("div");
            wrap.className = "src-dir";
            var h = document.createElement("div");
            h.className = "src-dir__title";
            h.textContent = label;
            wrap.appendChild(h);
            byFolder[folder].forEach(function (f) {
                var b = document.createElement("button");
                b.type = "button";
                b.className = "src-file";
                b.dataset.id = f.id;
                var ext = document.createElement("span");
                ext.className = "src-file__ext" + (f.ext === "asm" ? " src-file__ext--asm" : "");
                ext.textContent = f.ext;
                var nm = document.createElement("span");
                nm.className = "src-file__name";
                nm.textContent = f.name;
                b.appendChild(ext);
                b.appendChild(nm);
                b.addEventListener("click", function () {
                    selectFile(f.id);
                });
                wrap.appendChild(b);
            });
            return wrap;
        }

        explorerEl.appendChild(folderBlock("core", "src/core"));
        explorerEl.appendChild(folderBlock("pops", "src/pops"));
    }

    function buildIndexTable() {
        catalog.files.forEach(function (f) {
            var tr = document.createElement("tr");
            var td1 = document.createElement("td");
            var btn = document.createElement("button");
            btn.type = "button";
            btn.textContent = f.folder + "/" + f.name;
            btn.addEventListener("click", function () {
                selectFile(f.id);
                document.getElementById("src-detail-panel").scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "nearest" });
            });
            td1.appendChild(btn);
            var td2 = document.createElement("td");
            td2.textContent = f.oneLine;
            tr.appendChild(td1);
            tr.appendChild(td2);
            idxTbody.appendChild(tr);
        });
    }

    buildExplorer();
    buildGraph();
    buildIndexTable();

    var first = catalog.files[0];
    if (first) selectFile(first.id);
})();
