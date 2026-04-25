/**
 * Popcorn operation map: interactive tree + detail panel.
 */
(function () {
    const KERNEL_TREE = {
        id: "root",
        label: "Popcorn v0.5 — hierarchical operation map",
        detail:
            "Source-aligned overview: firmware/GRUB → Multiboot2 ELF at 0x100000 → kernel.asm:start → long mode → kmain. Below: host vs guest, boot, subsystems, init order, pops, and caveats.\n\nSelect any node to read the contract-style notes.",
        children: [
            {
                id: "repo-roles",
                label: "0 · Repository roles (kernel vs host)",
                detail:
                    "Popcorn/\n├── src/\n│   ├── link.ld              # ELF @ 0x100000, ENTRY(start), multiboot\n│   ├── core/                  # Kernel (C + asm)\n│   ├── pops/                  # Pop modules\n│   ├── includes/\n│   ├── build.sh / buildmon.py # Host automation\n│   └── mac-build*.py/sh       # macOS wrappers\n\nInside QEMU only the linked ELF matters. Shell/Python are host-side.",
            },
            {
                id: "boot",
                label: "1 · Boot chain",
                detail:
                    "GRUB (guest)\n  └─ multiboot2 /boot/kernel\n       └─ load ELF at link address\n            └─ jump start (core/kernel.asm)\n\nlink.ld: OUTPUT_FORMAT(elf64-x86-64), ENTRY(start), .multiboot, PT_LOAD.\n\nkernel.asm: start (32-bit) → save multiboot2 pointer → page tables → EFER.LME → start64 → rsp = stack_top → call kmain. If kmain returns: cli; hlt loop.\n\nStubs: keyboard_handler, timer_handler, syscall_handler_asm → C; load_idt (lidt; sti); cpuid/rdtsc helpers.",
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
                    "┌─────────────────────────────────────────────┐\n│ Popcorn (ring 0)                             │\n├─────────────────────────────────────────────┤\n│ Console VGA 0xB8000 · shell + Dolphin       │\n│ Interrupts: PIC + IDT                       │\n│ PIT → timer → scheduler_tick                │\n│ Memory: kmalloc path, stats                 │\n│ Scheduler: queues, idle, context switch     │\n│ Syscalls: int 0x80 → dispatch               │\n│ Pop registry + shell execute_command        │\n└─────────────────────────────────────────────┘",
                children: [
                    { id: "console", label: "5 · Console / VGA", detail: "core/console.c + ConsoleState: 80×25×2 @ 0xB8000; cursor, colors, scroll, header, prompt, status bar. Used by init, shell, pops, syscalls." },
                    { id: "irq", label: "Interrupt subsystem", detail: "PIC remap; IDT[0x20] timer, [0x21] keyboard, [0x80] syscall. IRQ0 → scheduler_tick (after boot wire-up); IRQ1 → keyboard_handler_main; int 0x80 → syscall_dispatch." },
                    { id: "timer", label: "6 · Timer (PIT)", detail: "timer_init: ports 0x43/0x40. timer_interrupt_handler: ticks++, tick_handler (scheduler_tick), EOI 0x20. timer_enable/disable: mask IRQ0 @ PIC1 0x21." },
                    { id: "mem", label: "Memory manager", detail: "memory_init + kmalloc/kfree; stats in boot UI, mem pop, commands." },
                    { id: "sched", label: "7 · Scheduler", detail: "scheduler_init: 5 priority queues, idle PID 0. scheduler_tick from timer IRQ: boot skip, accounting, slice, periodic preemption (tick_counter ≥ 10). Static 32×16KiB stacks." },
                    { id: "syscall", label: "8 · Syscalls", detail: "syscall_init registers ~21 handlers (exit, read, write, open, fork, mmap, …). syscall_dispatch: rax index, linear table, int64 return. IDT[0x80] type 0xEE user-accessible gate → syscall_handler_asm." },
                    { id: "pops-reg", label: "Pop module registry", detail: "register_pop_module (order = render/exec). execute_all_pops exists; some shell paths call pops directly (e.g. hang → spinner + uptime)." },
                    { id: "shell", label: "9 · Shell / execute_command", detail: "Built-ins, FS verbs, introspection (sysinfo, mem, cpu, timer, tasks, syscalls), mon …, dol … Dolphin routing. kmain loop: poll 0x64/0x60; if Dolphin active → dolphin_handle_key; else history + TAB completion." },
                ],
            },
            {
                id: "kmain",
                label: "3 · kmain loop",
                detail:
                    "kmain (kernel.c)\n  init_boot_screen (init.c)\n  while (1)\n    poll keyboard ports\n    if dolphin_is_active → dolphin_handle_key\n    else line editing + execute_command on Enter\n\nNote: keyboard path polls; timing is still interrupt-driven via PIT once enabled.",
            },
            {
                id: "init",
                label: "4 · init_boot_screen → transition",
                detail:
                    "init_boot_screen:\n  console_init → init_draw_header → init_show_memory_info (memory_init)\n  → timer_init → scheduler_init → syscall_init\n  → register_pop_module ×9 → progress bar → init_wait_for_enter\n  → init_transition_to_console\n\ninit_transition_to_console:\n  console_clear, multiboot2_parse, idt_init (PIC, mask, load_idt/sti)\n  → kb_init (unmask IRQ1) → timer_set_tick_handler(scheduler_tick)\n  → timer_enable (unmask IRQ0) → draw prompt + status bar.\n\nPop order: spinner, uptime, filesystem, sysinfo, memory, cpu, dolphin, halt, shimjapii.",
            },
            {
                id: "pops-files",
                label: "10 · pops/*.c (linked ring-0)",
                detail:
                    "pops/: spinner_pop, uptime_pop, filesystem_pop, sysinfo_pop, memory_pop, cpu_pop, dolphin_pop, halt_pop, shimjapii_pop.\n\nPops are not separate address spaces—they are linked into the kernel.",
            },
            {
                id: "mb2-parse",
                label: "11 · multiboot2_parse",
                detail: "Walks tags from multiboot2_info_ptr: bootloader name, cmdline, mem info, mmap → totals. Consumers: sysinfo, boot messaging.",
            },
            {
                id: "host-build",
                label: "12 · Host → QEMU",
                detail: "Toolchain → ELF + ISO. qemu-system-x86_64 -cdrom … → GRUB → multiboot2 → kernel. Not in-guest; completes the story.",
            },
            {
                id: "reading",
                label: "13 · Reading map",
                detail:
                    "Entry/long mode/ISR stubs → core/kernel.asm\nLink/sections → link.ld\nBoot UI + ordered init → core/init.c\nShell + IDT/PIC + keyboard loop → core/kernel.c\nTimer → core/timer.c + asm stub\nScheduler → core/syscall.c + asm\nMultiboot → multiboot2.c\nPop registry → pop_module.c\nIndividual pops → pops/*.c",
            },
            {
                id: "caveats",
                label: "14 · Caveats",
                detail:
                    "Educational security model: user-accessible syscall gate exists; isolation depends on scheduler/memory setup—read sources.\nPolling + IRQ concurrency: shell polls keyboard while timer IRQ runs scheduler; check locking assumptions.\nexecute_all_pops: batch helper; not every feature uses it.",
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
