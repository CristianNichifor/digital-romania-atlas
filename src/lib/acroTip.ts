/**
 * Viewport-aware tooltip for glossary acronyms (`.acro` elements carrying a
 * `data-tip` attribute). One shared fixed-position element, positioned next
 * to the hovered/focused term and clamped inside the window, flipping below
 * the term when there is no room above.
 */

let tipEl: HTMLDivElement | null = null;
let active: HTMLElement | null = null;
let raf = 0;

function ensure(): HTMLDivElement {
  if (!tipEl) {
    tipEl = document.createElement("div");
    tipEl.className = "acro-tip";
    tipEl.setAttribute("role", "tooltip");
    document.body.appendChild(tipEl);
  }
  return tipEl;
}

function position(): void {
  if (!tipEl || !active) return;
  const r = active.getBoundingClientRect();
  const w = tipEl.offsetWidth;
  const h = tipEl.offsetHeight;
  const gap = 7;
  const edge = 6;
  let left = r.left + r.width / 2 - w / 2;
  left = Math.max(edge, Math.min(left, window.innerWidth - w - edge));
  let top = r.top - h - gap;
  if (top < edge) top = r.bottom + gap;
  if (top + h > window.innerHeight - edge) top = window.innerHeight - h - edge;
  tipEl.style.left = `${left}px`;
  tipEl.style.top = `${top}px`;
}

function show(el: HTMLElement): void {
  const tip = ensure();
  tip.textContent = el.getAttribute("data-tip") ?? "";
  tip.classList.add("on");
  active = el;
  position();
}

function hide(): void {
  tipEl?.classList.remove("on");
  active = null;
}

export function initAcroTips(): () => void {
  const over = (e: Event) => {
    const el = (e.target as HTMLElement | null)?.closest?.(
      ".acro, .step-node[data-tip]"
    );
    if (el) show(el as HTMLElement);
  };
  const out = (e: Event) => {
    const el = (e.target as HTMLElement | null)?.closest?.(
      ".acro, .step-node[data-tip]"
    );
    if (el) hide();
  };
  const reposition = () => {
    cancelAnimationFrame(raf);
    if (active) raf = requestAnimationFrame(position);
  };

  document.addEventListener("mouseover", over);
  document.addEventListener("mouseout", out);
  document.addEventListener("focusin", over);
  document.addEventListener("focusout", out);
  window.addEventListener("scroll", reposition, { passive: true });
  window.addEventListener("resize", reposition);

  return () => {
    document.removeEventListener("mouseover", over);
    document.removeEventListener("mouseout", out);
    document.removeEventListener("focusin", over);
    document.removeEventListener("focusout", out);
    window.removeEventListener("scroll", reposition);
    window.removeEventListener("resize", reposition);
    cancelAnimationFrame(raf);
    tipEl?.remove();
    tipEl = null;
  };
}
