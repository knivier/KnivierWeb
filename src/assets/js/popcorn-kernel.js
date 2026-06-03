/**
 * Popcorn operation map: interactive tree + detail panel.
 */
(function () {
    const KERNEL_TREE = {
        id: "root",
        label: "Popcorn v0.6 — hierarchical operation map",
        detail:
            "Source-aligned overview: firmware/GRUB → Multiboot2 ELF at 0x100000 → kernel.asm:start → 1 GiB identity map → long mode → kmain. 0.6 adds VMM/PMM, IRQ keyboard queue, and scheduler bootstrap guards before full PIT preemption.\n\nSelect any node to read the contract-style notes.",
        children: [
            {
                id: "repo-roles",
                label: "0 · Repository roles (kernel vs host)",
                detail:
                    "Popcorn/\n├── src/\n│   ├── link.ld              # ELF @ 0x100000, ENTRY(start), multiboot\n│   ├── core/                  # Kernel (C + asm), includes vmm.c\n│   ├── pops/                  # Pop modules\n│   ├── includes/              # vmm.h, keyboard_queue.h, …\n│   └── build/\n│       ├── linux.sh / macos.sh\n│       └── popcorn_build/     # toolchain, ISO, QEMU\n\nInside QEMU only the linked ELF matters. Shell/Python are host-side.",
            },
            {
                id: "boot",
                label: "1 · Boot chain",
                detail:
                    "GRUB (guest)\n  └─ multiboot2 /boot/kernel\n       └─ load ELF at link address\n            └─ jump start (core/kernel.asm)\n\nkernel.asm: start → save multiboot2 pointer → 512×2 MiB identity map → EFER.LME → start64 → rsp → kmain.\n\nStubs: keyboard_handler, timer_handler, syscall_handler_asm, default_cpu_exception → C; load_idt (lidt; sti).",
                children: [
                    {
                        id: "mb2-header",
                        label: "1.4 · Multiboot2 header",
                        detail:
                            "section .multiboot\n  multiboot2_header_start\n    magic 0xE85250D6\n    arch 0\n    header length + checksum\n    end tag",
                    },
                ],
            },
            {
                id: "runtime",
                label: "2 · Ring-0 runtime architecture",
                detail:
                    "┌─────────────────────────────────────────────┐\n│ Popcorn (ring 0)                             │\n├─────────────────────────────────────────────┤\n│ Console VGA 0xB8000 · shell + Dolphin       │\n│ VMM: boot identity map, per-task PML4, CR3  │\n│ PMM: 4K frames, bitmap from Multiboot mmap  │\n│ IRQ1 → scancode queue → shell (HLT wait)    │\n│ PIT → timer → scheduler_tick (guarded)      │\n│ Syscalls: int 0x80 → dispatch               │\n│ Pop registry + execute_command              │\n└─────────────────────────────────────────────┘",
                children: [
                    { id: "console", label: "5 · Console / VGA", detail: "core/console.c + ConsoleState: 80×25×2 @ 0xB8000; cursor, colors, scroll, scrollback, header, prompt, status bar." },
                    { id: "vmm", label: "5b · Virtual memory (VMM)", detail: "core/vmm.c: boot identity map helpers, alloc PML4, map 4K/2M, process address-space init, CR3 reload on task switch. Scheduler stores pml4_phys per task." },
                    { id: "pmm", label: "5c · Physical memory (PMM)", detail: "core/memory.c: walks Multiboot2 mmap with region-type filter; bitmap marks 4K frames in first GiB; kmalloc-style pools remain for kernel structures." },
                    { id: "irq", label: "Interrupt subsystem", detail: "PIC remap; IDT[0x20] timer, [0x21] keyboard, [0x80] syscall. IRQ0 → scheduler_tick (after console handoff, with bootstrap guards). IRQ1 → keyboard_handler_main → key_queue." },
                    { id: "timer", label: "6 · Timer (PIT)", detail: "timer_init during boot screen; timer_enable at init_transition_to_console. timer_interrupt_handler: ticks++, tick_handler, EOI 0x20." },
                    { id: "sched", label: "7 · Scheduler", detail: "scheduler_init: kernel PML4, idle PID 0, 5 priority queues. scheduler_tick: skip first tick; bootstrap_on_kmain_stack() blocks switch; context_looks_sane(); preempt every 10 ticks. Static 32×16KiB stacks." },
                    { id: "syscall", label: "8 · Syscalls", detail: "syscall_init registers ~21 handlers. syscall_dispatch via int 0x80. Experimental fork/mmap paths from 0.5 remain." },
                    { id: "pops-reg", label: "Pop module registry", detail: "register_pop_module ×9 during init_boot_screen. execute_all_pops batch helper; shell calls pops directly in places." },
                    { id: "shell", label: "9 · Shell / execute_command", detail: "kmain loop: dequeue scancode from IRQ queue; HLT when empty; Dolphin uses same queue. Built-ins, FS verbs, sysinfo/mem/cpu, dol …" },
                ],
            },
            {
                id: "kmain",
                label: "3 · kmain loop",
                detail:
                    "kmain (kernel.c)\n  init_boot_screen (init.c)\n  while (1)\n    read from key_queue (IRQ1 producer)\n    if empty → HLT (wake on IRQ1)\n    if dolphin_is_active → dolphin_handle_key\n    else line editing + execute_command on Enter\n\n0.6 does not poll 0x64/0x60 in the main loop.",
            },
            {
                id: "init",
                label: "4 · init_boot_screen → transition",
                detail:
                    "init_boot_screen:\n  multiboot2_parse early → idt_init\n  console_init → header → memory_init (PMM+VMM)\n  → timer_init → scheduler_init → syscall_init\n  → register_pop_module ×9 → progress → wait Enter/auto\n  → init_transition_to_console\n\ninit_transition_to_console:\n  clear → kb_init (IRQ1) → timer_set_tick_handler(scheduler_tick)\n  → timer_enable → prompt + status bar.\n\nNote: multiboot2_parse also runs at boot screen start; IDT before tasks with IF=1.",
            },
            {
                id: "pops-files",
                label: "10 · pops/*.c (linked ring-0)",
                detail:
                    "pops/: spinner, uptime, filesystem, sysinfo, memory, cpu, dolphin, halt, shimjapii.\n\nDolphin 0.6: shared keyboard queue. Pops are linked into the kernel binary.",
            },
            {
                id: "mb2-parse",
                label: "11 · multiboot2_parse",
                detail: "Walks tags from multiboot2_info_ptr: bootloader, cmdline, meminfo, mmap → PMM region filtering and sysinfo.",
            },
            {
                id: "host-build",
                label: "12 · Host → QEMU",
                detail: "src/build/linux.sh or macos.sh → ELF + ISO via popcorn_build → qemu-system-x86_64 -cdrom popcorn.iso.",
            },
            {
                id: "reading",
                label: "13 · Reading map",
                detail:
                    "Entry/paging/ISR → core/kernel.asm\nLink → link.ld\nBoot UI + init → core/init.c\nShell + key queue + IDT → core/kernel.c\nVMM → core/vmm.c\nPMM/heap → core/memory.c\nTimer → core/timer.c\nScheduler → core/scheduler.c + context_switch.asm\nSyscalls → core/syscall.c\nMultiboot → multiboot2.c\nPops → pops/*.c",
            },
            {
                id: "caveats",
                label: "14 · Caveats",
                detail:
                    "0.6 pre-release: soak-test keyboard + timer on your QEMU/host.\nPer-task PML4 exists; user isolation and demand paging are not complete.\nKeep cli windows in context switch short for keyboard latency.\nexecute_all_pops: batch helper; not every path uses it.",
            },
        ],
    };

    const treeRoot = document.getElementById("tree-root");
    const detailTitle = document.getElementById("detail-title");
    const detailBody = document.getElementById("detail-body");

    let selectedLi = null;

    function renderDetail(node) {
        detailTitle.textContent = node.label;
        detailBody.innerHTML = "";
        const pre = document.createElement("pre");
        pre.className = "detail-panel__pre";
        pre.textContent = node.detail || "";
        detailBody.appendChild(pre);
    }

    function clearSelection() {
        if (selectedLi) selectedLi.classList.remove("is-selected");
        selectedLi = null;
    }

    function buildNode(node) {
        const li = document.createElement("li");
        li.className = "tree-node";
        if (!node.children || node.children.length === 0) {
            li.classList.add("is-leaf");
        }

        const row = document.createElement("button");
        row.type = "button";
        row.className = "tree-node__row";

        const chevron = document.createElement("span");
        chevron.className = "chevron";
        chevron.setAttribute("aria-hidden", "true");
        chevron.textContent = node.children && node.children.length ? "▸" : "·";

        const label = document.createElement("span");
        label.className = "tree-node__label";
        label.textContent = node.label;

        row.appendChild(chevron);
        row.appendChild(label);

        row.addEventListener("click", function (e) {
            e.stopPropagation();
            clearSelection();
            li.classList.add("is-selected");
            selectedLi = li;
            renderDetail(node);
            if (node.children && node.children.length) {
                li.classList.toggle("is-open");
            }
        });

        li.appendChild(row);

        if (node.children && node.children.length) {
            const ul = document.createElement("ul");
            ul.className = "tree-children";
            node.children.forEach(function (child) {
                ul.appendChild(buildNode(child));
            });
            li.appendChild(ul);
        }

        return li;
    }

    function initTree() {
        if (!treeRoot) return;
        const ul = document.createElement("ul");
        ul.className = "tree";
        ul.appendChild(buildNode(KERNEL_TREE));
        treeRoot.appendChild(ul);
        renderDetail(KERNEL_TREE);
        const first = treeRoot.querySelector(".tree-node");
        if (first) {
            first.classList.add("is-selected", "is-open");
            selectedLi = first;
        }
    }

    async function initMermaid() {
        if (typeof mermaid === "undefined") return;
        mermaid.initialize({
            startOnLoad: false,
            theme: "base",
            securityLevel: "loose",
            themeVariables: {
                primaryColor: "#0f1a16",
                primaryTextColor: "#00ff9d",
                primaryBorderColor: "#00ff9d",
                lineColor: "#5ee0ad",
                secondaryColor: "#141414",
                tertiaryColor: "#0a0a0a",
                background: "#0a0a0a",
                mainBkg: "#101010",
                nodeBorder: "#00ff9d",
                clusterBkg: "#151515",
                titleColor: "#e8e8e8",
                edgeLabelBackground: "#101010",
                nodeTextColor: "#e0fff4",
            },
            flowchart: { curve: "basis", padding: 14, useMaxWidth: true },
        });
        try {
            await mermaid.run({ querySelector: ".mermaid" });
        } catch (e) {
            console.error(e);
        }
    }

    function boot() {
        initTree();
        initMermaid();
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", boot);
    } else {
        boot();
    }
})();
