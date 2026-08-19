(function () {
    function goBack() {
        if (document.referrer && document.referrer.includes(window.location.hostname)) {
            window.history.back();
        } else {
            window.location.href = "index.html";
        }
    }

    window.goBack = goBack;

    const overlay = document.getElementById("tldr-overlay");
    const dialog = document.getElementById("tldr-dialog");
    if (!overlay || !dialog) return;

    const openers = document.querySelectorAll("[data-tldr-open]");
    const closers = overlay.querySelectorAll("[data-tldr-close]");
    const closedTab = document.getElementById("tab-closed");
    const openTab = document.getElementById("tab-open");
    const closedPanel = document.getElementById("panel-closed");
    const openPanel = document.getElementById("panel-open");
    const slider = overlay.querySelector(".source-slider");

    let lastFocus = null;

    function getFocusable() {
        return Array.from(
            dialog.querySelectorAll(
                'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
            )
        ).filter((el) => !el.hasAttribute("hidden") && el.offsetParent !== null);
    }

    function setSource(kind) {
        const isOpen = kind === "open";
        closedTab.setAttribute("aria-selected", String(!isOpen));
        openTab.setAttribute("aria-selected", String(isOpen));
        closedPanel.hidden = isOpen;
        openPanel.hidden = !isOpen;
        slider.classList.toggle("is-open-source", isOpen);
    }

    function openTldr() {
        lastFocus = document.activeElement;
        overlay.hidden = false;
        document.body.classList.add("tldr-open");
        requestAnimationFrame(() => overlay.classList.add("is-visible"));
        const closeBtn = dialog.querySelector(".tldr-close");
        (closeBtn || dialog).focus();
        if (window.location.hash !== "#tldr") {
            history.replaceState(null, "", "#tldr");
        }
    }

    function closeTldr() {
        overlay.classList.remove("is-visible");
        document.body.classList.remove("tldr-open");
        window.setTimeout(() => {
            overlay.hidden = true;
        }, 180);
        if (window.location.hash === "#tldr") {
            history.replaceState(null, "", window.location.pathname + window.location.search);
        }
        if (lastFocus && typeof lastFocus.focus === "function") {
            lastFocus.focus();
        }
    }

    openers.forEach((btn) => btn.addEventListener("click", openTldr));
    closers.forEach((el) => el.addEventListener("click", closeTldr));

    closedTab.addEventListener("click", () => setSource("closed"));
    openTab.addEventListener("click", () => setSource("open"));

    closedTab.addEventListener("keydown", (e) => {
        if (e.key === "ArrowRight") {
            e.preventDefault();
            openTab.focus();
            setSource("open");
        }
    });
    openTab.addEventListener("keydown", (e) => {
        if (e.key === "ArrowLeft") {
            e.preventDefault();
            closedTab.focus();
            setSource("closed");
        }
    });

    document.addEventListener("keydown", (e) => {
        if (overlay.hidden) return;
        if (e.key === "Escape") {
            e.preventDefault();
            closeTldr();
            return;
        }
        if (e.key !== "Tab") return;
        const focusable = getFocusable();
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first.focus();
        }
    });

    if (window.location.hash === "#tldr") {
        openTldr();
    }
})();
